/**
 * Content hub manifest for the site.
 *
 * Status is intentionally visible to the UI: `planned` items are planning
 * topics, not customer cases, and `draft` items do not receive download URLs.
 */
export const CONTENT_CATEGORIES = [
  {
    "id": "product-updates",
    "label": "产品更新",
    "publishRule": "仅真实版本记录；没有版本、发布日期和校验记录时不创建更新稿。",
    "items": [
      {
        "slug": "product-updates/fangcun-bleed-1-2-11",
        "title": "方寸有序胀色裁切 1.2.11｜Windows x86 公开包发布记录",
        "summary": "版本 1.2.11 的 win-x86 公开包已有 release-record、public-manifest 与 SHA-256 记录；secretScan 和 webWhitelist 均为 PASS，页面下载记录标记为 verified。公开链接与本地包名存在命名差异，发布文案应同时展示核验提示。",
        "status": "publishable",
        "relatedProduct": "bleed",
        "CTA": {
          "primary": "下载客户端",
          "primaryHref": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-bleed-1.2.11/fangcun-bleed-cutting-1.2.11-win-x86-public.zip",
          "secondary": "查看产品详情",
          "secondaryHref": "/products/bleed/",
          "note": "下载前核对版本 1.2.11、win-x86、64.6 MB 与 SHA-256；授权仍通过微信/电话 17734375651。"
        },
        "SEO": {
          "title": "方寸有序胀色裁切 1.2.11 发布记录｜Windows x86",
          "description": "方寸有序胀色裁切 1.2.11 win-x86 公开包的版本、运行时、验证状态与 SHA-256 记录。",
          "keywords": [
            "方寸有序胀色裁切",
            "1.2.11",
            "CMYK 胀色裁切",
            "Windows x86",
            "SHA-256"
          ],
          "canonical": "https://17734375651.github.io/content/product-updates/fangcun-bleed-1-2-11/",
          "ogType": "article",
          "indexable": false,
          "indexableReason": "内容中心路由尚未存在于当前静态工作树；生成对应页面并复核后再索引。"
        },
        "evidence": [
          {
            "source": "product-truth-matrix.json",
            "lineRange": "208-360, 573-595",
            "anchor": "products.bleed.download.version=1.2.11; runtime=win-x86; verification=verified; bytes=67741703; releaseArtifacts.downloadRecordCount=1",
            "role": "产品与发布真值"
          },
          {
            "source": "release-record.json",
            "lineRange": "2-7",
            "anchor": "version=1.2.11; package; secretScan=PASS; webWhitelist=PASS",
            "role": "本地发布记录"
          },
          {
            "source": "public-manifest.json",
            "lineRange": "3-6",
            "anchor": "package=worker-public; version=1.2.11; runtime=win-x86; generatedUtc=2026-08-17T01:58:57.8695552Z",
            "role": "公开包 manifest"
          },
          {
            "source": "SHA256SUMS.txt",
            "lineRange": "1",
            "anchor": "6B213C32A0D2C124D3364B21B4F8D9C6C5F4F16323AAE01A130EAC34C4FBEC54",
            "role": "公开包 SHA-256"
          }
        ],
        "contentMode": "release-record"
      }
    ]
  },
  {
    "id": "workflow-cases",
    "label": "工作流案例",
    "publishRule": "没有客户授权、可公开素材或可核验的实际过程数据时，只能保留 planned 题材，不得写成已发生案例。",
    "items": [
      {
        "slug": "workflow-cases/label-order-to-imposition-plan",
        "title": "工作流案例规划｜多品种标签订单整理为可复核排版计划",
        "summary": "规划题材：以 Excel 数量表、标签尺寸与版面容量、冗余与成本参数为输入，说明标签排版能力的输入—处理—输出链路。当前仅有产品能力字段，没有客户名称、授权、评价、订单样本或前后对比数据。",
        "status": "planned",
        "relatedProduct": "label",
        "CTA": {
          "primary": "查看产品能力说明",
          "primaryHref": "/products/label/",
          "secondary": "查看实际操作演示",
          "secondaryHref": "/products/label/",
          "note": "案例证据补齐前不使用“客户案例”“节省”“提升”等结果性表述。"
        },
        "SEO": {
          "title": "工作流案例规划｜多品种标签订单整理为可复核排版计划",
          "description": "规划题材：以 Excel 数量表、标签尺寸与版面容量、冗余与成本参数为输入，说明标签排版能力的输入—处理—输出链路。当前仅有产品能力字段，没有客户名称、授权、评价、订单样本或前后对比数据。",
          "keywords": [
            "标签订单",
            "排版计划",
            "Excel 数量表",
            "可复核输出"
          ],
          "canonical": "https://17734375651.github.io/content/workflow-cases/label-order-to-imposition-plan/",
          "ogType": "article",
          "indexable": false,
          "indexableReason": "planned 内容且缺少客户证据。"
        },
        "evidence": [
          {
            "source": "product-truth-matrix.json",
            "lineRange": "99-159",
            "anchor": "products.label.statement; products.label.io.input/process/output; products.label.capabilityBoundary",
            "role": "可用于规划题材的产品能力证据"
          },
          {
            "source": "product-truth-matrix.json",
            "lineRange": "证据缺口",
            "anchor": "当前没有客户名称、授权、评价、样本、前后对比或结果数据",
            "role": "案例发布门槛；不可写成已发生案例"
          }
        ]
      },
      {
        "slug": "workflow-cases/bleed-order-to-printable-pdf",
        "title": "工作流案例规划｜从 Excel 订单与 PDF 到可印刷文件",
        "summary": "规划题材：围绕胀色、裁切、拼版与印前复检的产品能力，描述 Excel 订单与单页或集成 PDF 的处理链路。当前只有产品能力和发布元数据，没有客户名称、授权、评价、订单样本或质量数据。",
        "status": "planned",
        "relatedProduct": "bleed",
        "CTA": {
          "primary": "查看产品能力说明",
          "primaryHref": "/products/bleed/",
          "secondary": "查看实际操作演示",
          "secondaryHref": "/products/bleed/",
          "note": "下载链接只证明公开包记录，不证明任何客户项目结果。"
        },
        "SEO": {
          "title": "工作流案例规划｜从 Excel 订单与 PDF 到可印刷文件",
          "description": "规划题材：围绕胀色、裁切、拼版与印前复检的产品能力，描述 Excel 订单与单页或集成 PDF 的处理链路。当前只有产品能力和发布元数据，没有客户名称、授权、评价、订单样本或质量数据。",
          "keywords": [
            "Excel 订单",
            "PDF 拼版",
            "CMYK 胀色",
            "印前复检"
          ],
          "canonical": "https://17734375651.github.io/content/workflow-cases/bleed-order-to-printable-pdf/",
          "ogType": "article",
          "indexable": false,
          "indexableReason": "planned 内容且缺少客户证据。"
        },
        "evidence": [
          {
            "source": "product-truth-matrix.json",
            "lineRange": "209-275",
            "anchor": "products.bleed.statement; products.bleed.io.input/process/output; products.bleed.capabilityBoundary",
            "role": "可用于规划题材的产品能力证据"
          },
          {
            "source": "product-truth-matrix.json",
            "lineRange": "证据缺口",
            "anchor": "当前没有客户名称、授权、评价、样本、前后对比或结果数据",
            "role": "案例发布门槛；不可写成已发生案例"
          }
        ]
      },
      {
        "slug": "workflow-cases/pdf-request-to-auditable-task",
        "title": "工作流案例规划｜把逐页要求整理为可追溯 PDF 配印任务",
        "summary": "规划题材：围绕 Excel、CSV、文字页数要求与原始 PDF，说明规范化任务表、加工后 PDF 和逐页审计 Excel 的能力链路。当前没有客户名称、授权、评价、样本文件或前后对比数据。",
        "status": "planned",
        "relatedProduct": "pdf",
        "CTA": {
          "primary": "查看产品能力说明",
          "primaryHref": "/products/pdf/",
          "secondary": "体验模拟演示",
          "secondaryHref": "/products/pdf/",
          "note": "不上传客户文件；案例证据补齐前不描述真实项目结果。"
        },
        "SEO": {
          "title": "工作流案例规划｜把逐页要求整理为可追溯 PDF 配印任务",
          "description": "规划题材：围绕 Excel、CSV、文字页数要求与原始 PDF，说明规范化任务表、加工后 PDF 和逐页审计 Excel 的能力链路。当前没有客户名称、授权、评价、样本文件或前后对比数据。",
          "keywords": [
            "PDF 配印",
            "Excel",
            "CSV",
            "逐页审计"
          ],
          "canonical": "https://17734375651.github.io/content/workflow-cases/pdf-request-to-auditable-task/",
          "ogType": "article",
          "indexable": false,
          "indexableReason": "planned 内容且缺少客户证据。"
        },
        "evidence": [
          {
            "source": "product-truth-matrix.json",
            "lineRange": "362-421",
            "anchor": "products.pdf.statement; products.pdf.io.input/process/output; products.pdf.capabilityBoundary",
            "role": "可用于规划题材的产品能力证据"
          },
          {
            "source": "product-truth-matrix.json",
            "lineRange": "证据缺口",
            "anchor": "当前没有客户名称、授权、评价、样本、前后对比或结果数据",
            "role": "案例发布门槛；不可写成已发生案例"
          }
        ]
      },
      {
        "slug": "workflow-cases/erp-local-order-inventory-permissions",
        "title": "工作流案例规划｜本地订单、库存与权限工作台",
        "summary": "规划题材：围绕商品与客户资料、采购销售单据、角色与审批规则，说明方寸有序 ERP 已完成方向。当前产品仅预约体验，且没有客户名称、授权、评价、实际流程数据或已完成模块的客户证明。",
        "status": "planned",
        "relatedProduct": "erp",
        "CTA": {
          "primary": "预约体验",
          "primaryHref": "/products/erp/",
          "secondary": "体验模拟演示",
          "secondaryHref": "/products/erp/",
          "note": "不承诺未完成模块，不展示公开价格或安装包。"
        },
        "SEO": {
          "title": "工作流案例规划｜本地订单、库存与权限工作台",
          "description": "规划题材：围绕商品与客户资料、采购销售单据、角色与审批规则，说明方寸有序 ERP 已完成方向。当前产品仅预约体验，且没有客户名称、授权、评价、实际流程数据或已完成模块的客户证明。",
          "keywords": [
            "本地 ERP",
            "订单管理",
            "库存",
            "权限审批"
          ],
          "canonical": "https://17734375651.github.io/content/workflow-cases/erp-local-order-inventory-permissions/",
          "ogType": "article",
          "indexable": false,
          "indexableReason": "planned 内容且缺少客户证据。"
        },
        "evidence": [
          {
            "source": "product-truth-matrix.json",
            "lineRange": "470-531",
            "anchor": "products.erp.statement; products.erp.io.input/process/output; products.erp.capabilityBoundary",
            "role": "可用于规划题材的产品能力证据"
          },
          {
            "source": "product-truth-matrix.json",
            "lineRange": "证据缺口",
            "anchor": "当前没有客户名称、授权、评价、样本、前后对比或结果数据",
            "role": "案例发布门槛；不可写成已发生案例"
          }
        ]
      }
    ]
  },
  {
    "id": "tutorials",
    "label": "教程",
    "publishRule": "当前仅发布 capability-note（产品能力说明）；未有操作录屏、截图或样例输入输出时，不扩写为逐步教程。",
    "items": [
      {
        "slug": "tutorials/label-input-process-output",
        "title": "标签印刷排版计划｜输入、处理与可复核输出",
        "summary": "能力说明：读取同尺寸、多内容标签数量表，结合标签尺寸、版面容量、冗余与成本参数，给出版面、纸张、机器与余量建议，并输出 Word 排版说明、Excel 计算明细与可复核成本和余量。",
        "status": "publishable",
        "relatedProduct": "label",
        "CTA": {
          "primary": "查看产品详情",
          "primaryHref": "/products/label/",
          "secondary": "体验模拟演示",
          "secondaryHref": "/products/label/",
          "note": "下载入口仍为验收中，不添加下载链接。"
        },
        "SEO": {
          "title": "标签印刷排版计划｜输入、处理与可复核输出",
          "description": "能力说明：读取同尺寸、多内容标签数量表，结合标签尺寸、版面容量、冗余与成本参数，给出版面、纸张、机器与余量建议，并输出 Word 排版说明、Excel 计算明细与可复核成本和余量。",
          "keywords": [
            "标签印刷排版",
            "Excel 数量表",
            "版面规划",
            "成本与余量"
          ],
          "canonical": "https://17734375651.github.io/content/tutorials/label-input-process-output/",
          "ogType": "article",
          "indexable": false,
          "indexableReason": "内容中心路由尚未存在于当前静态工作树。"
        },
        "evidence": [
          {
            "source": "product-truth-matrix.json",
            "lineRange": "99-159",
            "anchor": "products.label.statement; outcome; io.input/process/output; capabilityBoundary",
            "role": "产品能力说明唯一事实源"
          },
          {
            "source": "label-demo.mp4",
            "anchor": "file exists",
            "role": "演示入口资产；未据此推断客户结果"
          },
          {
            "source": "label-poster.webp",
            "anchor": "file exists",
            "role": "演示海报资产"
          }
        ],
        "contentMode": "capability-note"
      },
      {
        "slug": "tutorials/bleed-cmyk-preflight-workflow",
        "title": "方寸有序胀色裁切｜CMYK 胀色、裁切、拼版与复检能力说明",
        "summary": "能力说明：读取 Excel 订单与单页或集成 PDF，识别多工作表表头并汇总标签数量，匹配 PDF、优化多版面，生成 CMYK 胀色、外置裁切标记、复检报告、操作日志与可继续调整的项目文件。",
        "status": "publishable",
        "relatedProduct": "bleed",
        "CTA": {
          "primary": "查看产品详情",
          "primaryHref": "/products/bleed/",
          "secondary": "体验模拟演示",
          "secondaryHref": "/products/bleed/",
          "note": "发布正文只写已核验的输入、处理、输出和边界；实际操作视频使用虚构演示数据，并保留清晰操作画面。"
        },
        "SEO": {
          "title": "方寸有序胀色裁切｜CMYK 胀色、裁切、拼版与复检能力说明",
          "description": "能力说明：读取 Excel 订单与单页或集成 PDF，识别多工作表表头并汇总标签数量，匹配 PDF、优化多版面，生成 CMYK 胀色、外置裁切标记、复检报告、操作日志与可继续调整的项目文件。",
          "keywords": [
            "CMYK 胀色",
            "裁切标记",
            "PDF 拼版",
            "印前复检"
          ],
          "canonical": "https://17734375651.github.io/content/tutorials/bleed-cmyk-preflight-workflow/",
          "ogType": "article",
          "indexable": false,
          "indexableReason": "内容中心路由尚未存在于当前静态工作树。"
        },
        "evidence": [
          {
            "source": "product-truth-matrix.json",
            "lineRange": "209-275",
            "anchor": "products.bleed.statement; outcome; io.input/process/output; capabilityBoundary",
            "role": "产品能力说明唯一事实源"
          },
          {
            "source": "bleed-operation-sanitized-no-taskbar.mp4",
            "anchor": "actual-operation-redacted; synthetic demo data; audio removed; clear operation frames",
            "role": "实际操作演示资产；仅用于展示输入、排版调整与导出复检流程"
          },
          {
            "source": "public-manifest.json",
            "lineRange": "3-6",
            "anchor": "worker-public; 1.2.11; win-x86",
            "role": "产品公开包运行时与版本交叉核验"
          }
        ],
        "contentMode": "capability-note"
      },
      {
        "slug": "tutorials/pdf-request-to-auditable-output",
        "title": "方寸 PDF 配印助手｜从页数要求到逐页审计输出",
        "summary": "能力说明：以 Excel、CSV、文字页数要求和原始 PDF 为输入，解析每页目标份数与冲突规则，生成规范化任务 Excel、加工后 PDF 与逐页审计 Excel，便于复核追踪。",
        "status": "publishable",
        "relatedProduct": "pdf",
        "CTA": {
          "primary": "查看产品详情",
          "primaryHref": "/products/pdf/",
          "secondary": "体验模拟演示",
          "secondaryHref": "/products/pdf/",
          "note": "下载入口仍为验收中；官网不接收客户文件上传。"
        },
        "SEO": {
          "title": "方寸 PDF 配印助手｜从页数要求到逐页审计输出",
          "description": "能力说明：以 Excel、CSV、文字页数要求和原始 PDF 为输入，解析每页目标份数与冲突规则，生成规范化任务 Excel、加工后 PDF 与逐页审计 Excel，便于复核追踪。",
          "keywords": [
            "PDF 配印",
            "逐页审计",
            "Excel",
            "CSV",
            "可追溯任务"
          ],
          "canonical": "https://17734375651.github.io/content/tutorials/pdf-request-to-auditable-output/",
          "ogType": "article",
          "indexable": false,
          "indexableReason": "内容中心路由尚未存在于当前静态工作树。"
        },
        "evidence": [
          {
            "source": "product-truth-matrix.json",
            "lineRange": "362-421",
            "anchor": "products.pdf.statement; outcome; io.input/process/output; capabilityBoundary",
            "role": "产品能力说明唯一事实源"
          },
          {
            "source": "pdf-demo.mp4",
            "anchor": "file exists",
            "role": "演示入口资产；未据此推断客户结果"
          },
          {
            "source": "pdf-poster.webp",
            "anchor": "file exists",
            "role": "演示海报资产"
          }
        ],
        "contentMode": "capability-note"
      },
      {
        "slug": "tutorials/erp-local-order-inventory-permissions",
        "title": "方寸有序 ERP｜本地订单、库存与权限方向说明",
        "summary": "能力说明：围绕商品与客户资料、采购销售单据、角色与审批规则，衔接采购、销售、库存与待办流程，并输出待办工作台、库存事件和按角色可见的经营视图。当前仅展示已完成方向。",
        "status": "publishable",
        "relatedProduct": "erp",
        "CTA": {
          "primary": "预约体验",
          "primaryHref": "/products/erp/",
          "secondary": "体验模拟演示",
          "secondaryHref": "/products/erp/",
          "note": "正式价格、版本、哈希、公开安装包和未完成模块均保持未公开。"
        },
        "SEO": {
          "title": "方寸有序 ERP｜本地订单、库存与权限方向说明",
          "description": "能力说明：围绕商品与客户资料、采购销售单据、角色与审批规则，衔接采购、销售、库存与待办流程，并输出待办工作台、库存事件和按角色可见的经营视图。当前仅展示已完成方向。",
          "keywords": [
            "本地 ERP",
            "订单",
            "库存",
            "角色权限",
            "审批"
          ],
          "canonical": "https://17734375651.github.io/content/tutorials/erp-local-order-inventory-permissions/",
          "ogType": "article",
          "indexable": false,
          "indexableReason": "内容中心路由尚未存在于当前静态工作树，且产品仍为预约体验。"
        },
        "evidence": [
          {
            "source": "product-truth-matrix.json",
            "lineRange": "470-531",
            "anchor": "products.erp.statement; outcome; io.input/process/output; capabilityBoundary",
            "role": "产品能力说明唯一事实源"
          },
          {
            "source": "product-truth-matrix.json",
            "lineRange": "485-512",
            "anchor": "status=appointment; priceCny=null; downloadable=false; trialMinutes=null",
            "role": "公开发布边界"
          },
          {
            "source": "erp-demo.mp4",
            "anchor": "file exists",
            "role": "预约演示入口资产；未据此推断客户结果"
          },
          {
            "source": "erp-poster.webp",
            "anchor": "file exists",
            "role": "预约演示海报资产"
          }
        ],
        "contentMode": "capability-note"
      }
    ]
  },
  {
    "id": "downloads",
    "label": "下载资料",
    "publishRule": "下载页面必须与版本、运行时、包名和 SHA-256 记录一一对应；没有记录则只显示验收/预约状态。",
    "items": [
      {
        "slug": "downloads/bleed-1-2-11-win-x86",
        "title": "方寸有序胀色裁切 1.2.11｜Windows x86 下载资料",
        "summary": "可核验下载资料：版本 1.2.11、运行时 win-x86、67,741,703 bytes（页面约 64.6 MB），verification=verified；本地 SHA256SUMS 与页面记录大小写不敏感一致。",
        "status": "publishable",
        "relatedProduct": "bleed",
        "CTA": {
          "primary": "下载客户端",
          "primaryHref": "https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-bleed-1.2.11/fangcun-bleed-cutting-1.2.11-win-x86-public.zip",
          "secondary": "查看产品详情",
          "secondaryHref": "/products/bleed/",
          "note": "下载前核对 SHA-256；本地工作树有发布记录与 manifest，但未保留 ZIP 本体。"
        },
        "SEO": {
          "title": "方寸有序胀色裁切 1.2.11 下载｜Windows x86 与 SHA-256",
          "description": "下载方寸有序胀色裁切 1.2.11 win-x86 公开包，并核对版本、大小、运行时与 SHA-256。",
          "keywords": [
            "方寸有序胀色裁切下载",
            "1.2.11 下载",
            "win-x86",
            "SHA-256"
          ],
          "canonical": "https://17734375651.github.io/content/downloads/bleed-1-2-11-win-x86/",
          "ogType": "article",
          "indexable": false,
          "indexableReason": "内容中心路由尚未存在于当前静态工作树。"
        },
        "evidence": [
          {
            "source": "product-truth-matrix.json",
            "lineRange": "208-360, 573-595",
            "anchor": "products.bleed.download.version=1.2.11; runtime=win-x86; verification=verified; bytes=67741703; releaseArtifacts.downloadRecordCount=1",
            "role": "产品与发布真值"
          },
          {
            "source": "release-record.json",
            "lineRange": "2-7",
            "anchor": "version=1.2.11; package; secretScan=PASS; webWhitelist=PASS",
            "role": "本地发布记录"
          },
          {
            "source": "public-manifest.json",
            "lineRange": "3-6",
            "anchor": "package=worker-public; version=1.2.11; runtime=win-x86; generatedUtc=2026-08-17T01:58:57.8695552Z",
            "role": "公开包 manifest"
          },
          {
            "source": "SHA256SUMS.txt",
            "lineRange": "1",
            "anchor": "6B213C32A0D2C124D3364B21B4F8D9C6C5F4F16323AAE01A130EAC34C4FBEC54",
            "role": "公开包 SHA-256"
          }
        ],
        "contentMode": "verified-download"
      },
      {
        "slug": "downloads/label-release-validation",
        "title": "标签印刷排版计划｜下载验收状态",
        "summary": "当前已有产品能力、价格和试用说明，但下载数组没有 label 版本、文件、大小或 SHA-256 记录；此条仅保留下载验收状态，不生成下载链接。",
        "status": "draft",
        "relatedProduct": "label",
        "CTA": {
          "primary": "查看价格与发布状态",
          "primaryHref": "/products/label/",
          "secondary": "体验模拟演示",
          "secondaryHref": "/products/label/",
          "note": "发布包、版本和哈希记录齐全后再转为下载资料。"
        },
        "SEO": {
          "title": "标签印刷排版计划下载验收状态｜方寸有序",
          "description": "标签印刷排版计划当前下载验收状态与已公开能力说明；保留验收状态，不生成未核验安装包链接。",
          "keywords": [
            "标签排版",
            "下载验收",
            "发布状态"
          ],
          "canonical": "https://17734375651.github.io/content/downloads/label-release-validation/",
          "ogType": "article",
          "indexable": false,
          "indexableReason": "draft 内容且没有公开版本和校验值。"
        },
        "evidence": [
          {
            "source": "product-truth-matrix.json",
            "lineRange": "99-140, 180-207",
            "anchor": "products.label.status.effectiveStatus=validation; download.state=validation; publicLink/version/sha256=null",
            "role": "下载验收状态事实源"
          },
          {
            "source": "41590h5n5blp4-fbc3ca4f3595.js",
            "lineRange": "8",
            "anchor": "下载数组仅有 productId=bleed；label 无匹配记录时渲染 RELEASE CANDIDATE",
            "role": "下载入口逻辑"
          }
        ],
        "contentMode": "release-validation"
      },
      {
        "slug": "downloads/pdf-release-validation",
        "title": "方寸 PDF 配印助手｜下载验收状态",
        "summary": "当前已有产品能力、价格和试用说明，但下载数组没有 pdf 版本、文件、大小或 SHA-256 记录；此条仅保留下载验收状态，不生成下载链接。",
        "status": "draft",
        "relatedProduct": "pdf",
        "CTA": {
          "primary": "查看价格与发布状态",
          "primaryHref": "/products/pdf/",
          "secondary": "体验模拟演示",
          "secondaryHref": "/products/pdf/",
          "note": "发布包、版本和哈希记录齐全后再转为下载资料。"
        },
        "SEO": {
          "title": "方寸 PDF 配印助手下载验收状态｜方寸有序",
          "description": "方寸 PDF 配印助手当前下载验收状态与已公开能力说明；保留验收状态，不生成未核验安装包链接。",
          "keywords": [
            "PDF 配印",
            "下载验收",
            "发布状态"
          ],
          "canonical": "https://17734375651.github.io/content/downloads/pdf-release-validation/",
          "ogType": "article",
          "indexable": false,
          "indexableReason": "draft 内容且没有公开版本和校验值。"
        },
        "evidence": [
          {
            "source": "product-truth-matrix.json",
            "lineRange": "362-398, 442-469",
            "anchor": "products.pdf.status.effectiveStatus=validation; download.state=validation; publicLink/version/sha256=null",
            "role": "下载验收状态事实源"
          },
          {
            "source": "41590h5n5blp4-fbc3ca4f3595.js",
            "lineRange": "8",
            "anchor": "下载数组仅有 productId=bleed；pdf 无匹配记录时渲染 RELEASE CANDIDATE",
            "role": "下载入口逻辑"
          }
        ],
        "contentMode": "release-validation"
      },
      {
        "slug": "downloads/erp-appointment-only",
        "title": "方寸有序 ERP｜预约体验与下载状态",
        "summary": "当前仅预约体验；正式价格、版本、哈希和公开安装包均未开放。该条保留预约状态，不生成下载链接或试用承诺。",
        "status": "planned",
        "relatedProduct": "erp",
        "CTA": {
          "primary": "预约体验",
          "primaryHref": "/products/erp/",
          "secondary": "体验模拟演示",
          "secondaryHref": "/products/erp/",
          "note": "待公开安装包、正式价格和发布记录形成后再创建下载页。"
        },
        "SEO": {
          "title": "方寸有序 ERP 下载状态｜预约体验",
          "description": "方寸有序 ERP 当前预约体验状态；正式价格与公开安装包尚未开放。",
          "keywords": [
            "方寸 ERP",
            "预约体验",
            "本地业务工作台"
          ],
          "canonical": "https://17734375651.github.io/content/downloads/erp-appointment-only/",
          "ogType": "article",
          "indexable": false,
          "indexableReason": "planned 内容且公开安装包与正式价格未开放。"
        },
        "evidence": [
          {
            "source": "product-truth-matrix.json",
            "lineRange": "470-512, 545-572",
            "anchor": "products.erp.status.effectiveStatus=appointment; price.public=false; trial.state=appointment-only; download.publicLink/version/sha256=null",
            "role": "预约与下载边界事实源"
          },
          {
            "source": "41590h5n5blp4-fbc3ca4f3595.js",
            "lineRange": "8",
            "anchor": "downloadable=false 时渲染预约体验与公开安装包/正式价格未开放",
            "role": "预约入口逻辑"
          }
        ],
        "contentMode": "appointment-status"
      }
    ]
  }
];

