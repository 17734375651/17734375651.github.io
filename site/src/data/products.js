/**
 * Product truth for the Fangcun Youxu site.
 *
 * Values are deliberately limited to facts present in audited release
 * packages. Every public client is tied to a verified release record.
 */
export const PRODUCTS = [
  {
    "id": "label",
    "route": "/products/label/",
    "name": "标签印刷排版计划",
    "shortName": "标签排版",
    "eyebrow": "LABEL IMPOSITION",
    "statement": "把多品种、不同数量的标签订单，整理成可执行、可复核的排版计划。",
    "outcome": "让排版计划更清楚，便于复核",
    "price": {
      "amountCny": 199,
      "display": "¥199 / 年",
      "termDays": 365,
      "sourceUnit": "元/年",
      "public": true
    },
    "status": {
      "sourceStatus": "正式销售",
      "downloadable": true,
      "effectiveStatus": "available",
      "label": "正式销售 · 已验证下载",
      "reason": "Windows 10/11 x64 公开包的文件大小、架构和 SHA-256 已完成核对。"
    },
    "trial": {
      "days": 30,
      "minutes": 43200,
      "display": "首次启动无需申请，按本机受保护时间自动体验 30 天",
      "state": "first-machine-thirty-day-offline",
      "source": "纯离线体验规则"
    },
    "download": {
      "state": "available",
      "publicLink": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-label-1.1.0/fangcun-label-imposition-1.1.0-win-x64-public.zip",
      "filename": "fangcun-label-imposition-1.1.0-win-x64-public.zip",
      "platform": "Windows 10/11 x64",
      "version": "1.1.0",
      "date": "2026-09-03",
      "verification": "verified",
      "bytes": 99319466,
      "displaySize": "94.7 MiB",
      "sha256": "0b2eb6a9b7499718881467e907c898527b1c24bfb7a3164e0a988f14b1c090c7",
      "sha256UppercaseInChecksum": "0B2EB6A9B7499718881467E907C898527B1C24BFB7A3164E0A988F14B1C090C7",
      "sha256CaseInsensitiveMatch": true,
      "releaseRecordPackage": "fangcun-label-imposition-1.1.0-win-x64-public.zip",
      "digitalSignature": "NotSigned",
      "localArchivePresent": false,
      "localArchiveNote": "公开包由 GitHub Release 提供；请完整解压，并保持 EXE 与 config.yaml 在同一目录。",
      "variants": [],
      "supportFiles": [
        {
          "title": "公开发布清单",
          "filename": "public-manifest.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-label-1.1.0/public-manifest.json",
          "format": "JSON",
          "bytes": 240100,
          "displaySize": "234.5 KiB",
          "buttonLabel": "下载公开发布清单"
        },
        {
          "title": "发布记录",
          "filename": "release-record.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-label-1.1.0/release-record.json",
          "format": "JSON",
          "bytes": 1099,
          "displaySize": "1.1 KiB",
          "buttonLabel": "下载发布记录"
        },
        {
          "title": "SHA-256 校验文件",
          "filename": "SHA256SUMS.txt",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-label-1.1.0/SHA256SUMS.txt",
          "format": "TXT",
          "bytes": 292,
          "displaySize": "292 B",
          "buttonLabel": "下载 SHA-256 校验文件"
        }
      ]
    },
    "media": {
      "video": "/assets/media/label-operation-synthetic-no-taskbar.mp4",
      "poster": "/assets/media/label-operation-synthetic-no-taskbar-poster.webp",
      "declared": true,
      "mode": "actual-operation-redacted",
      "redacted": true,
      "redactionMethod": "synthetic-demo-data",
      "silent": true,
      "sourceBuild": "2026-08-21 操作录屏",
      "operationLabel": "实际操作 · 虚构演示数据",
      "operationDescription": "基于实际操作录屏，使用虚构订单与样品数据，清晰展示参数录入、排版计算、结果导出与复核。",
      "operationCaption": "已去除无内容音轨和无关桌面片段；脱敏方式为替换演示数据，不对操作画面打码。",
      "fallback": "实际操作视频暂不可用；产品信息、下载与价格仍可正常查看。"
    },
    "workflow": {
      "input": [
        "Excel 数量表",
        "标签尺寸与版面容量",
        "冗余与成本参数"
      ],
      "process": [
        "读取同尺寸、多内容标签数量表",
        "给出版面、纸张、机器与余量建议",
        "导出员工可执行、负责人可复核的文件"
      ],
      "output": [
        "Word 排版说明",
        "Excel 计算明细",
        "可复核成本与余量"
      ]
    },
    "capabilityBoundary": "客户端在本地处理订单；首次启动在本机初始化离线试用，正式授权文件离线导入。官网不接收客户文件，也不公开真实订单。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": "查看详情",
      "productHeroPrimary": "查看下载与价格",
      "productHeroSecondary": "查看实际操作演示",
      "downloadPanel": "已核验下载 / Windows x64 / SHA-256",
      "downloadButton": "下载 Windows 10/11 x64 客户端 · 94.7 MiB",
      "recommended": {
        "primary": "下载客户端",
        "secondary": "查看实际操作演示",
        "nextStep": "下载对应系统版本，核对 SHA-256 后联系微信/电话 17734375651 获取产品授权"
      }
    }
  },
  {
    "id": "bleed",
    "route": "/products/bleed/",
    "name": "方寸有序胀色裁切",
    "shortName": "胀色裁切",
    "eyebrow": "CMYK BLEED & CUT",
    "statement": "读取 Excel 订单与单页或集成 PDF，自动完成胀色、裁切、拼版与印前复检。",
    "outcome": "串联订单处理与 PDF 输出",
    "price": {
      "amountCny": 799,
      "display": "¥799 / 年",
      "termDays": 365,
      "sourceUnit": "元/年",
      "public": true
    },
    "status": {
      "sourceStatus": "正式销售",
      "downloadable": true,
      "effectiveStatus": "available",
      "label": "正式销售 · 已验证下载",
      "reason": "Windows 10/11（x86 客户端，兼容 x86/x64）的版本、文件大小、架构与 SHA-256 已完成核对。"
    },
    "trial": {
      "days": 30,
      "minutes": 43200,
      "display": "首次启动无需申请，按本机受保护时间自动体验 30 天",
      "state": "first-machine-thirty-day-offline",
      "source": "纯离线体验规则"
    },
    "download": {
      "state": "available",
      "publicLink": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-bleed-1.2.12/fangcun-bleed-1.2.12-win-x86-public.zip",
      "filename": "fangcun-bleed-1.2.12-win-x86-public.zip",
      "platform": "Windows 10/11（x86 客户端，兼容 x86/x64）",
      "version": "1.2.12",
      "date": "2026-09-03",
      "verification": "verified",
      "bytes": 129301675,
      "displaySize": "123.3 MiB",
      "sha256": "c6db32beb25bf8f0e987b67f6dcd9dda8ed34706093bfe3ae4fbf0c8c0839f33",
      "sha256UppercaseInChecksum": "C6DB32BEB25BF8F0E987B67F6DCD9DDA8ED34706093BFE3AE4FBF0C8C0839F33",
      "sha256CaseInsensitiveMatch": true,
      "releaseRecordPackage": "fangcun-bleed-1.2.12-win-x86-public.zip",
      "digitalSignature": "NotSigned",
      "localArchivePresent": false,
      "localArchiveNote": "安装包由公开下载页提供，下载前可核对版本、大小与 SHA-256。",
      "supportFiles": [
        {
          "title": "公开发布清单",
          "filename": "public-manifest.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-bleed-1.2.12/public-manifest.json",
          "format": "JSON",
          "bytes": 78418,
          "displaySize": "76.6 KiB",
          "buttonLabel": "下载公开发布清单"
        },
        {
          "title": "发布记录",
          "filename": "release-record.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-bleed-1.2.12/release-record.json",
          "format": "JSON",
          "bytes": 2747,
          "displaySize": "2.7 KiB",
          "buttonLabel": "下载发布记录"
        },
        {
          "title": "SHA-256 校验文件",
          "filename": "SHA256SUMS.txt",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-bleed-1.2.12/SHA256SUMS.txt",
          "format": "TXT",
          "bytes": 279,
          "displaySize": "279 B",
          "buttonLabel": "下载 SHA-256 校验文件"
        }
      ]
    },
    "media": {
      "video": "/assets/media/bleed-operation-sanitized-no-taskbar.mp4",
      "poster": "/assets/media/bleed-operation-sanitized-no-taskbar-poster.webp",
      "declared": true,
      "mode": "actual-operation-redacted",
      "redacted": true,
      "redactionMethod": "synthetic-demo-data",
      "silent": true,
      "sourceBuild": "1.2.11",
      "operationLabel": "实际操作 · 虚构演示数据",
      "operationDescription": "录制自 1.2.11 实际操作流程，使用虚构订单、条码与品牌数据，清晰展示输入、排版、导出与复检。",
      "operationCaption": "已去除无内容音轨和无关桌面片段；脱敏方式为替换演示数据，不对操作画面打码。",
      "fallback": "实际操作视频暂不可用；产品信息、下载与价格仍可正常查看。"
    },
    "workflow": {
      "input": [
        "Excel .xls / .xlsx 订单",
        "单页或集成 PDF",
        "版面、胀色与裁切参数"
      ],
      "process": [
        "识别多工作表表头并汇总标签数量",
        "匹配单页或集成 PDF 并优化多版面",
        "生成 CMYK 胀色、外置裁切标记及复检报告"
      ],
      "output": [
        "CMYK 排版 PDF",
        "复检报告与操作日志",
        "可继续调整的项目文件"
      ]
    },
    "capabilityBoundary": "官网提供已核验的公开版客户端；核心处理与 30 天试用状态都在本机完成，正式授权文件离线导入，客户资料不会上传官网。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": "查看详情",
      "productHeroPrimary": "查看下载与价格",
      "productHeroSecondary": "查看实际操作演示",
      "downloadPanel": "已核验下载 / 方寸有序胀色裁切 1.2.12 / SHA-256",
      "downloadButton": "下载 Windows 10/11 客户端（x86，兼容 x86/x64） · 123.3 MiB",
      "recommended": {
        "primary": "下载客户端",
        "secondary": "查看实际操作演示",
        "nextStep": "核对版本 1.2.12 与 SHA-256 后联系微信/电话 17734375651 完成授权"
      }
    }
  },
  {
    "id": "multisize-bleed",
    "route": "/products/multisize-bleed/",
    "name": "方寸有序多尺寸胀色裁切",
    "shortName": "多尺寸胀色裁切",
    "eyebrow": "MULTI-SIZE BLEED & CUT",
    "statement": "在大幅 PDF 中自动识别并提取单张标签，再对多尺寸标签进行胀色裁切排版。",
    "outcome": "从大图识别到多尺寸生产排版",
    "price": {
      "amountCny": 1499,
      "display": "¥1499 / 年",
      "termDays": 365,
      "sourceUnit": "元/年",
      "public": true
    },
    "status": {
      "sourceStatus": "正式销售",
      "downloadable": true,
      "effectiveStatus": "available",
      "label": "正式销售 · 已验证下载",
      "reason": "Windows x64 公开包的版本、文件大小、架构与 SHA-256 已完成核对。"
    },
    "trial": {
      "days": 30,
      "minutes": 43200,
      "display": "首次启动无需申请，按本机受保护时间自动体验 30 天",
      "state": "first-machine-thirty-day-offline",
      "source": "纯离线体验规则"
    },
    "download": {
      "state": "available",
      "publicLink": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-multisize-0.10.0/fangcun-multisize-bleed-cut-0.10.0-win-x64-public.zip",
      "filename": "fangcun-multisize-bleed-cut-0.10.0-win-x64-public.zip",
      "platform": "Windows x64",
      "version": "0.10.0",
      "date": "2026-09-03",
      "verification": "verified",
      "bytes": 137218738,
      "displaySize": "130.9 MiB",
      "sha256": "61e8c8a3377ccc9bacb9ebef3b7391f469bed03e338a541b5723057374e69a83",
      "sha256UppercaseInChecksum": "61E8C8A3377CCC9BACB9EBEF3B7391F469BED03E338A541B5723057374E69A83",
      "sha256CaseInsensitiveMatch": true,
      "releaseRecordPackage": "fangcun-multisize-bleed-cut-0.10.0-win-x64-public.zip",
      "digitalSignature": "NotSigned",
      "localArchivePresent": false,
      "localArchiveNote": "公开包由 GitHub Release 提供；请完整解压后启动，并在下载后核对 SHA-256。",
      "variants": [],
      "supportFiles": [
        {
          "title": "公开发布清单",
          "filename": "public-manifest.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-multisize-0.10.0/public-manifest.json",
          "format": "JSON",
          "bytes": 78637,
          "displaySize": "76.8 KiB",
          "buttonLabel": "下载公开发布清单"
        },
        {
          "title": "发布记录",
          "filename": "release-record.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-multisize-0.10.0/release-record.json",
          "format": "JSON",
          "bytes": 2841,
          "displaySize": "2.8 KiB",
          "buttonLabel": "下载发布记录"
        },
        {
          "title": "SHA-256 校验文件",
          "filename": "SHA256SUMS.txt",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-multisize-0.10.0/SHA256SUMS.txt",
          "format": "TXT",
          "bytes": 293,
          "displaySize": "293 B",
          "buttonLabel": "下载 SHA-256 校验文件"
        }
      ]
    },
    "media": {
      "video": null,
      "poster": null,
      "declared": false,
      "mode": "not-published",
      "fallback": "当前页面先公开产品能力、价格与已验证下载；操作演示将在完成公开素材核验后补充。"
    },
    "workflow": {
      "input": [
        "大幅/大图单页 PDF 或已分割单页 PDF",
        "Excel .xls / .xlsx 订单",
        "版面与胀色裁切参数"
      ],
      "process": [
        "自动识别大图中的独立标签区域，并批量提取单张标签 PDF",
        "按多尺寸标签统一规划版面，完成胀色与有效区外裁切标输出",
        "自动比较大机器、小机器及混用版面，并汇总各版打印份数"
      ],
      "output": [
        "单张标签 PDF",
        "多尺寸胀色裁切排版 PDF",
        "打印份数与复核报告"
      ]
    },
    "capabilityBoundary": "方寸有序多尺寸胀色裁切是独立产品，使用独立版本、离线试用与年度授权；大图识别、单张提取和多尺寸排版均在本地完成。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": "查看详情",
      "productHeroPrimary": "查看下载与价格",
      "productHeroSecondary": "查看工作流",
      "downloadPanel": "已核验下载 / 多尺寸胀色裁切 0.10.0 / SHA-256",
      "downloadButton": "下载 Windows x64 客户端 · 130.9 MiB",
      "recommended": {
        "primary": "下载客户端",
        "secondary": "查看工作流",
        "nextStep": "下载 0.10.0 Windows x64 客户端，核对 SHA-256 后联系微信/电话 17734375651 完成授权"
      }
    }
  },
  {
    "id": "pdf",
    "route": "/products/pdf/",
    "name": "方寸 PDF 配印助手",
    "shortName": "PDF 配印",
    "eyebrow": "PDF PRINT WORKFLOW",
    "statement": "把 Excel、CSV 或文字页数要求，转换成可追溯的 PDF 配印任务。",
    "outcome": "整理成可复核任务",
    "price": {
      "amountCny": 599,
      "display": "¥599 / 年",
      "termDays": 365,
      "sourceUnit": "元/年",
      "public": true
    },
    "status": {
      "sourceStatus": "正式销售",
      "downloadable": true,
      "effectiveStatus": "available",
      "label": "正式销售 · 已验证下载",
      "reason": "Windows 10/11 x64 公开包的文件大小、架构和 SHA-256 已完成核对。"
    },
    "trial": {
      "days": 30,
      "minutes": 43200,
      "display": "首次启动无需申请，按本机受保护时间自动体验 30 天",
      "state": "first-machine-thirty-day-offline",
      "source": "纯离线体验规则"
    },
    "download": {
      "state": "available",
      "publicLink": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-pdf-1.1.0/fangcun-pdf-print-assistant-1.1.0-win-x64-public.zip",
      "filename": "fangcun-pdf-print-assistant-1.1.0-win-x64-public.zip",
      "platform": "Windows 10/11 x64",
      "version": "1.1.0",
      "date": "2026-09-03",
      "verification": "verified",
      "bytes": 101889079,
      "displaySize": "97.2 MiB",
      "sha256": "921927f54bfc856e5b6eaec1ee199f27659514223bce8305ca3d859aafa5015c",
      "sha256UppercaseInChecksum": "921927F54BFC856E5B6EAEC1EE199F27659514223BCE8305CA3D859AAFA5015C",
      "sha256CaseInsensitiveMatch": true,
      "releaseRecordPackage": "fangcun-pdf-print-assistant-1.1.0-win-x64-public.zip",
      "digitalSignature": "NotSigned",
      "localArchivePresent": false,
      "localArchiveNote": "公开包由 GitHub Release 提供；请完整解压，并保持 EXE 与 config.yaml 在同一目录。",
      "variants": [],
      "supportFiles": [
        {
          "title": "公开发布清单",
          "filename": "public-manifest.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-pdf-1.1.0/public-manifest.json",
          "format": "JSON",
          "bytes": 372644,
          "displaySize": "363.9 KiB",
          "buttonLabel": "下载公开发布清单"
        },
        {
          "title": "发布记录",
          "filename": "release-record.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-pdf-1.1.0/release-record.json",
          "format": "JSON",
          "bytes": 1097,
          "displaySize": "1.1 KiB",
          "buttonLabel": "下载发布记录"
        },
        {
          "title": "SHA-256 校验文件",
          "filename": "SHA256SUMS.txt",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-pdf-1.1.0/SHA256SUMS.txt",
          "format": "TXT",
          "bytes": 292,
          "displaySize": "292 B",
          "buttonLabel": "下载 SHA-256 校验文件"
        }
      ]
    },
    "media": {
      "video": "/assets/media/pdf-demo.mp4",
      "poster": "/assets/media/pdf-poster.webp",
      "declared": true,
      "fallback": null
    },
    "workflow": {
      "input": [
        "Excel / CSV",
        "文字页数要求",
        "原始 PDF"
      ],
      "process": [
        "解析每页目标份数与冲突规则",
        "生成规范任务表并按要求加工 PDF",
        "逐页记录处理结果，便于复核追踪"
      ],
      "output": [
        "规范化任务 Excel",
        "加工后 PDF",
        "逐页审计 Excel"
      ]
    },
    "capabilityBoundary": "客户端在本地完成 PDF 配印；首次启动在本机初始化离线试用，正式授权文件离线导入。官网不接收客户文件上传。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": "查看详情",
      "productHeroPrimary": "查看下载与价格",
      "productHeroSecondary": "体验模拟演示",
      "downloadPanel": "已核验下载 / Windows x64 / SHA-256",
      "downloadButton": "下载 Windows 10/11 x64 客户端 · 97.2 MiB",
      "recommended": {
        "primary": "下载客户端",
        "secondary": "体验模拟演示",
        "nextStep": "下载对应系统版本，核对 SHA-256 后联系微信/电话 17734375651 获取产品授权"
      }
    }
  },
  {
    "id": "accounting",
    "route": "/products/accounting/",
    "name": "方寸有序记账软件",
    "shortName": "记账软件",
    "eyebrow": "ACCOUNTING WORKFLOW",
    "statement": "把进货、销售、收付款与财务报表，整理成同一企业账套中可追溯的记账流程。",
    "outcome": "串联进销、结算与财务报表",
    "price": {
      "amountCny": 999,
      "display": "¥999 / 账号 / 年",
      "termDays": 365,
      "sourceUnit": "元/账号/年",
      "public": true
    },
    "status": {
      "sourceStatus": "正式销售",
      "downloadable": true,
      "effectiveStatus": "available",
      "label": "正式销售 · 已验证下载",
      "reason": "Windows 10/11 x64 公开包的版本、文件大小、架构与 SHA-256 已完成核对。"
    },
    "trial": {
      "days": 30,
      "minutes": 43200,
      "display": "首次启动无需申请，按本机受保护时间自动体验 30 天",
      "state": "first-machine-thirty-day-offline",
      "source": "纯离线体验规则"
    },
    "download": {
      "state": "available",
      "publicLink": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-accounting-0.8.0/fangcun-accounting-0.8.0-win-x64-public.zip",
      "filename": "fangcun-accounting-0.8.0-win-x64-public.zip",
      "platform": "Windows 10/11 x64",
      "version": "0.8.0",
      "date": "2026-09-03",
      "verification": "verified",
      "bytes": 92510616,
      "displaySize": "88.2 MiB",
      "sha256": "bdf5e898eb08bd4e34dde9b071471bb02bf9b184099ba70c5313e80b058f0da9",
      "sha256UppercaseInChecksum": "BDF5E898EB08BD4E34DDE9B071471BB02BF9B184099BA70C5313E80B058F0DA9",
      "sha256CaseInsensitiveMatch": true,
      "releaseRecordPackage": "fangcun-accounting-0.8.0-win-x64-public.zip",
      "digitalSignature": "NotSigned",
      "localArchivePresent": false,
      "localArchiveNote": "公开包由 GitHub Release 提供；请完整解压后启动，并在下载后核对 SHA-256。",
      "variants": [],
      "supportFiles": [
        {
          "title": "公开发布清单",
          "filename": "public-manifest.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-accounting-0.8.0/public-manifest.json",
          "format": "JSON",
          "bytes": 58863,
          "displaySize": "57.5 KiB",
          "buttonLabel": "下载公开发布清单"
        },
        {
          "title": "发布记录",
          "filename": "release-record.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-accounting-0.8.0/release-record.json",
          "format": "JSON",
          "bytes": 1257,
          "displaySize": "1.2 KiB",
          "buttonLabel": "下载发布记录"
        },
        {
          "title": "SHA-256 校验文件",
          "filename": "SHA256SUMS.txt",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-accounting-0.8.0/SHA256SUMS.txt",
          "format": "TXT",
          "bytes": 286,
          "displaySize": "286 B",
          "buttonLabel": "下载 SHA-256 校验文件"
        }
      ]
    },
    "media": {
      "video": null,
      "poster": null,
      "declared": false,
      "mode": "not-published",
      "fallback": "当前页面先公开产品能力、价格与已验证下载；操作演示将在完成公开素材核验后补充。"
    },
    "workflow": {
      "input": [
        "客户、供应商与商品资料",
        "进货、销售与收付款记录",
        "期初余额与报表要求"
      ],
      "process": [
        "登记进货与销售，关联往来对象和商品",
        "记录收付款并跟踪应收应付账龄",
        "生成账簿、报表与审计记录"
      ],
      "output": [
        "应收应付与账龄",
        "总账、试算平衡与利润表/资产负债表",
        "可追溯凭证与导出报表"
      ]
    },
    "capabilityBoundary": "一个账号对应一个企业账套主体；离线授权按账号、机器码与年度期限导入，授权判定与可选数据同步相互独立。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": "查看详情",
      "productHeroPrimary": "查看下载与价格",
      "productHeroSecondary": "查看工作流",
      "downloadPanel": "已核验下载 / 记账软件 0.8.0 / SHA-256",
      "downloadButton": "下载 Windows 10/11 x64 客户端 · 88.2 MiB",
      "recommended": {
        "primary": "下载客户端",
        "secondary": "查看工作流",
        "nextStep": "下载 0.8.0 对应系统客户端，核对 SHA-256 后按账号年度授权说明完成授权"
      }
    }
  },
  {
    "id": "gtin-pdf",
    "route": "/products/gtin-pdf/",
    "name": "方寸有序条码匹配",
    "shortName": "条码匹配",
    "eyebrow": "GTIN & PDF MATCHING",
    "statement": "把 Excel 产品资料与 PDF 页面按条码和产品属性进行匹配，整理成可复核的结果表与合并 PDF，并单独标明未识别的 PDF。",
    "outcome": "串联条码匹配、人工复核与 PDF 整理",
    "price": {
      "amountCny": null,
      "display": "价格咨询",
      "termDays": 365,
      "sourceUnit": "年度授权",
      "public": false
    },
    "status": {
      "sourceStatus": "正式销售",
      "downloadable": true,
      "effectiveStatus": "available",
      "label": "正式销售 · 已验证下载",
      "reason": "产品兼容版本 1.1.0、Windows x64 文件版本 1.1.0.6 的公开包版本、文件大小、ZIP 完整性与 SHA-256 已完成核对。"
    },
    "trial": {
      "days": 30,
      "minutes": 43200,
      "display": "首次启动无需申请，按本机受保护时间自动体验 30 天",
      "state": "first-machine-thirty-day-offline",
      "source": "纯离线体验规则"
    },
    "download": {
      "state": "available",
      "publicLink": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-gtin-pdf-1.1.0.6/fangcun-gtin-pdf-integrator-1.1.0.6-win-x64-public.zip",
      "filename": "fangcun-gtin-pdf-integrator-1.1.0.6-win-x64-public.zip",
      "platform": "Windows x64",
      "version": "1.1.0",
      "fileVersion": "1.1.0.6",
      "date": "2026-09-04",
      "verification": "verified",
      "bytes": 167570551,
      "displaySize": "159.8 MiB",
      "sha256": "255540fd8934fd6ef6db2635f931a5df612f1b2ba4f15f00459b82df34ef5aac",
      "sha256UppercaseInChecksum": "255540FD8934FD6EF6DB2635F931A5DF612F1B2BA4F15F00459B82DF34EF5AAC",
      "sha256CaseInsensitiveMatch": true,
      "releaseRecordPackage": "fangcun-gtin-pdf-integrator-1.1.0.6-win-x64-public.zip",
      "digitalSignature": "NotSigned",
      "localArchivePresent": false,
      "localArchiveNote": "公开包由 GitHub Release 提供；请完整解压后启动，并在下载后核对 SHA-256。",
      "variants": [],
      "supportFiles": [
        {
          "title": "公开发布清单",
          "filename": "public-manifest.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-gtin-pdf-1.1.0.6/public-manifest.json",
          "format": "JSON",
          "bytes": 1584,
          "displaySize": "1.5 KiB",
          "buttonLabel": "下载公开发布清单"
        },
        {
          "title": "发布记录",
          "filename": "release-record.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-gtin-pdf-1.1.0.6/release-record.json",
          "format": "JSON",
          "bytes": 1717,
          "displaySize": "1.7 KiB",
          "buttonLabel": "下载发布记录"
        },
        {
          "title": "SHA-256 校验文件",
          "filename": "SHA256SUMS.txt",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-gtin-pdf-1.1.0.6/SHA256SUMS.txt",
          "format": "TXT",
          "bytes": 294,
          "displaySize": "294 B",
          "buttonLabel": "下载 SHA-256 校验文件"
        }
      ]
    },
    "media": {
      "video": null,
      "poster": null,
      "declared": false,
      "mode": "not-published",
      "fallback": "当前页面先公开产品能力、价格状态与已验证下载；操作演示将在完成公开素材核验后补充。"
    },
    "workflow": {
      "input": [
        "Excel 产品或订单资料",
        "待匹配的 PDF 页面",
        "条码与产品属性规则"
      ],
      "process": [
        "提取 GTIN、条码与产品属性",
        "先按标识符精确匹配，再按属性进行匹配",
        "扫描全部 PDF 并记录识别、重复、歧义与扫描失败状态",
        "将未解决项目留给人工复核"
      ],
      "output": [
        "分工作表匹配结果 Excel",
        "按结果合并的 PDF",
        "未解决项目与复核明细",
        "根级未识别PDF文件夹（保留原相对路径）",
        "未识别PDF清单.xlsx（未识别 / 全部PDF状态）",
        "完成时显示 PDF 扫描、识别、未识别数量"
      ]
    },
    "capabilityBoundary": "Excel 与 PDF 在本地完成读取、匹配和输出；试用与年度授权均为纯离线流程，业务资料不上传官网。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": "查看详情",
      "productHeroPrimary": "查看下载与授权",
      "productHeroSecondary": "查看工作流",
      "downloadPanel": "已核验下载 / 产品兼容版本 1.1.0 / Windows 文件版本 1.1.0.6 / SHA-256",
      "downloadButton": "下载 Windows x64 客户端 · 文件版本 1.1.0.6 · 159.8 MiB",
      "recommended": {
        "primary": "下载客户端",
        "secondary": "查看工作流",
        "nextStep": "下载产品兼容版本 1.1.0 的 Windows x64 客户端（文件版本 1.1.0.6），核对 SHA-256 后可直接开启 30 天纯离线试用"
      }
    }
  },
  {
    "id": "color-size",
    "route": "/products/color-size/",
    "name": "方寸有序颜色尺寸提取",
    "shortName": "颜色尺寸提取",
    "eyebrow": "EXCEL COLOR & SIZE",
    "statement": "批量读取 Excel 中的颜色与尺寸文本，翻译中文颜色并提取英尺、厘米尺寸，生成不覆盖原文件的新结果表。",
    "outcome": "把颜色翻译与尺寸提取整理成新表格",
    "price": {
      "amountCny": null,
      "display": "价格咨询",
      "termDays": 365,
      "sourceUnit": "年度授权",
      "public": false
    },
    "status": {
      "sourceStatus": "正式销售",
      "downloadable": true,
      "effectiveStatus": "available",
      "label": "正式销售 · 已验证下载",
      "reason": "Windows x64 公开包的版本、文件大小、自检结果、ZIP 完整性与 SHA-256 已完成核对。"
    },
    "trial": {
      "days": 30,
      "minutes": 43200,
      "display": "首次启动无需申请，按本机受保护时间自动体验 30 天",
      "state": "first-machine-thirty-day-offline",
      "source": "纯离线体验规则"
    },
    "download": {
      "state": "available",
      "publicLink": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-color-size-1.0.2/fangcun-color-size-extractor-1.0.2-win-x64-public.zip",
      "filename": "fangcun-color-size-extractor-1.0.2-win-x64-public.zip",
      "platform": "Windows x64",
      "version": "1.0.2",
      "date": "2026-09-04",
      "verification": "verified",
      "bytes": 162058084,
      "displaySize": "154.6 MiB",
      "sha256": "761595f0ede7447decf51727f48cee6b838a7abaefa35a3ac5eee996ece6aaab",
      "sha256UppercaseInChecksum": "761595F0EDE7447DECF51727F48CEE6B838A7ABAEFA35A3AC5EEE996ECE6AAAB",
      "sha256CaseInsensitiveMatch": true,
      "releaseRecordPackage": "fangcun-color-size-extractor-1.0.2-win-x64-public.zip",
      "digitalSignature": "NotSigned",
      "localArchivePresent": false,
      "localArchiveNote": "公开包由 GitHub Release 提供；请完整解压后启动，并在下载后核对 SHA-256。",
      "variants": [],
      "supportFiles": [
        {
          "title": "公开发布清单",
          "filename": "public-manifest.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-color-size-1.0.2/public-manifest.json",
          "format": "JSON",
          "bytes": 1342,
          "displaySize": "1.3 KiB",
          "buttonLabel": "下载公开发布清单"
        },
        {
          "title": "发布记录",
          "filename": "release-record.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-color-size-1.0.2/release-record.json",
          "format": "JSON",
          "bytes": 1744,
          "displaySize": "1.7 KiB",
          "buttonLabel": "下载发布记录"
        },
        {
          "title": "SHA-256 校验文件",
          "filename": "SHA256SUMS.txt",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-color-size-1.0.2/SHA256SUMS.txt",
          "format": "TXT",
          "bytes": 293,
          "displaySize": "293 B",
          "buttonLabel": "下载 SHA-256 校验文件"
        }
      ]
    },
    "media": {
      "video": null,
      "poster": null,
      "declared": false,
      "mode": "not-published",
      "fallback": "当前页面先公开产品能力、价格状态与已验证下载；操作演示将在完成公开素材核验后补充。"
    },
    "workflow": {
      "input": [
        "一个或多个 .xlsx 工作簿",
        "包含颜色和尺寸的文本列",
        "待保留的原始数据"
      ],
      "process": [
        "识别并翻译中文颜色名称",
        "提取英尺与厘米尺寸表达",
        "将结果写入新列并保留原始工作簿"
      ],
      "output": [
        "颜色英文翻译列",
        "英尺与厘米尺寸列",
        "不覆盖原文件的新 Excel 结果"
      ]
    },
    "capabilityBoundary": "Excel 数据在本地读取和生成新结果，原始工作簿不被覆盖；试用与年度授权均为纯离线流程。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": "查看详情",
      "productHeroPrimary": "查看下载与授权",
      "productHeroSecondary": "查看工作流",
      "downloadPanel": "已核验下载 / 颜色尺寸提取 1.0.2 / SHA-256",
      "downloadButton": "下载 Windows x64 客户端 · 154.6 MiB",
      "recommended": {
        "primary": "下载客户端",
        "secondary": "查看工作流",
        "nextStep": "下载 1.0.2 Windows x64 客户端，核对 SHA-256 后可直接开启 30 天纯离线试用"
      }
    }
  }
];

