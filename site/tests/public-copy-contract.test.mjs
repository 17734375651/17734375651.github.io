import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { LEGAL_PAGES } from '../src/data/legal.js'
import { PRODUCTS } from '../src/data/products.js'
import { SOLUTIONS } from '../src/data/public-solutions.js'
import { SITE } from '../src/data/site.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const internalPhrases = /下载记录 y|代码下载数组|RELEASE CANDIDATE|待负责人确认|静态代码审计|秘密扫描|工人端程序|私钥|不继承一小时|微信 \/ 电话/

test('public runtime data excludes internal audit language', () => {
  const runtimeCopy = JSON.stringify({ products: PRODUCTS, site: SITE, legal: LEGAL_PAGES })
  assert.doesNotMatch(runtimeCopy, internalPhrases)
})

test('public content surfaces render publishable entries only', async () => {
  const app = await readFile(path.join(root, 'src', 'App.jsx'), 'utf8')
  assert.equal((app.match(/status\s*===\s*['"]publishable['"]/g) ?? []).length >= 3, true)
})

test('browser imports a public-only content projection', async () => {
  const app = await readFile(path.join(root, 'src', 'App.jsx'), 'utf8')
  const publicContent = await readFile(path.join(root, 'src', 'data', 'public-content.js'), 'utf8')

  assert.match(app, /from ['"]\.\/data\/public-content\.js['"]/) 
  assert.doesNotMatch(app, /from ['"]\.\/data\/content\.js['"]/) 
  assert.doesNotMatch(
    publicContent,
    /evidence|indexableReason|publishRule|secretScan|webWhitelist|verification=verified|本地工作树|发布正文|正式价格、版本、哈希/
  )
})

test('browser imports a public-only industry-solution projection', async () => {
  const app = await readFile(path.join(root, 'src', 'App.jsx'), 'utf8')
  const publicSolutions = await readFile(path.join(root, 'src', 'data', 'public-solutions.js'), 'utf8')

  assert.match(app, /from ['"]\.\/data\/public-solutions\.js['"]/) 
  assert.doesNotMatch(app, /from ['"]\.\/data\/solutions\.js['"]/) 
  assert.doesNotMatch(
    publicSolutions,
    /evidenceRefs|forbiddenInventedFields|productStatus|官网场景总览文案|官网当前|待转化流程|未核验|不继承/
  )
})

test('customer-facing copy uses bounded workflow language', async () => {
  const app = await readFile(path.join(root, 'src', 'App.jsx'), 'utf8')
  assert.doesNotMatch(app, /开箱即用|每一次交付都更清晰|RELEASE STATUS/)
  assert.match(app, /把输入、处理与输出梳理成可复核流程/)
  assert.match(app, /一小时体验适用于四款印前工具/)
  assert.match(app, /打包计算器与记账软件按各自年度授权说明/)
})

test('generated static shell uses the same customer-facing contact wording', async () => {
  const generator = await readFile(path.join(root, 'scripts', 'generate-route-pages.mjs'), 'utf8')
  assert.doesNotMatch(generator, /微信 \/ 电话/)
  assert.match(generator, /电话 17734375651（微信同号）/)
})

test('SME solution links the packing and accounting products to the confirmed business workflow', () => {
  const solution = SOLUTIONS.find((item) => item.id === 'small-and-medium-enterprise')
  assert.ok(solution, 'the SME solution is required')
  const relatedIds = solution.relatedProducts.map((product) => product.productId)
  assert.equal(relatedIds.includes('packing'), true)
  assert.equal(relatedIds.includes('accounting'), true)

  const publicCopy = JSON.stringify(solution)
  for (const term of ['销售', '进货', '财务', '商品', '箱型', '快递计费']) {
    assert.match(publicCopy, new RegExp(term), `SME solution copy must mention ${term}`)
  }
  assert.doesNotMatch(publicCopy, /\bERP\b|\/products\/erp\//i)
})