export const CONTENT_ITEMS = CONTENT_CATEGORIES.flatMap((category) =>
  category.items.map((item) => ({ ...item, categoryId: category.id, categoryLabel: category.label }))
);

export const CONTENT_BY_SLUG = Object.fromEntries(CONTENT_ITEMS.map((item) => [item.slug, item]));

export const CONTENT_STATUS_LABELS = Object.freeze({
  publishable: '已整理',
  draft: '整理中',
  planned: '准备中',
});

export const CONTENT_SUMMARY = {
  "categoryCounts": {
    "product-updates": 1,
    "workflow-cases": 4,
    "tutorials": 4,
    "downloads": 4
  },
  "statusCounts": {
    "publishable": 6,
    "draft": 2,
    "planned": 5
  },
  "publishableNow": [
    "product-updates/fangcun-bleed-1-2-11",
    "tutorials/label-input-process-output",
    "tutorials/bleed-cmyk-preflight-workflow",
    "tutorials/pdf-request-to-auditable-output",
    "tutorials/erp-local-order-inventory-permissions",
    "downloads/bleed-1-2-11-win-x86"
  ],
  "notPublishableAsCase": [
    "workflow-cases/label-order-to-imposition-plan",
    "workflow-cases/bleed-order-to-printable-pdf",
    "workflow-cases/pdf-request-to-auditable-task",
    "workflow-cases/erp-local-order-inventory-permissions"
  ],
  "unrecordedDownloads": [
    "label",
    "pdf",
    "erp"
  ]
};
export const contentCategories = CONTENT_CATEGORIES;
export const contentItems = CONTENT_ITEMS;

export function getContentItem(slug) {
  return CONTENT_BY_SLUG[slug] ?? null;
}

export function getContentForProduct(productId) {
  return CONTENT_ITEMS.filter((item) => item.relatedProduct === productId);
}
