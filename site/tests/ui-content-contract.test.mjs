import test from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { PRODUCTS, PRODUCT_STATUS } from '../src/data/products.js'
import { SITE, SEO_ROUTES, TRUST_POINTS } from '../src/data/site.js'
import { SOLUTIONS } from '../src/data/public-solutions.js'
import {
  buildRequirementSummary,
  getRequirementCompletion,
} from '../src/lib/requirements.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcRoot = path.join(root, 'src')
const appPath = path.join(srcRoot, 'App.jsx')

async function readSource(filePath) {
  return readFile(filePath, 'utf8')
}

async function collectFiles(directory, extension, result = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      await collectFiles(entryPath, extension, result)
    } else if (entry.name.endsWith(extension)) {
      result.push(entryPath)
    }
  }
  return result
}

const requiredRoutes = [
  '/products/',
  '/solutions/',
  '/custom/requirements/',
  '/legal/privacy/',
  '/legal/service/',
]

test('App uses mature routes and does not regress to the old studio label', async () => {
  const app = await readSource(appPath)

  assert.doesNotMatch(app, /小工厂/)
  for (const route of requiredRoutes) {
    assert.ok(
      app.includes(`"${route}"`) || app.includes(`'${route}'`),
      `App UI must expose a real link for ${route}`,
    )
  }
})

test('hero and third industry solution retain audience and input-process-output copy', async () => {
  const app = await readSource(appPath)
  const home = SEO_ROUTES.find((route) => route.path === '/')
  assert.ok(home, 'home route metadata is required')

  const heroCopy = [
    home.h1,
    ...(home.coreStaticBody ?? []),
    ...TRUST_POINTS.flatMap((point) => [point.label, point.detail]),
  ].join(' ')
  assert.match(heroCopy, /中小企业/)
  assert.match(heroCopy, /输入/)
  assert.match(heroCopy, /处理/)
  assert.match(heroCopy, /输出/)

  const solution3 = SOLUTIONS[2]
  assert.equal(solution3?.id, 'small-and-medium-enterprise')
  const solution3Copy = [
    solution3.label,
    solution3.audience,
    ...(solution3.commonInputs ?? []),
    ...(solution3.keyProcessing ?? []),
    ...(solution3.verifiableOutputs ?? []),
  ].join(' ')
  assert.match(solution3Copy, /中小企业/)
  assert.match(solution3Copy, /(?:输入|资料|input)/i)
  assert.match(solution3Copy, /(?:处理|流程|processing)/i)
  assert.match(solution3Copy, /(?:输出|结果|output)/i)

  // Copy may be supplied by the verified manifests, but the component must
  // still render the hero and the solution collection rather than orphaning it.
  assert.match(app, /hero/i)
  assert.match(app, /(?:SOLUTIONS|SOLUTION_SCENES|solutions)/)
  assert.match(app, /(?:coreStaticBody|TRUST_POINTS|commonInputs|keyProcessing|verifiableOutputs|中小企业)/)
})

