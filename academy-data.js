/* 跨境小学堂 —— 共享数据与语言助手（列表页 / 详情页 共用） */
function img(h){ return 'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl('+h+',60%,72%)"/><stop offset="1" stop-color="hsl('+((h+40)%360)+',65%,55%)"/></linearGradient></defs><rect width="160" height="160" fill="url(#g)"/></svg>'); }
function A_LANG(){ try { return (window.I18N && window.I18N.curLang && window.I18N.curLang()==='en')?'en':'zh'; } catch(e){ return 'zh'; } }
function L(o){ return o ? o[A_LANG()] : ''; }

var CATS = [
  {key:'all',          zh:'全部',       en:'All'},
  {key:'cross_border', zh:'跨境电商',   en:'Cross-border E-commerce'},
  {key:'global_biz',   zh:'国际经营',   en:'Global Operations'},
  {key:'english',      zh:'英语学习',   en:'English Learning'},
  {key:'policy',       zh:'外贸政策',   en:'Trade Policy'},
  {key:'news',         zh:'行业资讯',   en:'Industry News'},
  {key:'market',       zh:'市场动态',   en:'Market Trends'},
  {key:'compliance',   zh:'合规指南',   en:'Compliance Guide'},
  {key:'selection',    zh:'选品技巧',   en:'Product Selection'},
  {key:'logistics',    zh:'物流仓储',   en:'Logistics & Warehousing'}
];
function catName(key){ var c = CATS.filter(function(x){return x.key===key;})[0]; return c ? L(c) : ''; }
function playSvg(){ return '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'; }

