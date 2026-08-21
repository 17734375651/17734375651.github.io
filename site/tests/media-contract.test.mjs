import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { PRODUCTS, getProductPublicFiles } from '../src/data/products.js'
import { SITE } from '../src/data/site.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('every product card uses the preserved shortcut software icon', async () => {
  assert.deepEqual(SITE.softwareIcon, {
    image: '/assets/brand/fangcun-software-icon.png',
    original: '/assets/brand/fangcun-software-icon.ico',
  })
  const image = await readFile(path.join(root, 'public', SITE.softwareIcon.image.replace(/^\//, '')))
  const original = await readFile(path.join(root, 'public', SITE.softwareIcon.original.replace(/^\//, '')))
  assert.equal(image.subarray(1, 4).toString('ascii'), 'PNG')
  assert.equal(image.readUInt32BE(16), 256)
  assert.equal(image.readUInt32BE(20), 256)
  assert.equal(createHash('sha256').update(image).digest('hex').toUpperCase(), '3C64E055FA2C62E3C6B71FB2B14EF46AEAB65964FE8506CF0DAF7025ADF47158')
  assert.equal(createHash('sha256').update(original).digest('hex').toUpperCase(), '3B46E760F1CA74F3D5DD179C5570D4F1FEF957864A95D846F03D6F0EE03C8125')

  const app = await readFile(path.join(root, 'src', 'App.jsx'), 'utf8')
  const generator = await readFile(path.join(root, 'scripts', 'generate-route-pages.mjs'), 'utf8')
  assert.match(app, /<img src=\{SITE\.softwareIcon\.image\} alt="" width="64" height="64" \/>/)
  assert.doesNotMatch(app, /\bGearSix\b/)
  assert.match(generator, /class="product-card-icon-image"/)
  assert.match(generator, /SITE\.softwareIcon\.image/)
})

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

test('every retained product exposes direct public files without substituting a demo package for a client', async () => {
  const filesByProduct = Object.fromEntries(PRODUCTS.map((product) => [product.id, getProductPublicFiles(product)]))
  assert.deepEqual(Object.fromEntries(Object.entries(filesByProduct).map(([id, files]) => [id, files.length])), {
    label: 6,
    bleed: 5,
    pdf: 6,
  })
  for (const product of PRODUCTS) {
    const files = filesByProduct[product.id]
    assert.equal(files.filter((file) => file.kind === 'client').length, 1)
    assert.deepEqual(
      files.filter((file) => file.kind === 'release-record').map((file) => file.filename),
      ['public-manifest.json', 'release-record.json', 'SHA256SUMS.txt'],
    )
    assert.equal(files.filter((file) => file.kind === 'demo-materials').length, 1)
    assert.equal(product.status.effectiveStatus, 'available')
    assert.equal(product.status.downloadable, true)
    assert.equal(product.download.verification, 'verified')
    assert.match(product.download.version, /^\d+\.\d+\.\d+$/)
    assert.match(product.download.date, /^\d{4}-\d{2}-\d{2}$/)
    assert.equal(Number.isInteger(product.download.bytes) && product.download.bytes > 0, true)
    assert.match(product.download.sha256, /^[a-f0-9]{64}$/)
    assert.equal(product.download.sha256.toUpperCase(), product.download.sha256UppercaseInChecksum)
    assert.equal(product.download.publicLink.endsWith(`/${product.download.filename}`), true)
  }
  assert.equal(filesByProduct.label.filter((file) => file.kind === 'client-variant').length, 1)
  assert.equal(filesByProduct.pdf.filter((file) => file.kind === 'client-variant').length, 1)
  assert.equal(filesByProduct.bleed.filter((file) => file.kind === 'client-variant').length, 0)
  for (const product of PRODUCTS.filter((item) => item.download.variants?.length)) {
    for (const variant of product.download.variants) {
      assert.match(variant.sha256, /^[a-f0-9]{64}$/)
      assert.equal(variant.publicLink.endsWith(`/${variant.filename}`), true)
      assert.match(variant.platform, /Windows 7 x64/)
    }
  }
  for (const files of Object.values(filesByProduct)) {
    for (const file of files.filter((entry) => !entry.external)) {
      await access(path.join(root, 'public', file.path.replace(/^\//, '')))
    }
  }
})

test('download surfaces expose every public file as a real link', async () => {
  const app = await readFile(path.join(root, 'src', 'App.jsx'), 'utf8')
  const content = await readFile(path.join(root, 'src', 'data', 'public-content.js'), 'utf8')
  assert.match(app, /getProductPublicFiles/)
  assert.match(app, /className="download-file-list"/)
  assert.match(app, /className="download-file-row"/)
  assert.match(app, /contentMode === 'direct-download'/)
  for (const product of PRODUCTS) {
    for (const file of getProductPublicFiles(product)) {
      assert.match(`${app}\n${content}\n${JSON.stringify(PRODUCTS)}`, new RegExp(file.filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    }
  }
})
