const ACTIONS = {
  available: { label: '下载客户端', href: '#downloads' },
  validation: { label: '下载展示包', href: '#downloads' },
}

export function getProductAction(status) {
  if (ACTIONS[status]) return { ...ACTIONS[status] }
  throw new Error(`Unknown product status: ${status}`)
}
