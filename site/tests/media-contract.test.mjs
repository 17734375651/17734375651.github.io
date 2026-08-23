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

test('the site header uses the shortcut software icon without changing the footer mark', async () => {
  const app = await readFile(path.join(root, 'src', 'App.jsx'), 'utf8')
  const styles = await readFile(path.join(root, 'src', 'styles.css'), 'utf8')
  const headerSource = app.slice(app.indexOf('function Header'), app.indexOf('function Footer'))

  assert.match(
    headerSource,
    /<span className="brand-mark brand-mark-software" aria-hidden="true"><img src=\{SITE\.softwareIcon\.image\} alt="" width="54" height="54" \/><\/span>/,
  )
  assert.doesNotMatch(
    headerSource,
    /<span className="brand-mark">方<\/span>/,
  )
  assert.match(
    app,
    /className="footer-brand"[^]*?<span className="brand-mark">方<\/span>/,
  )
  assert.match(
    styles,
    /\.brand-mark-software\s*\{[^}]*overflow:\s*hidden;[^}]*border-radius:\s*var\(--software-icon-radius\);/s,
  )
  assert.match(
    styles,
    /\.brand-mark-software img\s*\{[^}]*width:\s*100%;[^}]*height:\s*100%;[^}]*border-radius:\s*inherit;[^}]*object-fit:\s*contain;/s,
  )
})

test('every rendered software icon uses the approved Xiaomi-style rounded-square frame', async () => {
  const styles = await readFile(path.join(root, 'src', 'styles.css'), 'utf8')
  const generator = await readFile(path.join(root, 'scripts', 'generate-route-pages.mjs'), 'utf8')

  assert.match(styles, /--software-icon-radius:\s*26%/)
  assert.match(
    styles,
    /\.product-card-icon\s*\{[^}]*overflow:\s*hidden;[^}]*border:\s*1px solid #d3ba7e;[^}]*border-radius:\s*var\(--software-icon-radius\);/s,
  )
  assert.match(
    styles,
    /\.product-card-icon-image\s*\{[^}]*border:\s*1px solid #d3ba7e;[^}]*border-radius:\s*var\(--software-icon-radius\);[^}]*object-fit:\s*contain;/s,
  )
  assert.match(styles, /\.product-card-icon img\s*\{[^}]*border-radius:\s*inherit;/s)
  assert.doesNotMatch(styles, /\.product-card-icon[^}]*border-radius:\s*50%/s)
  assert.match(generator, /class="product-card-icon-image"/)
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

test('the label product uses the trimmed actual-operation recording with synthetic data', () => {
  const label = PRODUCTS.find((product) => product.id === 'label')
  assert.equal(label.media.declared, true)
  assert.equal(label.media.mode, 'actual-operation-redacted')
  assert.equal(label.media.redacted, true)
  assert.equal(label.media.redactionMethod, 'synthetic-demo-data')
  assert.equal(label.media.silent, true)
  assert.equal(label.media.sourceBuild, '2026-08-21 操作录屏')
  assert.equal(label.media.video, '/assets/media/label-operation-synthetic-no-taskbar.mp4')
  assert.equal(label.media.poster, '/assets/media/label-operation-synthetic-no-taskbar-poster.webp')
})

test('conversation-generated demo packages and attachment hooks are absent', async () => {
  for (const product of PRODUCTS) {
    assert.equal('attachments' in product.media, false, `${product.id} must not expose deleted attachments`)
  }

  const deletedFiles = [
    'label-redacted-demo-materials-20260820.zip',
    'bleed-redacted-demo-materials-20260814.zip',
    'pdf-redacted-demo-materials-20260820.zip',
  ]
  const repoRoot = path.resolve(root, '..')
  for (const filename of deletedFiles) {
    for (const tree of [
      path.join(root, 'public', 'assets', 'downloads'),
      path.join(repoRoot, 'docs', 'assets', 'downloads'),
    ]) {
      await assert.rejects(
        access(path.join(tree, filename)),
        `${filename} must remain deleted from ${tree}`,
      )
    }
  }

  const sourceFiles = [
    path.join(root, 'src', 'App.jsx'),
    path.join(root, 'src', 'styles.css'),
    path.join(root, 'src', 'data', 'products.js'),
    path.join(root, 'src', 'data', 'public-content.js'),
    path.join(root, 'src', 'data', 'site.js'),
    path.join(root, 'src', 'data', 'legal.js'),
    path.join(root, 'scripts', 'generate-route-pages.mjs'),
  ]
  const source = (await Promise.all(sourceFiles.map((file) => readFile(file, 'utf8')))).join('\n')
  assert.doesNotMatch(source, /redacted-demo-materials|synthetic-demo-package|demo-materials|脱敏展示包/)
  assert.doesNotMatch(source, /product\.media\.attachments|media-attachments|media-attachment/)
})

test('every retained product exposes direct public files without substituting a demo package for a client', async () => {
  const filesByProduct = Object.fromEntries(PRODUCTS.map((product) => [product.id, getProductPublicFiles(product)]))
  assert.deepEqual(Object.fromEntries(Object.entries(filesByProduct).map(([id, files]) => [id, files.length])), {
    label: 5,
    bleed: 4,
    'multisize-bleed': 4,
    pdf: 5,
  })
  for (const product of PRODUCTS) {
    const files = filesByProduct[product.id]
    assert.equal(files.filter((file) => file.kind === 'client').length, 1)
    assert.deepEqual(
      files.filter((file) => file.kind === 'release-record').map((file) => file.filename),
      ['public-manifest.json', 'release-record.json', 'SHA256SUMS.txt'],
    )
    assert.equal(files.filter((file) => file.kind === 'demo-materials').length, 0)
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
  assert.equal(filesByProduct['multisize-bleed'].filter((file) => file.kind === 'client-variant').length, 0)
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
