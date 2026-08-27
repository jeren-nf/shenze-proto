/* ============================================================
 * 浏览记录（历史）共享数据 + 卡片渲染
 * - 卖家端 s2_history.html：求购 / 供应 两个 Tab
 * - 买家端 b2_history.html：仅供应列表
 * 与「商机」页同源的卡片结构，按当前语言取值，点击进详情
 * ============================================================ */
(function (global) {
  'use strict';

  function isEN() { return (global.I18N && global.I18N.curLang && global.I18N.curLang() === 'en'); }
  function TL(o) { return isEN() ? o.en : o.zh; }

  var AV_COLORS = ['#1677FF', '#F5A623', '#52C41A', '#722ED1', '#EB2F96', '#13C2C2', '#FA8C16', '#2F54EB'];

  /* 卖家端浏览过的「求购」信息（子集，模拟过往浏览） */
  var HISTORY_QIUGOU = [
    { flag: '🇰🇪', leaf: 'fanbu', img: 'canvas', zh: { title: '帆布鞋出口订单', cat: '帆布鞋', desc: '东非市场，需环保印染工艺，可接长期框架协议。', region: '肯尼亚', qty: '50,000 双', time: '8-17' }, en: { title: 'Canvas Shoes Export Order', cat: 'Canvas Shoes', desc: 'East African market; eco-friendly dyeing required; long-term framework agreements accepted.', region: 'Kenya', qty: '50,000 prs', time: '8-17' } },
    { flag: '🇪🇹', leaf: 'dengshan', img: 'hiking', zh: { title: '登山徒步鞋', cat: '登山鞋', desc: '防滑大底，Vibram 同级，要求提供耐磨测试数据。', region: '埃塞俄比亚', qty: '8,000 双', time: '8-15' }, en: { title: 'Hiking Trekking Shoes', cat: 'Hiking Shoes', desc: 'Anti-slip outsole, Vibram-equivalent; wear-test data required.', region: 'Ethiopia', qty: '8,000 prs', time: '8-15' } },
    { flag: '🇲🇦', leaf: 'tuoxie', img: 'sandals', zh: { title: '拖鞋凉鞋夏季款', cat: '拖鞋', desc: '轻量化 EVA，反倾销合规，支持多色混批。', region: '摩洛哥', qty: '120,000 双', time: '8-12' }, en: { title: 'Slippers & Sandals Summer', cat: 'Slippers', desc: 'Lightweight EVA, anti-dumping compliant; mixed-color batches supported.', region: 'Morocco', qty: '120,000 prs', time: '8-12' } },
    { flag: '🇬🇭', leaf: 'balei', img: 'ballet', zh: { title: '芭蕾舞练功鞋', cat: '芭蕾鞋', desc: '弹性面料，支持定制 LOGO 与尺码表。', region: '加纳', qty: '3,000 双', time: '8-10' }, en: { title: 'Ballet Training Shoes', cat: 'Ballet Shoes', desc: 'Stretch fabric; custom LOGO and size chart supported.', region: 'Ghana', qty: '3,000 prs', time: '8-10' } },
    { flag: '🇨🇲', leaf: 'train', img: 'sneakers', zh: { title: '运动休闲鞋', cat: '训练鞋', desc: '欧美电商渠道，EVA 中底，支持小单快反。', region: '喀麦隆', qty: '35,000 双', time: '8-13' }, en: { title: 'Casual Sneakers', cat: 'Training Shoes', desc: 'EU/US e-commerce channels; EVA midsole; small-batch fast replenishment.', region: 'Cameroon', qty: '35,000 prs', time: '8-13' } },
    { flag: '🇱🇾', leaf: 'gongzhuang', img: 'boots', zh: { title: '油田劳保工装靴', cat: '工装靴', desc: '钢头防砸防穿刺，符合出口认证。', region: '利比亚', qty: '12,000 双', time: '8-05' }, en: { title: 'Oilfield Work Boots', cat: 'Work Boots', desc: 'Steel toe, impact & puncture resistant; export-certified.', region: 'Libya', qty: '12,000 prs', time: '8-05' } },
    { flag: '🇹🇳', leaf: 'liangxie', img: 'sandals', zh: { title: '地中海风凉鞋', cat: '凉鞋', desc: '轻量化 EVA，多色混批，适合旅游零售。', region: '突尼斯', qty: '40,000 双', time: '刚刚' }, en: { title: 'Mediterranean Sandals', cat: 'Sandals', desc: 'Lightweight EVA, mixed-color batches; ideal for travel retail.', region: 'Tunisia', qty: '40,000 prs', time: 'Just now' } },
    { flag: '🇳🇦', leaf: 'tubu', img: 'sneakers', zh: { title: '沙漠徒步运动鞋', cat: '徒步鞋', desc: '沙漠地区适用，透气耐磨。', region: '纳米比亚', qty: '25,000 双', time: '刚刚' }, en: { title: 'Desert Trail Sneakers', cat: 'Trekking Shoes', desc: 'Suited to desert regions; breathable and wear-resistant.', region: 'Namibia', qty: '25,000 prs', time: 'Just now' } }
  ];

  /* 浏览过的「供应」信息（卖家端/买家端共用该子集） */
  var HISTORY_GONGYING = [
    { initial: '深', initialEn: 'S', color: 0, time: '刚刚', leaf: 'zidong', imgs: ['sneakers', 'suitcase', 'belt', 'canvas', 'hiking', 'sandals', 'boots', 'ballet', 'ski'], price: { min: '18.5' }, moq: '500 条', zh: { name: '深圳优品供应链', content: '【工厂直供】头层牛皮自动扣皮带，支持来图定制，48 小时出样。常年稳定供货欧美商超，可贴牌可中性包装，欢迎询盘拿样。' }, en: { name: 'Shenzhen Premium Supply Chain', content: '[Factory-direct] Top-grain leather automatic-buckle belts; custom designs from artwork; samples in 48h. Stable EU/US supermarket supply; OEM and neutral packaging; inquiries & samples welcome.' } },
    { initial: '温', initialEn: 'W', color: 1, time: '10分钟前', leaf: 'train', imgs: ['sneakers', 'canvas', 'hiking', 'boots', 'ballet', 'sandals'], price: { min: '45', max: '68' }, moq: '1000 双', zh: { name: '温州鞋业联盟', content: '跑步鞋、训练鞋现货供应，EVA 中底 + 透气网面，月产能 30 万双，支持小单快反与一件代发，交期稳定。' }, en: { name: 'Wenzhou Footwear Alliance', content: 'Ready-stock sneakers & training shoes; EVA midsole + breathable mesh; 300k pairs/month; small-batch fast replenishment and drop-shipping; stable lead time.' } },
    { initial: '广', initialEn: 'G', color: 2, time: '1小时前', leaf: 'yingke', imgs: ['suitcase', 'belt', 'canvas', 'boots'], price: { min: '86' }, moq: '300 件', zh: { name: '广州箱包工贸', content: 'ABS + PC 硬壳拉杆箱，静音万向轮，20/24/28 寸齐全，出口品质，可定制 Logo 与颜色，支持 OEM/ODM。' }, en: { name: 'Guangzhou Bags & Luggage', content: 'ABS + PC hard-shell luggage; silent spinner wheels; 20/24/28 inch; export quality; custom LOGO & color; OEM/ODM supported.' } },
    { initial: '义', initialEn: 'Y', color: 3, time: '3小时前', leaf: 'fanbu', imgs: ['canvas', 'sneakers', 'sandals', 'boots', 'ballet', 'hiking', 'belt', 'suitcase', 'ski'], price: { start: true, min: '22' }, moq: '2000 双', zh: { name: '义乌小商品集采', content: '帆布鞋、板鞋多款式常年供货，环保印染，支持混批，适合非洲及中东渠道，价格优势明显。' }, en: { name: 'Yiwu Small-goods Sourcing', content: 'Canvas & board shoes in many styles, year-round; eco-friendly dyeing; mixed batches; ideal for Africa & Middle East; strong price advantage.' } },
    { initial: '青', initialEn: 'Q', color: 6, time: '3天前', leaf: 'dengshan', imgs: ['hiking', 'boots', 'sneakers', 'canvas', 'sandals', 'ski'], price: { min: '92' }, moq: '500 双', zh: { name: '青岛户外用品', content: '登山鞋、徒步鞋防滑大底，Vibram 同级，提供耐磨测试报告，长期合作优先，支持贴牌。' }, en: { name: 'Qingdao Outdoor Goods', content: 'Hiking & trekking shoes with anti-slip outsole, Vibram-equivalent; wear-test reports; priority for long-term partners; OEM supported.' } },
    { initial: '东', initialEn: 'D', color: 7, time: '刚刚', leaf: 'tshirt', imgs: ['sneakers', 'suitcase', 'belt', 'canvas', 'hiking', 'sandals', 'boots', 'ballet', 'ski'], price: { start: true, min: '9.8' }, moq: '5000 件', zh: { name: '东莞服饰供应链', content: 'T 恤、衬衫基础款常年供货，精梳棉，支持印花绣花，快速打样，适合电商铺货与跨境分销。' }, en: { name: 'Dongguan Apparel Supply Chain', content: 'Basic T-shirts & shirts, year-round; combed cotton; printing & embroidery; fast sampling; ideal for e-commerce & cross-border.' } }
  ];

  /* 价格 / 起订量 双语格式化 */
  function priceHtml(d) {
    if (!d.price) return '<span class="trade-price trade-mianyi">' + (isEN() ? 'Negotiable' : '价格面议') + '</span>';
    var val = '¥' + d.price.min + (isEN() ? '' : '元');
    if (d.price.max) val += '-' + d.price.max + (isEN() ? '' : '元');
    if (d.price.start) val += isEN() ? ' MOQ' : '/起';
    var label = isEN() ? '' : '<span class="trade-label">价格</span>';
    return label + '<span class="trade-price">' + val + '</span>';
  }
  var MOQ_UNIT = { '双': 'prs', '件': 'pcs', '条': 'pcs', '套': 'sets' };
  function moqHtml(d) {
    if (isEN()) {
      var m = d.moq.match(/([\d,]+)\s*([双件条套])/);
      var u = m ? (MOQ_UNIT[m[2]] || 'pcs') : 'pcs';
      var num = m ? m[1] : d.moq;
      return 'MOQ ' + num + ' ' + u;
    }
    return '起订 ' + d.moq;
  }

  /* 求购卡片（点击进求购详情） */
  function qiugouCard(d) {
    var el = document.createElement('div');
    el.className = 'wf-card';
    el.dataset.leaf = d.leaf;
    el.style.cursor = 'pointer';
    el.onclick = function () { location.href = 'b2_inquiry_detail.html?id=WF_HIST_' + d.leaf; };
    var t = TL(d);
    el.innerHTML =
      '<div class="thumb"><img src="img/' + d.img + '.jpg" alt="' + t.cat + '"></div>' +
      '<div class="body">' +
      '<div class="card-head"><h4>' + t.title + '</h4><div class="wf-time">' + t.time + '</div></div>' +
      '<span class="cat">' + t.cat + '</span>' +
      '<div class="desc">' + t.desc + '</div>' +
      '<div class="wf-meta"><div class="qty">' + (isEN() ? 'Qty: ' : '采购数量：') + t.qty + '</div><div class="region"><span class="flag">' + d.flag + '</span>' + t.region + '</div></div>' +
      '</div>';
    return el;
  }

  /* 供应卡片（点击进供应详情） */
  function supplyCard(d) {
    var el = document.createElement('div');
    el.className = 'supply-card';
    el.dataset.leaf = d.leaf;
    el.style.cursor = 'pointer';
    el.onclick = function () { location.href = 's2_supply_detail.html?id=SP_HIST_' + d.leaf; };
    var t = TL(d);
    var trade = '<div class="supply-trade"><div class="trade-left">' + priceHtml(d) + '</div><span class="trade-moq">' + moqHtml(d) + '</span></div>';
    var grid = '';
    if (d.imgs && d.imgs.length) {
      grid = '<div class="supply-grid">' + d.imgs.map(function (i) { return '<img src="img/' + i + '.jpg" alt="">'; }).join('') + '</div>';
    }
    el.innerHTML =
      '<div class="supply-head">' +
      '<div class="avatar" style="background:' + AV_COLORS[d.color % AV_COLORS.length] + '">' + (isEN() ? d.initialEn : d.initial) + '</div>' +
      '<div class="supply-info"><div class="supply-name">' + t.name + '</div><div class="supply-time">' + t.time + '</div></div>' +
      '</div>' +
      '<div class="supply-content">' + t.content + '</div>' +
      trade + grid;
    return el;
  }

  global.BrowseHistory = {
    QIUGOU: HISTORY_QIUGOU,
    GONGYING: HISTORY_GONGYING,
    qiugouCard: qiugouCard,
    supplyCard: supplyCard
  };
})(window);
