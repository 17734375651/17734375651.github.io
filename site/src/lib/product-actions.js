const ACTIONS = {
  available: { label: '下载客户端', href: '#download' },
  validation: { label: '查看价格与发布状态', href: '#availability' },
}

export function getProductAction(status, productId) {
  if (status === 'appointment') {
    return {
      label: '预约体验',
      href: `/custom/requirements/?product=${encodeURIComponent(productId ?? '')}`,
    }
  }

  if (ACTIONS[status]) return { ...ACTIONS[status] }
  throw new Error(`Unknown product status: ${status}`)
}
