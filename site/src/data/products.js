/**
 * Product truth for the Fangcun Youxu site.
 *
 * Values are deliberately limited to facts present in the audited product
 * matrix. In particular, validation products do not get download URLs and
 * the ERP line remains appointment-only.
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
      "downloadable": false,
      "effectiveStatus": "validation",
      "label": "正式销售 · 下载验收中",
      "reason": "当前公开价格与体验规则已确认，安装包仍在完成发布确认。"
    },
    "trial": {
      "minutes": 60,
      "display": "每台电脑首次免费体验 1 小时",
      "state": "first-device-one-hour",
      "source": "公开体验规则"
    },
    "download": {
      "state": "validation",
      "publicLink": null,
      "version": null,
      "verification": null,
      "sha256": null,
      "reason": "当前尚无可公开核对的版本、文件大小与 SHA-256 记录。",
      "panelText": "发布确认中｜安装包正在完成发布确认，状态更新后再开放下载。",
      "localArchivePresent": false
    },
    "media": {
      "video": "/assets/media/label-demo.mp4",
      "poster": "/assets/media/label-poster.webp",
      "declared": true,
      "fallback": null
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
    "capabilityBoundary": "官网只展示近似示例，不公开拼版算法、完整成本公式或真实订单。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": "查看详情",
      "productHeroPrimary": "查看下载与价格",
      "productHeroSecondary": "体验模拟演示",
      "downloadPanel": "发布确认中 / 联系 17734375651",
      "recommended": {
        "primary": "查看价格与发布状态",
        "secondary": "体验模拟演示",
        "nextStep": "联系微信/电话 17734375651 了解购买与发布状态"
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
      "localArchiveNote": "安装包由公开下载页提供，下载前可核对版本、大小与 SHA-256。"
    },
    "media": {
      "video": "/assets/media/bleed-operation-sanitized.mp4",
      "poster": "/assets/media/bleed-operation-sanitized-poster.webp",
      "declared": true,
      "mode": "actual-operation-redacted",
      "redacted": true,
      "redactionMethod": "synthetic-demo-data",
      "silent": true,
      "sourceBuild": "1.2.11",
      "fallback": "实际操作视频暂不可用；产品信息、下载与价格仍可正常查看。",
      "attachments": [
        {
          "title": "脱敏功能演示素材包",
          "description": "含复杂演示订单、单页 PDF、实际排版示例与自动验收记录",
          "filename": "bleed-redacted-demo-materials-20260814.zip",
          "path": "/assets/downloads/bleed-redacted-demo-materials-20260814.zip",
          "format": "ZIP",
          "bytes": 98141990,
          "displaySize": "93.6 MB",
          "fileCount": 152,
          "sha256": "7740F2C032FDFCE313B6333FF83D8048591982B470FADCFF877C370B97A235B6",
          "notice": "公开演示数据 · 已脱敏",
          "buttonLabel": "下载脱敏功能演示素材包"
        }
      ]
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
      "downloadable": false,
      "effectiveStatus": "validation",
      "label": "正式销售 · 下载验收中",
      "reason": "当前公开价格与体验规则已确认，安装包仍在完成发布确认。"
    },
    "trial": {
      "minutes": 60,
      "display": "每台电脑首次免费体验 1 小时",
      "state": "first-device-one-hour",
      "source": "公开体验规则"
    },
    "download": {
      "state": "validation",
      "publicLink": null,
      "version": null,
      "verification": null,
      "sha256": null,
      "reason": "当前尚无可公开核对的版本、文件大小与 SHA-256 记录。",
      "panelText": "发布确认中｜安装包正在完成发布确认，状态更新后再开放下载。",
      "localArchivePresent": false
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
    "capabilityBoundary": "该产品只包含 PDF 配印能力，不含其他产品入口；官网不接收客户文件上传。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": "查看详情",
      "productHeroPrimary": "查看下载与价格",
      "productHeroSecondary": "体验模拟演示",
      "downloadPanel": "发布确认中 / 联系 17734375651",
      "recommended": {
        "primary": "查看价格与发布状态",
        "secondary": "体验模拟演示",
        "nextStep": "联系微信/电话 17734375651 了解购买与发布状态"
      }
    }
  },
  {
    "id": "erp",
    "route": "/products/erp/",
    "name": "方寸有序 ERP",
    "shortName": "方寸 ERP",
    "eyebrow": "LOCAL ERP",
    "statement": "面向小型经营团队的本地业务工作台，让订单、库存与权限流转更清楚。",
    "outcome": "本地优先，帮助梳理订单、库存与权限流程",
    "price": {
      "amountCny": null,
      "display": "预约体验",
      "termDays": null,
      "sourceUnit": null,
      "public": false,
      "reason": "当前为预约体验，公开安装包与正式价格尚未开放。"
    },
    "status": {
      "sourceStatus": "重点新品 · 完善中 · 预约体验",
      "downloadable": false,
      "effectiveStatus": "appointment",
      "label": "重点新品 · 完善中 · 预约体验",
      "reason": "当前提供预约体验，公开安装包与正式价格尚未开放。"
    },
    "trial": {
      "minutes": null,
      "display": "预约体验，公开安装包未开放",
      "state": "appointment-only",
      "source": "公开预约体验规则"
    },
    "download": {
      "state": "appointment",
      "publicLink": null,
      "version": null,
      "verification": null,
      "sha256": null,
      "reason": "当前仅提供预约体验，尚无公开安装包与正式价格。",
      "panelText": "预约体验｜重点新品正在完善｜当前公开安装包和正式价格均未开放。可联系 17734375651（微信同号）预约查看已完成方向。",
      "localArchivePresent": false
    },
    "media": {
      "video": "/assets/media/erp-demo.mp4",
      "poster": "/assets/media/erp-poster.webp",
      "declared": true,
      "fallback": null
    },
    "workflow": {
      "input": [
        "商品与客户资料",
        "采购销售单据",
        "角色与审批规则"
      ],
      "process": [
        "本地优先的商品、客户与供应商资料",
        "采购、销售、库存与待办流程衔接",
        "按角色控制字段、审批与可见范围"
      ],
      "output": [
        "待办工作台",
        "库存事件",
        "按角色可见的经营视图"
      ]
    },
    "capabilityBoundary": "当前只展示已完成方向，不承诺未完成模块，不公开下载或价格。",
    "cta": {
      "homeCard": "查看产品详情",
      "pricingCard": null,
      "productHeroPrimary": "预约体验",
      "productHeroSecondary": "体验模拟演示",
      "downloadPanel": "预约体验 / 联系 17734375651",
      "recommended": {
        "primary": "预约体验",
        "secondary": "体验模拟演示",
        "nextStep": "联系微信/电话 17734375651，先确认已完成方向和适用流程"
      }
    }
  }
];

export const PRODUCTS_BY_ID = Object.fromEntries(PRODUCTS.map((product) => [product.id, product]));

export const PRODUCT_STATUS = Object.freeze({
  available: '正式销售 · 已验证下载',
  validation: '正式销售 · 下载验收中',
  appointment: '重点新品 · 完善中 · 预约体验',
});

export const PRODUCT_STATUS_DESCRIPTIONS = Object.freeze({
  available: '存在已核验的公开下载记录，可将下载作为主转化动作。',
  validation: '价格与销售文案已公开，下载入口仍在发布验收中。',
  appointment: '仅预约体验，暂不公开正式价格或安装包。',
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
