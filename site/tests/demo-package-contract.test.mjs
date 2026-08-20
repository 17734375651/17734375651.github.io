import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { access, readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = path.resolve(siteRoot, '..')
const packageRoot = path.join(repoRoot, 'artifacts', 'demo-material-packages')

const PACKAGES = [
  {
    dir: '方寸标签排版_脱敏功能演示素材_20260820',
    productId: 'label',
    zipFilename: 'label-redacted-demo-materials-20260820.zip',
    zipBytes: 234527,
    zipSha256: '8166150C4E796172428284CB03F3D899141DF0864D30898208DC8CB371284C57',
    required: [
      '01_方寸标签排版_复杂脱敏演示订单.xlsx',
      '输出示例/标签排版说明_演示.docx',
      '输出示例/排版计算明细_演示.xlsx',
    ],
  },
  {
    dir: '方寸PDF配印助手_脱敏功能演示素材_20260820',
    productId: 'pdf',
    zipFilename: 'pdf-redacted-demo-materials-20260820.zip',
    zipBytes: 414171,
    zipSha256: 'A387A27EBA09C413E5C6544A54B4B82DDACAE5AF639D657D93ADFCED5E31CE4B',
    required: [
      '01_方寸PDF配印助手_复杂脱敏任务.xlsx',
      '输入PDF素材/SYNTH-PDF-A.pdf',
      '输出示例/加工后PDF/SYNTH-PDF-A_配印后.pdf',
      '输出示例/逐页审计记录_演示.xlsx',
    ],
  },
]

for (const fixture of PACKAGES) {
  test(`${fixture.productId} demo package has an explicit synthetic provenance and integrity ledger`, async () => {
    const root = path.join(packageRoot, fixture.dir)
    for (const name of ['README_生成清单.md', 'manifest.json', 'SHA256SUMS.txt', ...fixture.required]) {
      await assert.doesNotReject(access(path.join(root, ...name.split('/'))), `${fixture.productId}: missing ${name}`)
    }

    const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'))
    assert.equal(manifest.productId, fixture.productId)
    assert.equal(manifest.provenance, 'synthetic-demo-package')
    assert.equal(manifest.realCustomerData, false)
    assert.equal(manifest.softwareExecutionClaim, false)
    assert.ok(manifest.files.length >= fixture.required.length)

    const checksumLines = (await readFile(path.join(root, 'SHA256SUMS.txt'), 'utf8'))
      .trim()
      .split(/\r?\n/)
    const files = await walk(root)
    assert.equal(checksumLines.length, files.filter((file) => file !== 'SHA256SUMS.txt').length)

    const publicZip = path.join(siteRoot, 'public', 'assets', 'downloads', fixture.zipFilename)
    const zipData = await readFile(publicZip)
    assert.equal((await stat(publicZip)).size, fixture.zipBytes)
    assert.equal(createHash('sha256').update(zipData).digest('hex').toUpperCase(), fixture.zipSha256)
  })
}

async function walk(root, current = root) {
  const output = []
  for (const entry of await readdir(current, { withFileTypes: true })) {
    const full = path.join(current, entry.name)
    if (entry.isDirectory()) output.push(...await walk(root, full))
    else output.push(path.relative(root, full).replaceAll('\\', '/'))
  }
  return output
}
