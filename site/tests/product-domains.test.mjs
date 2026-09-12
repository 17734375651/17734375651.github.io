import test from 'node:test'
import assert from 'node:assert/strict'
import { PRODUCTS, getProductPublicFiles } from '../src/data/products.js'
import { PRODUCT_DOMAINS, WORKFLOW_ROADMAP, getProductsByDomain, getDomainByProductId } from '../src/data/product-domains.js'
import { collectRouteDefinitions, buildRouteHtml, buildSitemapXml } from '../scripts/generate-route-pages.mjs'
import { getActiveNavHref } from '../src/lib/navigation.js'

const expected = {
  workflow: ['accounting', 'color-size'],
  'print-layout': ['label', 'bleed', 'multisize-bleed', 'pdf', 'gtin-pdf'],
}

test('seven real products belong to exactly one of two product domains', () => {
  assert.deepEqual(PRODUCT_DOMAINS.map(d => d.id), Object.keys(expected))
  const grouped = []
  for (const domain of PRODUCT_DOMAINS) {
    const products = getProductsByDomain(domain.id)
    assert.deepEqual(products.map(p => p.id), expected[domain.id])
    for (const product of products) {
      assert.equal(product.categoryId, domain.id)
      assert.equal(getDomainByProductId(product.id), domain)
      assert.ok(PRODUCTS.includes(product), 'shared product objects preserve download facts')
    }
    grouped.push(...products)
  }
  assert.equal(new Set(grouped).size, 7)
  assert.deepEqual(new Set(grouped), new Set(PRODUCTS))
  assert.deepEqual(getProductsByDomain('missing'), [])
  assert.equal(getDomainByProductId('missing'), null)
})

test('industrial client integration is a separate planned roadmap, not a released product', () => {
  assert.equal(WORKFLOW_ROADMAP.title, '实业客户端')
  assert.equal(WORKFLOW_ROADMAP.state, 'planned')
  assert.match(WORKFLOW_ROADMAP.description, /计划.*记账.*ERP.*实业客户端/)
  assert.match(WORKFLOW_ROADMAP.description, /独立下载.*尚未上线/)
  assert.ok(WORKFLOW_ROADMAP.modules.length >= 2)
  for (const module of WORKFLOW_ROADMAP.modules) assert.equal(module.state, 'planned')
  assert.doesNotMatch(JSON.stringify(PRODUCTS), /\bERP\b|实业客户端|\/products\/erp\//i)
  const files = PRODUCTS.flatMap(p => getProductPublicFiles(p))
  assert.equal(files.length, 28)
  assert.doesNotMatch(JSON.stringify(files), /ERP|packing|实业客户端/i)
})

test('both domain routes have unique SEO, current navigation, and strictly scoped static product cards', () => {
  const routes = collectRouteDefinitions()
  assert.equal(routes.length, 19)
  for (const domain of PRODUCT_DOMAINS) {
    const route = routes.find(r => r.path === domain.route)
    assert.ok(route)
    assert.equal(route.h1, domain.headline)
    assert.equal(route.canonical, `https://17734375651.github.io${domain.route}`)
    assert.equal(getActiveNavHref(domain.route), '/products/')
    assert.equal(getActiveNavHref(domain.route.slice(0, -1)), '/products/')
    const html = buildRouteHtml(route)
    assert.match(html, new RegExp(`data-domain="${domain.id}"`))
    const ids = [...html.matchAll(/class="product-card-detail-link" href="\/products\/([^/]+)\/"/g)].map(m => m[1])
    assert.deepEqual(ids, expected[domain.id])
    assert.equal((html.match(/<h1\b/g) || []).length, 1)
    if (domain.id === 'workflow') {
      assert.match(html, /规划中/)
      assert.match(html, /内置集成尚未上线/)
      assert.match(html, /ERP/)
      assert.doesNotMatch(html, /"@type":"SoftwareApplication"/)
    } else assert.doesNotMatch(html, /ERP/)
    assert.match(buildSitemapXml(routes), new RegExp(domain.route))
  }
  assert.ok(!routes.some(r => ['/products/erp/', '/products/packing/'].includes(r.path)))
})

test('home, product overview and downloads expose both real groups without dropping files', () => {
  const routes = collectRouteDefinitions()
  for (const pathname of ['/', '/products/', '/downloads/']) {
    const html = buildRouteHtml(routes.find(r => r.path === pathname))
    for (const domain of PRODUCT_DOMAINS) {
      assert.match(html, new RegExp(`data-domain="${domain.id}"`))
      assert.match(html, new RegExp(`href="${domain.route}"`))
    }
    if (pathname === '/downloads/') assert.equal((html.match(/class="download-card"/g) || []).length, 28)
  }
})
