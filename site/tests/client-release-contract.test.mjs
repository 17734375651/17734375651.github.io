import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { PRODUCTS_BY_ID } from '../src/data/products.js'

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = path.resolve(siteRoot, '..')

const releaseContracts = [
  {
    productId: 'label',
    directory: 'fangcun-label',
    version: '1.1.0',
    releaseTag: 'fangcun-label-1.1.0',
    manifestProductId: 'label',
    annualPrice: '¥199/年',
    fileCount: 1096,
    filename: 'fangcun-label-imposition-1.1.0-win-x64-public.zip',
    platform: 'Windows 10/11 x64',
    bytes: 99319466,
    sha256: '0b2eb6a9b7499718881467e907c898527b1c24bfb7a3164e0a988f14b1c090c7',
    sidecarSha256: {
      'public-manifest.json': 'd23f0e1f950f35c17a29faf92244da54baa2da0b29949a6ea1a4659e6ec3a1a4',
      'release-record.json': '422840f0b17871c8ee3207bd3cd92fc8eb380697ac74a126c125daedae8e9ae8',
      'SHA256SUMS.txt': 'de8768e660598bf185bc9898a8e884a8f0dda5086613c678bf752153398f2e16',
    },
  },
  {
    productId: 'accounting',
    directory: 'fangcun-accounting',
    version: '0.8.0',
    releaseTag: 'fangcun-accounting-0.8.0',
    manifestProductId: 'fangcun-accounting',
    annualPrice: '¥999/账号/年',
    fileCount: 269,
    filename: 'fangcun-accounting-0.8.0-win-x64-public.zip',
    platform: 'Windows 10/11 x64',
    bytes: 92510616,
    sha256: 'bdf5e898eb08bd4e34dde9b071471bb02bf9b184099ba70c5313e80b058f0da9',
    sidecarSha256: {
      'public-manifest.json': '53fb7babf51c7734b36a4f7731b6dbe276fd25f2f88ee090c7c7f6c8be00a78b',
      'release-record.json': '9a3c8dab4639042eabe24a9697b0d942a94cacc9ccd611567438ebbc62052469',
      'SHA256SUMS.txt': '92bda4586b8b41632e3f0f0bac0a11be06bb06699d5a4c50e1180e8d7ac6a1a1',
    },
  },
  {
    productId: 'pdf',
    directory: 'fangcun-pdf',
    version: '1.1.0',
    releaseTag: 'fangcun-pdf-1.1.0',
    manifestProductId: 'pdf',
    annualPrice: '¥599/年',
    fileCount: 1707,
    filename: 'fangcun-pdf-print-assistant-1.1.0-win-x64-public.zip',
    platform: 'Windows 10/11 x64',
    bytes: 101889079,
    sha256: '921927f54bfc856e5b6eaec1ee199f27659514223bce8305ca3d859aafa5015c',
    sidecarSha256: {
      'public-manifest.json': '19f509fc3b4919fc425ac1d4b5139598ecbb54ca67987c539e7edbdf190f8992',
      'release-record.json': '310727cb1800209eaa05672c9a875fd28329bb110f7946d36d734f51aeabc60c',
      'SHA256SUMS.txt': 'fa3edf8a304fd2f859738bfd1ccb402d3544f8db87ba393a8a720f5cec09f8c9',
    },
  },
]

