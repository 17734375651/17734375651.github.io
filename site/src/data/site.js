/**
 * Shared site facts, navigation, and route metadata.
 *
 * `SEO_ROUTES` is sourced from the route manifest so the same page metadata
 * can drive hydrated views and static metadata generation.
 */
export const SITE = {
  "name": "方寸有序",
  "fullName": "方寸有序工作室",
  "englishName": "FANGCUN YOUXU STUDIO",
  "publicUrl": "https://17734375651.github.io/",
  "contact": "电话 17734375651（微信同号）",
  "phone": "17734375651",
  "audiences": [
    "图文店",
    "印刷店",
    "中小企业",
    "其他重复流程"
  ],
  "productClaim": "三款正式软件可分别购买、独立使用；ERP 作为重点新品持续完善。",
  "licenseClaim": "正式软件按年授权；客户端内查看体验、购买和离线激活状态。",
  "trialRibbon": "每台电脑首次免费体验 1 小时",
  "trialScope": "一小时体验适用于三款正式软件；方寸有序 ERP 当前为预约体验。",
  "privacyClaims": [
    "本地优先运行",
    "客户资料不上传官网",
    "官网不接收客户文件",
    "离线授权"
  ],
  "ctaVocabulary": [
    "查看产品",
    "查看成品软件",
    "描述你的需求",
    "查看产品详情",
    "查看下载与价格",
    "查看实际操作演示",
    "体验模拟演示",
    "预约体验",
    "填写需求",
    "查看详情"
  ],
  "customization": {
    "route": "/custom/requirements/",
    "requiredFields": [
      "scene",
      "slowProcess",
      "inputs",
      "expected"
    ],
    "optionalFields": [
      "constraints"
    ],
    "scenes": [
      "图文店",
      "印刷店",
      "中小企业",
      "其他（请说明）"
    ],
    "summaryBehavior": "填写四项必填信息后仅在当前页面生成可复制的微信需求摘要；不自动提交、不上传、不保存。",
    "pricing": "定制设计及首个可用版本 499 元起；正式版年费根据功能复杂度报价。"
  }
};

export const NAV_ITEMS = [
  { label: '首页', href: '/' },
  { label: '产品', href: '/products/' },
  { label: '行业方案', href: '/solutions/' },
  { label: '内容中心', href: '/updates/' },
  { label: '服务与授权', href: '/legal/service/' },
  { label: '联系我们', href: '/#contact' },
];

export const GLOBAL_TRUTH = Object.freeze({
  homeProductClaim: SITE.productClaim,
  annualLicenseClaim: SITE.licenseClaim,
  globalTrialRibbon: SITE.trialRibbon,
  trialScope: SITE.trialScope,
  localAndPrivacyClaims: SITE.privacyClaims,
  contact: SITE.contact,
  ctaVocabularyObserved: SITE.ctaVocabulary,
});

export const TRUST_POINTS = [
  { label: '本地优先运行', detail: '客户资料不上传官网' },
  { label: '可复核输出', detail: '输入、处理、输出链路清楚' },
  { label: '离线授权', detail: '正式软件按年授权' },
  { label: '体验边界透明', detail: '下载验收中与预约体验分开呈现' },
];

