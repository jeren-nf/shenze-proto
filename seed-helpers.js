/* seed-helpers.js — 共享给首页/商机/货源列表使用
   - 把列表页的 mock 数据转换为详情页所需的 schema
   - 合并写入 localStorage (b2_inquiries / s2_supplies)
*/
(function(){
  function pad(n){ return n<10?'0'+n:n; }

  // 把 leaf 字段映射为三级品类
  function leafToCat(leaf){
    var m = {
      zidong:'皮具配饰 > 自动扣皮带', train:'鞋类 > 运动鞋 > 训练鞋',
      yingke:'箱包 > 拉杆箱 > 硬壳箱', fanbu:'鞋类 > 帆布鞋',
      basket:'鞋类 > 运动鞋 > 篮球鞋', zhenkou:'皮具配饰 > 针扣皮带',
      dengshan:'鞋类 > 户外鞋 > 登山鞋', tshirt:'服装 > 男装 > T恤',
      ballet:'鞋类 > 舞蹈鞋 > 芭蕾鞋', ski:'鞋类 > 雪靴 > 滑雪靴',
      hiking:'鞋类 > 户外鞋 > 徒步鞋', boots:'鞋类 > 工装靴',
      sneakers:'鞋类 > 运动鞋', canvas:'鞋类 > 帆布鞋',
      sandals:'鞋类 > 凉鞋', suitcase:'箱包 > 拉杆箱', belt:'皮具配饰 > 皮带',
      tuoxie:'鞋类 > 凉鞋 > 拖鞋', liangxie:'鞋类 > 凉鞋',
      anquan:'鞋类 > 工装靴 > 安全鞋', balei:'鞋类 > 舞蹈鞋 > 芭蕾鞋',
      huaxue:'鞋类 > 雪靴 > 滑雪靴', yingke2:'箱包 > 拉杆箱 > 硬壳箱',
      tubu:'鞋类 > 户外鞋 > 徒步鞋', gongzhuang:'鞋类 > 工装靴',
      liangong:'鞋类 > 舞蹈鞋 > 练功鞋'
    };
    return m[leaf] || ('鞋贸汇 > ' + (leaf||'通用'));
  }

  // 求购 cat 字段（中文）→ 三级品类
  function qgCatToCat(cat){
    var m = {
      '运动鞋':'鞋类 > 运动鞋', '帆布鞋':'鞋类 > 帆布鞋', '凉鞋':'鞋类 > 凉鞋',
      '拖鞋':'鞋类 > 凉鞋 > 拖鞋', '登山鞋':'鞋类 > 户外鞋 > 登山鞋',
      '徒步鞋':'鞋类 > 户外鞋 > 徒步鞋', '户外鞋':'鞋类 > 户外鞋',
      '工装靴':'鞋类 > 工装靴', '安全鞋':'鞋类 > 工装靴 > 安全鞋',
      '练功鞋':'鞋类 > 舞蹈鞋 > 练功鞋', '芭蕾鞋':'鞋类 > 舞蹈鞋 > 芭蕾鞋',
      '舞蹈鞋':'鞋类 > 舞蹈鞋', '滑雪靴':'鞋类 > 雪靴 > 滑雪靴',
      '雪靴':'鞋类 > 雪靴', '硬壳箱':'箱包 > 拉杆箱 > 硬壳箱',
      '箱包':'箱包', '劳保鞋':'鞋类 > 工装靴 > 劳保鞋',
      '皮具配饰':'皮具配饰', '皮带':'皮具配饰 > 皮带',
      '自动扣':'皮具配饰 > 自动扣皮带', '针扣':'皮具配饰 > 针扣皮带',
      '训练鞋':'鞋类 > 运动鞋 > 训练鞋'
    };
    return m[cat] || ('鞋贸汇 > ' + cat);
  }

  // 价格 {min, max, start} 或 null → 标签字符串
  function formatPrice(p, moq){
    if(!p) return '价格面议';
    var s = '¥' + p.min + '元';
    if(p.max) s += '-' + p.max + '元';
    if(p.start) s += '/起';
    if(moq) s += '（' + moq + '起订）';
    return s;
  }

  // 时间 "刚刚"/"10分钟前"/"1小时前"/"3小时前"/"昨天"/"2天前"/.../"7天前"/"8-17" → ISO 字符串
  function timeToISO(t){
    if(!t) return '';
    var now = new Date('2026-08-24T16:55:00');
    var rel = {'刚刚':0,'10分钟前':10,'1小时前':60,'3小时前':180,'昨天':1440,
               '2天前':2880,'3天前':4320,'4天前':5760,'5天前':7200,
               '6天前':8640,'7天前':10080};
    if(rel[t] !== undefined){
      var d = new Date(now.getTime() - rel[t]*60000);
      return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes());
    }
    var md = String(t).match(/^(\d+)-(\d+)$/);
    if(md){ return '2026-'+pad(parseInt(md[1]))+'-'+pad(parseInt(md[2]))+' 09:00'; }
    return t;
  }

  // 合并写入 s2_supplies（按 id 去重）
  // 种入的数据加 _seeded:true,详情页 isOwner 需排除 _seeded(避免把 mock 错认为用户自己发的)
  function seedSupplies(arr){
    var existing = [];
    try { existing = JSON.parse(localStorage.getItem('s2_supplies')) || []; } catch(e){}
    var ids = {};
    existing.forEach(function(x){ ids[x.id]=true; });
    arr.forEach(function(d){
      if(ids[d.id]) return;
      existing.push({
        id: d.id, title: d.title, category: d.category, desc: d.desc,
        images: d.images, price: {label: d.priceLabel}, time: d.time,
        _seeded: true
      });
    });
    try { localStorage.setItem('s2_supplies', JSON.stringify(existing)); } catch(e){}
  }

  // 合并写入 b2_inquiries
  function seedInquiries(arr){
    var existing = [];
    try { existing = JSON.parse(localStorage.getItem('b2_inquiries')) || []; } catch(e){}
    var ids = {};
    existing.forEach(function(x){ ids[x.id]=true; });
    arr.forEach(function(d){
      if(ids[d.id]) return;
      d._seeded = true;
      existing.push(d);
    });
    try { localStorage.setItem('b2_inquiries', JSON.stringify(existing)); } catch(e){}
  }

  window.SeedHelpers = {
    pad:pad, leafToCat:leafToCat, qgCatToCat:qgCatToCat,
    formatPrice:formatPrice, timeToISO:timeToISO,
    seedSupplies:seedSupplies, seedInquiries:seedInquiries
  };
})();
