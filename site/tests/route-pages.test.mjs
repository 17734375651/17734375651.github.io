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
    '/products/pdf/',
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
  assert.equal(routeToOutputFile('/404.html'), '404.html')
})

test('generated HTML contains static route content and real navigation links', () => {
  const route = collectRouteDefinitions().find((item) => item.path === '/products/bleed/')
  const html = buildRouteHtml(route)
  assert.match(html, /<title>方寸有序胀色裁切/)
  assert.match(html, /rel="canonical" href="https:\/\/17734375651\.github\.io\/products\/bleed\/"/)
  assert.match(html, /<h1>方寸有序胀色裁切<\/h1>/)
  assert.match(html, /href="\/products\/"/)
  assert.match(html, /href="\/custom\/requirements\/"/)
  assert.doesNotMatch(html, /小工厂/)
})

test('product surfaces keep truthful product cards and crawlable mature-site links without JavaScript', () => {
  const home = collectRouteDefinitions().find((item) => item.path === '/')
  const html = buildRouteHtml(home)
  assert.equal((html.match(/class="product-card"/g) ?? []).length, 3)
  assert.equal((html.match(/class="product-card-detail-link"/g) ?? []).length, 3)
  for (const product of PRODUCTS) {
    assert.match(html, new RegExp(`class="product-card-detail-link" href="${product.route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`))
  }
  assert.equal((html.match(/正式销售 · 已验证下载/g) ?? []).length, 3)
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
    'fangcun-label-imposition-20260821-win10-11-x64-public.zip',
    'fangcun-label-imposition-20260821-win7-x64-public.zip',
    'fangcun-bleed-cutting-1.2.11-win-x86-public.zip',
    'fangcun-pdf-print-assistant-20260821-win10-11-x64-public.zip',
    'fangcun-pdf-print-assistant-20260821-win7-x64-public.zip',
    'label-redacted-demo-materials-20260820.zip',
    'bleed-redacted-demo-materials-20260814.zip',
    'pdf-redacted-demo-materials-20260820.zip',
    'public-manifest.json',
    'release-record.json',
    'SHA256SUMS.txt',
  ]) {
    assert.match(html, new RegExp(filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }
  const downloadItems = CONTENT_CATEGORIES.find((category) => category.id === 'downloads').items
  assert.equal((html.match(/class="download-card"/g) ?? []).length, downloadItems.length)
  assert.equal(downloadItems.length, 17)
  assert.doesNotMatch(html, /ERP|\/products\/erp\//i)
})

test('sitemap and robots expose indexable canonicals but exclude the 404 page', () => {
  const routes = collectRouteDefinitions()
  const sitemap = buildSitemapXml(routes)
  const robots = buildRobotsTxt()
  assert.match(sitemap, /https:\/\/17734375651\.github\.io\/products\/bleed\//)
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
})

test('route generation stages robots and sitemap for Vite public output', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'fangcun-routes-'))
  await generateRoutePages(root)
  await access(path.join(root, 'public', 'robots.txt'))
  await access(path.join(root, 'public', 'sitemap.xml'))
})
