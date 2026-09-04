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
  "softwareIcon": {
    "image": "/assets/brand/fangcun-software-icon.png",
    "original": "/assets/brand/fangcun-software-icon.ico"
  },
  "contact": "电话 17734375651（微信同号）",
  "phone": "17734375651",
  "audiences": [
    "图文店",
    "印刷店",
    "中小企业",
    "其他重复流程"
  ],
  "productClaim": "七款正式软件可分别购买、独立使用；客户端与发布校验文件均可直接下载。",
  "licenseClaim": "七款软件正式授权均按年离线导入；授权状态、起止时间与机器码可在客户端查看。",
  "trialRibbon": "首次启动无需申请，按本机受保护时间自动体验 30 天",
  "trialScope": "在正常系统状态下每台设备每款产品一次；正式授权后可完全离线使用。",
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
  { label: '下载边界透明', detail: '客户端与校验文件分开呈现' },
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
    "description": "标签印刷排版、CMYK 胀色裁切、大图标签提取、多尺寸标签排版、PDF 配印与个性化软件定制。微信/电话：17734375651。",
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
      "七款正式软件：标签印刷排版计划、方寸有序胀色裁切、方寸有序多尺寸胀色裁切、方寸 PDF 配印助手、方寸有序记账软件、方寸有序条码匹配、方寸有序颜色尺寸提取。七款客户端与发布校验文件均可直接下载。"
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
        "方寸有序多尺寸胀色裁切",
        "方寸 PDF 配印助手",
        "方寸有序记账软件",
        "方寸有序条码匹配",
        "方寸有序颜色尺寸提取"
      ],
      "contact": "电话 17734375651（微信同号）",
      "trustStatements": [
        "本地优先运行",
        "客户资料不上传官网",
        "可复核输出",
        "离线授权",
        "七款软件首次启动均可离线体验 30 天",
        "正常系统状态下每台设备每款产品一次"
      ]
    }
  },
  {
    "path": "/products/label/",
    "kind": "product",
    "productId": "label",
    "status": 200,
    "title": "标签印刷排版计划｜方寸有序",
    "description": "标签印刷排版计划：把多品种、不同数量的标签订单整理成可执行、可复核的排版计划。年授权 199 元，Windows x64 客户端可下载。",
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
      "年授权 199 元；Windows 10/11 x64 客户端可下载；首次启动无需申请，可离线体验 30 天。"
    ],
    "verifiedFacts": {
      "status": "正式销售 · 已验证下载",
      "price": "199 元/年",
      "trial": "首次启动无需申请，按本机受保护时间自动体验 30 天",
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
      "boundary": "官网提供已核验的 Windows x64 客户端；试用在本机初始化，正式授权文件离线导入，客户资料不上传官网。",
      "releaseEvidence": "fangcun-label-1.1.0 Release 提供 Windows 10/11 x64 客户端、公开清单、发布记录与 SHA-256 校验文件。"
    }
  },
  {
    "path": "/products/bleed/",
    "kind": "product",
    "productId": "bleed",
    "status": 200,
    "title": "方寸有序胀色裁切｜CMYK 胀色与印前复检",
    "description": "方寸有序胀色裁切：读取 Excel 订单与 PDF，自动完成胀色、裁切、拼版与印前复检。年授权 799 元，提供已验证 Windows 10/11（x86 客户端，兼容 x86/x64）下载。",
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
      "年授权 799 元；首次启动无需申请，可离线体验 30 天。"
    ],
    "verifiedFacts": {
      "status": "正式销售 · 已验证下载",
      "price": "799 元/年",
      "trial": "首次启动无需申请，按本机受保护时间自动体验 30 天",
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
      "releaseEvidence": "fangcun-bleed-1.2.12 Release 提供 Windows 10/11（x86 客户端，兼容 x86/x64）、公开清单、发布记录与 SHA-256 校验文件。"
    }
  },
  {
    "path": "/products/multisize-bleed/",
    "kind": "product",
    "productId": "multisize-bleed",
    "status": 200,
    "title": "方寸有序多尺寸胀色裁切｜大图标签提取与多尺寸排版",
    "description": "方寸有序多尺寸胀色裁切：在大幅 PDF 中自动识别并提取单张标签，再对多尺寸标签进行胀色裁切排版。年授权 1499 元。",
    "canonical": "https://17734375651.github.io/products/multisize-bleed/",
    "og": {
      "title": "方寸有序多尺寸胀色裁切｜大图标签提取与多尺寸排版",
      "description": "自动识别大图中的独立标签并批量提取单张 PDF，随后完成多尺寸标签胀色裁切排版。",
      "type": "product",
      "url": "https://17734375651.github.io/products/multisize-bleed/"
    },
    "h1": "方寸有序多尺寸胀色裁切",
    "coreStaticBody": [
      "在大幅 PDF 中自动识别并提取单张标签，再对多尺寸标签进行胀色裁切排版。",
      "大图识别与单张提取：自动识别大幅 PDF 中的独立标签区域，批量提取为可直接排版的单张 PDF。",
      "多尺寸胀色裁切排版：支持不同尺寸标签统一规划，完成胀色、外置裁切标与可复核的排版输出。",
      "输入资料：大幅/大图单页 PDF 或已分割单页 PDF、Excel 订单、版面与胀色裁切参数。",
      "输出：单张标签 PDF、多尺寸胀色裁切排版 PDF、打印份数与复核报告。",
      "年授权 1499 元；Windows x64 客户端可下载；首次启动无需申请，可离线体验 30 天。"
    ],
    "verifiedFacts": {
      "status": "正式销售 · 已验证下载",
      "price": "1499 元/年",
      "trial": "首次启动无需申请，按本机受保护时间自动体验 30 天",
      "inputs": [
        "大幅/大图单页 PDF 或已分割单页 PDF",
        "Excel .xls / .xlsx 订单",
        "版面与胀色裁切参数"
      ],
      "outputs": [
        "单张标签 PDF",
        "多尺寸胀色裁切排版 PDF",
        "打印份数与复核报告"
      ],
      "features": [
        "在大图 PDF 中自动识别并提取单张标签",
        "对多尺寸标签进行胀色裁切排版",
        "自动比较大机器、小机器及混用版面"
      ],
      "boundary": "本产品使用独立名称、版本、下载与年度授权；所有 PDF 处理均在本地完成。",
      "releaseEvidence": "fangcun-multisize-0.10.0 Release 提供 Windows x64 客户端、公开清单、发布记录与 SHA-256 校验文件。"
    }
  },
  {
    "path": "/products/pdf/",
    "kind": "product",
    "productId": "pdf",
    "status": 200,
    "title": "方寸 PDF 配印助手｜逐页可追溯的 PDF 配印任务",
    "description": "方寸 PDF 配印助手：把 Excel、CSV 或文字页数要求转换成可追溯的 PDF 配印任务。年授权 599 元，Windows x64 客户端可下载。",
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
      "年授权 599 元；Windows 10/11 x64 客户端可下载；首次启动无需申请，可离线体验 30 天。"
    ],
    "verifiedFacts": {
      "status": "正式销售 · 已验证下载",
      "price": "599 元/年",
      "trial": "首次启动无需申请，按本机受保护时间自动体验 30 天",
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
      "boundary": "官网提供已核验的 Windows x64 客户端；试用在本机初始化，正式授权文件离线导入，官网不接收客户文件上传。",
      "releaseEvidence": "fangcun-pdf-1.1.0 Release 提供 Windows 10/11 x64 客户端、公开清单、发布记录与 SHA-256 校验文件。"
    }
  },
  {
    "path": "/products/accounting/",
    "kind": "product",
    "productId": "accounting",
    "status": 200,
    "title": "方寸有序记账软件｜进销存与财务复核",
    "description": "方寸有序记账软件：把进货、销售、收付款与财务报表整理成同一企业账套中的可追溯流程。按账号年费 999 元，Windows x64 客户端可下载。",
    "canonical": "https://17734375651.github.io/products/accounting/",
    "og": {
      "title": "方寸有序记账软件｜进销存与财务复核",
      "description": "把进货、销售、收付款、账龄与财务报表整理成一个企业账套主体内的可追溯流程。",
      "type": "product",
      "url": "https://17734375651.github.io/products/accounting/"
    },
    "h1": "方寸有序记账软件",
    "coreStaticBody": [
      "把进货、销售、收付款与财务报表，整理成同一企业账套中可追溯的记账流程。",
      "输入资料：客户、供应商、商品服务资料，以及进货、销售和收付款记录。",
      "处理：登记业务单据，跟踪应收应付与账龄，生成凭证、报表和审计记录。",
      "输出：明细账、试算平衡、利润表、资产负债表、对账与复核明细。",
      "¥999 / 账号 / 年；Windows 10/11 x64 客户端可下载；首次启动无需申请，可离线体验 30 天；一个账号对应一个企业账套主体。"
    ],
    "verifiedFacts": {
      "status": "正式销售 · 已验证下载",
      "price": "999 元/账号/年",
      "trial": "首次启动无需申请，按本机受保护时间自动体验 30 天",
      "accountBoundary": "一个账号对应一个企业账套主体",
      "inputs": [
        "客户、供应商与商品服务资料",
        "进货、销售与收付款记录",
        "财务凭证与期初数据"
      ],
      "outputs": [
        "应收应付与账龄明细",
        "明细账、试算平衡、利润表与资产负债表",
        "可追溯的对账与审计记录"
      ],
      "features": [
        "串联进货、销售与收付款流程",
        "按企业账套主体生成财务报表",
        "保留来源、复核与审计轨迹"
      ],
      "boundary": "按账号年度离线授权；一个账号对应一个企业账套主体。试用在本机初始化，授权判定与可选数据同步相互独立。",
      "releaseEvidence": "fangcun-accounting-0.8.0 Release 提供 Windows 10/11 x64 客户端、公开清单、发布记录与 SHA-256 校验文件。"
    }
  },
  {
    "path": "/products/gtin-pdf/",
    "kind": "product",
    "productId": "gtin-pdf",
    "status": 200,
    "title": "方寸有序条码匹配｜Excel 与 PDF 匹配复核",
    "description": "方寸有序条码匹配：把 Excel 产品资料与 PDF 页面按 GTIN、条码和产品属性匹配，输出可复核结果表与合并 PDF。",
    "canonical": "https://17734375651.github.io/products/gtin-pdf/",
    "og": {
      "title": "方寸有序条码匹配｜Excel 与 PDF 匹配复核",
      "description": "按 GTIN、条码和产品属性匹配 Excel 与 PDF，将未解决项目保留给人工复核。",
      "type": "product",
      "url": "https://17734375651.github.io/products/gtin-pdf/"
    },
    "h1": "方寸有序条码匹配",
    "coreStaticBody": [
      "把 Excel 产品资料与 PDF 页面按条码和产品属性进行匹配，整理成可复核的结果表与合并 PDF。",
      "输入资料：Excel 产品或订单资料、待匹配 PDF、条码与产品属性规则。",
      "处理：先按标识符精确匹配，再按产品属性匹配，并标记未解决项目。",
      "输出：分工作表匹配结果 Excel、合并 PDF、未解决项目与复核明细。",
      "价格咨询；Windows x64 客户端可下载；首次启动无需申请，可离线体验 30 天。"
    ],
    "verifiedFacts": {
      "status": "正式销售 · 已验证下载",
      "price": "价格咨询",
      "trial": "首次启动无需申请，按本机受保护时间自动体验 30 天",
      "inputs": ["Excel 产品或订单资料", "待匹配的 PDF 页面", "条码与产品属性规则"],
      "outputs": ["分工作表匹配结果 Excel", "按结果合并的 PDF", "未解决项目与复核明细"],
      "features": ["提取 GTIN、条码与产品属性", "分层匹配并保留未解决项目", "输出可复核的 Excel 与 PDF"],
      "boundary": "Excel 与 PDF 均在本地处理；试用与年度授权均为纯离线流程。",
      "releaseEvidence": "fangcun-gtin-pdf-1.1.0 Release 提供 Windows x64 客户端、公开清单、发布记录与 SHA-256 校验文件。"
    }
  },
  {
    "path": "/products/color-size/",
    "kind": "product",
    "productId": "color-size",
    "status": 200,
    "title": "方寸有序颜色尺寸提取｜Excel 字段整理",
    "description": "方寸有序颜色尺寸提取：批量翻译 Excel 中的中文颜色，提取英尺与厘米尺寸，生成不覆盖原文件的新工作簿。",
    "canonical": "https://17734375651.github.io/products/color-size/",
    "og": {
      "title": "方寸有序颜色尺寸提取｜Excel 字段整理",
      "description": "批量翻译中文颜色并提取英尺、厘米尺寸，生成新 Excel 结果。",
      "type": "product",
      "url": "https://17734375651.github.io/products/color-size/"
    },
    "h1": "方寸有序颜色尺寸提取",
    "coreStaticBody": [
      "批量读取 Excel 中的颜色与尺寸文本，翻译中文颜色并提取英尺、厘米尺寸。",
      "输入资料：一个或多个 .xlsx 工作簿、包含颜色和尺寸的文本列。",
      "处理：识别中文颜色名称，提取英尺与厘米尺寸表达，并写入新列。",
      "输出：颜色英文翻译列、英尺与厘米尺寸列、不覆盖原文件的新 Excel 结果。",
      "价格咨询；Windows x64 客户端可下载；首次启动无需申请，可离线体验 30 天。"
    ],
    "verifiedFacts": {
      "status": "正式销售 · 已验证下载",
      "price": "价格咨询",
      "trial": "首次启动无需申请，按本机受保护时间自动体验 30 天",
      "inputs": ["一个或多个 .xlsx 工作簿", "包含颜色和尺寸的文本列", "待保留的原始数据"],
      "outputs": ["颜色英文翻译列", "英尺与厘米尺寸列", "不覆盖原文件的新 Excel 结果"],
      "features": ["批量处理多个 Excel 工作簿", "翻译中文颜色字段", "提取英尺与厘米尺寸并保留原文件"],
      "boundary": "Excel 数据在本地读取和生成新结果；试用与年度授权均为纯离线流程。",
      "releaseEvidence": "fangcun-color-size-1.0.2 Release 提供 Windows x64 客户端、公开清单、发布记录与 SHA-256 校验文件。"
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
      "定制设计及首个可用版本 499 元起；正式版年费根据功能复杂度报价。七款成品软件首次启动均可离线体验 30 天；定制项目按需求沟通。"
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
    "description": "这个页面还没有建立。返回产品中心，查看七款正式软件或描述你的业务流程。",
    "canonical": null,
    "og": {
      "title": "页面未找到｜方寸有序",
      "description": "这个页面还没有建立。返回产品中心，查看七款正式软件或描述你的业务流程。",
      "type": "website",
      "url": null
    },
    "h1": "这个页面还没有建立。",
    "coreStaticBody": [
      "这个页面还没有建立。",
      "返回产品中心，查看七款正式软件或描述你的业务流程。"
    ],
    "verifiedFacts": {
      "clientFallbackText": "这个页面还没有建立。",
      "clientFallbackDescription": "返回产品中心，查看七款正式软件或描述你的业务流程。",
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
