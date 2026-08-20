import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool'

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(here, '..', '..')
const packageRoot = path.join(repoRoot, 'artifacts', 'demo-material-packages')
const qaRoot = path.join(here, 'qa-spreadsheets-20260820')
await fs.mkdir(qaRoot, { recursive: true })

const files = [
  path.join(packageRoot, '方寸标签排版_脱敏功能演示素材_20260820', '01_方寸标签排版_复杂脱敏演示订单.xlsx'),
  path.join(packageRoot, '方寸标签排版_脱敏功能演示素材_20260820', '输出示例', '排版计算明细_演示.xlsx'),
  path.join(packageRoot, '方寸PDF配印助手_脱敏功能演示素材_20260820', '01_方寸PDF配印助手_复杂脱敏任务.xlsx'),
  path.join(packageRoot, '方寸PDF配印助手_脱敏功能演示素材_20260820', '输出示例', '逐页审计记录_演示.xlsx'),
]

const report = []
for (let fileIndex = 0; fileIndex < files.length; fileIndex += 1) {
  const file = files[fileIndex]
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(file))
  const sheetInspect = await workbook.inspect({ kind: 'sheet', include: 'id,name', maxChars: 5000 })
  const sheetNames = [...sheetInspect.ndjson.matchAll(/"name"\s*:\s*"([^"]+)"/g)].map((match) => match[1])
  if (!sheetNames.length) throw new Error(`No sheets found in ${file}`)
  const errors = await workbook.inspect({
    kind: 'match',
    searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A',
    options: { useRegex: true, maxResults: 200 },
    summary: 'final formula error scan',
  })
  if (/"matchCount"\s*:\s*[1-9]/.test(errors.ndjson ?? '')) throw new Error(`Formula errors in ${file}: ${errors.ndjson}`)
  const workbookQa = path.join(qaRoot, `${fileIndex + 1}-${path.basename(file, '.xlsx')}`)
  await fs.mkdir(workbookQa, { recursive: true })
  for (let sheetIndex = 0; sheetIndex < sheetNames.length; sheetIndex += 1) {
    const sheetName = sheetNames[sheetIndex]
    const preview = await workbook.render({ sheetName, autoCrop: 'all', scale: 1.1, format: 'png' })
    await fs.writeFile(path.join(workbookQa, `${sheetIndex + 1}-${sheetName}.png`), new Uint8Array(await preview.arrayBuffer()))
  }
  report.push({
    file: path.relative(repoRoot, file).replaceAll('\\', '/'),
    sheetNames,
    formulaErrors: 0,
  })
}

await fs.writeFile(path.join(qaRoot, 'verification-report.json'), JSON.stringify(report, null, 2), 'utf8')
console.log(JSON.stringify(report, null, 2))
