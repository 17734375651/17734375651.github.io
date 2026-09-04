import test from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { CONTENT_CATEGORIES } from '../src/data/public-content.js'
import { PRODUCTS } from '../src/data/products.js'
import { SOLUTIONS } from '../src/data/public-solutions.js'
import { LEGAL_PAGES } from '../src/data/legal.js'
import { SEO_ROUTES, SITE } from '../src/data/site.js'
import { normalizePrefill } from '../src/lib/requirements.js'
import { collectRouteDefinitions } from '../scripts/generate-route-pages.mjs'

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = path.resolve(siteRoot, '..')
const retiredPackingPattern = /\bpacking\b|fangcun-packing|方寸打包计算器|打包计算|装箱方案|箱型|快递计费/i

async function readTextTree(root) {
  const texts = []
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const entryPath = path.join(root, entry.name)
    if (entry.isDirectory()) {
      texts.push(await readTextTree(entryPath))
    } else if (/\.(?:html|xml|txt|js|json)$/i.test(entry.name)) {
      texts.push(await readFile(entryPath, 'utf8'))
    }
  }
  return texts.join('\n')
}

test('the retired packing calculator is absent from every public website projection', async () => {
  assert.deepEqual(PRODUCTS.map((product) => product.id), [
    'label',
    'bleed',
    'multisize-bleed',
    'pdf',
    'accounting',
    'gtin-pdf',
    'color-size',
  ])
  assert.equal(PRODUCTS.length, 7)

  const publicProjection = JSON.stringify({
    products: PRODUCTS,
    content: CONTENT_CATEGORIES,
    solutions: SOLUTIONS,
    legal: LEGAL_PAGES,
    seo: SEO_ROUTES,
    site: SITE,
  })
  assert.doesNotMatch(publicProjection, retiredPackingPattern)
  assert.equal(collectRouteDefinitions().some((route) => route.path === '/products/packing/'), false)
  assert.deepEqual(
    normalizePrefill(new URLSearchParams('product=packing')),
    { scenario: null, product: null },
  )

  const sourceProjection = (
    await Promise.all([
      'src/data/products.js',
      'src/data/public-content.js',
      'src/data/public-solutions.js',
      'src/data/legal.js',
      'src/data/site.js',
      'src/lib/requirements.js',
      'scripts/generate-route-pages.mjs',
    ].map((relativePath) => readFile(path.join(siteRoot, relativePath), 'utf8')))
  ).join('\n')
  assert.doesNotMatch(sourceProjection, retiredPackingPattern)

  await assert.rejects(access(path.join(siteRoot, 'products', 'packing', 'index.html')))
  await assert.rejects(access(path.join(repoRoot, 'docs', 'products', 'packing', 'index.html')))
  assert.doesNotMatch(await readTextTree(path.join(repoRoot, 'docs')), retiredPackingPattern)
})
