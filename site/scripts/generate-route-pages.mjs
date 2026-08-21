import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { PRODUCTS, getProductPublicFiles } from '../src/data/products.js'
import { SEO_ROUTES, SITE } from '../src/data/site.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITE_ORIGIN = SITE.publicUrl
const PRODUCT_SURFACE_PATHS = new Set([
  '/',
  '/products/',
  '/products/label/',
  '/products/bleed/',
  '/products/pdf/',
  '/solutions/',
  '/custom/requirements/',
])

const SYNTHETIC_ROUTES = [
  {
    path: '/products/',
    kind: 'product-index',
    title: '产品中心｜方寸有序工作室',
    description: '查看标签印刷排版、CMYK 胀色裁切和 PDF 配印三款正式软件，以及各自准确的价格、体验和公开下载文件。',
    h1: '把重复工作，交给清楚可靠的软件流程',
  },
  {
    path: '/solutions/',
    kind: 'solution-index',
    title: '行业方案｜图文印刷与中小企业效率工具｜方寸有序',
    description: '面向图文店、印刷店、中小企业与其他重复流程，按输入资料、关键处理和可复核输出查看匹配的软件方案。',
    h1: '从业务现场出发，找到更合适的处理方式',
  },
  {
    path: '/updates/',
    kind: 'content-index',
    category: 'updates',
    title: '产品更新｜方寸有序工作室',
    description: '查看方寸有序各产品已核验的更新说明、公开发布状态与版本信息，未完成或未验收的能力会保持明确边界。',
    h1: '产品更新与发布记录',
  },
  {
    path: '/guides/',
    kind: 'content-index',
    category: 'guides',
    title: '使用指南｜方寸有序工作室',
    description: '按产品查看输入资料准备、软件处理流程、输出复核方法与使用边界，让每次操作都有清楚的执行路径。',
    h1: '使用指南与流程说明',
  },
  {
    path: '/downloads/',
    kind: 'content-index',
    category: 'downloads',
    title: '文件下载｜客户端与校验资料｜方寸有序工作室',
    description: '集中下载三款正式软件客户端、公开发布清单、发布记录与 SHA-256 校验文件。',
    h1: '公开文件下载',
  },
  {
    path: '/legal/privacy/',
    kind: 'legal',
    legalId: 'privacy',
    title: '数据处理与隐私说明｜方寸有序工作室',
    description: '了解官网需求摘要、浏览器剪贴板、本地客户端和站外联系方式在当前已确认范围内如何处理信息。',
    h1: '数据处理与隐私说明',
  },
  {
    path: '/legal/service/',
    kind: 'legal',
    legalId: 'service-license',
    title: '软件服务与授权边界｜方寸有序工作室',
    description: '查看三款正式软件、个性化定制、年度授权以及客户端与校验文件的当前公开边界。',
    h1: '软件服务与授权边界',
  },
]

function canonicalFor(routePath) {
  return new URL(routePath.replace(/^\//, ''), SITE_ORIGIN).href
}

function normalizeManifestRoute(route) {
  if (route.path === '404') {
    return {
      ...route,
      path: '/404.html',
      indexable: false,
      canonical: null,
    }
  }

  return {
    ...route,
    indexable: true,
    canonical: route.canonical ?? canonicalFor(route.path),
  }
}

export function collectRouteDefinitions() {
  const manifestRoutes = SEO_ROUTES.map(normalizeManifestRoute)
  const existing = new Set(manifestRoutes.map((route) => route.path))
  const syntheticRoutes = SYNTHETIC_ROUTES
    .filter((route) => !existing.has(route.path))
    .map((route) => ({
      ...route,
      status: 200,
      indexable: true,
      canonical: canonicalFor(route.path),
      og: {
        title: route.title,
        description: route.description,
        type: 'website',
        url: canonicalFor(route.path),
      },
    }))

  return [...manifestRoutes, ...syntheticRoutes]
}

export function routeToOutputFile(routePath) {
  if (routePath === '/') return 'index.html'
  if (routePath === '/404.html') return '404.html'
  return `${routePath.replace(/^\/+|\/+$/g, '')}/index.html`
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function fallbackBody(route) {
  if (Array.isArray(route.coreStaticBody) && route.coreStaticBody.length) {
    return route.coreStaticBody
  }
  if (route.kind === 'product-index') {
    return PRODUCTS.map((product) => `${product.name}：${product.statement}`)
  }
  return [route.description]
}

function staticProductCards() {
  return PRODUCTS.map((product) => {
    const metric = product.price?.public
      ? product.price.display
      : '预约 体验'
    return `<article class="product-card">
          <a class="product-card-detail-link" href="${escapeHtml(product.route)}" aria-label="查看${escapeHtml(product.name)}详情">
            <span class="status-pill">${escapeHtml(product.status.label)}</span>
            <img class="product-card-icon-image" src="${escapeHtml(SITE.softwareIcon.image)}" alt="" width="64" height="64" />
            <h3>${escapeHtml(product.name)}</h3>
            <p>${escapeHtml(product.statement)}</p>
            <div class="card-metric">${escapeHtml(metric)}</div>
            <span>查看产品详情</span>
          </a>
        </article>`
  }).join('\n')
}

function staticDownloadLinks() {
  return PRODUCTS.flatMap((product) => getProductPublicFiles(product).map((file) => ({ product, file })))
    .map(({ product, file }) => `<article class="download-card">
          <span>${escapeHtml(product.shortName)}</span>
          <h3>${escapeHtml(file.title)}</h3>
          <p>${escapeHtml(file.filename)} · ${escapeHtml(file.displaySize)}</p>
          <a href="${escapeHtml(file.path)}"${file.external ? ' target="_blank" rel="noreferrer"' : ` download="${escapeHtml(file.filename)}"`}>${escapeHtml(file.buttonLabel ?? '下载文件')}</a>
        </article>`)
    .join('\n')
}

function staticNavigation(route) {
  const homeFragments = route.path === '/'
    ? '<a href="#pricing">服务与价格</a><a href="#contact">联系我们</a>'
    : ''
  return `<nav aria-label="主要导航">
          <a href="/">首页</a>
          <a href="/products/">产品中心</a>
          <a href="/products/label/">标签排版</a>
          <a href="/products/bleed/">胀色裁切</a>
          <a href="/products/pdf/">PDF 配印</a>
          <a href="/solutions/">行业方案</a>
          <a href="/custom/requirements/">描述你的需求</a>
          <a href="/updates/">产品更新</a>
          <a href="/guides/">使用指南</a>
          <a href="/downloads/">文件下载</a>
          <a href="/legal/privacy/">隐私说明</a>
          <a href="/legal/service/">服务与授权</a>
          ${homeFragments}
        </nav>`
}

function structuredDataForRoute(route) {
  let value = null
  if (route.path === '/') {
    value = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.fullName,
      url: SITE.publicUrl,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SITE.phone,
        contactType: 'software inquiry',
      },
    }
  } else if (route.productId) {
    const product = PRODUCTS.find((item) => item.id === route.productId)
    if (product) {
      value = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: product.name,
        description: product.statement,
        applicationCategory: 'BusinessApplication',
        url: canonicalFor(product.route),
        ...(product.price?.public ? {
          offers: {
            '@type': 'Offer',
            price: String(product.price.amountCny),
            priceCurrency: 'CNY',
            url: canonicalFor(product.route),
          },
        } : {}),
      }
    }
  }
  if (!value) return ''
  return `<script type="application/ld+json">${JSON.stringify(value).replaceAll('<', '\\u003c')}</script>`
}

