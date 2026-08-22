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
      "reason": "Windows 10/11 与 Windows 7 x64 公开包的文件大小、架构和 SHA-256 已完成核对。"
    },
    "trial": {
      "minutes": 60,
      "display": "每台电脑首次免费体验 1 小时",
      "state": "first-device-one-hour",
      "source": "公开体验规则"
    },
    "download": {
      "state": "available",
      "publicLink": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-label-20260821/fangcun-label-imposition-20260821-win10-11-x64-public.zip",
      "filename": "fangcun-label-imposition-20260821-win10-11-x64-public.zip",
      "platform": "Windows 10/11 x64",
      "version": "2026.08.21",
      "date": "2026-08-21",
      "verification": "verified",
      "bytes": 42393335,
      "displaySize": "40.4 MiB",
      "sha256": "0e87aa66a85cf5e92c6a9dca7aad41d4594ce0d0f4905eff7ef238a8526a9db6",
      "sha256UppercaseInChecksum": "0E87AA66A85CF5E92C6A9DCA7AAD41D4594CE0D0F4905EFF7EF238A8526A9DB6",
      "sha256CaseInsensitiveMatch": true,
      "releaseRecordPackage": "fangcun-label-imposition-20260821-win10-11-x64-public.zip",
      "digitalSignature": "NotSigned",
      "localArchivePresent": false,
      "localArchiveNote": "公开包由 GitHub Release 提供；请完整解压，并保持 EXE 与 config.yaml 在同一目录。",
      "variants": [
        {
          "title": "Windows 7 x64 客户端",
          "publicLink": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-label-20260821/fangcun-label-imposition-20260821-win7-x64-public.zip",
          "filename": "fangcun-label-imposition-20260821-win7-x64-public.zip",
          "platform": "Windows 7 x64",
          "runtime": "Python 3.8.10",
          "bytes": 37613323,
          "displaySize": "35.9 MiB",
          "sha256": "638f563c6d1b7aeb696eb8466b7cb4e1bbff533ab69e798df07b36d989d31884",
          "buttonLabel": "下载 Windows 7 x64 客户端"
        }
      ],
      "supportFiles": [
        {
          "title": "公开发布清单",
          "filename": "public-manifest.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-label-20260821/public-manifest.json",
          "format": "JSON",
          "bytes": 2286,
          "displaySize": "2.2 KiB",
          "buttonLabel": "下载公开发布清单"
        },
        {
          "title": "发布记录",
          "filename": "release-record.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-label-20260821/release-record.json",
          "format": "JSON",
          "bytes": 1387,
          "displaySize": "1.4 KiB",
          "buttonLabel": "下载发布记录"
        },
        {
          "title": "SHA-256 校验文件",
          "filename": "SHA256SUMS.txt",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-label-20260821/SHA256SUMS.txt",
          "format": "TXT",
          "bytes": 246,
          "displaySize": "246 B",
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
    "capabilityBoundary": "客户端在本地处理订单；首次启动进入授权激活界面。官网不接收客户文件，也不公开真实订单。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": "查看详情",
      "productHeroPrimary": "查看下载与价格",
      "productHeroSecondary": "查看实际操作演示",
      "downloadPanel": "已核验下载 / Windows x64 / SHA-256",
      "downloadButton": "下载 Windows 10/11 x64 客户端 · 40.4 MiB",
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
      "reason": "Windows x86 公开包的版本、文件大小与 SHA-256 已完成核对。"
    },
    "trial": {
      "minutes": 60,
      "display": "每台电脑首次免费体验 1 小时",
      "state": "first-device-one-hour",
      "source": "公开体验规则"
    },
    "download": {
      "state": "available",
      "publicLink": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-bleed-1.2.11/fangcun-bleed-cutting-1.2.11-win-x86-public.zip",
      "filename": "fangcun-bleed-cutting-1.2.11-win-x86-public.zip",
      "platform": "win-x86",
      "version": "1.2.11",
      "date": "2026-08-17",
      "verification": "verified",
      "bytes": 67741703,
      "displaySize": "64.6 MB",
      "sha256": "6b213c32a0d2c124d3364b21b4f8d9c6c5f4f16323aae01a130eac34c4fbec54",
      "sha256UppercaseInChecksum": "6B213C32A0D2C124D3364B21B4F8D9C6C5F4F16323AAE01A130EAC34C4FBEC54",
      "sha256CaseInsensitiveMatch": true,
      "releaseRecordPackage": "方寸有序胀色裁切-1.2.11-win-x86-官网公开包.zip",
      "localArchivePresent": false,
      "localArchiveNote": "安装包由公开下载页提供，下载前可核对版本、大小与 SHA-256。",
      "supportFiles": [
        {
          "title": "公开发布清单",
          "filename": "public-manifest.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-bleed-1.2.11/public-manifest.json",
          "format": "JSON",
          "bytes": 86348,
          "displaySize": "84.3 KB",
          "buttonLabel": "下载公开发布清单"
        },
        {
          "title": "发布记录",
          "filename": "release-record.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-bleed-1.2.11/release-record.json",
          "format": "JSON",
          "bytes": 244,
          "displaySize": "244 B",
          "buttonLabel": "下载发布记录"
        },
        {
          "title": "SHA-256 校验文件",
          "filename": "SHA256SUMS.txt",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-bleed-1.2.11/SHA256SUMS.txt",
          "format": "TXT",
          "bytes": 130,
          "displaySize": "130 B",
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
    "capabilityBoundary": "官网提供已核验的公开版客户端；核心处理在本地完成，客户资料不会上传官网。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": "查看详情",
      "productHeroPrimary": "查看下载与价格",
      "productHeroSecondary": "查看实际操作演示",
      "downloadPanel": "已核验下载 / 方寸有序胀色裁切 / SHA-256",
      "downloadButton": "Windows 32 / 64 位 · x86 兼容版 · 64.6 MB",
      "recommended": {
        "primary": "下载客户端",
        "secondary": "查看实际操作演示",
        "nextStep": "核对版本 1.2.11 与 SHA-256 后联系微信/电话 17734375651 完成授权"
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
      "minutes": 60,
      "display": "每台电脑首次免费体验 1 小时",
      "state": "first-device-one-hour",
      "source": "公开体验规则"
    },
    "download": {
      "state": "available",
      "publicLink": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-multisize-0.9.0/fangcun-multisize-bleed-cut-0.9.0-win-x64-public.zip",
      "filename": "fangcun-multisize-bleed-cut-0.9.0-win-x64-public.zip",
      "platform": "Windows x64",
      "version": "0.9.0",
      "date": "2026-08-22",
      "verification": "verified",
      "bytes": 70716210,
      "displaySize": "67.4 MiB",
      "sha256": "ebde59fc1fc1e8e13cb60ef3c86a1a504045e2e2eb1d28fd3b755bf27a1e8e23",
      "sha256UppercaseInChecksum": "EBDE59FC1FC1E8E13CB60EF3C86A1A504045E2E2EB1D28FD3B755BF27A1E8E23",
      "sha256CaseInsensitiveMatch": true,
      "releaseRecordPackage": "fangcun-multisize-bleed-cut-0.9.0-win-x64-public.zip",
      "digitalSignature": "NotSigned",
      "localArchivePresent": false,
      "localArchiveNote": "公开包由 GitHub Release 提供；请完整解压后启动，并在下载后核对 SHA-256。",
      "variants": [],
      "supportFiles": [
        {
          "title": "公开发布清单",
          "filename": "public-manifest.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-multisize-0.9.0/public-manifest.json",
          "format": "JSON",
          "bytes": 62406,
          "displaySize": "60.9 KiB",
          "buttonLabel": "下载公开发布清单"
        },
        {
          "title": "发布记录",
          "filename": "release-record.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-multisize-0.9.0/release-record.json",
          "format": "JSON",
          "bytes": 1192,
          "displaySize": "1.2 KiB",
          "buttonLabel": "下载发布记录"
        },
        {
          "title": "SHA-256 校验文件",
          "filename": "SHA256SUMS.txt",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-multisize-0.9.0/SHA256SUMS.txt",
          "format": "TXT",
          "bytes": 119,
          "displaySize": "119 B",
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
    "capabilityBoundary": "方寸有序多尺寸胀色裁切是独立产品，使用独立版本与下载；大图识别、单张提取和多尺寸排版均在本地完成。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": "查看详情",
      "productHeroPrimary": "查看下载与价格",
      "productHeroSecondary": "查看工作流",
      "downloadPanel": "已核验下载 / 多尺寸胀色裁切 0.9.0 / SHA-256",
      "downloadButton": "下载 Windows x64 客户端 · 67.4 MiB",
      "recommended": {
        "primary": "下载客户端",
        "secondary": "查看工作流",
        "nextStep": "下载 0.9.0 Windows x64 客户端，核对 SHA-256 后联系微信/电话 17734375651 完成授权"
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
      "reason": "Windows 10/11 与 Windows 7 x64 公开包的文件大小、架构和 SHA-256 已完成核对。"
    },
    "trial": {
      "minutes": 60,
      "display": "每台电脑首次免费体验 1 小时",
      "state": "first-device-one-hour",
      "source": "公开体验规则"
    },
    "download": {
      "state": "available",
      "publicLink": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-pdf-20260821/fangcun-pdf-print-assistant-20260821-win10-11-x64-public.zip",
      "filename": "fangcun-pdf-print-assistant-20260821-win10-11-x64-public.zip",
      "platform": "Windows 10/11 x64",
      "version": "2026.08.21",
      "date": "2026-08-21",
      "verification": "verified",
      "bytes": 42393229,
      "displaySize": "40.4 MiB",
      "sha256": "6c3cda6d87774168841b016d681fbd0cd9a4749973570631612a481872a1778a",
      "sha256UppercaseInChecksum": "6C3CDA6D87774168841B016D681FBD0CD9A4749973570631612A481872A1778A",
      "sha256CaseInsensitiveMatch": true,
      "releaseRecordPackage": "fangcun-pdf-print-assistant-20260821-win10-11-x64-public.zip",
      "digitalSignature": "NotSigned",
      "localArchivePresent": false,
      "localArchiveNote": "公开包由 GitHub Release 提供；请完整解压，并保持 EXE 与 config.yaml 在同一目录。",
      "variants": [
        {
          "title": "Windows 7 x64 客户端",
          "publicLink": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-pdf-20260821/fangcun-pdf-print-assistant-20260821-win7-x64-public.zip",
          "filename": "fangcun-pdf-print-assistant-20260821-win7-x64-public.zip",
          "platform": "Windows 7 x64",
          "runtime": "Python 3.8.10",
          "bytes": 37613265,
          "displaySize": "35.9 MiB",
          "sha256": "792e2b5d0875c079fd872a0edd815860ad965082a2af0436c13955a0a50e417b",
          "buttonLabel": "下载 Windows 7 x64 客户端"
        }
      ],
      "supportFiles": [
        {
          "title": "公开发布清单",
          "filename": "public-manifest.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-pdf-20260821/public-manifest.json",
          "format": "JSON",
          "bytes": 2275,
          "displaySize": "2.2 KiB",
          "buttonLabel": "下载公开发布清单"
        },
        {
          "title": "发布记录",
          "filename": "release-record.json",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-pdf-20260821/release-record.json",
          "format": "JSON",
          "bytes": 1381,
          "displaySize": "1.3 KiB",
          "buttonLabel": "下载发布记录"
        },
        {
          "title": "SHA-256 校验文件",
          "filename": "SHA256SUMS.txt",
          "path": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-pdf-20260821/SHA256SUMS.txt",
          "format": "TXT",
          "bytes": 252,
          "displaySize": "252 B",
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
    "capabilityBoundary": "客户端在本地完成 PDF 配印；首次启动进入授权激活界面。官网不接收客户文件上传。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": "查看详情",
      "productHeroPrimary": "查看下载与价格",
      "productHeroSecondary": "体验模拟演示",
      "downloadPanel": "已核验下载 / Windows x64 / SHA-256",
      "downloadButton": "下载 Windows 10/11 x64 客户端 · 40.4 MiB",
      "recommended": {
        "primary": "下载客户端",
        "secondary": "体验模拟演示",
        "nextStep": "下载对应系统版本，核对 SHA-256 后联系微信/电话 17734375651 获取产品授权"
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
      title: `${product.name} ${product.download.version} Windows 客户端`,
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
