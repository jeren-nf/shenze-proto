/* ============================================================
 * 共享国际化（i18n）引擎
 * - 买家端页面（b2_ 与 b_ 前缀）默认英文，卖家端页面（s2_）默认中文
 * - 运行时按「中文原文」为 key 替换文案；未在词典中的中文保持不变
 * - 切换语言后整体重跑 applyI18n 即可
 * ============================================================ */
(function () {
  'use strict';

  // ===== 中英词典（zh 原文 -> en） =====
  // 仅收录 UI 文案（标签 / 按钮 / 标题 / 状态 / 提示）。数据类（公司名、商品名）不收录。
  var DICT = {
    '关注微信': 'Follow Us on WeChat',
    '关注微信，更快接收商机信息': 'Follow our WeChat for faster business updates',
    '客户服务': 'Customer Service',
    '关闭': 'Close',
    '我的': 'My',
    '我的主页': 'My Homepage',
    '我的供应': 'My Supplies',
    '我的商机': 'My Business',
    '我的询价': 'My Inquiries',
    '我的运单': 'My Shipments',
    '商机': 'Business',
    '商机 · 卖家端': 'Business · Seller',
    '供应': 'Supply',
    '求购': 'Inquiry',
    '供应详情': 'Supply Details',
    '求购详情': 'Inquiry Details',
    '全部供应': 'All Supplies',
    '全部求购': 'All Inquiries',
    '热门供应': 'Hot Supplies',
    '热门求购': 'Hot Inquiries',
    '更多 ›': 'More ›',
    '搜供应 / 找货源': 'Search Supply / Find Sources',
    '搜询盘 / 找买家': 'Search Inquiry / Find Buyers',
    '发供应': 'Post Supply',
    '发询价': 'Send Inquiry',
    '发布': 'Publish',
    '发布成功': 'Published',
    '提交': 'Submit',
    '提交成功': 'Submitted',
    '提交认证': 'Submit Verification',
    '提交运单': 'Submit Waybill',
    '提交联系方式': 'Submit Contact',
    '保存': 'Save',
    '取消': 'Cancel',
    '完成': 'Done',
    '查看我的供应': 'View My Supplies',
    '查看我的发运单': 'View My Shipments',
    '查看我的询价': 'View My Inquiries',
    '查看详情': 'View Details',
    '感兴趣的': 'Interested',
    '我收藏的': 'Favorited',
    '浏览记录': 'Browse History',
    '商家认证': 'Business Verification',
    '微信授权登录': 'WeChat Login',
    '登录 · 申泽跨境贸易': 'Login · Shenze Cross-border Trade',
    '公司名称': 'Company Name',
    '法定代表人': 'Legal Representative',
    '注册资本': 'Registered Capital',
    '工商信息由系统自动核验并关联，仅供后台审核参考，您只需确认公司名称填写正确即可。': 'Business info is auto-verified and linked for backend review; please ensure your company name is correct.',
    '上传营业执照': 'Upload Business License',
    '商品品类': 'Product Category',
    '供应标题': 'Supply Title',
    '求购标题': 'Inquiry Title',
    '价格': 'Price',
    '价格面议': 'Negotiable',
    '起订': 'MOQ',
    '求购数量': 'Inquiry Qty',
    '描述': 'Description',
    '品类筛选': 'Category',
    '图片': 'Images',
    '备注': 'Remarks',
    '付款方式': 'Payment Method',
    '代收货款（元）': 'COD Amount (CNY)',
    '件数 / 包装': 'Packages / Packaging',
    '体积（m³）': 'Volume (m³)',
    '发货人': 'Shipper',
    '发货信息': 'Shipping Info',
    '发货地': 'Ship From',
    '发货方式': 'Shipping Method',
    '收货人': 'Consignee',
    '收货信息': 'Receiving Info',
    '物流下单': 'Create Shipment',
    '出海物流': 'Overseas Logistics',
    '上门接货': 'Door-to-door Pickup',
    '到付': 'Collect',
    '数智测品': 'Smart Product Check',
    '外贸结汇': 'Forex Settlement',
    '地址管理': 'Address Management',
    '新增地址': 'Add Address',
    '已选 0 项': '0 selected',
    '下单': 'Place Order',
    '下拉刷新': 'Pull down to refresh',
    '上拉加载更多': 'Pull up to load more',
    '下单成功': 'Order Placed',
    '再来一单': 'Order Again',
    '此为参考价，实际费用以物流商确认为准': 'Reference price only; final cost confirmed by the logistics provider.',
    '平台服务人员将双向对接供求双方': 'Our staff will connect supply and demand parties.',
    '您的供应信息已发布，审核通过后将展示在供应列表中': 'Your supply is published and will appear in the list after approval.',
    '您的求购信息已发布，审核通过后将推送给匹配的供应商': 'Your inquiry is published and will be pushed to matched suppliers after approval.',
    '标定价': 'Set Price',
    '区间': 'Range',
    '刚刚': 'Just now',
    '代理价': 'Agent Price',
    // 品类
    '服装': 'Apparel',
    '男鞋': "Men's Shoes",
    '女鞋': "Women's Shoes",
    '凉鞋': 'Sandals',
    '拖鞋': 'Slippers',
    '运动鞋': 'Sneakers',
    '帆布鞋': 'Canvas Shoes',
    '工装安全鞋': 'Safety Work Boots',
    '户外登山鞋': 'Hiking Shoes',
    '滑雪靴配件': 'Ski Boot Accessories',
    '商务拉杆箱': 'Business Luggage',
    '旅行箱': 'Suitcase',
    '头层牛皮皮带': 'Top-grain Leather Belt',
    '劳保鞋': 'Safety Shoes',
    '登山徒步鞋': 'Trekking Shoes',
    '沙漠徒步运动鞋': 'Desert Trail Sneakers',
    '头层牛皮自动扣皮带': 'Automatic Buckle Leather Belt',
    '地中海风凉 鞋': 'Mediterranean Sandals',
    '日常防滑拖鞋': 'Daily Anti-slip Slippers',
    '户外鞋': 'Outdoor Shoes',
    '皮具配饰': 'Leather & Accessories',
    // 国家 / 地区筛选
    '乌干达': 'Uganda',
    '尼日利亚': 'Nigeria',
    '南非': 'South Africa',
    '埃及': 'Egypt',
    '加纳': 'Ghana',
    '坦桑尼亚': 'Tanzania',
    '埃塞俄比亚': 'Ethiopia',
    '摩洛哥': 'Morocco',
    '安哥拉': 'Angola',
    '刚果（金）': 'DR Congo',
    '利比亚': 'Libya',
    '喀麦隆': 'Cameroon',
    '塞内加尔': 'Senegal',
    '卢旺达': 'Rwanda',
    '博茨瓦纳': 'Botswana',
    '加蓬': 'Gabon',
    '津巴布韦': 'Zimbabwe',
    '科特迪瓦': 'Côte d’Ivoire',
    '突尼斯': 'Tunisia',
    '肯尼亚': 'Kenya',
    '莫桑比克': 'Mozambique',
    '赞比亚': 'Zambia',
    '纳米比亚': 'Namibia',
    '经营品类': 'Business Categories',
    '请选择经营品类（可多选）': 'Select business categories (multiple)',
    '请选择目的地国家': 'Select destination country',
    '请选择发货城市': 'Select origin city',
    '请选择商品品类': 'Select product category',
    '联系人姓名': 'Contact Name',
    '联系电话': 'Contact Phone',
    '详细地址': 'Detailed Address',
    '统一社会信用代码': 'Unified Social Credit Code',
    '营业执照': 'Business License',
    '补充说明（选填）': 'Remarks (optional)',
    '设为默认地址': 'Set as default',
    '目的地': 'Destination',
    '货物信息': 'Cargo Info',
    '订单信息': 'Order Info',
    '销售地区': 'Sales Region',
    '货源': 'Sources',
    '货源 · 买家端': 'Sources · Buyer',
    '物流服务': 'Logistics Service',
    '认证': 'Verify',
    '认证后解锁商机，快人一步对接海外采购商': 'Verify to unlock business opportunities and connect with overseas buyers sooner.',
    '跨境学堂': 'Cross-border Academy',
    '跨境贸易服务平台': 'Cross-border Trade Service Platform',
    '申泽优品.精选奥莱': 'Shenze Premium · Outlet Picks',
    '返回首页': 'Back to Home',
    '退出登录': 'Log Out',
    '童鞋': "Kids' Shoes",
    '皮鞋': 'Leather Shoes',
    '箱包': 'Bags & Luggage',
    '配件': 'Accessories',
    '纺织品': 'Textiles',
    '舞蹈练功鞋': 'Dance Training Shoes',
    '舞蹈鞋': 'Dance Shoes',
    '芭蕾舞练功鞋': 'Ballet Training Shoes',
    '男士正装皮带': "Men's Dress Belt",
    '矿区分销皮带': 'Mining-district Belt',
    '语言': 'Language',
    '物流服务人员将与您电话沟通，确认具体需求并安排上门取货。如有疑问，请联系客服电话：': 'Our logistics staff will call to confirm details and arrange pickup. For questions, contact customer service:',
    '运营人员将联系您确认需求': 'Our operator will contact you to confirm your request.',
    '长按识别二维码关注服务号': 'Long-press to scan the QR code and follow our official account.',
    '鞋': 'Shoes',
    '面议': 'Negotiable',
    '确认': 'Confirm',
    '选填': 'Optional',
    '品名': 'Item Name',
    '发运信息': 'Shipping Info',
    '附加信息': 'Additional Info',
    '重量（kg）': 'Weight (kg)',
    '运动休闲鞋': 'Casual Sneakers',
    '雪靴': 'Snow Boots',
    '雨季防滑凉鞋': 'Rainy-season Anti-slip Sandals',
    '阿尔及利亚': 'Algeria'
  };
  // 占位符词典（复用同一张表，键为占位符原文）
  var PH_DICT = {
    '请输入供应标题': 'Enter supply title',
    '请输入求购标题': 'Enter inquiry title',
    '请输入描述': 'Enter description',
    '请选择国家 / 地区': 'Select country / region',
    '请输入详细地址': 'Enter detailed address',
    '请输入联系人': 'Enter contact name',
    '请输入联系电话': 'Enter phone number'
  };

  function curLang() {
    try {
      var saved = localStorage.getItem('app_lang');
      if (saved === 'zh-CN' || saved === 'en') return saved;
    } catch (e) {}
    // 默认：买家端（b2_ / b_）英文；卖家端（s2_）中文；其余页面保持中文
    var f = location.pathname.split('/').pop() || '';
    if (f.indexOf('s2_') === 0) return 'zh-CN';
    if (f.indexOf('b2_') === 0 || f.indexOf('b_') === 0) return 'en';
    return 'zh-CN';
  }

  function applyI18n(root) {
    root = root || document;
    var lang = curLang();
    var walker = document.createTreeWalker(
      root.nodeType === 9 ? root.body : root,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    var node;
    while ((node = walker.nextNode())) {
      var p = node.parentNode;
      if (!p) continue;
      var tag = p.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA') continue;
      if (p.getAttribute && p.getAttribute('contenteditable') === 'true') continue;
      var raw = node.nodeValue;
      var key = raw.trim();
      if (!key) continue;
      // 首次见到才记录原文（中文），切换语言时才能复原
      if (node.__zh_raw === undefined) node.__zh_raw = raw;
      var orig = node.__zh_raw.trim();
      if (lang === 'en') {
        if (DICT.hasOwnProperty(orig) && raw.indexOf(orig) !== -1) {
          node.nodeValue = raw.replace(orig, DICT[orig]);
        }
      } else {
        // 中文：若当前已被英文化则还原原文
        if (raw.trim() !== orig && raw.indexOf(raw.trim()) !== -1) {
          node.nodeValue = raw.replace(raw.trim(), orig);
        }
      }
    }
    // 占位符
    var els = root.querySelectorAll ? root.querySelectorAll('[placeholder]') : [];
    for (var i = 0; i < els.length; i++) {
      var ph = els[i].getAttribute('placeholder');
      if (!ph) continue;
      if (els[i].__zh_ph === undefined) els[i].__zh_ph = ph;
      var origPh = els[i].__zh_ph;
      if (lang === 'en' && PH_DICT.hasOwnProperty(origPh)) {
        els[i].setAttribute('placeholder', PH_DICT[origPh]);
      } else if (lang !== 'en') {
        els[i].setAttribute('placeholder', origPh);
      }
    }
  }

  // 切换语言
  function setLang(code) {
    try { localStorage.setItem('app_lang', code); } catch (e) {}
    applyI18n(document);
    // 同步菜单勾选
    document.querySelectorAll('.lang-row').forEach(function (r) {
      r.classList.toggle('on', r.getAttribute('data-lc') === code);
    });
  }

  // 自动运行
  function init() {
    applyI18n(document);
    // 动态渲染（列表卡片等）也要翻译
    if (window.MutationObserver) {
      var obs = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var m = mutations[i];
          if (m.type === 'childList') {
            for (var j = 0; j < m.addedNodes.length; j++) {
              var n = m.addedNodes[j];
              if (n.nodeType === 1) applyI18n(n);
            }
          }
        }
      });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.I18N = { applyI18n: applyI18n, setLang: setLang, curLang: curLang, t: function (k) {
    return (curLang() === 'en' && DICT.hasOwnProperty(k)) ? DICT[k] : k;
  } };
})();
