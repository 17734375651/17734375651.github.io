/**
 * Industry solution cards derived from the audited solution manifest.
 *
 * These cards describe fit and workflow only. They intentionally contain no
 * customer names, logos, result metrics, rankings, or invented guarantees.
 */
export const SOLUTIONS = [
  {
    "id": "graphic-print-shop",
    "label": "图文店",
    "audience": "官网当前明确列出的图文店受众；具体适配以实际资料和流程描述为准。",
    "commonInputs": [
      "表格（可对应 Excel 数量表或 Excel 订单）",
      "PDF（单页或集成 PDF，适用于胀色裁切流程）",
      "文字规则或页数要求（适用于 PDF 配印流程）",
      "标签尺寸与版面容量、冗余与成本参数（适用于标签排版流程）"
    ],
    "currentPainPoints": [
      "重复核算、反复整理与逐页核对是官网首页明确提出的待转化流程。",
      "场景卡将图文店的任务概括为整理订单、排版任务与文件输出。",
      "多品种、不同数量标签订单需要整理成可执行、可复核的排版计划（产品公开定位）。"
    ],
    "keyProcessing": [
      "读取同尺寸、多内容标签数量表，给出版面、纸张、机器与余量建议。",
      "识别多工作表表头并汇总标签数量，匹配单页或集成 PDF 并优化多版面。",
      "解析每页目标份数与冲突规则，生成规范任务表并按要求加工 PDF。",
      "按“输入—处理—输出”链路做规则化、校验与异常提示（官网场景总览文案）。"
    ],
    "verifiableOutputs": [
      "Word 排版说明、Excel 计算明细、可复核成本与余量。",
      "CMYK 排版 PDF、复检报告与操作日志、可继续调整的项目文件。",
      "规范化任务 Excel、加工后 PDF、逐页审计 Excel。",
      "可执行、可复核、可追踪的文件或任务结果（官网场景总览文案）。"
    ],
    "prefilledCustomizationParams": {
      "route": "/custom/requirements/",
      "mode": "suggested-and-editable",
      "fields": {
        "scene": "图文店",
        "slowProcess": "重复核算、反复整理或逐页核对（请改成当前最耗时环节）",
        "inputs": "Excel 数量表；PDF；文字或页数规则；标签尺寸与版面容量（请按实际资料修改）",
        "expected": "可执行、可复核的排版计划；可直接使用的 PDF/Excel/Word 文件（请按实际交付修改）",
        "constraints": "补充规则、预算、时间（选填）"
      },
      "requiredFields": [
        "scene",
        "slowProcess",
        "inputs",
        "expected"
      ],
      "optionalFields": [
        "constraints"
      ],
      "summaryBehavior": "填写四项必填信息后在当前页面生成可复制的微信需求摘要；内容不上传、不保存。",
      "pricing": "定制设计及首个可用版本 499 元起；正式版年费根据功能复杂度报价。"
    },
    "cta": {
      "primary": {
        "label": "查看产品",
        "href": "/#products"
      },
      "secondary": {
        "label": "填写需求",
        "href": "/custom/requirements/"
      },
      "productActions": [
        {
          "label": "查看价格与发布状态",
          "href": "/products/label/"
        },
        {
          "label": "查看下载与价格",
          "href": "/products/bleed/"
        },
        {
          "label": "查看价格与发布状态",
          "href": "/products/pdf/"
        }
      ],
      "contact": "微信 / 电话 17734375651",
      "note": "label 与 PDF 保持“正式销售 · 下载验收中”；胀色裁切可进入已验证下载产品页；不向未有下载记录的产品承诺安装包。"
    },
    "forbiddenInventedFields": [
      "customerCount",
      "customerNamesOrLogos",
      "customerTestimonials",
      "caseStudyMetrics",
      "yearsInBusiness",
      "awards",
      "marketRanking",
      "teamSize",
      "savingsPercentage",
      "processingVolume",
      "accuracyRate",
      "securityLevel",
      "unpublishedPrice",
      "unverifiedDownloadVersion",
      "unverifiedDownloadHash",
      "unlistedModule",
      "customerFileUploadOrStorage"
    ],
    "evidenceRefs": [
      "seo-route-manifest.json#/routes[path=/]/verifiedFacts/audience",
      "current static chunk 41590h5n5blp4-fbc3ca4f3595.js:1#/sections[id=solutions]",
      "product-truth-matrix.json#/products[id=label|bleed|pdf]",
      "seo-route-manifest.json#/routes[path=/products/label/|/products/bleed/|/products/pdf/]"
    ],
    "currentStaticCard": "整理订单、排版任务与文件输出",
    "relatedProducts": [
      {
        "productId": "label",
        "name": "标签印刷排版计划",
        "route": "/products/label/",
        "relationship": "与订单排版任务相符；使用前核对是否具备公开输入资料。",
        "matchOn": [
          "Excel 数量表",
          "标签尺寸与版面容量",
          "冗余与成本参数"
        ],
        "productStatus": {
          "effectiveStatus": "validation",
          "publicLabel": "正式销售 · 下载验收中",
          "price": "¥199 / 年",
          "trial": "每台电脑首次免费体验 1 小时",
          "downloadState": "validation",
          "downloadAvailable": false
        }
      },
      {
        "productId": "bleed",
        "name": "方寸有序胀色裁切",
        "route": "/products/bleed/",
        "relationship": "与 Excel 订单、PDF、胀色裁切、拼版和印前复检任务相符。",
        "matchOn": [
          "Excel .xls / .xlsx 订单",
          "单页或集成 PDF",
          "版面、胀色与裁切参数"
        ],
        "productStatus": {
          "effectiveStatus": "available",
          "publicLabel": "正式销售 · 已验证下载",
          "price": "¥799 / 年",
          "trial": "每台电脑首次免费体验 1 小时",
          "downloadState": "available",
          "downloadAvailable": true
        }
      },
      {
        "productId": "pdf",
        "name": "方寸 PDF 配印助手",
        "route": "/products/pdf/",
        "relationship": "与逐页页数要求、PDF 加工和审计表输出相符。",
        "matchOn": [
          "Excel / CSV",
          "文字页数要求",
          "原始 PDF"
        ],
        "productStatus": {
          "effectiveStatus": "validation",
          "publicLabel": "正式销售 · 下载验收中",
          "price": "¥599 / 年",
          "trial": "每台电脑首次免费体验 1 小时",
          "downloadState": "validation",
          "downloadAvailable": false
        }
      }
    ]
  },
  {
    "id": "printing-shop",
    "label": "印刷店",
    "audience": "官网当前明确列出的印刷店受众；具体适配以实际订单、文件和规则为准。",
    "commonInputs": [
      "Excel .xls / .xlsx 订单或 Excel 数量表",
      "单页或集成 PDF、原始 PDF",
      "版面、胀色与裁切参数",
      "文字页数要求、逐页目标份数与冲突规则"
    ],
    "currentPainPoints": [
      "重复核算、反复整理与逐页核对是官网首页明确提出的待转化流程。",
      "场景卡将印刷店的任务概括为整理订单、排版任务与文件输出。",
      "订单、PDF、排版、裁切与印前复检需要形成可执行、可复核的链路（由公开产品输入/处理/输出定义）。"
    ],
    "keyProcessing": [
      "识别多工作表表头并汇总标签数量，匹配单页或集成 PDF 并优化多版面。",
      "生成 CMYK 胀色、外置裁切标记及复检报告。",
      "解析每页目标份数与冲突规则，逐页记录处理结果，便于复核追踪。",
      "按“表格、PDF、文字规则 → 规则化、校验、异常提示 → 可执行、可复核、可追踪”组织流程。"
    ],
    "verifiableOutputs": [
      "CMYK 排版 PDF。",
      "复检报告与操作日志。",
      "可继续调整的项目文件。",
      "规范化任务 Excel、加工后 PDF、逐页审计 Excel。"
    ],
    "prefilledCustomizationParams": {
      "route": "/custom/requirements/",
      "mode": "suggested-and-editable",
      "fields": {
        "scene": "印刷店",
        "slowProcess": "订单整理、排版、逐页核对或印前复检（请改成当前最耗时环节）",
        "inputs": "Excel .xls / .xlsx 订单；单页或集成 PDF；版面、胀色与裁切参数；文字页数要求（请按实际资料修改）",
        "expected": "CMYK 排版 PDF、复检报告与操作日志，或规范化任务 Excel、加工后 PDF、逐页审计 Excel（请按实际交付修改）",
        "constraints": "补充规则、预算、时间（选填）"
      },
      "requiredFields": [
        "scene",
        "slowProcess",
        "inputs",
        "expected"
      ],
      "optionalFields": [
        "constraints"
      ],
      "summaryBehavior": "填写四项必填信息后在当前页面生成可复制的微信需求摘要；内容不上传、不保存。",
      "pricing": "定制设计及首个可用版本 499 元起；正式版年费根据功能复杂度报价。"
    },
    "cta": {
      "primary": {
        "label": "查看下载与价格",
        "href": "/products/bleed/"
      },
      "secondary": {
        "label": "填写需求",
        "href": "/custom/requirements/"
      },
      "productActions": [
        {
          "label": "查看下载与价格",
          "href": "/products/bleed/"
        },
        {
          "label": "查看价格与发布状态",
          "href": "/products/label/"
        },
        {
          "label": "查看价格与发布状态",
          "href": "/products/pdf/"
        }
      ],
      "contact": "微信 / 电话 17734375651",
      "note": "胀色裁切为“正式销售 · 已验证下载”；版本、平台与 SHA-256 只在其产品状态记录中显示。标签排版与 PDF 配印仍为下载验收中。"
    },
    "forbiddenInventedFields": [
      "customerCount",
      "customerNamesOrLogos",
      "customerTestimonials",
      "caseStudyMetrics",
      "yearsInBusiness",
      "awards",
      "marketRanking",
      "teamSize",
      "savingsPercentage",
      "processingVolume",
      "accuracyRate",
      "securityLevel",
      "unpublishedPrice",
      "unverifiedDownloadVersion",
      "unverifiedDownloadHash",
      "unlistedModule",
      "customerFileUploadOrStorage"
    ],
    "evidenceRefs": [
      "seo-route-manifest.json#/routes[path=/]/verifiedFacts/audience",
      "current static chunk 41590h5n5blp4-fbc3ca4f3595.js:1#/sections[id=solutions]",
      "product-truth-matrix.json#/products[id=bleed|label|pdf]",
      "seo-route-manifest.json#/routes[path=/products/bleed/|/products/label/|/products/pdf/]"
    ],
    "currentStaticCard": "整理订单、排版任务与文件输出",
    "relatedProducts": [
      {
        "productId": "bleed",
        "name": "方寸有序胀色裁切",
        "route": "/products/bleed/",
        "relationship": "与订单到 CMYK 排版 PDF、胀色、裁切、拼版和印前复检流程直接对应。",
        "matchOn": [
          "Excel .xls / .xlsx 订单",
          "单页或集成 PDF",
          "版面、胀色与裁切参数"
        ],
        "productStatus": {
          "effectiveStatus": "available",
          "publicLabel": "正式销售 · 已验证下载",
          "price": "¥799 / 年",
          "trial": "每台电脑首次免费体验 1 小时",
          "downloadState": "available",
          "downloadAvailable": true
        }
      },
      {
        "productId": "label",
        "name": "标签印刷排版计划",
        "route": "/products/label/",
        "relationship": "当任务是多品种、不同数量标签订单的排版计划时匹配。",
        "matchOn": [
          "Excel 数量表",
          "标签尺寸与版面容量",
          "冗余与成本参数"
        ],
        "productStatus": {
          "effectiveStatus": "validation",
          "publicLabel": "正式销售 · 下载验收中",
          "price": "¥199 / 年",
          "trial": "每台电脑首次免费体验 1 小时",
          "downloadState": "validation",
          "downloadAvailable": false
        }
      },
      {
        "productId": "pdf",
        "name": "方寸 PDF 配印助手",
        "route": "/products/pdf/",
        "relationship": "当任务是逐页页数要求转成可追溯 PDF 配印任务时匹配。",
        "matchOn": [
          "Excel / CSV",
          "文字页数要求",
          "原始 PDF"
        ],
        "productStatus": {
          "effectiveStatus": "validation",
          "publicLabel": "正式销售 · 下载验收中",
          "price": "¥599 / 年",
          "trial": "每台电脑首次免费体验 1 小时",
          "downloadState": "validation",
          "downloadAvailable": false
        }
      }
    ]
  },
  {
    "id": "small-and-medium-enterprise",
    "label": "中小企业",
    "audience": "官网当前明确列出的中小企业受众；ERP 的公开定位为面向小型经营团队的本地业务工作台。",
    "commonInputs": [
      "商品与客户资料",
      "采购销售单据",
      "角色与审批规则",
      "表格、PDF 或文字规则（若实际流程属于其他公开产品或定制范围）"
    ],
    "currentPainPoints": [
      "官网场景卡将中小企业的公开任务概括为单据、库存、审批与执行协同。",
      "ERP 产品公开定位指出订单、库存与权限流转需要更清楚。",
      "首页总览把重复核算、反复整理与逐页核对列为可转化的重复流程。"
    ],
    "keyProcessing": [
      "以本地优先方式组织商品、客户与供应商资料。",
      "衔接采购、销售、库存与待办流程。",
      "按角色控制字段、审批与可见范围。",
      "先将实际规则、资料与交付结果写入定制需求摘要，供预约沟通。"
    ],
    "verifiableOutputs": [
      "待办工作台。",
      "库存事件。",
      "按角色可见的经营视图。",
      "按需求确认后的可执行、可复核、可追踪结果（官网场景总览文案）。"
    ],
    "prefilledCustomizationParams": {
      "route": "/custom/requirements/",
      "mode": "suggested-and-editable",
      "fields": {
        "scene": "中小企业",
        "slowProcess": "单据、库存、审批或待办衔接（请改成当前最耗时环节）",
        "inputs": "商品与客户资料；采购销售单据；角色与审批规则（请按实际资料修改）",
        "expected": "待办工作台、库存事件、按角色可见的经营视图（请按实际交付修改）",
        "constraints": "补充规则、预算、时间（选填）"
      },
      "requiredFields": [
        "scene",
        "slowProcess",
        "inputs",
        "expected"
      ],
      "optionalFields": [
        "constraints"
      ],
      "summaryBehavior": "填写四项必填信息后在当前页面生成可复制的微信需求摘要；内容不上传、不保存。",
      "pricing": "定制设计及首个可用版本 499 元起；正式版年费根据功能复杂度报价。"
    },
    "cta": {
      "primary": {
        "label": "预约体验",
        "href": "/products/erp/"
      },
      "secondary": {
        "label": "填写需求",
        "href": "/custom/requirements/"
      },
      "productActions": [
        {
          "label": "预约体验",
          "href": "/products/erp/"
        }
      ],
      "contact": "微信 / 电话 17734375651",
      "note": "ERP 为“重点新品 · 完善中 · 预约体验”；正式价格与公开安装包未开放，不继承三款正式软件的一小时体验文案。"
    },
    "forbiddenInventedFields": [
      "customerCount",
      "customerNamesOrLogos",
      "customerTestimonials",
      "caseStudyMetrics",
      "yearsInBusiness",
      "awards",
      "marketRanking",
      "teamSize",
      "savingsPercentage",
      "processingVolume",
      "accuracyRate",
      "securityLevel",
      "unpublishedPrice",
      "unverifiedDownloadVersion",
      "unverifiedDownloadHash",
      "unlistedModule",
      "customerFileUploadOrStorage"
    ],
    "evidenceRefs": [
      "seo-route-manifest.json#/routes[path=/]/verifiedFacts/audience",
      "current static chunk 41590h5n5blp4-fbc3ca4f3595.js:1#/sections[id=solutions]",
      "product-truth-matrix.json#/products[id=erp]",
      "seo-route-manifest.json#/routes[path=/products/erp/|/custom/requirements/]"
    ],
    "currentStaticCard": "单据、库存、审批与执行协同",
    "relatedProducts": [
      {
        "productId": "erp",
        "name": "方寸有序 ERP",
        "route": "/products/erp/",
        "relationship": "与商品/客户资料、采购销售单据、角色与审批规则，以及订单/库存/权限流转场景相符；需预约确认已完成方向。",
        "matchOn": [
          "商品与客户资料",
          "采购销售单据",
          "角色与审批规则"
        ],
        "productStatus": {
          "effectiveStatus": "appointment",
          "publicLabel": "重点新品 · 完善中 · 预约体验",
          "price": null,
          "trial": "预约体验，公开安装包未开放",
          "downloadState": "appointment",
          "downloadAvailable": false
        }
      }
    ]
  },
  {
    "id": "other-repetitive-workflows",
    "label": "其他重复流程",
    "audience": "官网当前列出的其他重复流程入口；不按场景名称推定行业、规模或具体模块。",
    "commonInputs": [
      "表格",
      "PDF",
      "文字或文案要求",
      "其他资料（需在需求摘要中说明）"
    ],
    "currentPainPoints": [
      "首页明确提出重复核算、反复整理与逐页核对是可转化的重复流程。",
      "官网场景卡要求按现场规则梳理并定制，未核验的行业痛点清单不进入内容。"
    ],
    "keyProcessing": [
      "先收集当前最耗时的工作环节、可提供资料和期望交付结果。",
      "根据输入资料与规则，评估是否匹配现有产品，或进入按业务流程开发的个性化工具路径。",
      "按“规则化、校验、异常提示”组织可复核处理链路；具体模块待需求确认。"
    ],
    "verifiableOutputs": [
      "可执行、可复核、可追踪的文件或任务结果（具体形式由需求确认）。",
      "当前页面生成的可复制微信需求摘要；内容不上传、不保存。"
    ],
    "prefilledCustomizationParams": {
      "route": "/custom/requirements/",
      "mode": "suggested-and-editable",
      "fields": {
        "scene": "其他（请说明）",
        "slowProcess": "重复核算、反复整理或逐页核对（请补充具体业务环节）",
        "inputs": "表格；PDF；文字或文案要求；其他资料（请具体说明）",
        "expected": "可执行、可复核、可追踪的文件或任务结果（请说明具体交付形式）",
        "constraints": "请说明具体业务场景；补充规则、预算、时间（“其他”场景需补充说明）"
      },
      "requiredFields": [
        "scene",
        "slowProcess",
        "inputs",
        "expected"
      ],
      "optionalFields": [
        "constraints"
      ],
      "summaryBehavior": "填写四项必填信息后在当前页面生成可复制的微信需求摘要；内容不上传、不保存。",
      "pricing": "定制设计及首个可用版本 499 元起；正式版年费根据功能复杂度报价。",
      "conditionalRequiredFields": [
        "constraints"
      ]
    },
    "cta": {
      "primary": {
        "label": "填写需求",
        "href": "/custom/requirements/"
      },
      "secondary": {
        "label": "查看产品",
        "href": "/#products"
      },
      "productActions": [
        {
          "label": "查看产品",
          "href": "/#products"
        },
        {
          "label": "填写需求",
          "href": "/custom/requirements/"
        }
      ],
      "contact": "微信 / 电话 17734375651",
      "note": "不为“其他”场景预先承诺产品、价格、版本、下载、交付时间或未完成模块；先补充现场规则后再匹配。"
    },
    "forbiddenInventedFields": [
      "customerCount",
      "customerNamesOrLogos",
      "customerTestimonials",
      "caseStudyMetrics",
      "yearsInBusiness",
      "awards",
      "marketRanking",
      "teamSize",
      "savingsPercentage",
      "processingVolume",
      "accuracyRate",
      "securityLevel",
      "unpublishedPrice",
      "unverifiedDownloadVersion",
      "unverifiedDownloadHash",
      "unlistedModule",
      "customerFileUploadOrStorage"
    ],
    "evidenceRefs": [
      "current static chunk 41590h5n5blp4-fbc3ca4f3595.js:1#/sections[id=solutions]",
      "current static chunk 41590h5n5blp4-fbc3ca4f3595.js:1#/custom-form/options",
      "seo-route-manifest.json#/routes[path=/custom/requirements/]",
      "product-truth-matrix.json#/products[id=label|bleed|pdf|erp]"
    ],
    "customSceneOption": "其他（请说明）",
    "currentStaticCard": "按你的现场规则梳理并定制",
    "relatedProducts": [
      {
        "productId": "label",
        "name": "标签印刷排版计划",
        "route": "/products/label/",
        "relationship": "仅当资料匹配标签数量表、尺寸/版面容量、冗余与成本参数时考虑。",
        "matchOn": [
          "Excel 数量表",
          "标签尺寸与版面容量",
          "冗余与成本参数"
        ],
        "productStatus": {
          "effectiveStatus": "validation",
          "publicLabel": "正式销售 · 下载验收中",
          "price": "¥199 / 年",
          "trial": "每台电脑首次免费体验 1 小时",
          "downloadState": "validation",
          "downloadAvailable": false
        }
      },
      {
        "productId": "bleed",
        "name": "方寸有序胀色裁切",
        "route": "/products/bleed/",
        "relationship": "仅当资料匹配 Excel 订单、PDF 及版面/胀色/裁切参数时考虑。",
        "matchOn": [
          "Excel .xls / .xlsx 订单",
          "单页或集成 PDF",
          "版面、胀色与裁切参数"
        ],
        "productStatus": {
          "effectiveStatus": "available",
          "publicLabel": "正式销售 · 已验证下载",
          "price": "¥799 / 年",
          "trial": "每台电脑首次免费体验 1 小时",
          "downloadState": "available",
          "downloadAvailable": true
        }
      },
      {
        "productId": "pdf",
        "name": "方寸 PDF 配印助手",
        "route": "/products/pdf/",
        "relationship": "仅当资料匹配 Excel/CSV、文字页数要求和原始 PDF 时考虑。",
        "matchOn": [
          "Excel / CSV",
          "文字页数要求",
          "原始 PDF"
        ],
        "productStatus": {
          "effectiveStatus": "validation",
          "publicLabel": "正式销售 · 下载验收中",
          "price": "¥599 / 年",
          "trial": "每台电脑首次免费体验 1 小时",
          "downloadState": "validation",
          "downloadAvailable": false
        }
      },
      {
        "productId": "erp",
        "name": "方寸有序 ERP",
        "route": "/products/erp/",
        "relationship": "仅当资料匹配商品/客户、采购销售单据及角色/审批规则时预约确认。",
        "matchOn": [
          "商品与客户资料",
          "采购销售单据",
          "角色与审批规则"
        ],
        "productStatus": {
          "effectiveStatus": "appointment",
          "publicLabel": "重点新品 · 完善中 · 预约体验",
          "price": null,
          "trial": "预约体验，公开安装包未开放",
          "downloadState": "appointment",
          "downloadAvailable": false
        }
      }
    ]
  }
];

export const SOLUTIONS_BY_ID = Object.fromEntries(SOLUTIONS.map((solution) => [solution.id, solution]));
export const solutions = SOLUTIONS;
export const solutionsById = SOLUTIONS_BY_ID;

export const SOLUTION_SCENES = SOLUTIONS.map(({ id, label, audience, currentStaticCard }) => ({
  id,
  label,
  audience,
  summary: currentStaticCard,
}));

export function getSolution(solutionId) {
  return SOLUTIONS_BY_ID[solutionId] ?? null;
}