var ARTS = [
  { id:'AC1', cat:'cross_border', type:'article', h:200, ts:100, hot:92,
    zh:{ title:'2026 跨境电商独立站运营全攻略', sum:'从建站、选品到投放，拆解独立站增长的关键路径与常见误区。', date:'2026-08-20',
      body:[ {t:'p',x:'独立站的核心不是「卖货」，而是经营用户资产。相比平台店铺，独立站的优势在于沉淀私域流量、掌握用户数据与品牌定价权。'},
             {t:'p',x:'本攻略分三步：先明确目标市场与品类定位，再选择建站工具（Shopify、独立部署等），最后搭建投放与复购闭环。'},
             {t:'h',x:'一、定位先行'},
             {t:'p',x:'不要一上来就铺货。先用小额测款验证需求，再放大预算。选品时关注物流友好度与合规风险。'} ] },
    en:{ title:'The Complete 2026 Cross-border DTC Playbook', sum:'From storefront setup and sourcing to ad spend — key growth levers and common pitfalls.', date:'2026-08-20',
      body:[ {t:'p',x:'A DTC store is not about "selling things" but about building a user asset. Unlike marketplace listings, a storefront lets you own first-party data, private traffic, and pricing power.'},
             {t:'p',x:'This playbook has three steps: define target market and category, pick a builder (Shopify or self-hosted), then close the loop on acquisition and repurchase.'},
             {t:'h',x:'1. Positioning First'},
             {t:'p',x:'Do not list everything at once. Validate demand with small test batches, then scale. Watch logistics friendliness and compliance risk when sourcing.'} ] } },

  { id:'AC2', cat:'global_biz', type:'article', h:30, ts:98, hot:71,
    zh:{ title:'海外公司注册与税务合规入门', sum:'梳理香港、新加坡、美国三类主体在跨境贸易中的适用场景与申报要点。', date:'2026-08-18',
      body:[ {t:'p',x:'很多卖家在起步阶段就纠结「要不要注册海外公司」。答案取决于你的交易结构、收款方式与税务居民身份。'},
             {t:'p',x:'香港公司适合转口贸易与离岸收款，新加坡适合东南亚布局，美国公司则利于本地仓配与平台合规。'},
             {t:'h',x:'二、常见申报误区'},
             {t:'p',x:'不要把个人账户用于公司经营，也别忘了年审与完税凭证的留存。'} ] },
    en:{ title:'Overseas Entity Setup & Tax Compliance 101', sum:'Compare Hong Kong, Singapore, and U.S. entities for cross-border trade — when to use which.', date:'2026-08-18',
      body:[ {t:'p',x:'Many sellers agonize early over "do I need an overseas company?" The answer depends on your transaction structure, how you collect payments, and your tax residency.'},
             {t:'p',x:'A Hong Kong entity suits re-export and offshore collection; Singapore fits Southeast Asia; a U.S. entity helps with local fulfillment and marketplace compliance.'},
             {t:'h',x:'2. Common Filing Mistakes'},
             {t:'p',x:'Do not run business through a personal account, and never skip annual review or retaining tax-paid evidence.'} ] } },

  { id:'AC3', cat:'english', type:'video', h:280, ts:96, hot:88,
    zh:{ title:'外贸邮件高频句型与避坑指南', sum:'15 分钟视频，拆解开发信、报价、催款三类邮件的写法与雷区。', date:'2026-08-17',
      body:[ {t:'p',x:'本期视频用真实案例讲解三类高频邮件：开发信如何提升打开率、报价单怎样避免被动、催款邮件的礼貌边界。'},
             {t:'p',x:'配套模板可在评论区领取，建议结合自家产品二次改写，避免千篇一律被标记为垃圾邮件。'} ] },
    en:{ title:'High-frequency Email Templates & Pitfalls', sum:'A 15-min video on cold outreach, quoting, and payment follow-up emails.', date:'2026-08-17',
      body:[ {t:'p',x:'This video walks through three high-frequency email types with real examples: raising open rates on cold outreach, avoiding weak quotes, and the polite boundary of payment reminders.'},
             {t:'p',x:'Grab the companion templates from the comments, then rewrite them around your own products so they do not read like spam.'} ] } },

  { id:'AC4', cat:'policy', type:'article', h:140, ts:94, hot:64,
    zh:{ title:'RCEP 原产地证申领实操指南', sum:'手把手讲清 FORM E 填制要点、自助打印与享惠流程。', date:'2026-08-15',
      body:[ {t:'p',x:'RCEP 生效后，区域内 90% 以上货物逐步实现零关税。能否享惠，关键在于原产地证的规范申领。'},
             {t:'h',x:'三、填制三要点'},
             {t:'p',x:'商品归类要准确、区域价值成分要达标、运输路径要可追溯。任一环节出错都可能导致无法享惠。'} ] },
    en:{ title:'Practical Guide to RCEP Certificate of Origin', sum:'FORM E filing, self-printing, and how to actually claim preferential tariffs.', date:'2026-08-15',
      body:[ {t:'p',x:'After RCEP, over 90% of goods within the region move toward zero tariff. Whether you benefit hinges on correctly filing the certificate of origin.'},
             {t:'h',x:'3. Three Filing Essentials'},
             {t:'p',x:'Classify goods accurately, meet the regional value-content threshold, and keep the shipping route traceable. Any slip can forfeit the preference.'} ] } },

  { id:'AC5', cat:'news', type:'article', h:210, ts:92, hot:57,
    zh:{ title:'全球鞋服供应链半年趋势报告', sum:'从产能转移、成本波动到可持续要求，提炼上半年最值得关注的信号。', date:'2026-08-12',
      body:[ {t:'p',x:'上半年最明显的趋势是产能进一步向东南亚与南亚分散，单一产地依赖下降。'},
             {t:'p',x:'同时，买家的可持续与合规要求显著抬高，碳足迹与劳工标准成为订单门槛。'} ] },
    en:{ title:'H1 Global Footwear & Apparel Supply Chain Report', sum:'Capacity shifts, cost volatility, and sustainability — the signals that mattered most.', date:'2026-08-12',
      body:[ {t:'p',x:'The clearest trend this half is further capacity dispersion into Southeast and South Asia, lowering single-origin dependence.'},
             {t:'p',x:'At the same time, buyer sustainability and compliance requirements rose sharply — carbon footprint and labor standards became order gatekeepers.'} ] } },

  { id:'AC6', cat:'market', type:'article', h:20, ts:90, hot:76,
    zh:{ title:'非洲电商市场增长数据解读', sum:'用一组核心指标，看懂尼日利亚、肯尼亚、南非三国的机会与风险。', date:'2026-08-10',
      body:[ {t:'p',x:'非洲电商年复合增速位居全球前列，移动钱包普及是核心驱动力。'},
             {t:'p',x:'但物流最后一公里与退换货仍是最大痛点，选品需贴合本地支付与配送现实。'} ] },
    en:{ title:'Reading Africa’s E-commerce Growth Data', sum:'Core metrics to size the opportunity and risk across Nigeria, Kenya, and South Africa.', date:'2026-08-10',
      body:[ {t:'p',x:'Africa’s e-commerce CAGR is among the highest globally, powered chiefly by mobile-wallet adoption.'},
             {t:'p',x:'Yet last-mile logistics and returns remain the biggest pain points — products must fit local payment and delivery realities.'} ] } },

  { id:'AC7', cat:'compliance', type:'article', h:340, ts:88, hot:69,
    zh:{ title:'欧盟 CE 认证常见问题汇总', sum:'鞋服、电子、儿童用品在 CE 合规上的高频疑问与应对。', date:'2026-08-08',
      body:[ {t:'p',x:'CE 不是质量认证，而是进入欧盟市场的合规门槛，代表产品符合相关指令的基本要求。'},
             {t:'h',x:'四、最容易踩的坑'},
             {t:'p',x:'误以为有检测报告就等于有 CE、忽略技术文件留存、公告机构选择不当。'} ] },
    en:{ title:'EU CE Marking: Frequently Asked Questions', sum:'Common CE compliance questions for footwear, electronics, and children’s products.', date:'2026-08-08',
      body:[ {t:'p',x:'CE is not a quality certificate but the compliance threshold for entering the EU market — it signals the product meets the essential requirements of the relevant directives.'},
             {t:'h',x:'4. The Easiest Traps'},
             {t:'p',x:'Assuming a test report equals CE, neglecting technical-file retention, and picking the wrong notified body.'} ] } },

  { id:'AC8', cat:'selection', type:'article', h:260, ts:86, hot:81,
    zh:{ title:'用数据选爆品的 5 个方法', sum:'从搜索趋势、评论挖掘到竞品拆解，建立可复用的选品漏斗。', date:'2026-08-06',
      body:[ {t:'p',x:'选品不是拍脑袋，而是用数据缩小不确定性。先定义你的能力边界，再谈爆款。'},
             {t:'p',x:'五个方法：看搜索增速、挖差评痛点、拆竞品定价、跟平台榜单、验供应链成熟度。'} ] },
    en:{ title:'5 Data-driven Ways to Pick Winning Products', sum:'Build a reusable selection funnel from search trends, review mining, and competitor teardown.', date:'2026-08-06',
      body:[ {t:'p',x:'Product selection is not a gut call but using data to shrink uncertainty. Define your capability boundary first, then chase winners.'},
             {t:'p',x:'Five methods: watch search growth, mine negative reviews for pain points, break down competitor pricing, follow marketplace charts, and verify supply-chain maturity.'} ] } },

  { id:'AC9', cat:'logistics', type:'article', h:180, ts:84, hot:73,
    zh:{ title:'跨境小包与海外仓怎么选', sum:'从时效、成本、体验三角度，给出不同阶段的履约策略。', date:'2026-08-04',
      body:[ {t:'p',x:'起步阶段用跨境小包验证需求最划算；一旦单量稳定，海外仓能显著改善时效与退货体验。'},
             {t:'p',x:'决策关键是「库存周转率」与「客单价」，而不是单纯比运费。'} ] },
    en:{ title:'Cross-border Parcel vs. Overseas Warehouse', sum:'A stage-by-stage fulfillment strategy across speed, cost, and experience.', date:'2026-08-04',
      body:[ {t:'p',x:'In the early stage, cross-border parcels are cheapest for validating demand; once volume stabilizes, an overseas warehouse markedly improves delivery and returns.'},
             {t:'p',x:'The decision hinges on inventory turnover and average order value — not simply comparing shipping rates.'} ] } },

  { id:'AC10', cat:'cross_border', type:'article', h:50, ts:82, hot:84,
    zh:{ title:'TikTok Shop 起号 30 天计划', sum:'内容节奏、达人合作与转化承接，一份可落地的冷启动排期。', date:'2026-08-02',
      body:[ {t:'p',x:'TikTok Shop 起号靠的是内容复利，而非一次性投流。前 30 天要高频测试素材方向。'},
             {t:'p',x:'建议 70% 精力做短视频种草，20% 做直播承接，10% 做达人分销。'} ] },
    en:{ title:'30-day TikTok Shop Cold-start Plan', sum:'An actionable launch schedule for content cadence, creator collabs, and conversion.', date:'2026-08-02',
      body:[ {t:'p',x:'TikTok Shop growth comes from content compounding, not one-off ad spend. In the first 30 days, test creative angles at high frequency.'},
             {t:'p',x:'Recommendation: 70% on short-video seeding, 20% on live commerce, and 10% on creator distribution.'} ] } }
];