export function buildRouteHtml(route) {
  if (!route) throw new TypeError('route is required')
  const isIndexable = route.indexable !== false
  const canonical = isIndexable
    ? `\n    <link rel="canonical" href="${escapeHtml(route.canonical)}" />`
    : ''
  const robots = isIndexable
    ? '<meta name="robots" content="index,follow" />'
    : '<meta name="robots" content="noindex,nofollow" />'
  const og = isIndexable
    ? `
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:type" content="${escapeHtml(route.og?.type ?? 'website')}" />
    <meta property="og:url" content="${escapeHtml(route.canonical)}" />
    <meta property="og:image" content="${escapeHtml(new URL('assets/generated/hero-workflow.png', SITE_ORIGIN).href)}" />`
    : ''
  const paragraphs = fallbackBody(route)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join('')
  const productCards = PRODUCT_SURFACE_PATHS.has(route.path)
    ? `<section aria-labelledby="static-products-heading">
        <h2 id="static-products-heading">产品中心</h2>
        ${staticProductCards()}
      </section>`
    : ''
  const homeSections = route.path === '/'
    ? '<section id="pricing"><h2>服务与价格</h2></section><footer id="contact">电话 17734375651（微信同号）</footer>'
    : ''
  const downloadSection = route.path === '/downloads/'
    ? `<section aria-labelledby="static-downloads-heading"><h2 id="static-downloads-heading">公开文件下载</h2>${staticDownloadLinks()}</section>`
    : ''
  const structuredData = structuredDataForRoute(route)

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0b100e" />
    ${robots}
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />${canonical}${og}
    <link rel="icon" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    ${structuredData}
  </head>
  <body>
    <div id="root">
      <main class="static-fallback">
        ${staticNavigation(route)}
        <h1>${escapeHtml(route.h1)}</h1>
        ${paragraphs}
        ${productCards}
        ${downloadSection}
        ${homeSections}
      </main>
    </div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`.replace(/[ \t]+$/gm, '')
}

export function buildSitemapXml(routes = collectRouteDefinitions()) {
  const urls = routes
    .filter((route) => route.indexable !== false && route.canonical)
    .map((route) => `  <url><loc>${escapeHtml(route.canonical)}</loc></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', SITE_ORIGIN).href}\n`
}

export async function generateRoutePages(root = ROOT) {
  const routes = collectRouteDefinitions()
  for (const route of routes) {
    const outputPath = path.join(root, routeToOutputFile(route.path))
    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, buildRouteHtml(route), 'utf8')
  }
  const sitemap = buildSitemapXml(routes)
  const robots = buildRobotsTxt()
  const publicDirectory = path.join(root, 'public')
  await mkdir(publicDirectory, { recursive: true })
  await writeFile(path.join(root, 'sitemap.xml'), sitemap, 'utf8')
  await writeFile(path.join(root, 'robots.txt'), robots, 'utf8')
  await writeFile(path.join(publicDirectory, 'sitemap.xml'), sitemap, 'utf8')
  await writeFile(path.join(publicDirectory, 'robots.txt'), robots, 'utf8')
  return routes
}

const isDirectRun = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href

if (isDirectRun) {
  const routes = await generateRoutePages()
  process.stdout.write(`Generated ${routes.length} route documents.\n`)
}