test('selected light workflow asset is wired and source CSS contains no gradient fills', async () => {
  const app = await readSource(appPath)
  const heroAsset = path.join(root, 'public', 'assets', 'generated', 'home-workflow-light.webp')
  await access(heroAsset)
  assert.match(app, /home-workflow-light\.webp/)

  const cssFiles = await collectFiles(srcRoot, '.css')
  assert.ok(cssFiles.length > 0, 'source CSS is required')
  for (const cssFile of cssFiles) {
    const css = await readSource(cssFile)
    assert.doesNotMatch(css, /(?:linear-gradient|radial-gradient|conic-gradient)\s*\(/i, cssFile)
  }
})

test('requirements expose four required semantics and build only a local summary', async () => {
  const app = await readSource(appPath)
  const requirementsSource = await readSource(path.join(srcRoot, 'lib', 'requirements.js'))
  const customization = SITE.customization
  assert.deepEqual(customization.requiredFields, ['scene', 'slowProcess', 'inputs', 'expected'])
  assert.equal(customization.requiredFields.length, 4)
  assert.match(customization.summaryBehavior, /当前页面/)
  assert.match(customization.summaryBehavior, /不上传/)
  assert.match(customization.summaryBehavior, /不保存/)

  assert.match(app, /<form\b/i)
  assert.match(app, /required\b/)
  assert.match(app, /(?:requiredFields|getRequirementCompletion)/)
  assert.match(app, /(?:buildRequirementSummary|需求摘要|summary)/i)

  const incomplete = getRequirementCompletion({})
  assert.equal(incomplete.total, 4)
  assert.equal(incomplete.completed, 0)
  assert.deepEqual(incomplete.missing, customization.requiredFields)

  const complete = {
    scene: '中小企业',
    slowProcess: '整理订单与库存',
    inputs: '表格与 PDF',
    expected: '可复核任务结果',
  }
  const summary = buildRequirementSummary(complete)
  assert.match(summary, /【业务类型】中小企业/)
  assert.match(summary, /【目前最耗时的工作环节】整理订单与库存/)
  assert.match(summary, /【可提供的资料】表格与 PDF/)
  assert.match(summary, /【期望的交付结果】可复核任务结果/)
  assert.doesNotMatch(requirementsSource, /\b(?:fetch|axios|XMLHttpRequest|sendBeacon)\s*\(/i)
  assert.doesNotMatch(requirementsSource, /\b(?:localStorage|sessionStorage|indexedDB)\b/i)
  assert.doesNotMatch(app, /\b(?:fetch|axios|XMLHttpRequest|sendBeacon)\s*\(/i)
})

test('seven products render their verified status through a data-driven UI path', async () => {
  const app = await readSource(appPath)
  const css = await readSource(path.join(srcRoot, 'styles.css'))
  const expectedIds = ['label', 'bleed', 'multisize-bleed', 'pdf', 'accounting', 'gtin-pdf', 'color-size']
  assert.deepEqual(PRODUCTS.map((product) => product.id), expectedIds)
  for (const product of PRODUCTS) {
    assert.ok(PRODUCT_STATUS[product.status.effectiveStatus], `missing status vocabulary for ${product.id}`)
    assert.equal(product.status.label, PRODUCT_STATUS[product.status.effectiveStatus])
  }

  assert.match(app, /(?:PRODUCTS|products)\.map\s*\(/)
  assert.match(app, /(?:product|item|currentProduct)\s*\.\s*status\s*\.\s*(?:label|effectiveStatus)/)
  assert.match(app, /(?:product|item|currentProduct)\s*\.\s*name/)
  assert.match(app, /className="product-card-detail-link"/)
  assert.match(app, /href=\{pathForProduct\(product\.id\)\}/)
  assert.match(app, /aria-label=\{`查看\$\{product\.name\}详情`\}/)
  assert.match(css, /\.product-card-detail-link\s*\{[^}]*position:\s*absolute;[^}]*inset:\s*0;/)
  assert.match(css, /\.product-card-footer \.button\s*\{[^}]*z-index:\s*2;/)

  const multisize = PRODUCTS.find((product) => product.id === 'multisize-bleed')
  assert.equal(multisize.price.amountCny, 1499)
  assert.match(multisize.statement, /大幅 PDF.*识别.*提取单张标签/)
  assert.match(multisize.workflow.process.join(' '), /多尺寸标签.*胀色.*裁切/)
  assert.match(app, /同系列独立产品/)
})

test('accounting metadata preserves the approved price and client record', () => {
  const accounting = PRODUCTS.find((product) => product.id === 'accounting')
  assert.ok(accounting, 'accounting product is required')

  assert.equal(accounting.name, '方寸有序记账软件')
  assert.equal(accounting.price.amountCny, 999)
  assert.equal(accounting.price.display, '¥999 / 账号 / 年')
  assert.match(JSON.stringify(accounting), /一个账号对应一个企业账套主体/)
  assert.equal(accounting.download.version, '0.8.0')
  assert.equal(accounting.download.platform, 'Windows 10/11 x64')
  assert.equal(accounting.download.filename, 'fangcun-accounting-0.8.0-win-x64-public.zip')
  assert.equal(accounting.download.bytes, 92510616)
  assert.equal(accounting.download.sha256, 'bdf5e898eb08bd4e34dde9b071471bb02bf9b184099ba70c5313e80b058f0da9')

  assert.deepEqual(accounting.download.variants, [])
})

test('newly completed workflow tools expose verified clients without inventing prices', () => {
  const gtinPdf = PRODUCTS.find((product) => product.id === 'gtin-pdf')
  const colorSize = PRODUCTS.find((product) => product.id === 'color-size')

  assert.ok(gtinPdf, 'GTIN/PDF product is required')
  assert.equal(gtinPdf.name, '方寸有序条码匹配')
  assert.equal(gtinPdf.price.public, false)
  assert.equal(gtinPdf.price.display, '价格咨询')
  assert.equal(gtinPdf.download.version, '1.1.0')
  assert.equal(gtinPdf.download.fileVersion, '1.1.0.6')
  assert.equal(gtinPdf.download.platform, 'Windows x64')
  assert.equal(gtinPdf.download.filename, 'fangcun-gtin-pdf-integrator-1.1.0.6-win-x64-public.zip')
  assert.equal(gtinPdf.download.bytes, 167570551)
  assert.equal(gtinPdf.download.sha256, '255540fd8934fd6ef6db2635f931a5df612f1b2ba4f15f00459b82df34ef5aac')
  assert.match(gtinPdf.cta.downloadPanel, /产品兼容版本|条码匹配 1\.1\.0/)
  assert.match(gtinPdf.cta.downloadPanel, /Windows 文件版本 1\.1\.0\.6/)
  assert.ok(gtinPdf.workflow.output.includes('根级未识别PDF文件夹（保留原相对路径）'))
  assert.ok(gtinPdf.workflow.output.includes('未识别PDF清单.xlsx（未识别 / 全部PDF状态）'))
  assert.ok(gtinPdf.workflow.output.includes('完成时显示 PDF 扫描、识别、未识别数量'))

  assert.ok(colorSize, 'color/size product is required')
  assert.equal(colorSize.name, '方寸有序颜色尺寸提取')
  assert.equal(colorSize.price.public, false)
  assert.equal(colorSize.price.display, '价格咨询')
  assert.equal(colorSize.download.version, '1.0.2')
  assert.equal(colorSize.download.platform, 'Windows x64')
  assert.equal(colorSize.download.filename, 'fangcun-color-size-extractor-1.0.2-win-x64-public.zip')
  assert.equal(colorSize.download.bytes, 162058084)
  assert.equal(colorSize.download.sha256, '761595f0ede7447decf51727f48cee6b838a7abaefa35a3ac5eee996ece6aaab')
})

test('ERP is absent from every public runtime source and route manifest', async () => {
  const publicFiles = [
    appPath,
    path.join(srcRoot, 'data', 'products.js'),
    path.join(srcRoot, 'data', 'public-content.js'),
    path.join(srcRoot, 'data', 'public-solutions.js'),
    path.join(srcRoot, 'data', 'site.js'),
    path.join(srcRoot, 'data', 'legal.js'),
    path.join(root, 'scripts', 'generate-route-pages.mjs'),
  ]
  const publicSource = (await Promise.all(publicFiles.map((file) => readSource(file)))).join('\n')
  assert.doesNotMatch(publicSource, /\bERP\b|\/products\/erp\//i)
})

test('interactive UI exposes mobile-menu and industry-tab semantics', async () => {
  const app = await readSource(appPath)
  assert.match(app, /aria-expanded\s*=/)
  assert.match(app, /role\s*=\s*["']tab["']/)
  assert.match(app, /aria-selected\s*=/)
})

test('product media preserves three local videos and the new product keeps media unpublished', async () => {
  const app = await readSource(appPath)
  const mediaProducts = PRODUCTS.filter((product) => product.media.video)
  assert.equal(mediaProducts.length, 3)
  for (const product of mediaProducts) {
    assert.ok(product.media.poster, `${product.id} needs a poster`)
  }
  const bleed = PRODUCTS.find((product) => product.id === 'bleed')
  const label = PRODUCTS.find((product) => product.id === 'label')
  for (const product of [label, bleed]) {
    assert.equal(product.media.mode, 'actual-operation-redacted')
    assert.equal(product.media.redacted, true)
    assert.equal(product.media.silent, true)
    assert.equal(product.media.redactionMethod, 'synthetic-demo-data')
  }
  assert.match(label.media.video, /label-operation-synthetic-no-taskbar\.mp4$/)
  assert.equal(bleed.media.mode, 'actual-operation-redacted')
  assert.equal(bleed.media.redacted, true)
  assert.equal(bleed.media.silent, true)
  assert.equal(bleed.media.redactionMethod, 'synthetic-demo-data')
  assert.match(bleed.media.video, /bleed-operation-sanitized-no-taskbar\.mp4$/)
  const multisize = PRODUCTS.find((product) => product.id === 'multisize-bleed')
  assert.equal(multisize.media.declared, false)
  assert.equal(multisize.media.video, null)
  assert.equal(multisize.media.poster, null)

  assert.match(app, /<video\b/i)
  assert.match(app, /\bcontrols\b/)
  assert.match(app, /\bposter\b/)
  assert.match(app, /actual-operation-redacted/)
  assert.match(app, /查看实际操作演示/)
  assert.match(app, /实际操作 · 脱敏演示数据/)
  assert.match(app, /(?:\.media\s*\.|media\.(?:video|poster|fallback)|fallback)/)
  assert.match(app, /(?:\.media\s*\.|media\.video|video)/)
})

test('App does not hard-code unsupported customer or outcome metrics', async () => {
  const app = await readSource(appPath)
  const fabricatedClaimPatterns = [
    /\b\d+(?:\.\d+)?\s*%/,
    /\b\d+\s*(?:家客户|个客户|家企业|个企业|万用户|名客户)/,
    /(?:累计|超过|覆盖|服务过|合作过|节省|提升|降低|增长|提高)\s*\d+/,
    /(?:客户案例|合作客户|客户名单|客户\s*Logo|客户\s*logo)/i,
  ]
  for (const pattern of fabricatedClaimPatterns) {
    assert.doesNotMatch(app, pattern, `unsupported claim pattern: ${pattern}`)
  }
})