export const SEO_CANONICAL_RULES = {
  "directoryIndexRoutes": "Use trailing-slash canonicals for directory index documents.",
  "queryStrings": "Canonicalize to the path without query parameters.",
  "unknownRoutes": "Serve 404.html with 404 status; no self-canonical, noindex, and exclude from sitemap.",
  "og": "Emit og:title, og:description, og:type, and og:url for indexable routes; use the same absolute canonical URL in og:url."
};
export const SEO_ROUTES = [
  {
    "path": "/",
    "kind": "home",
    "status": 200,
    "title": "方寸有序工作室｜降本增效软件与个性化定制",
    "description": "标签印刷排版、CMYK 胀色裁切、PDF 配印、本地 ERP 与个性化软件定制。微信/电话：17734375651。",
    "canonical": "https://17734375651.github.io/",
    "og": {
      "title": "方寸有序工作室｜降本增效软件与个性化定制",
      "description": "为图文店、印刷店、中小企业提供能够真正落地的效率软件，也承接按业务流程开发的个性化工具。",
      "type": "website",
      "url": "https://17734375651.github.io/"
    },
    "h1": "把重复工作，整理成清晰可执行的流程",
    "coreStaticBody": [
      "为图文店、印刷店、中小企业提供能够真正落地的效率软件，也承接按业务流程开发的个性化工具。",
      "把重复核算、反复整理与逐页核对，转成可执行、可复核的软件流程。",
      "四条产品线：标签印刷排版计划、方寸有序胀色裁切、方寸 PDF 配印助手、方寸有序 ERP。三款软件已公开价格：胀色裁切提供已验证下载，标签排版与 PDF 配印下载入口仍在验收；ERP 预约体验。"
    ],
    "verifiedFacts": {
      "audience": [
        "图文店",
        "印刷店",
        "中小企业"
      ],
      "products": [
        "标签印刷排版计划",
        "方寸有序胀色裁切",
        "方寸 PDF 配印助手",
        "方寸有序 ERP"
      ],
      "contact": "电话 17734375651（微信同号）",
      "trustStatements": [
        "本地优先运行",
        "客户资料不上传官网",
        "可复核输出",
        "离线授权",
        "每台电脑首次免费体验 1 小时"
      ]
    }
  },
  {
    "path": "/products/label/",
    "kind": "product",
    "productId": "label",
    "status": 200,
    "title": "标签印刷排版计划｜方寸有序",
    "description": "标签印刷排版计划：把多品种、不同数量的标签订单整理成可执行、可复核的排版计划。年授权 199 元，下载入口验收中。",
    "canonical": "https://17734375651.github.io/products/label/",
    "og": {
      "title": "标签印刷排版计划｜方寸有序",
      "description": "把多品种、不同数量的标签订单整理成可执行、可复核的排版计划。",
      "type": "product",
      "url": "https://17734375651.github.io/products/label/"
    },
    "h1": "标签印刷排版计划",
    "coreStaticBody": [
      "把多品种、不同数量的标签订单，整理成可执行、可复核的排版计划。",
      "输入资料：Excel 数量表、标签尺寸与版面容量、冗余与成本参数。",
      "处理：读取同尺寸、多内容标签数量表，给出版面、纸张、机器与余量建议。",
      "输出：Word 排版说明、Excel 计算明细、可复核成本与余量。",
      "年授权 199 元；下载入口验收中；每台电脑首次免费体验 1 小时。"
    ],
    "verifiedFacts": {
      "status": "正式销售 · 下载验收中",
      "price": "199 元/年",
      "trial": "每台电脑首次免费体验 1 小时",
      "inputs": [
        "Excel 数量表",
        "标签尺寸与版面容量",
        "冗余与成本参数"
      ],
      "outputs": [
        "Word 排版说明",
        "Excel 计算明细",
        "可复核成本与余量"
      ],
      "features": [
        "读取同尺寸、多内容标签数量表",
        "给出版面、纸张、机器与余量建议",
        "导出员工可执行、负责人可复核的文件"
      ],
      "boundary": "官网只展示近似示例，不公开拼版算法、完整成本公式或真实订单。"
    }
  },
  {
    "path": "/products/bleed/",
    "kind": "product",
    "productId": "bleed",
    "status": 200,
    "title": "方寸有序胀色裁切｜CMYK 胀色与印前复检",
    "description": "方寸有序胀色裁切：读取 Excel 订单与 PDF，自动完成胀色、裁切、拼版与印前复检。年授权 799 元，提供已验证 Windows x86 下载。",
    "canonical": "https://17734375651.github.io/products/bleed/",
    "og": {
      "title": "方寸有序胀色裁切｜CMYK 胀色与印前复检",
      "description": "读取 Excel 订单与单页或集成 PDF，自动完成胀色、裁切、拼版与印前复检。",
      "type": "product",
      "url": "https://17734375651.github.io/products/bleed/"
    },
    "h1": "方寸有序胀色裁切",
    "coreStaticBody": [
      "读取 Excel 订单与单页或集成 PDF，自动完成胀色、裁切、拼版与印前复检。",
      "输入资料：Excel .xls / .xlsx 订单、单页或集成 PDF、版面、胀色与裁切参数。",
      "处理：识别多工作表表头并汇总标签数量，匹配单页或集成 PDF 并优化多版面。",
      "输出：CMYK 排版 PDF、复检报告与操作日志、可继续调整的项目文件。",
      "年授权 799 元；每台电脑首次免费体验 1 小时。"
    ],
    "verifiedFacts": {
      "status": "正式销售 · 已验证下载",
      "price": "799 元/年",
      "trial": "每台电脑首次免费体验 1 小时",
      "inputs": [
        "Excel .xls / .xlsx 订单",
        "单页或集成 PDF",
        "版面、胀色与裁切参数"
      ],
      "outputs": [
        "CMYK 排版 PDF",
        "复检报告与操作日志",
        "可继续调整的项目文件"
      ],
      "features": [
        "识别多工作表表头并汇总标签数量",
        "匹配单页或集成 PDF 并优化多版面",
        "生成 CMYK 胀色、外置裁切标记及复检报告"
      ],
      "boundary": "官网提供已核验的公开版客户端；核心处理在本地完成，客户资料不会上传官网。",
      "releaseEvidence": "downloads/fangcun/1.2.11/public-manifest.json and release-record.json are present in the export."
    }
  },
  {
    "path": "/products/pdf/",
    "kind": "product",
    "productId": "pdf",
    "status": 200,
    "title": "方寸 PDF 配印助手｜逐页可追溯的 PDF 配印任务",
    "description": "方寸 PDF 配印助手：把 Excel、CSV 或文字页数要求转换成可追溯的 PDF 配印任务。年授权 599 元，下载入口验收中。",
    "canonical": "https://17734375651.github.io/products/pdf/",
    "og": {
      "title": "方寸 PDF 配印助手｜逐页可追溯的 PDF 配印任务",
      "description": "把 Excel、CSV 或文字页数要求转换成可追溯的 PDF 配印任务。",
      "type": "product",
      "url": "https://17734375651.github.io/products/pdf/"
    },
    "h1": "方寸 PDF 配印助手",
    "coreStaticBody": [
      "把 Excel、CSV 或文字页数要求，转换成可追溯的 PDF 配印任务。",
      "输入资料：Excel / CSV、文字页数要求、原始 PDF。",
      "处理：解析每页目标份数与冲突规则，生成规范任务表并按要求加工 PDF。",
      "输出：规范化任务 Excel、加工后 PDF、逐页审计 Excel。",
      "年授权 599 元；下载入口验收中；每台电脑首次免费体验 1 小时。"
    ],
    "verifiedFacts": {
      "status": "正式销售 · 下载验收中",
      "price": "599 元/年",
      "trial": "每台电脑首次免费体验 1 小时",
      "inputs": [
        "Excel / CSV",
        "文字页数要求",
        "原始 PDF"
      ],
      "outputs": [
        "规范化任务 Excel",
        "加工后 PDF",
        "逐页审计 Excel"
      ],
      "features": [
        "解析每页目标份数与冲突规则",
        "生成规范任务表并按要求加工 PDF",
        "逐页记录处理结果，便于复核追踪"
      ],
      "boundary": "该产品只包含 PDF 配印能力，不含其他产品入口；官网不接收客户文件上传。"
    }
  },
  {
    "path": "/products/erp/",
    "kind": "product",
    "productId": "erp",
    "status": 200,
    "title": "方寸有序 ERP｜本地订单、库存与权限工作台",
    "description": "方寸有序 ERP：面向小型经营团队的本地业务工作台，让订单、库存与权限流转更清楚。重点新品，完善中，预约体验。",
    "canonical": "https://17734375651.github.io/products/erp/",
    "og": {
      "title": "方寸有序 ERP｜本地订单、库存与权限工作台",
      "description": "面向小型经营团队的本地业务工作台，让订单、库存与权限流转更清楚。",
      "type": "product",
      "url": "https://17734375651.github.io/products/erp/"
    },
    "h1": "方寸有序 ERP",
    "coreStaticBody": [
      "面向小型经营团队的本地业务工作台，让订单、库存与权限流转更清楚。",
      "当前状态：重点新品 · 完善中 · 预约体验；当前不提供公开安装包或正式价格。",
      "输入资料：商品与客户资料、采购销售单据、角色与审批规则。",
      "输出：待办工作台、库存事件、按角色可见的经营视图。"
    ],
    "verifiedFacts": {
      "status": "重点新品 · 完善中 · 预约体验",
      "price": null,
      "trial": "预约体验，不提供公开安装包",
      "inputs": [
        "商品与客户资料",
        "采购销售单据",
        "角色与审批规则"
      ],
      "outputs": [
        "待办工作台",
        "库存事件",
        "按角色可见的经营视图"
      ],
      "features": [
        "本地优先的商品、客户与供应商资料",
        "采购、销售、库存与待办流程衔接",
        "按角色控制字段、审批与可见范围"
      ],
      "boundary": "当前只展示已完成方向，不承诺未完成模块，不公开下载或价格。"
    }
  },
  {
    "path": "/custom/requirements/",
    "kind": "custom-requirements",
    "status": 200,
    "title": "软件定制需求｜按你的流程做可落地工具｜方寸有序",
    "description": "填写业务类型、最耗时环节、可提供资料与期望交付，页面生成可复制的微信需求摘要。定制设计及首个可用版本 499 元起。",
    "canonical": "https://17734375651.github.io/custom/requirements/",
    "og": {
      "title": "软件定制需求｜按你的流程做可落地工具｜方寸有序",
      "description": "按你的流程，做真正能落地的工具；页面内生成需求摘要，内容不上传、不保存。",
      "type": "website",
      "url": "https://17734375651.github.io/custom/requirements/"
    },
    "h1": "按你的流程，做真正能落地的工具",
    "coreStaticBody": [
      "填写业务类型、目前最耗时的工作环节、可提供的资料与期望的交付结果；规则、预算、时间可补充填写。",
      "页面仅在当前页面生成可复制的微信需求摘要，内容不上传、不保存；复制后请在微信中粘贴发送。",
      "定制设计及首个可用版本 499 元起；正式版年费根据功能复杂度报价。三款正式软件的体验规则见各产品页；定制项目按需求沟通。"
    ],
    "verifiedFacts": {
      "requiredFields": [
        "业务类型",
        "目前最耗时的工作环节",
        "可提供的资料",
        "期望的交付结果"
      ],
      "optionalField": "补充要求（规则、预算、时间）",
      "supportedScenes": [
        "图文店",
        "印刷店",
        "中小企业",
        "其他（请说明）"
      ],
      "summaryBehavior": "填写四项必填信息后自动生成摘要；内容不上传、不保存。",
      "price": "定制设计及首个可用版本 499 元起；正式版年费根据功能复杂度报价。",
      "contact": "电话 17734375651（微信同号）"
    }
  },
  {
    "path": "404",
    "kind": "not-found",
    "status": 404,
    "title": "页面未找到｜方寸有序",
    "description": "这个页面还没有建立。返回产品中心，查看三款正式软件和正在完善的 ERP。",
    "canonical": null,
    "og": {
      "title": "页面未找到｜方寸有序",
      "description": "这个页面还没有建立。返回产品中心，查看三款正式软件和正在完善的 ERP。",
      "type": "website",
      "url": null
    },
    "h1": "这个页面还没有建立。",
    "coreStaticBody": [
      "这个页面还没有建立。",
      "返回产品中心，查看三款正式软件和正在完善的 ERP。"
    ],
    "verifiedFacts": {
      "clientFallbackText": "这个页面还没有建立。",
      "clientFallbackDescription": "返回产品中心，查看三款正式软件和正在完善的 ERP。",
      "expectedResponse": 404
    },
    "canonicalPolicy": "omit-self-canonical; emit noindex and do not include in sitemap"
  }
];
export const SEO_ROUTE_BY_PATH = Object.fromEntries(SEO_ROUTES.map((route) => [route.path, route]));

export const site = SITE;
export const navItems = NAV_ITEMS;
export const seoRoutes = SEO_ROUTES;

export function getSeoRoute(pathname) {
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/';
  const directoryPath = path === '/' ? '/' : `${path}/`;
  return SEO_ROUTE_BY_PATH[path] ?? SEO_ROUTE_BY_PATH[directoryPath] ?? SEO_ROUTE_BY_PATH['404'] ?? null;
}