test('final release records match the retained pure-offline Windows x64 client contracts', async () => {
  for (const release of releaseContracts) {
    const product = PRODUCTS_BY_ID[release.productId]
    const recordRoot = path.join(repoRoot, 'downloads', release.directory, release.version)
    const [manifest, record, sums] = await Promise.all([
      readFile(path.join(recordRoot, 'public-manifest.json'), 'utf8').then(JSON.parse),
      readFile(path.join(recordRoot, 'release-record.json'), 'utf8').then(JSON.parse),
      readFile(path.join(recordRoot, 'SHA256SUMS.txt'), 'utf8'),
    ])

    assert.ok(product, `missing product ${release.productId}`)
    assert.equal(product.download.variants?.length ?? 0, 0)
    assert.equal(manifest.schema, 'fangcun-offline-public-manifest/v1')
    assert.equal(manifest.catalog_id, release.productId)
    assert.equal(manifest.product_id, release.manifestProductId)
    assert.equal(manifest.app_version, release.version)
    assert.equal(manifest.platform, 'windows-x64')
    assert.deepEqual(manifest.trial, {
      duration_days: 30,
      scope: 'machine_and_product',
      network_required: false,
    })
    assert.equal(manifest.paid.annual_price, release.annualPrice)
    assert.equal(manifest.paid.offline_after_import, true)
    assert.deepEqual(manifest.keys.map((key) => key.purpose), ['paid', 'recovery'])

    assert.equal(record.schema, 'fangcun-offline-release-record/v1')
    assert.equal(record.tag, release.releaseTag)
    assert.equal(record.catalog_id, release.productId)
    assert.equal(record.product_id, release.manifestProductId)
    assert.equal(record.app_version, release.version)
    assert.equal(record.platform, 'windows-x64')
    assert.equal(record.package_filename, release.filename)
    assert.equal(record.package_bytes, release.bytes)
    assert.equal(record.package_sha256, release.sha256.toUpperCase())
    assert.equal(record.archive.zip_test, 'PASS')
    assert.equal(record.archive.file_count, release.fileCount)
    assert.deepEqual(record.archive.required_helpers, [
      'FangCunOfflineTrialInit.exe',
      'FangCunOfflineRecovery.exe',
    ])
    assert.equal(record.license_material, 'public_keys_only')
    assert.deepEqual(record.trial, {
      duration_days: 30,
      network_required: false,
      scope: 'machine_and_product',
    })
    assert.equal(record.rollback, 'rollback.ps1')

    assert.equal(product.download.version, release.version)
    assert.equal(product.download.filename, release.filename)
    assert.equal(product.download.bytes, release.bytes)
    assert.equal(product.download.sha256, release.sha256)
    assert.equal(product.download.platform, release.platform)
    assert.equal(product.download.publicLink, `https://github.com/17734375651/17734375651.github.io/releases/download/${release.releaseTag}/${release.filename}`)
    assert.match(sums, new RegExp(`${release.sha256}\\s+${release.filename}`, 'i'))

    for (const supportFile of product.download.supportFiles) {
      const localPath = path.join(recordRoot, supportFile.filename)
      const localBytes = await readFile(localPath)
      assert.equal(localBytes.byteLength, supportFile.bytes)
      assert.equal(
        createHash('sha256').update(localBytes).digest('hex'),
        release.sidecarSha256[supportFile.filename],
      )
      assert.equal(supportFile.path, `https://github.com/17734375651/17734375651.github.io/releases/download/${release.releaseTag}/${supportFile.filename}`)
      if (supportFile.filename !== 'SHA256SUMS.txt') {
        assert.match(sums, new RegExp(`\\b[A-Fa-f0-9]{64}\\s+${supportFile.filename.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}`))
      }
    }
  }
})
test('bleed and multisize .NET release sidecars match the current Windows client contracts', async () => {
  const releases = [
    {
      productId: 'bleed',
      directory: 'fangcun-bleed',
      version: '1.2.12',
      releaseTag: 'fangcun-bleed-1.2.12',
      manifestCatalogId: 'bleed',
      manifestProductId: 'LabelLayout',
      manifestPlatform: 'windows-x86',
      runtimeIdentifier: 'win-x86',
      architecture: 'x86',
      filename: 'fangcun-bleed-1.2.12-win-x86-public.zip',
      platform: 'Windows 10/11（x86 客户端，兼容 x86/x64）',
      bytes: 129301675,
      sha256: 'c6db32beb25bf8f0e987b67f6dcd9dda8ed34706093bfe3ae4fbf0c8c0839f33',
    },
    {
      productId: 'multisize-bleed',
      directory: 'fangcun-multisize',
      version: '0.10.0',
      releaseTag: 'fangcun-multisize-0.10.0',
      manifestCatalogId: 'multisize-bleed',
      manifestProductId: 'FangCun.MultiSizeBleedCut',
      manifestPlatform: 'windows-x64',
      runtimeIdentifier: 'win-x64',
      architecture: 'x64',
      filename: 'fangcun-multisize-bleed-cut-0.10.0-win-x64-public.zip',
      platform: 'Windows x64',
      bytes: 137218738,
      sha256: '61e8c8a3377ccc9bacb9ebef3b7391f469bed03e338a541b5723057374e69a83',
    },
  ]

  for (const release of releases) {
    const product = PRODUCTS_BY_ID[release.productId]
    const recordRoot = path.join(repoRoot, 'downloads', release.directory, release.version)
    const [manifest, record, sums] = await Promise.all([
      readFile(path.join(recordRoot, 'public-manifest.json'), 'utf8').then(JSON.parse),
      readFile(path.join(recordRoot, 'release-record.json'), 'utf8').then(JSON.parse),
      readFile(path.join(recordRoot, 'SHA256SUMS.txt'), 'utf8'),
    ])

    assert.ok(product, `missing product ${release.productId}`)
    assert.equal(product.download.variants?.length ?? 0, 0)
    assert.equal(manifest.schema, 'fangcun-public-release-v1')
    assert.equal(manifest.catalogId, release.manifestCatalogId)
    assert.equal(manifest.productId, release.manifestProductId)
    assert.equal(manifest.version, release.version)
    assert.equal(manifest.platform, release.manifestPlatform)
    assert.equal(manifest.runtimeIdentifier, release.runtimeIdentifier)
    assert.equal(manifest.architecture, release.architecture)
    assert.equal(manifest.license.scheme, 'pure-offline-machine-bound')
    assert.equal(manifest.license.signatureAlgorithm, 'Ed25519')
    assert.equal(manifest.license.offlineAfterActivation, true)
    assert.equal(manifest.license.trialDays, 30)
    assert.equal(manifest.license.reinstallResetsTrial, false)
    assert.equal(manifest.clientZip.fileName, release.filename)
    assert.equal(manifest.clientZip.bytes, release.bytes)
    assert.equal(manifest.clientZip.sha256.toLowerCase(), release.sha256)
    assert.equal(manifest.build.publishExit, 0)
    assert.equal(manifest.build.qpdfExePresent, true)
    assert.equal(manifest.security.packageSecretScan, 'PASS')
    assert.equal(manifest.security.publicKeyOnly, true)
    assert.equal(manifest.suggestedTag, release.releaseTag)
    assert.equal(manifest.tagCreated, false)
    assert.ok(manifest.clientFiles.some((file) => file.role === 'trial-init-helper' && file.fileName === 'FangCunOfflineTrialInit.exe'))
    assert.ok(manifest.clientFiles.some((file) => file.role === 'recovery-helper' && file.fileName === 'FangCunOfflineRecovery.exe'))

    assert.equal(record.schema, 'fangcun-release-record-v1')
    assert.equal(record.catalogId, release.manifestCatalogId)
    assert.equal(record.productId, release.manifestProductId)
    assert.equal(record.version, release.version)
    assert.equal(record.platform, release.manifestPlatform)
    assert.equal(record.runtimeIdentifier, release.runtimeIdentifier)
    assert.equal(record.suggestedTag, release.releaseTag)
    assert.equal(record.tagCreated, false)
    assert.deepEqual(record.clientZip, {
      fileName: release.filename,
      bytes: release.bytes,
      sha256: release.sha256.toUpperCase(),
    })
    assert.equal(record.observedResults.qpdfExeInClient, true)
    assert.equal(manifest.fullWorkflowVerification.status, 'PASS')
    assert.equal(record.security.publicKeyOnly, true)
    assert.equal(record.security.packageSecretScan, 'PASS')
    assert.equal(record.rollback, 'rollback.ps1')
    assert.equal(record.publication, 'not published')

    assert.equal(product.download.version, release.version)
    assert.equal(product.download.filename, release.filename)
    assert.equal(product.download.platform, release.platform)
    assert.equal(product.download.bytes, release.bytes)
    assert.equal(product.download.sha256, release.sha256)
    assert.equal(product.download.sha256UppercaseInChecksum, release.sha256.toUpperCase())
    assert.equal(product.download.publicLink, `https://github.com/17734375651/17734375651.github.io/releases/download/${release.releaseTag}/${release.filename}`)
    assert.match(sums, new RegExp(`${release.sha256.toUpperCase()}\\s+${release.filename}`))

    for (const supportFile of product.download.supportFiles) {
      const localPath = path.join(recordRoot, supportFile.filename)
      assert.equal((await stat(localPath)).size, supportFile.bytes)
      assert.equal(supportFile.path, `https://github.com/17734375651/17734375651.github.io/releases/download/${release.releaseTag}/${supportFile.filename}`)
      if (supportFile.filename !== 'SHA256SUMS.txt') {
        const escaped = supportFile.filename.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')
        assert.match(sums, new RegExp(`\\b[A-Fa-f0-9]{64}\\s+${escaped}`))
      }
    }
  }
})