export const PRODUCTS_BY_ID = Object.fromEntries(PRODUCTS.map((product) => [product.id, product]));

export const PRODUCT_STATUS = Object.freeze({
  available: '正式销售 · 已验证下载',
  validation: '正式销售 · 客户端发布确认中',
});

export const PRODUCT_STATUS_DESCRIPTIONS = Object.freeze({
  available: '客户端与发布校验文件均可直接下载。',
  validation: '客户端仍在完成发布确认；公开文件以页面记录为准。',
});

export const products = PRODUCTS;
export const productsById = PRODUCTS_BY_ID;

export function getProduct(productId) {
  return PRODUCTS_BY_ID[productId] ?? null;
}

export function productAction(product) {
  if (!product) return null;
  if (product.status.effectiveStatus === 'available' && product.download.publicLink) {
    return { label: product.cta.recommended.primary, href: product.download.publicLink, external: true };
  }
  return { label: product.cta.recommended.primary, href: product.route, external: false };
}

export function getProductPublicFiles(product) {
  if (!product) return [];
  const files = [];
  if (product.download?.publicLink) {
    files.push({
      kind: 'client',
      title: `${product.name} ${product.download.version}${product.download.fileVersion ? `（Windows 文件版本 ${product.download.fileVersion}）` : ''} Windows 客户端`,
      description: `${product.download.platform} · ${product.download.displaySize}`,
      filename: product.download.filename,
      path: product.download.publicLink,
      format: 'ZIP',
      displaySize: product.download.displaySize,
      buttonLabel: product.cta.downloadButton ?? '下载客户端',
      external: true,
    });
  }
  for (const variant of product.download?.variants ?? []) {
    files.push({
      kind: 'client-variant',
      title: `${product.name} ${variant.platform} 客户端`,
      description: `${variant.platform} · ${variant.displaySize}`,
      filename: variant.filename,
      path: variant.publicLink,
      format: 'ZIP',
      displaySize: variant.displaySize,
      buttonLabel: variant.buttonLabel ?? `下载 ${variant.platform} 客户端`,
      external: true,
    });
  }
  for (const file of product.download?.supportFiles ?? []) {
    files.push({ ...file, kind: 'release-record', external: true });
  }
  return files;
}
