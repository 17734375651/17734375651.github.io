import { PRODUCTS } from './products.js'

/** Product domains describe navigation, not shared executables or released integrations. */
export const PRODUCT_DOMAINS = [
  {
    id: 'workflow',
    route: '/workflow/',
    title: '工作流',
    eyebrow: 'BUSINESS WORKFLOW',
    headline: '把经营与资料处理，接成清晰的工作流。',
    description: '从进货、销售与收付款，到 Excel 颜色和尺寸字段整理，按当前任务选择独立软件，让经营记录与资料处理都有清楚的执行和复核路径。',
    steps: ['整理业务与资料', '按规则处理', '复核结果与记录'],
  },
  {
    id: 'print-layout',
    route: '/print-layout/',
    title: '印刷排版',
    eyebrow: 'PRINT & LAYOUT',
    headline: '把复杂印前步骤，变成清晰可复核的流程。',
    description: '从标签数量规划、胀色裁切和多尺寸排版，到 PDF 配印与条码匹配，按输入资料选择独立软件，输出便于执行和复核的印前文件。',
    steps: ['准备订单与文件', '匹配、排版与加工', '输出与印前复核'],
  },
]

export const WORKFLOW_ROADMAP = {
  title: '实业客户端',
  state: 'planned',
  description: '计划将记账与 ERP 工作流接入实业客户端，统一业务入口。当前记账软件仍可独立下载使用；内置集成尚未上线。',
  modules: [
    { title: '记账内置', productId: 'accounting', state: 'planned' },
    { title: 'ERP 工作流接入', state: 'planned' },
  ],
}

export function getProductsByDomain(domainId) {
  return PRODUCTS.filter((product) => product.categoryId === domainId)
}

export function getDomainByProductId(productId) {
  const product = PRODUCTS.find((item) => item.id === productId)
  return PRODUCT_DOMAINS.find((domain) => domain.id === product?.categoryId) ?? null
}