test('GTIN matching and color-size extraction release sidecars match their verified public packages', async () => {
  const releases = [
    {
      productId: 'gtin-pdf',
      directory: 'fangcun-gtin',
      version: '1.1.0',
      releaseTag: 'fangcun-gtin-pdf-1.1.0',
      manifestCatalogId: 'gtin-pdf',
      manifestProductId: 'fangcun-gtin-pdf-integrator',
      feature: 'gtin-pdf-matching-export',
      filename: 'fangcun-gtin-pdf-integrator-1.1.0-win-x64-public.zip',
      bytes: 168917182,
      sha256: '7db3ba32df14c6467464064069daa71e3786b645098b2d09bfed261ef511020b',
      fileCount: 1053,
      sidecars: {
        'public-manifest.json': { bytes: 1323, sha256: 'bbca578ca8f0455fed7395c01042be52dc4d36b7f9b5760c26797520fc3a78f4' },
        'release-record.json': { bytes: 1727, sha256: '863fdcaf891dbc439c192808ab020b7a2546f06dc54d1ab3b5be6b3f732dd29d' },
        'SHA256SUMS.txt': { bytes: 292, sha256: '031e642a5d65d234aaa4ad44f3fa76c561e951eacbbc0d9c53563ce0c9173a4a' },
      },
    },
    {
      productId: 'color-size',
      directory: 'fangcun-color-size',
      version: '1.0.2',
      releaseTag: 'fangcun-color-size-1.0.2',
      manifestCatalogId: 'excel-color-size',
      manifestProductId: 'FangCun.ExcelColorSizeExtractor',
      feature: 'excel-color-size-extract',
      filename: 'fangcun-color-size-extractor-1.0.2-win-x64-public.zip',
      bytes: 162058084,
      sha256: '761595f0ede7447decf51727f48cee6b838a7abaefa35a3ac5eee996ece6aaab',
      fileCount: 9,
      sidecars: {
        'public-manifest.json': { bytes: 1342, sha256: '7ee79ea030d7fd0e901652bd81fd69c06beb20fe01f8e919585564527d16786d' },
        'release-record.json': { bytes: 1744, sha256: 'c8dd6596af44f5c1accdf95feaffab389957ec8cac2afbb24976b4333dc2c110' },
        'SHA256SUMS.txt': { bytes: 293, sha256: 'c1d1590d94884be7e2b93492f6c825cb021d468772457b449059e77bb1ed5e91' },
      },
    },
  ]

  for (const release of releases) {
    const product = PRODUCTS_BY_ID[release.productId]
    const recordRoot = path.join(repoRoot, 'downloads', release.directory, release.version)
    const [manifest, record, sums] = await Promise.all([
      readFile(path.join(recordRoot, 'public-manifest.json'), 'utf8').then(JSON.parse),
      readFile(path.join(recordRoot, 'release-record.json'), 'utf8').then(JSON.parse),
      readFile(path.join(recordRoot, 'SHA256SUMS.txt'), 'utf8'),
    ])

    assert.ok(product, `missing product ${release.productId}`)
    assert.equal(manifest.schema, 'fangcun-offline-public-manifest/v1')
    assert.equal(manifest.catalog_id, release.manifestCatalogId)
    assert.equal(manifest.product_id, release.manifestProductId)
    assert.equal(manifest.feature, release.feature)
    assert.equal(manifest.app_version, release.version)
    assert.equal(manifest.platform, 'windows-x64')
    assert.equal(manifest.architecture, 'x64')
    assert.deepEqual(manifest.package, {
      filename: release.filename,
      bytes: release.bytes,
      sha256: release.sha256.toUpperCase(),
    })
    assert.equal(manifest.trial.duration_days, 30)
    assert.equal(manifest.trial.scope, 'one_per_device_per_product')
    assert.equal(manifest.trial.network_required, false)
    assert.equal(manifest.trial.reinstall_resets, false)
    assert.equal(manifest.license.type, 'annual_offline_device_product_bound')
    assert.equal(manifest.license.term_days, 365)
    assert.equal(manifest.license.network_required, false)
    assert.deepEqual(manifest.price, {
      display: '价格咨询',
      public: false,
      currency: 'CNY',
      term: '年度授权',
    })
    assert.equal(manifest.source.public_scope, 'client_only')
    assert.equal(manifest.source.admin_materials, 'excluded')
    assert.equal(manifest.source.private_keys, 'excluded')
    assert.equal(manifest.verification.zip_test, 'PASS')
    assert.equal(manifest.verification.digital_signature, 'NotSigned')

    assert.equal(record.schema, 'fangcun-offline-release-record/v1')
    assert.equal(record.tag, release.releaseTag)
    assert.equal(record.catalog_id, release.manifestCatalogId)
    assert.equal(record.product_id, release.manifestProductId)
    assert.equal(record.feature, release.feature)
    assert.equal(record.app_version, release.version)
    assert.equal(record.platform, 'windows-x64')
    assert.equal(record.package_filename, release.filename)
    assert.equal(record.package_bytes, release.bytes)
    assert.equal(record.package_sha256, release.sha256.toUpperCase())
    assert.equal(record.archive.zip_test, 'PASS')
    assert.equal(record.archive.file_count, release.fileCount)
    assert.equal(record.trial.duration_days, 30)
    assert.equal(record.trial.first_launch, 'automatic')
    assert.equal(record.trial.scope, 'one_per_device_per_product')
    assert.equal(record.trial.network_required, false)
    assert.equal(record.license.type, 'annual_offline_device_product_bound')
    assert.equal(record.license.term_days, 365)
    assert.equal(record.publication.status, 'published')
    assert.equal(record.publication.github_release_created, true)
    assert.equal(record.publication.url, `https://github.com/17734375651/17734375651.github.io/releases/tag/${release.releaseTag}`)

    assert.equal(product.price.display, '价格咨询')
    assert.equal(product.price.public, false)
    assert.equal(product.download.version, release.version)
    assert.equal(product.download.filename, release.filename)
    assert.equal(product.download.bytes, release.bytes)
    assert.equal(product.download.sha256, release.sha256)
    assert.equal(product.download.platform, 'Windows x64')
    assert.equal(product.download.publicLink, `https://github.com/17734375651/17734375651.github.io/releases/download/${release.releaseTag}/${release.filename}`)
    assert.match(sums, new RegExp(`${release.sha256}\\s+${release.filename}`, 'i'))

    for (const supportFile of product.download.supportFiles) {
      const localPath = path.join(recordRoot, supportFile.filename)
      const localBytes = await readFile(localPath)
      assert.equal(localBytes.byteLength, release.sidecars[supportFile.filename].bytes)
      assert.equal(createHash('sha256').update(localBytes).digest('hex'), release.sidecars[supportFile.filename].sha256)
      assert.equal(supportFile.bytes, release.sidecars[supportFile.filename].bytes)
      assert.equal(supportFile.path, `https://github.com/17734375651/17734375651.github.io/releases/download/${release.releaseTag}/${supportFile.filename}`)
      if (supportFile.filename !== 'SHA256SUMS.txt') {
        assert.match(sums, new RegExp(`\\b[A-Fa-f0-9]{64}\\s+${supportFile.filename.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}`))
      }
    }
  }
})
