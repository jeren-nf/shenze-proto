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
    '首页': 'Home',
    '货源': 'Sources',
    '消息': 'Messages',
    '发布供应': 'Post Supply',
    '发布求购': 'Post Inquiry',
    '我的收藏': 'My Favorites',
    '取消收藏': 'Cancel Favorite',
    '立即对接': 'Contact Now',
    '立即询价': 'Send Inquiry',
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
    '跨境小学堂列表': 'Cross-border Mini Academy · List',
    '跨境小学堂详情': 'Cross-border Mini Academy · Detail',
    '跨境小学堂': 'Cross-border Mini Academy',
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
    '阿尔及利亚': 'Algeria',
    // ===== 动态 toast / 校验 / 状态文案 =====
    '功能开发中': 'Under development',
    '已认证': 'Verified',
    '未认证': 'Unverified',
    '已删除': 'Deleted',
    '已取消收藏': 'Unfavorited',
    '收藏成功': 'Favorited',
    '请至少填写一项联系方式': 'Enter at least one contact method',
    '提交成功，平台将尽快为您对接': 'Submitted. We will match you soon.',
    '请选择品类': 'Select a category',
    '请填写供应标题': 'Enter supply title',
    '请选择商品品类': 'Select product category',
    '发布成功': 'Published',
    '邮箱已复制': 'Email copied',
    '未复制：': 'Not copied: ',
    '已识别名片，已自动填入公司名称': 'Card recognized; company name auto-filled',
    '请先填写公司名称': 'Enter company name first',
    '请至少选择一个经营品类': 'Select at least one business category',
    '认证提交成功，审核中…': 'Verification submitted; under review…',
    '切换其它号码': 'Use another number',
    '请填写求购标题': 'Enter inquiry title',
    '请填写求购数量': 'Enter inquiry quantity',
    '请填写销售地区': 'Enter sales region',
    '暂无保存的地址，请先去地址管理添加': 'No saved address; add one in Address Management',
    '请选择发货地': 'Select ship-from',
    '请选择目的地': 'Select destination',
    '请填写发货人': 'Enter shipper',
    '请填写正确的发货联系电话': 'Enter a valid shipper phone',
    '请填写发货详细地址': 'Enter shipper address',
    '请填写收货人': 'Enter consignee',
    '请填写正确的收货联系电话': 'Enter a valid consignee phone',
    '请填写收货详细地址': 'Enter consignee address',
    '请填写品名': 'Enter item name',
    '请填写件数 / 包装': 'Enter packages / packaging',
    '请填写预估重量': 'Enter estimated weight',
    '运单提交成功': 'Waybill submitted',
    '请填写联系人姓名': 'Enter contact name',
    '请填写正确的 11 位手机号': 'Enter a valid 11-digit phone number',
    '请填写详细地址': 'Enter detailed address',
    // 拼接型 toast（变量插值）
    '您已在': 'You submitted on ',
    '已提交感兴趣的意向，请勿重复提交': 'your interested intent; no duplicate submission',
    '确定删除': 'Confirm delete ',
    '的地址吗？': ' this address?',
    // ===== 页面级 UI 文案（买家端残留补全） =====
    '询价详情': 'Inquiry Details',
    '感兴趣': 'Interested',
    '暂无图片': 'No image',
    '发布时间：': 'Post time: ',
    '发布时间': 'Post Time',
    '联系方式（脱敏）：': 'Contact (masked): ',
    '手机': 'Phone',
    '微信用户': 'WeChat User',
    '已切换为简体中文': 'Switched to Simplified Chinese',
    '简体中文': 'Chinese',
    '「我的主页」功能开发中': 'My Homepage is under development',
    '「浏览记录」功能开发中': 'Browse History is under development',
    '暂无收藏的供应信息': 'No favorited supply info',
    '暂无感兴趣的供应信息': 'No interested supply info',
    '暂无询价信息，去发布': 'No inquiries yet. Post one',
    '去发布': 'Post',
    '审核不通过': 'Rejected',
    '重新编辑': 'Edit',
    '删除': 'Delete',
    '未找到匹配品类': 'No matching category',
    '编辑询价': 'Edit Inquiry',
    '添加图片（最多9张）': 'Add images (up to 9)',
    '标题': 'Title',
    '品类': 'Category',
    '数量': 'Qty',
    '未获取到发布信息': 'No publish info found',
    '9月专属，全城最底价': 'September Exclusive · Lowest Prices in Town',
    '返回': 'Back',
    '搜索货源关键词': 'Search supplies',
    '释放刷新': 'Release to refresh',
    '刷新中…': 'Refreshing…',
    '（刷新）': '(refresh)',
    '刷新成功 ✓': 'Refresh success ✓',
    '加载中…': 'Loading…',
    // 登录区（买家端「我的」注入）
    '登录': 'Log In',
    '头像': 'Avatar',
    // ===== 卖家端全量英文补全（demo 数据 + UI chrome + 品类树 + 城市/国家）=====
    // —— 占位符/搜索 ——
    '搜索求购 / 供应关键词': 'Search inquiry / supply keywords',
    '省 / 市 / 区 + 详细街道门牌': 'Province / City / District + detailed street address',
    '请输入发货人姓名': 'Enter shipper name',
    '请输入收货人姓名': 'Enter consignee name',
    '国家 / 城市 + 详细地址': 'Country / City + detailed address',
    '如：运动鞋 / 箱包': 'e.g. Sneakers / Bags',
    '如：30000 双 / 50 箱': 'e.g. 30000 pairs / 50 boxes',
    '预估重量': 'Est. weight',
    '预估体积': 'Est. volume',
    '如需特殊包装、时效要求等请备注': 'Notes for special packaging, lead time, etc.',
    '搜索': 'Search',
    '无匹配结果': 'No matching results',
    '选择发货城市': 'Select origin city',
    '选择目的地国家': 'Select destination country',
    '自送上门': 'Self-delivery to depot',
    '预付': 'Prepaid',
    '选择地址': 'Select Address',
    '预估运费区间：¥': 'Est. Freight Range: ¥',
    '待揽收': 'Awaiting Pickup',
    // —— 地址 ——
    '默认': 'Default',
    '张伟': 'Zhang Wei',
    '广东省广州市番禺区南村镇兴业大道西 18 号跨境物流园 B 栋 3 层': 'Bldg B, 3F, Cross-border Logistics Park, 18 Xingye Ave W, Nancun Town, Panyu Dist, Guangzhou, Guangdong',
    '李娜': 'Li Na',
    '浙江省义乌市福田街道国际商贸城五区 92 号门 4 楼 318 室': 'Rm 318, 4F, Gate 92, Zone 5, Int’l Trade City, Futian St, Yiwu, Zhejiang',
    '王强': 'Wang Qiang',
    '福建省泉州市晋江市陈埭镇鞋都路 88 号电商大厦 1207': 'Rm 1207, E-commerce Bldg, 88 Xiedu Rd, Chendai Town, Jinjiang, Quanzhou, Fujian',
    '陈晓': 'Chen Xiao',
    '上海市青浦区华新镇华腾路 1288 号智慧物流中心 7 号仓': 'Whse 7, Smart Logistics Center, 1288 Huateng Rd, Huaxin Town, Qingpu Dist, Shanghai',
    '暂无地址，点击右上角添加': 'No address yet. Tap + at top-right to add.',
    '编辑地址': 'Edit Address',
    '新增地址': 'Add Address',
    '确定删除「': 'Confirm delete "',
    '」的地址吗？': '" this address?',
    // —— 收藏/感兴趣 数据 ——
    '2026新款跑步鞋批发': '2026 New Running Shoes Wholesale',
    '鞋类 > 运动鞋 > 跑步鞋': 'Footwear > Sneakers > Running Shoes',
    '商务正装皮鞋 OEM': "Men's Dress Leather Shoes OEM",
    '鞋类 > 皮鞋 > 正装皮鞋': 'Footwear > Leather Shoes > Dress Leather Shoes',
    '¥120/起（200起订）': '¥120/from (MOQ 200)',
    '纯棉圆领T恤 多色': '100% Cotton Crew-neck T-Shirt, Multi-color',
    '服装 > 男装 > T恤': "Apparel > Men's > T-Shirt",
    '急需500双跑步鞋 尼日利亚': 'Urgent: 500 pairs running shoes, Nigeria',
    '500 双': '500 pairs',
    '采购男士纯棉T恤 1万件': "Men's 100% Cotton T-Shirt, 10,000 pcs",
    '10000 件': '10,000 pcs',
    '求购商务双肩包 2000个': 'Sourcing Business Backpack, 2,000 pcs',
    '箱包 > 双肩包 > 商务双肩包': 'Bags & Luggage > Backpacks > Business Backpack',
    '2000 个': '2,000 pcs',
    '暂无收藏的求购信息': 'No favorited inquiry info',
    '求购数量：': 'Inquiry Qty: ',
    '销售地区：': 'Sales Region: ',
    '暂无感兴趣的求购信息': 'No interested inquiry info',
    // —— 首页(hot) 数据 ——
    '鞋贸汇': 'Xie Mao Hui',
    '透气网面运动鞋，适合南非及非洲电商渠道。': 'Breathable mesh sneakers, ideal for South Africa and African e-commerce channels.',
    '30,000 双': '30,000 pairs',
    '硬壳 ABS+PC 旅行箱，静音万向轮，销往西非。': 'Hard-shell ABS+PC suitcase with silent caster wheels, exported to West Africa.',
    '8,000 件': '8,000 pcs',
    '皮具配饰': 'Leather & Accessories',
    '头层牛皮自动扣皮带，支持礼盒包装。': 'Top-grain leather automatic buckle belt, gift box packaging available.',
    '15,000 条': '15,000 pcs',
    '地中海风凉鞋': 'Mediterranean Sandals',
    '轻量化 EVA，多色混批，适合旅游零售。': 'Lightweight EVA, mixed-color batches, ideal for travel retail.',
    '40,000 双': '40,000 pairs',
    '采购Qty：': 'Inquiry Qty: ',
    '沙漠徒步运动鞋': 'Desert Trail Sneakers',
    '防沙透气，适合户外探险渠道。': 'Sand-proof and breathable, ideal for outdoor adventure channels.',
    '25,000 双': '25,000 pairs',
    '帆布鞋出口订单': 'Canvas Shoes Export Order',
    '东非市场，需环保印染工艺，可接长期框架协议。': 'East African market; eco-friendly dyeing required; long-term framework agreements accepted.',
    '50,000 双': '50,000 pairs',
    '劳保鞋': 'Safety Shoes',
    '钢头防砸，符合 CE EN20345，可贴牌生产。': 'Steel-toe anti-impact, CE EN20345 compliant, OEM production available.',
    '15,000 双': '15,000 pairs',
    '基建项目工装靴': 'Infrastructure Work Boots',
    '钢头防砸，可贴牌生产，月产能稳定。': 'Steel-toe anti-impact, OEM available, stable monthly capacity.',
    '14,000 双': '14,000 pairs',
    '户外鞋': 'Outdoor Shoes',
    '防滑大底，Vibram 同级，要求提供耐磨测试数据。': 'Anti-slip outsole, Vibram-equivalent, wear-test data required.',
    '8,000 双': '8,000 pairs',
    '校园帆布鞋': 'Campus Canvas Shoes',
    '团购订单，环保印染，可接长期框架。': 'Group-buy orders, eco-friendly dyeing, long-term frameworks accepted.',
    '55,000 双': '55,000 pairs',
    '雪靴': 'Snow Boots',
    '寻找注塑厂商，长期合作，月产能稳定。': 'Seeking injection-molding partners, long-term cooperation, stable capacity.',
    '10,000 套': '10,000 sets',
    '头层牛皮皮带': 'Top-grain Leather Belt',
    '自动扣，支持礼盒包装与贴牌。': 'Automatic buckle, gift box and OEM available.',
    '20,000 条': '20,000 pcs',
    '运动休闲鞋': 'Casual Sneakers',
    '中非电商热销款，透气网面，可混码。': 'Best-seller in Central African e-commerce; breathable mesh; mixed sizes available.',
    '35,000 双': '35,000 pairs',
    '拖鞋凉鞋夏季款': 'Slippers & Sandals Summer Edition',
    '轻量化 EVA，反倾销合规，支持多色混批。': 'Lightweight EVA, anti-dumping compliant, mixed-color batches.',
    '120,000 双': '120,000 pairs',
    '舞蹈练功鞋': 'Dance Training Shoes',
    '舞蹈鞋': 'Dance Shoes',
    '弹性面料，支持定制尺码表与 LOGO。': 'Stretchy fabric, custom size charts and LOGO available.',
    '4,000 双': '4,000 pairs',
    '日常防滑拖鞋': 'Daily Anti-slip Slippers',
    '西非日常款，多色混批，支持小单试单。': 'West African daily style, mixed colors, small trial orders accepted.',
    '90,000 双': '90,000 pairs',
    '3,000 双': '3,000 pairs',
    '帆布鞋校园采购': 'Canvas Shoes Campus Procurement',
    '北非连锁渠道，支持贴牌与尺码定制。': 'North African chain channels, OEM and size customization available.',
    '60,000 双': '60,000 pairs',
    '高原徒步鞋': 'Highland Trekking Shoes',
    '防水透气，寻找长期合作框架厂商。': 'Waterproof and breathable; seeking long-term framework partners.',
    '7,500 双': '7,500 pairs',
    '商务拉杆箱': 'Business Luggage',
    '静音万向轮，可定制 LOGO 与内衬。': 'Silent caster wheels, customizable LOGO and lining.',
    '6,000 件': '6,000 pcs',
    '户外登山鞋': 'Hiking Shoes',
    '防滑大底，Vibram 同级，需耐磨测试数据。': 'Anti-slip outsole, Vibram-equivalent, wear-test data required.',
    '9,000 双': '9,000 pairs',
    '出口转口贸易，寻找稳定注塑厂商。': 'Export and re-export trade; seeking stable injection-molding partners.',
    '8,000 套': '8,000 sets',
    '油田劳保工装靴': 'Oilfield Work Boots',
    '钢头防砸防穿刺，符合出口认证。': 'Steel-toe anti-impact & puncture-proof, export-certified.',
    '12,000 双': '12,000 pairs',
    '雨季防滑凉鞋': 'Rainy-season Anti-slip Sandals',
    '深纹大底，轻量 EVA，支持多色混批。': 'Deep-tread outsole, lightweight EVA, mixed-color batches.',
    '70,000 双': '70,000 pairs',
    '矿区分销皮带': 'Mining-district Belt',
    '耐磨头层牛皮，支持小批量试单。': 'Wear-resistant top-grain leather, small-batch trial orders accepted.',
    '18,000 条': '18,000 pcs',
    // —— 首页 品类名(独立出现) ——
    '工装靴': 'Work Boots',
    '皮带': 'Belt',
    '拖鞋凉鞋': 'Slippers & Sandals',
    '芭蕾鞋': 'Ballet Shoes',
    '登山鞋': 'Hiking Shoes',
    '滑雪配件': 'Ski Accessories',
    '运动鞋': 'Sneakers',
    // —— 我的供应 ——
    '飞织鞋面，EVA中底，轻量透气。': 'Knit upper, EVA midsole, lightweight and breathable.',
    '头层牛皮，固特异工艺。': 'Top-grain leather, Goodyear welt construction.',
    '180g精梳棉，环保印染。': '180g combed cotton, eco-friendly dyeing.',
    '暂无供应信息，去发布': 'No supply info yet. Post one',
    // —— 供应详情 ——
    '鞋类': 'Footwear',
    '跑步鞋': 'Running Shoes',
    '采用飞织鞋面，EVA 中底，轻量透气。\n支持混色混码，起订量 300 双，7-15 天交货。': 'Knit upper, EVA midsole, lightweight and breathable.\nMixed colors/sizes, MOQ 300 pairs, 7-15 days delivery.',
    '头层牛皮，固特异工艺，支持定制 LOGO。': 'Top-grain leather, Goodyear welt, custom LOGO available.',
    '180g 精梳棉，32 支，环保印染，支持来样定制。': '180g combed cotton, 32s, eco-friendly dyeing, custom samples accepted.',
    // —— 供应表单 品类树 ——
    '家纺': 'Home Textiles',
    '跑步鞋': 'Running Shoes',
    '篮球鞋': 'Basketball Shoes',
    '休闲运动鞋': 'Casual Sneakers',
    '足球鞋': 'Soccer Shoes',
    '正装皮鞋': 'Dress Leather Shoes',
    '休闲皮鞋': 'Casual Leather Shoes',
    '乐福鞋': 'Loafers',
    '凉鞋/拖鞋': 'Sandals/Slippers',
    '沙滩凉鞋': 'Beach Sandals',
    '人字拖': 'Flip-flops',
    '洞洞鞋': 'Clogs',
    '靴子': 'Boots',
    '马丁靴': 'Martin Boots',
    '雪地靴': 'Snow Boots',
    '男装': "Men's",
    'T恤': 'T-Shirt',
    '衬衫': 'Shirt',
    '夹克': 'Jacket',
    '卫衣': 'Hoodie',
    '西服': 'Suit',
    '女装': "Women's",
    '连衣裙': 'Dress',
    '上衣': 'Top',
    '半身裙': 'Skirt',
    '风衣': 'Trench Coat',
    '童装': "Kids'",
    '童装T恤': "Kids' T-Shirt",
    '童装外套': "Kids' Coat",
    '双肩包': 'Backpacks',
    '商务双肩包': 'Business Backpack',
    '潮流双肩包': 'Trendy Backpack',
    '手提包': 'Handbag',
    '通勤托特包': 'Commuter Tote',
    '晚宴手包': 'Evening Clutch',
    '行李箱': 'Luggage',
    '登机箱': 'Carry-on',
    '托运箱': 'Check-in Luggage',
    '袜子': 'Socks',
    '运动袜': 'Sport Socks',
    '船袜': 'No-show Socks',
    '长筒袜': 'Crew Socks',
    '帽子': 'Hats',
    '棒球帽': 'Baseball Cap',
    '渔夫帽': 'Bucket Hat',
    '针织帽': 'Knit Hat',
    '腰带': 'Belts',
    '商务皮带': 'Business Belt',
    '休闲腰带': 'Casual Belt',
    '床品': 'Bedding',
    '四件套': '4-piece Set',
    '被芯': 'Duvet',
    '枕芯': 'Pillow',
    '毛巾': 'Towels',
    '面巾': 'Face Towel',
    '浴巾': 'Bath Towel',
    // —— 供应表单 UI ——
    '起': 'from',
    '买卖双方沟通后议价，Negotiable。': 'Price negotiated between buyer and seller. Negotiable.',
    '请输入供应标题（如：2026新款运动鞋批发）': 'Enter supply title (e.g. 2026 new sneakers wholesale)',
    '请详细描述您的供应信息（如：材质、尺寸、颜色、起订量等）': 'Describe your supply (material, size, color, MOQ, etc.)',
    '请输入具体价格（元）': 'Enter specific price (CNY)',
    '起订量（件/双）': 'MOQ (pcs/pairs)',
    '单价（元）': 'Unit price (CNY)',
    '最低价（元）': 'Min price (CNY)',
    '最高价（元）': 'Max price (CNY)',
    '添加图片（最多9张）': 'Add images (up to 9)',
    '/起（': '/from (',
    '起订）': ' MOQ)',
    '编辑供应': 'Edit Supply',
    // —— 验证 ——
    '📷 识别名片': '📷 Scan Business Card',
    '请补充其他认证材料说明（选填）': 'Add other certification notes (optional)',
    '陈志远': 'Chen Zhiyuan',
    '500 万人民币': '5 million RMB',
    '泉州鸿星鞋业有限公司': 'Quanzhou Hongxing Shoes Co., Ltd.',
    '已选 ': 'Selected ',
    ' 项': ' items',
    '请输入公司名称': 'Enter company name',
    // —— 运单 ——
    '广州': 'Guangzhou',
    '义乌': 'Yiwu',
    '温州': 'Wenzhou',
    '深圳': 'Shenzhen',
    '南非·约翰内斯堡': 'South Africa·Johannesburg',
    '尼日利亚·拉各斯': 'Nigeria·Lagos',
    '阿联酋·迪拜': 'UAE·Dubai',
    '印度·孟买': 'India·Mumbai',
    '埃及·开罗': 'Egypt·Cairo',
    '约翰内斯堡': 'Johannesburg',
    '拉各斯': 'Lagos',
    '迪拜': 'Dubai',
    '孟买': 'Mumbai',
    '开罗': 'Cairo',
    '运输中': 'In Transit',
    '已揽收': 'Picked Up',
    '已签收': 'Delivered',
    '暂无运单，去下单': 'No waybill yet. Place an order',
    '去下单': 'Place Order',
    '运输路线': 'Shipping Route',
    '件数/包装': 'Packages/Packaging',
    '下单时间': 'Order Time',
    '预估运费': 'Est. Freight',
    '件数': 'Packages',
    '重量': 'Weight',
    // —— 物流下单 中国城市 ——
    '北京': 'Beijing', '上海': 'Shanghai', '广州': 'Guangzhou', '深圳': 'Shenzhen',
    '义乌': 'Yiwu', '温州': 'Wenzhou', '宁波': 'Ningbo', '杭州': 'Hangzhou',
    '苏州': 'Suzhou', '佛山': 'Foshan', '东莞': 'Dongguan', '泉州': 'Quanzhou',
    '厦门': 'Xiamen', '青岛': 'Qingdao', '成都': 'Chengdu', '重庆': 'Chongqing',
    '武汉': 'Wuhan', '西安': "Xi'an", '郑州': 'Zhengzhou', '南京': 'Nanjing',
    '天津': 'Tianjin', '福州': 'Fuzhou', '无锡': 'Wuxi', '南通': 'Nantong',
    '绍兴': 'Shaoxing', '嘉兴': 'Jiaxing', '台州': 'Taizhou', '金华': 'Jinhua',
    '中山': 'Zhongshan', '惠州': 'Huizhou', '江门': 'Jiangmen', '汕头': 'Shantou',
    '揭阳': 'Jieyang', '保定': 'Baoding', '石家庄': 'Shijiazhuang', '沈阳': 'Shenyang',
    '大连': 'Dalian', '济南': 'Jinan', '烟台': 'Yantai', '潍坊': 'Weifang',
    '合肥': 'Hefei', '南昌': 'Nanchang', '长沙': 'Changsha', '昆明': 'Kunming',
    '贵阳': 'Guiyang', '南宁': 'Nanning', '海口': 'Haikou', '兰州': 'Lanzhou',
    '太原': 'Taiyuan', '哈尔滨': 'Harbin', '长春': 'Changchun', '常州': 'Changzhou',
    '扬州': 'Yangzhou', '镇江': 'Zhenjiang', '湖州': 'Huzhou', '丽水': 'Lishui',
    '衢州': 'Quzhou', '珠海': 'Zhuhai', '湛江': 'Zhanjiang', '茂名': 'Maoming',
    '肇庆': 'Zhaoqing', '清远': 'Qingyuan', '潮州': 'Chaozhou',
    // —— 物流下单 国家/地区 ——
    '非洲': 'Africa', '南非': 'South Africa', '尼日利亚': 'Nigeria', '埃及': 'Egypt',
    '肯尼亚': 'Kenya', '加纳': 'Ghana', '坦桑尼亚': 'Tanzania', '埃塞俄比亚': 'Ethiopia',
    '摩洛哥': 'Morocco', '阿尔及利亚': 'Algeria', '突尼斯': 'Tunisia', '乌干达': 'Uganda',
    '安哥拉': 'Angola', '刚果（金）': 'DR Congo', '喀麦隆': 'Cameroon',
    '科特迪瓦': 'Côte d’Ivoire', '赞比亚': 'Zambia', '卢旺达': 'Rwanda',
    '塞内加尔': 'Senegal', '博茨瓦纳': 'Botswana', '纳米比亚': 'Namibia',
    '马达加斯加': 'Madagascar', '莫桑比克': 'Mozambique', '加蓬': 'Gabon',
    '津巴布韦': 'Zimbabwe', '利比亚': 'Libya', '毛里求斯': 'Mauritius',
    '塞舌尔': 'Seychelles', '贝宁': 'Benin', '多哥': 'Togo', '马里': 'Mali',
    '几内亚': 'Guinea', '塞拉利昂': 'Sierra Leone', '利比里亚': 'Liberia',
    '布基纳法索': 'Burkina Faso', '尼日尔': 'Niger', '乍得': 'Chad',
    '赤道几内亚': 'Equatorial Guinea', '佛得角': 'Cape Verde', '毛里塔尼亚': 'Mauritania',
    '冈比亚': 'Gambia', '几内亚比绍': 'Guinea-Bissau', '科摩罗': 'Comoros',
    '斯威士兰': 'Eswatini', '莱索托': 'Lesotho', '马拉维': 'Malawi',
    '布隆迪': 'Burundi', '吉布提': 'Djibouti', '厄立特里亚': 'Eritrea',
    '中东（不含伊朗、以色列及战乱国）': 'Middle East (excl. Iran, Israel & conflict zones)',
    '阿联酋': 'UAE', '沙特阿拉伯': 'Saudi Arabia', '卡塔尔': 'Qatar', '阿曼': 'Oman',
    '科威特': 'Kuwait', '巴林': 'Bahrain', '约旦': 'Jordan', '黎巴嫩': 'Lebanon',
    '伊拉克': 'Iraq', '土耳其': 'Turkey', '南亚': 'South Asia', '印度': 'India',
    '巴基斯坦': 'Pakistan', '孟加拉国': 'Bangladesh', '斯里兰卡': 'Sri Lanka',
    '尼泊尔': 'Nepal', '马尔代夫': 'Maldives', '不丹': 'Bhutan',
    // —— 单位(兜底) ——
    '双': 'pairs', '件': 'pcs', '条': 'pcs', '套': 'sets', '元': ' CNY',
    // —— 括号(toast 包裹) ——
    '「': '"', '」功能开发中': '" is under development',
    // —— 品牌兜底 logo 单字(长串优先, 不破坏「鞋贸汇」) ——
    '鞋': 'XMH'
  };
  // 占位符词典（复用同一张表，键为占位符原文）
  var PH_DICT = {
    '请输入供应标题': 'Enter supply title',
    '请输入求购标题': 'Enter inquiry title',
    '请输入描述': 'Enter description',
    '请选择国家 / 地区': 'Select country / region',
    '请输入详细地址': 'Enter detailed address',
    '请输入联系人': 'Enter contact name',
    '请输入联系电话': 'Enter phone number',
    '请输入手机号': 'Enter phone number',
    '请输入WhatsApp号码': 'Enter WhatsApp number',
    '请输入求购标题（如：急需500双运动鞋）': 'Enter inquiry title (e.g. 500 pairs running shoes)',
    '请详细描述您的求购需求（如：材质、尺寸、颜色、交货期等）': 'Describe your inquiry (material, size, color, lead time…)',
    '请输入求购数量': 'Enter quantity',
    '请输入您的销售地区（如：尼日利亚、肯尼亚）': 'Enter your sales region (e.g. Nigeria, Kenya)',
    '搜索品类': 'Search category',
    '搜索货源关键词': 'Search supplies'
  };

  // 买家端（b2_ / b_）与卖家端（s2_）语言相互独立，避免一端切中文污染另一端
  function langKey() {
    var f = location.pathname.split('/').pop() || '';
    if (f.indexOf('s2_') === 0) return 'seller_lang';
    if (f.indexOf('b2_') === 0 || f.indexOf('b_') === 0) return 'buyer_lang';
    return 'app_lang';
  }

  function curLang() {
    var f = location.pathname.split('/').pop() || '';
    try {
      var saved = localStorage.getItem(langKey());
      if (saved === 'zh-CN' || saved === 'en') return saved;
    } catch (e) {}
    // 默认：买家端（b2_ / b_）英文；卖家端（s2_）中文；其余页面保持中文
    if (f.indexOf('s2_') === 0) return 'zh-CN';
    if (f.indexOf('b2_') === 0 || f.indexOf('b_') === 0) return 'en';
    return 'zh-CN';
  }

  // 子串替换：把字符串里所有已知中文片段替换为英文（用于 toast 等动态文本）
  function replaceDict(str) {
    if (!str) return str;
    var keys = Object.keys(DICT).sort(function (a, b) { return b.length - a.length; });
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (str.indexOf(k) !== -1) str = str.split(k).join(DICT[k]);
    }
    return str;
  }

  // 翻译单个文本节点：英文模式按词典子串替换当前文本（可处理复用型 toast 节点）；
  // 中文模式还原首次记录的中文原文（用于切回中文）
  function translateText(node) {
    var p = node.parentNode;
    if (!p) return;
    var tag = p.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA') return;
    if (p.getAttribute && p.getAttribute('contenteditable') === 'true') return;
    var raw = node.nodeValue;
    if (!raw || !raw.trim()) return;
    var lang = curLang();
    if (node.__zh_raw === undefined) node.__zh_raw = raw;
    if (lang === 'en') {
      var out = replaceDict(raw);
      if (out !== raw) node.nodeValue = out;
    } else {
      if (node.__zh_raw !== undefined && raw !== node.__zh_raw) node.nodeValue = node.__zh_raw;
    }
  }

  function applyI18n(root) {
    root = root || document;
    if (root.nodeType === 3) { translateText(root); return; }
    var lang = curLang();
    var walker = document.createTreeWalker(
      root.nodeType === 9 ? root.body : root,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    var node;
    while ((node = walker.nextNode())) {
      translateText(node);
    }
    // 属性：aria-label / title / alt
    var attrEls = root.querySelectorAll ? root.querySelectorAll('[aria-label],[title],[alt]') : [];
    for (var ai = 0; ai < attrEls.length; ai++) {
      var elx = attrEls[ai];
      ['aria-label', 'title', 'alt'].forEach(function (an) {
        if (!elx.hasAttribute(an)) return;
        var av = elx.getAttribute(an);
        if (!av) return;
        if (elx['__zh_' + an] === undefined) elx['__zh_' + an] = av;
        var oa = elx['__zh_' + an];
        if (lang === 'en') {
          var out = replaceDict(oa);
          if (out !== oa) elx.setAttribute(an, out);
        } else {
          elx.setAttribute(an, oa);
        }
      });
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

  // 切换语言（按当前页面归属持久化到对应 key）
  function setLang(code) {
    try { localStorage.setItem(langKey(), code); } catch (e) {}
    applyI18n(document);
    // 同步菜单勾选
    document.querySelectorAll('.lang-row').forEach(function (r) {
      r.classList.toggle('on', r.getAttribute('data-lc') === code);
    });
  }

  // 自动运行
  function init() {
    applyI18n(document);
    // 兜底：部分页面在 DOMContentLoaded 之后才注入登录态/卡片节点，
    // 此时 MutationObserver 可能尚未挂载，延时重扫一次覆盖这些迟到节点
    setTimeout(function () { try { applyI18n(document); } catch (e) {} }, 0);
    setTimeout(function () { try { applyI18n(document); } catch (e) {} }, 60);
    // 动态渲染（列表卡片等）也要翻译
    if (window.MutationObserver) {
      var obs = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var m = mutations[i];
          if (m.type === 'childList') {
            for (var j = 0; j < m.addedNodes.length; j++) {
              var n = m.addedNodes[j];
              if (n.nodeType === 3) translateText(n);
              else if (n.nodeType === 1) applyI18n(n);
            }
          } else if (m.type === 'characterData') {
            translateText(m.target);
          }
        }
      });
      obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.I18N = {
    applyI18n: applyI18n, setLang: setLang, curLang: curLang, ph: PH_DICT,
    t: function (k) {
      var r = (curLang() === 'en') ? replaceDict(k) : k;
      if (curLang() === 'en' && PH_DICT.hasOwnProperty(k)) r = PH_DICT[k];
      return r;
    }
  };
})();
