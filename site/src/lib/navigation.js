function normalizeRoutePath(pathname = '/') {
  if (pathname === '/') return '/'
  const cleanPath = pathname.replace(/\/{2,}/g, '/')
  return cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`
}

export function getActiveNavHref(pathname = '/', hash = '') {
  const path = normalizeRoutePath(pathname)

  if (path === '/' && hash === '#contact') return '/#contact'
  if (path === '/') return '/'
  if (path.startsWith('/products/')) return '/products/'
  if (path === '/solutions/') return '/solutions/'
  if (['/updates/', '/guides/', '/downloads/'].includes(path)) return '/updates/'
  if (path.startsWith('/legal/')) return '/legal/service/'
  return null
}
