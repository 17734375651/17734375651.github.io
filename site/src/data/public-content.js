export const CONTENT_STATUS_LABELS = Object.freeze({
  publishable: '已整理',
  draft: '整理中',
  planned: '准备中',
})

export const CONTENT_CATEGORIES = [
  {
    id: 'product-updates',
    label: '产品更新',
    items: [
      {
        slug: 'product-updates/fangcun-bleed-1-2-11',
        title: '方寸有序胀色裁切 1.2.11｜Windows x86 版本更新',
        summary: '版本 1.2.11 已开放 Windows x86 客户端。下载前可核对版本、文件大小与 SHA-256。',
        status: 'publishable',
        relatedProduct: 'bleed',
        contentMode: 'release-record',
        CTA: {
          primary: '下载客户端',
          primaryHref: 'https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-bleed-1.2.11/fangcun-bleed-cutting-1.2.11-win-x86-public.zip',
          secondary: '查看产品详情',
          secondaryHref: '/products/bleed/',
        },
      },
    ],
  },
  {
    id: 'tutorials',
    label: '能力说明',
    items: [
      {
        slug: 'tutorials/label-input-process-output',
        title: '标签印刷排版计划｜输入、处理与可复核输出',
        summary: '读取同尺寸、多内容标签数量表，结合标签尺寸、版面容量、冗余与成本参数，给出版面、纸张、机器与余量建议，并输出 Word 排版说明和 Excel 计算明细。',
        status: 'publishable',
        relatedProduct: 'label',
        contentMode: 'capability-note',
        CTA: {
          primary: '查看产品详情',
          primaryHref: '/products/label/',
          secondary: '查看能力演示',
          secondaryHref: '/products/label/',
        },
      },
      {
        slug: 'tutorials/bleed-cmyk-preflight-workflow',
        title: '方寸有序胀色裁切｜CMYK 胀色、裁切、拼版与复检',
        summary: '读取 Excel 订单与单页或合并 PDF，汇总标签数量、匹配文件并优化版面，生成 CMYK 胀色、裁切标记、复检报告与项目文件。',
        status: 'publishable',
        relatedProduct: 'bleed',
        contentMode: 'capability-note',
        CTA: {
          primary: '查看产品详情',
          primaryHref: '/products/bleed/',
          secondary: '查看实际操作演示',
          secondaryHref: '/products/bleed/',
        },
      },
      {
        slug: 'tutorials/pdf-request-to-auditable-output',
        title: '方寸 PDF 配印助手｜从页数要求到逐页复核',
        summary: '以 Excel、CSV、文字页数要求和原始 PDF 为输入，解析每页目标份数与冲突规则，生成规范化任务 Excel、加工后 PDF 与逐页复核 Excel。',
        status: 'publishable',
        relatedProduct: 'pdf',
        contentMode: 'capability-note',
        CTA: {
          primary: '查看产品详情',
          primaryHref: '/products/pdf/',
          secondary: '查看能力演示',
          secondaryHref: '/products/pdf/',
        },
      },
      {
        slug: 'tutorials/erp-local-order-inventory-permissions',
        title: '方寸有序 ERP｜本地订单、库存与权限方向',
        summary: '围绕商品与客户资料、采购销售单据、角色与审批规则，衔接采购、销售、库存与待办流程，并按角色呈现经营视图。当前提供预约体验。',
        status: 'publishable',
        relatedProduct: 'erp',
        contentMode: 'capability-note',
        CTA: {
          primary: '预约体验',
          primaryHref: '/products/erp/',
          secondary: '查看能力演示',
          secondaryHref: '/products/erp/',
        },
      },
    ],
  },
  {
    id: 'downloads',
    label: '下载资料',
    items: [
      {
        slug: 'downloads/bleed-1-2-11-win-x86',
        title: '方寸有序胀色裁切 1.2.11｜Windows x86 下载资料',
        summary: '公开客户端版本为 1.2.11，适用于 Windows x86，文件约 64.6 MB；下载后可按产品页记录核对 SHA-256。',
        status: 'publishable',
        relatedProduct: 'bleed',
        contentMode: 'verified-download',
        CTA: {
          primary: '下载客户端',
          primaryHref: 'https://github.com/17734375651/17734375651.github.io/releases/download/fangcun-bleed-1.2.11/fangcun-bleed-cutting-1.2.11-win-x86-public.zip',
          secondary: '查看产品详情',
          secondaryHref: '/products/bleed/',
        },
      },
    ],
  },
]
