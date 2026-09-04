import test from 'node:test'
import assert from 'node:assert/strict'
import { access, mkdtemp } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import {
  buildRobotsTxt,
  buildRouteHtml,
  buildSitemapXml,
  collectRouteDefinitions,
  generateRoutePages,
  routeToOutputFile,
} from '../scripts/generate-route-pages.mjs'
import { NAV_ITEMS } from '../src/data/site.js'
import { CONTENT_CATEGORIES } from '../src/data/public-content.js'
import { PRODUCTS } from '../src/data/products.js'

test('route definitions cover the mature-site information architecture', () => {
  const routes = collectRouteDefinitions()
  const paths = new Set(routes.map((route) => route.path))
  for (const required of [
    '/',
    '/products/',
    '/products/label/',
    '/products/bleed/',
    '/products/multisize-bleed/',
    '/products/pdf/',
    '/products/accounting/',
    '/products/gtin-pdf/',
    '/products/color-size/',
    '/solutions/',
    '/custom/requirements/',
    '/updates/',
    '/guides/',
    '/downloads/',
    '/legal/privacy/',
    '/legal/service/',
    '/404.html',
  ]) {
    assert.equal(paths.has(required), true, `missing route ${required}`)
  }
})

test('indexable routes have unique metadata and absolute canonicals', () => {
  const routes = collectRouteDefinitions().filter((route) => route.indexable !== false)
  assert.equal(new Set(routes.map((route) => route.title)).size, routes.length)
  assert.equal(new Set(routes.map((route) => route.canonical)).size, routes.length)
  for (const route of routes) {
    assert.match(route.canonical, /^https:\/\/17734375651\.github\.io\//)
    assert.ok(route.h1)
    assert.ok(route.description.length >= 28)
  }
})

test('routeToOutputFile maps directory routes and the custom 404 file', () => {
  assert.equal(routeToOutputFile('/'), 'index.html')
  assert.equal(routeToOutputFile('/products/bleed/'), 'products/bleed/index.html')
  assert.equal(routeToOutputFile('/products/multisize-bleed/'), 'products/multisize-bleed/index.html')
  assert.equal(routeToOutputFile('/products/accounting/'), 'products/accounting/index.html')
  assert.equal(routeToOutputFile('/products/gtin-pdf/'), 'products/gtin-pdf/index.html')
  assert.equal(routeToOutputFile('/products/color-size/'), 'products/color-size/index.html')
  assert.equal(routeToOutputFile('/404.html'), '404.html')
})

test('generated HTML contains static route content and real navigation links', () => {
  const route = collectRouteDefinitions().find((item) => item.path === '/products/bleed/')
  const html = buildRouteHtml(route)
  assert.match(html, /<title>方寸有序胀色裁切/)
  assert.match(html, /rel="canonical" href="https:\/\/17734375651\.github\.io\/products\/bleed\/"/)
  assert.match(html, /<h1>方寸有序胀色裁切<\/h1>/)
  assert.match(html, /方寸有序多尺寸胀色裁切/)
  assert.match(html, /¥799 \/ 年/)
  assert.match(html, /¥1499 \/ 年/)
  assert.match(html, /href="\/products\/"/)
  assert.match(html, /href="\/custom\/requirements\/"/)
  assert.doesNotMatch(html, /小工厂/)
})

test('new product routes render their approved names, prices, and canonical links', () => {
  const expected = [
    { id: 'accounting', name: '方寸有序记账软件', price: '¥999 / 账号 / 年' },
    { id: 'gtin-pdf', name: '方寸有序条码匹配', price: '价格咨询' },
    { id: 'color-size', name: '方寸有序颜色尺寸提取', price: '价格咨询' },
  ]
  for (const product of expected) {
    const route = collectRouteDefinitions().find((item) => item.path === `/products/${product.id}/`)
    assert.ok(route, `missing route /products/${product.id}/`)
    const html = buildRouteHtml(route)
    assert.match(html, new RegExp(`<title>${product.name}`))
    assert.match(html, new RegExp(`rel="canonical" href="https://17734375651\\.github\\.io/products/${product.id}/"`))
    assert.match(html, new RegExp(`<h1>${product.name}</h1>`))
    assert.match(html, new RegExp(product.price.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }
})

test('product surfaces keep truthful product cards and crawlable mature-site links without JavaScript', () => {
  const home = collectRouteDefinitions().find((item) => item.path === '/')
  const html = buildRouteHtml(home)
  assert.equal((html.match(/class="product-card"/g) ?? []).length, 7)
  assert.equal((html.match(/class="product-card-detail-link"/g) ?? []).length, 7)
  assert.equal((html.match(/class="product-card-icon-image"/g) ?? []).length, 7)
  assert.equal((html.match(/src="\/assets\/brand\/fangcun-software-icon\.png"/g) ?? []).length, 7)
  for (const product of PRODUCTS) {
    assert.match(html, new RegExp(`class="product-card-detail-link" href="${product.route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`))
  }
  assert.equal((html.match(/正式销售 · 已验证下载/g) ?? []).length, 7)
  assert.match(html, /方寸有序多尺寸胀色裁切/)
  assert.match(html, /¥1499 \/ 年/)
  assert.doesNotMatch(html, /正式销售 · 展示包可下载/)
  assert.doesNotMatch(html, /ERP|\/products\/erp\//i)
  assert.match(html, /href="\/updates\/"/)
  assert.match(html, /href="\/guides\/"/)
  assert.match(html, /href="#pricing"/)
  assert.match(html, /href="#contact"/)
})

test('downloads page exposes every real public file without JavaScript', () => {
  const route = collectRouteDefinitions().find((item) => item.path === '/downloads/')
  const html = buildRouteHtml(route)
  for (const filename of [
    'fangcun-label-imposition-1.1.0-win-x64-public.zip',
    'fangcun-bleed-1.2.12-win-x86-public.zip',
    'fangcun-multisize-bleed-cut-0.10.0-win-x64-public.zip',
    'fangcun-pdf-print-assistant-1.1.0-win-x64-public.zip',
    'fangcun-accounting-0.8.0-win-x64-public.zip',
    'fangcun-gtin-pdf-integrator-1.1.0-win-x64-public.zip',
    'fangcun-color-size-extractor-1.0.2-win-x64-public.zip',
    'public-manifest.json',
    'release-record.json',
    'SHA256SUMS.txt',
  ]) {
    assert.match(html, new RegExp(filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }
  const downloadItems = CONTENT_CATEGORIES.find((category) => category.id === 'downloads').items
  assert.equal((html.match(/class="download-card"/g) ?? []).length, downloadItems.length)
  assert.equal(downloadItems.length, 28)
  assert.doesNotMatch(html, /redacted-demo-materials|脱敏展示包/)
  assert.doesNotMatch(html, /ERP|\/products\/erp\//i)
})

test('sitemap and robots expose indexable canonicals but exclude the 404 page', () => {
  const routes = collectRouteDefinitions()
  const sitemap = buildSitemapXml(routes)
  const robots = buildRobotsTxt()
  assert.match(sitemap, /https:\/\/17734375651\.github\.io\/products\/bleed\//)
  assert.match(sitemap, /https:\/\/17734375651\.github\.io\/products\/multisize-bleed\//)
  assert.doesNotMatch(sitemap, /\/products\/packing\//)
  assert.match(sitemap, /https:\/\/17734375651\.github\.io\/legal\/privacy\//)
  assert.doesNotMatch(sitemap, /404\.html/)
  assert.match(robots, /Sitemap: https:\/\/17734375651\.github\.io\/sitemap\.xml/)
})

test('primary navigation uses crawlable destination routes', () => {
  const byLabel = Object.fromEntries(NAV_ITEMS.map((item) => [item.label, item.href]))
  assert.equal(byLabel['产品'], '/products/')
  assert.equal(byLabel['行业方案'], '/solutions/')
  assert.equal(byLabel['内容中心'], '/updates/')
})

test('home metadata leads with the selected workflow value proposition', () => {
  const home = collectRouteDefinitions().find((route) => route.path === '/')
  assert.equal(home.h1, '把重复工作，整理成清晰可执行的流程')
  assert.doesNotMatch(home.h1, /正式成立/)
})

test('product pages expose factual software structured data without ratings or customer claims', () => {
  const page = collectRouteDefinitions().find((route) => route.path === '/products/bleed/')
  const html = buildRouteHtml(page)
  assert.match(html, /application\/ld\+json/)
  assert.match(html, /"@type":"SoftwareApplication"/)
  assert.match(html, /"name":"方寸有序胀色裁切"/)
  assert.match(html, /"price":"799"/)
  assert.doesNotMatch(html, /aggregateRating|reviewCount|customer/i)

  const multisizePage = collectRouteDefinitions().find((route) => route.path === '/products/multisize-bleed/')
  const multisizeHtml = buildRouteHtml(multisizePage)
  assert.match(multisizeHtml, /"name":"方寸有序多尺寸胀色裁切"/)
  assert.match(multisizeHtml, /"price":"1499"/)
  assert.match(multisizeHtml, /在大幅 PDF 中自动识别并提取单张标签/)
  assert.match(multisizeHtml, /多尺寸标签进行胀色裁切排版/)
  assert.doesNotMatch(multisizeHtml, /aggregateRating|reviewCount|customer/i)
})

test('route generation stages robots and sitemap for Vite public output', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'fangcun-routes-'))
  await generateRoutePages(root)
  await access(path.join(root, 'public', 'robots.txt'))
  await access(path.join(root, 'public', 'sitemap.xml'))
})
