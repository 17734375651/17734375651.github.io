const ACTIONS = {
  available: { label: '下载客户端', href: '#downloads' },
  validation: { label: '查看发布进度', href: '#downloads' },
}

export function getProductAction(status) {
  if (ACTIONS[status]) return { ...ACTIONS[status] }
  throw new Error(`Unknown product status: ${status}`)
}
