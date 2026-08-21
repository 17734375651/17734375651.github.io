import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { PRODUCTS_BY_ID } from '../src/data/products.js'

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = path.resolve(siteRoot, '..')

const releases = [
  { productId: 'label', directory: 'fangcun-label', tag: 'fangcun-label-20260821' },
  { productId: 'pdf', directory: 'fangcun-pdf', tag: 'fangcun-pdf-20260821' },
]

test('label and PDF release records match both public Windows client variants', async () => {
  for (const release of releases) {
    const product = PRODUCTS_BY_ID[release.productId]
    const recordRoot = path.join(repoRoot, 'downloads', release.directory, '20260821')
    const manifestPath = path.join(recordRoot, 'public-manifest.json')
    const recordPath = path.join(recordRoot, 'release-record.json')
    const sumsPath = path.join(recordRoot, 'SHA256SUMS.txt')
    const [manifest, record, sums] = await Promise.all([
      readFile(manifestPath, 'utf8').then(JSON.parse),
      readFile(recordPath, 'utf8').then(JSON.parse),
      readFile(sumsPath, 'utf8'),
    ])

    assert.equal(manifest.releaseTag, release.tag)
    assert.equal(record.releaseTag, release.tag)
    assert.equal(record.versionLabel, '2026-08-21 发布包')
    assert.equal(record.verification.zipIntegrity, 'PASS')
    assert.equal(record.verification.peArchitecture, 'x64')
    assert.equal(record.verification.startupToActivationWindow, 'PASS')
    assert.equal(record.verification.digitalSignature, 'NotSigned')
    assert.equal(manifest.publicPackageBoundary.containsActivationGenerator, false)
    assert.equal(manifest.packages.length, 2)

    const websitePackages = [
      {
        filename: product.download.filename,
        bytes: product.download.bytes,
        sha256: product.download.sha256,
        publicLink: product.download.publicLink,
      },
      ...product.download.variants.map((variant) => ({
        filename: variant.filename,
        bytes: variant.bytes,
        sha256: variant.sha256,
        publicLink: variant.publicLink,
      })),
    ]
    assert.equal(websitePackages.length, 2)
    for (const websitePackage of websitePackages) {
      const packageRecord = record.packages.find((item) => item.filename === websitePackage.filename)
      assert.ok(packageRecord, `missing release record for ${websitePackage.filename}`)
      assert.equal(packageRecord.bytes, websitePackage.bytes)
      assert.equal(packageRecord.sha256.toLowerCase(), websitePackage.sha256)
      assert.equal(websitePackage.publicLink, `https://github.com/17734375651/17734375651.github.io/releases/download/${release.tag}/${websitePackage.filename}`)
      assert.match(sums, new RegExp(`${packageRecord.sha256}\\s+${websitePackage.filename}`))
    }

    for (const supportFile of product.download.supportFiles) {
      const localPath = path.join(recordRoot, supportFile.filename)
      assert.equal((await stat(localPath)).size, supportFile.bytes)
      assert.equal(supportFile.path, `https://github.com/17734375651/17734375651.github.io/releases/download/${release.tag}/${supportFile.filename}`)
    }
  }
})
