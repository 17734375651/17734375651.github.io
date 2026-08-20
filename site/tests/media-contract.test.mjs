import test from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { PRODUCTS } from '../src/data/products.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('every declared local product media path exists in the public tree', async () => {
  for (const product of PRODUCTS) {
    for (const [kind, value] of Object.entries(product.media)) {
      if (typeof value !== 'string' || !value.startsWith('/')) continue
      await assert.doesNotReject(
        access(path.join(root, 'public', value.replace(/^\//, ''))),
        `${product.id} ${kind} is missing: ${value}`,
      )
    }
  }
})

test('the bleed operation recording uses sanitized demo data and is silent', () => {
  const bleed = PRODUCTS.find((product) => product.id === 'bleed')
  assert.equal(bleed.media.declared, true)
  assert.equal(bleed.media.mode, 'actual-operation-redacted')
  assert.equal(bleed.media.redacted, true)
  assert.equal(bleed.media.redactionMethod, 'synthetic-demo-data')
  assert.equal(bleed.media.silent, true)
  assert.equal(bleed.media.sourceBuild, '1.2.11')
  assert.equal(bleed.media.video, '/assets/media/bleed-operation-sanitized-no-taskbar.mp4')
  assert.equal(bleed.media.poster, '/assets/media/bleed-operation-sanitized-no-taskbar-poster.webp')
})

test('every finished product exposes a synthetic or sanitized demo materials package', () => {
  const label = PRODUCTS.find((product) => product.id === 'label')
  const bleed = PRODUCTS.find((product) => product.id === 'bleed')
  const pdf = PRODUCTS.find((product) => product.id === 'pdf')

  assert.equal(label.media.attachments?.[0]?.filename, 'label-redacted-demo-materials-20260820.zip')
  assert.equal(label.media.attachments?.[0]?.provenance, 'synthetic-demo-package')
  assert.equal(label.media.attachments?.[0]?.softwareExecutionClaim, false)

  assert.deepEqual(bleed.media.attachments, [
    {
      title: '脱敏功能演示素材包',
      description: '含复杂演示订单、单页 PDF、实际排版示例与自动验收记录',
      filename: 'bleed-redacted-demo-materials-20260814.zip',
      path: '/assets/downloads/bleed-redacted-demo-materials-20260814.zip',
      format: 'ZIP',
      bytes: 98141990,
      displaySize: '93.6 MB',
      fileCount: 152,
      sha256: '7740F2C032FDFCE313B6333FF83D8048591982B470FADCFF877C370B97A235B6',
      notice: '公开演示数据 · 已脱敏',
      buttonLabel: '下载脱敏功能演示素材包',
    },
  ])

  assert.equal(pdf.media.attachments?.[0]?.filename, 'pdf-redacted-demo-materials-20260820.zip')
  assert.equal(pdf.media.attachments?.[0]?.provenance, 'synthetic-demo-package')
  assert.equal(pdf.media.attachments?.[0]?.softwareExecutionClaim, false)

  const productsWithAttachments = PRODUCTS
    .filter((product) => product.media.attachments?.length)
    .map((product) => product.id)
  assert.deepEqual(productsWithAttachments, ['label', 'bleed', 'pdf'])
})

test('the product media surface renders attachment metadata as a download action', async () => {
  const app = await readFile(path.join(root, 'src', 'App.jsx'), 'utf8')
  assert.match(app, /product\.media\.attachments/)
  assert.match(app, /className="media-attachments"/)
  assert.match(app, /media-attachment-download/)
  assert.match(app, /download=\{attachment\.filename\}/)
  assert.match(app, /attachment\.displaySize/)
  assert.match(app, /公开演示数据下载/)
})

test('every declared demo attachment exists in the public download tree', async () => {
  for (const product of PRODUCTS) {
    for (const attachment of product.media.attachments ?? []) {
      await assert.doesNotReject(
        access(path.join(root, 'public', attachment.path.replace(/^\//, ''))),
        `${product.id} attachment is missing: ${attachment.path}`,
      )
    }
  }
})
