import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool'

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(here, '..', '..')
const data = JSON.parse(await fs.readFile(path.join(here, 'demo-data.json'), 'utf8'))
const outputRoot = path.join(repoRoot, 'outputs', 'demo-material-packages-20260820')
const labelOut = path.join(outputRoot, 'label')
const pdfOut = path.join(outputRoot, 'pdf')
await fs.mkdir(labelOut, { recursive: true })
await fs.mkdir(pdfOut, { recursive: true })

const colors = {
  ink: '#1E2926',
  muted: '#64706B',
  green: '#739E45',
  greenDark: '#486A2E',
  greenPale: '#EFF6E7',
  blue: '#3A8396',
  blueDark: '#245969',
  bluePale: '#EAF5F7',
  gold: '#B88825',
  line: '#D8DED8',
  soft: '#F7F8F5',
  white: '#FFFFFF',
}

function title(sheet, range, text, accent) {
  range.merge()
  range.values = [[text]]
  range.format = {
    fill: accent,
    font: { bold: true, color: colors.white, size: 18 },
    verticalAlignment: 'center',
  }
  range.format.rowHeight = 34
}

function note(sheet, range, text, fill) {
  range.merge()
  range.values = [[text]]
  range.format = {
    fill,
    font: { color: colors.ink, italic: true, size: 10 },
    wrapText: true,
    verticalAlignment: 'center',
  }
  range.format.rowHeight = 38
}

function styleHeader(range, accent) {
  range.format = {
    fill: accent,
    font: { bold: true, color: colors.white },
    horizontalAlignment: 'center',
    verticalAlignment: 'center',
    wrapText: true,
    borders: { preset: 'inside', style: 'thin', color: '#FFFFFF' },
  }
  range.format.rowHeight = 30
}

function styleBody(range) {
  range.format = {
    font: { color: colors.ink, size: 10 },
    verticalAlignment: 'center',
    borders: {
      insideHorizontal: { style: 'thin', color: colors.line },
      bottom: { style: 'thin', color: colors.line },
    },
  }
  range.format.rowHeight = 22
}

function setWidths(sheet, map) {
  for (const [column, width] of Object.entries(map)) sheet.getRange(`${column}:${column}`).format.columnWidth = width
}

async function saveAndVerify(workbook, xlsxPath, renders) {
  const errorScan = await workbook.inspect({
    kind: 'match',
    searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A',
    options: { useRegex: true, maxResults: 100 },
    summary: 'formula error scan',
  })
  if (/"matchCount"\s*:\s*[1-9]/.test(errorScan.ndjson ?? '')) throw new Error(`Formula errors in ${xlsxPath}: ${errorScan.ndjson}`)

  for (const render of renders) {
    const preview = await workbook.render({
      sheetName: render.sheetName,
      range: render.range,
      scale: 1.35,
      format: 'png',
    })
    await fs.writeFile(render.path, new Uint8Array(await preview.arrayBuffer()))
  }

  const output = await SpreadsheetFile.exportXlsx(workbook)
  await output.save(xlsxPath)
  const summary = await workbook.inspect({ kind: 'sheet', include: 'id,name', maxChars: 3000 })
  return { xlsxPath, summary: summary.ndjson, errorScan: errorScan.ndjson }
}

async function buildLabelInput() {
  const wb = Workbook.create()
  const input = wb.worksheets.add('订单输入')
  const plan = wb.worksheets.add('计划预览')
  const rules = wb.worksheets.add('参数说明')
  for (const sheet of [input, plan, rules]) sheet.showGridLines = false

  title(input, input.getRange('A1:K1'), '方寸标签排版｜复杂脱敏演示订单', colors.greenDark)
  note(input, input.getRange('A2:K2'), 'SYNTHETIC DEMO｜全部订单、SKU、品名与成本均为虚构数据；用于展示数据结构，不代表软件实跑结果。', colors.greenPale)
  input.getRange('A4:K4').values = [[
    '订单编号', '虚构 SKU', '演示品名', '成品尺寸 mm', '需求数量', '版面容量', '冗余率', '材料', '单张材料成本', '建议印张', '备注',
  ]]
  styleHeader(input.getRange('A4:K4'), colors.green)
  const rows = data.label.orders.map((order) => [
    order[0], order[1], order[2], order[3], order[4], order[5], data.label.redundancyRate, order[6], order[7], null, '虚构公开演示数据',
  ])
  input.getRange(`A5:K${4 + rows.length}`).values = rows
  input.getRange('J5').formulas = [["=CEILING(E5*(1+G5)/F5,1)"]]
  input.getRange(`J5:J${4 + rows.length}`).fillDown()
  styleBody(input.getRange(`A5:K${4 + rows.length}`))
  input.getRange(`E5:F${4 + rows.length}`).format.numberFormat = '#,##0'
  input.getRange(`G5:G${4 + rows.length}`).format.numberFormat = '0%'
  input.getRange(`I5:I${4 + rows.length}`).format.numberFormat = '0.00'
  input.getRange(`J5:J${4 + rows.length}`).format.numberFormat = '#,##0'
  input.freezePanes.freezeRows(4)
  setWidths(input, { A: 16, B: 18, C: 20, D: 14, E: 12, F: 11, G: 10, H: 12, I: 15, J: 11, K: 20 })

  title(plan, plan.getRange('A1:G1'), '计划预览｜按成品尺寸汇总', colors.greenDark)
  note(plan, plan.getRange('A2:G2'), '汇总值由“订单输入”公式计算；编辑需求数量、版面容量或冗余率后可重新复核。', colors.greenPale)
  plan.getRange('A4:G4').values = [['成品尺寸 mm', '订单款数', '总需求数量', '总建议印张', '版面容量', '材料', '检查']]
  styleHeader(plan.getRange('A4:G4'), colors.green)
  plan.getRange('A5:A7').values = [['60x40'], ['80x50'], ['100x70']]
  plan.getRange('B5').formulas = [["=COUNTIF('订单输入'!$D$5:$D$28,A5)"]]
  plan.getRange('B5:B7').fillDown()
  plan.getRange('C5').formulas = [["=SUMIF('订单输入'!$D$5:$D$28,A5,'订单输入'!$E$5:$E$28)"]]
  plan.getRange('C5:C7').fillDown()
  plan.getRange('D5').formulas = [["=SUMIF('订单输入'!$D$5:$D$28,A5,'订单输入'!$J$5:$J$28)"]]
  plan.getRange('D5:D7').fillDown()
  plan.getRange('E5:E7').values = [[48], [30], [20]]
  plan.getRange('F5:F7').values = [['铜版纸'], ['合成纸'], ['哑银 PET']]
  plan.getRange('G5').formulas = [['=IF(B5=8,"PASS","CHECK")']]
  plan.getRange('G5:G7').fillDown()
  styleBody(plan.getRange('A5:G7'))
  plan.getRange('B5:E7').format.numberFormat = '#,##0'
  plan.getRange('A9:G9').merge()
  plan.getRange('A9:G9').values = [['合计']]
  plan.getRange('A9:G9').format = { fill: colors.soft, font: { bold: true, color: colors.ink } }
  plan.getRange('B10:D10').formulas = [['=SUM(B5:B7)', '=SUM(C5:C7)', '=SUM(D5:D7)']]
  plan.getRange('A10:G10').values = [['全部尺寸', null, null, null, null, '3 种材料', '结构示例']]
  plan.getRange('B10:D10').formulas = [['=SUM(B5:B7)', '=SUM(C5:C7)', '=SUM(D5:D7)']]
  styleBody(plan.getRange('A10:G10'))
  plan.getRange('B10:D10').format.numberFormat = '#,##0'
  setWidths(plan, { A: 18, B: 13, C: 16, D: 16, E: 12, F: 16, G: 14 })

  title(rules, rules.getRange('A1:F1'), '参数说明与真实性边界', colors.greenDark)
  rules.getRange('A3:B9').values = [
    ['字段', '说明'],
    ['订单与 SKU', 'DEMO / SYN 前缀，均为虚构公开演示数据'],
    ['需求数量', '用于覆盖小批量、常规批量和较大批量'],
    ['版面容量', '按三个演示尺寸分别设置为 48 / 30 / 20'],
    ['冗余率', '统一 5%，仅用于演示公式结构'],
    ['材料成本', '虚构估算值，不作为报价依据'],
    ['输出性质', '网站演示结构样例，并非软件真实导出或客户项目证明'],
  ]
  styleHeader(rules.getRange('A3:B3'), colors.green)
  styleBody(rules.getRange('A4:B9'))
  setWidths(rules, { A: 22, B: 62 })

  return saveAndVerify(
    wb,
    path.join(labelOut, '01_方寸标签排版_复杂脱敏演示订单.xlsx'),
    [{ sheetName: '计划预览', range: 'A1:G10', path: path.join(labelOut, '03_订单与排版计划预览.png') }],
  )
}

async function buildLabelOutput() {
  const wb = Workbook.create()
  const source = wb.worksheets.add('来源订单')
  const plan = wb.worksheets.add('排版计划')
  const cost = wb.worksheets.add('成本复核')
  const notes = wb.worksheets.add('说明')
  for (const sheet of [source, plan, cost, notes]) sheet.showGridLines = false

  title(source, source.getRange('A1:H1'), '来源订单｜全部为虚构演示数据', colors.greenDark)
  source.getRange('A3:H3').values = [['订单编号', '虚构 SKU', '演示品名', '尺寸 mm', '需求数量', '版面容量', '材料', '单张材料成本']]
  styleHeader(source.getRange('A3:H3'), colors.green)
  source.getRange('A4:H27').values = data.label.orders
  styleBody(source.getRange('A4:H27'))
  source.getRange('E4:F27').format.numberFormat = '#,##0'
  source.getRange('H4:H27').format.numberFormat = '0.00'
  setWidths(source, { A: 16, B: 18, C: 20, D: 13, E: 12, F: 11, G: 13, H: 16 })

  title(plan, plan.getRange('A1:J1'), '排版计划｜结构示例', colors.greenDark)
  note(plan, plan.getRange('A2:J2'), '公式基于“来源订单”与统一 5% 冗余率计算。此工作簿展示输出结构，不声称由成品软件实际导出。', colors.greenPale)
  plan.getRange('A4:J4').values = [['订单编号', '虚构 SKU', '尺寸 mm', '需求数量', '冗余后数量', '版面容量', '计划印张', '计划产能', '余量', '检查']]
  styleHeader(plan.getRange('A4:J4'), colors.green)
  for (let row = 5; row <= 28; row += 1) {
    const sourceRow = row - 1
    plan.getRange(`A${row}:D${row}`).formulas = [[
      `='来源订单'!A${sourceRow}`,
      `='来源订单'!B${sourceRow}`,
      `='来源订单'!D${sourceRow}`,
      `='来源订单'!E${sourceRow}`,
    ]]
    plan.getRange(`E${row}:J${row}`).formulas = [[
      `=ROUNDUP(D${row}*1.05,0)`,
      `='来源订单'!F${sourceRow}`,
      `=CEILING(E${row}/F${row},1)`,
      `=G${row}*F${row}`,
      `=H${row}-D${row}`,
      `=IF(I${row}>=0,"PASS","CHECK")`,
    ]]
  }
  styleBody(plan.getRange('A5:J28'))
  plan.getRange('D5:I28').format.numberFormat = '#,##0'
  setWidths(plan, { A: 16, B: 18, C: 12, D: 12, E: 14, F: 11, G: 11, H: 12, I: 10, J: 11 })
  plan.freezePanes.freezeRows(4)

  title(cost, cost.getRange('A1:G1'), '成本与余量复核｜结构示例', colors.greenDark)
  cost.getRange('A3:G3').values = [['订单编号', '材料', '计划印张', '单张材料成本', '估算材料成本', '余量', '状态']]
  styleHeader(cost.getRange('A3:G3'), colors.green)
  for (let row = 4; row <= 27; row += 1) {
    const planRow = row + 1
    const sourceRow = row
    cost.getRange(`A${row}:G${row}`).formulas = [[
      `='来源订单'!A${sourceRow}`,
      `='来源订单'!G${sourceRow}`,
      `='排版计划'!G${planRow}`,
      `='来源订单'!H${sourceRow}`,
      `=C${row}*D${row}`,
      `='排版计划'!I${planRow}`,
      `=IF(F${row}>=0,"PASS","CHECK")`,
    ]]
  }
  styleBody(cost.getRange('A4:G27'))
  cost.getRange('C4:C27').format.numberFormat = '#,##0'
  cost.getRange('D4:E27').format.numberFormat = '0.00'
  cost.getRange('F4:F27').format.numberFormat = '#,##0'
  setWidths(cost, { A: 16, B: 14, C: 12, D: 16, E: 16, F: 11, G: 11 })

  title(notes, notes.getRange('A1:F1'), '说明', colors.greenDark)
  notes.getRange('A3:B7').values = [
    ['项目', '说明'],
    ['用途', '展示 Word / Excel 输出应具备的可执行与可复核结构'],
    ['数据来源', '本包内虚构订单，不含客户、联系方式或真实价格'],
    ['结果性质', '根据公开工作流生成的结构样例，并非软件真实运行记录'],
    ['复核方法', '检查公式、数量、产能、余量及成本列，不使用这些值进行商业报价'],
  ]
  styleHeader(notes.getRange('A3:B3'), colors.green)
  styleBody(notes.getRange('A4:B7'))
  setWidths(notes, { A: 22, B: 64 })

  return saveAndVerify(
    wb,
    path.join(labelOut, '排版计算明细_演示.xlsx'),
    [{ sheetName: '排版计划', range: 'A1:J17', path: path.join(labelOut, '04_输出结构总览.png') }],
  )
}

function pdfTaskRows() {
  return data.pdf.sources.flatMap((source) => source.pages.map((page) => [source.file, source.title, page.page, page.copies, page.note]))
}

async function buildPdfInput() {
  const wb = Workbook.create()
  const task = wb.worksheets.add('任务输入')
  const rules = wb.worksheets.add('规则说明')
  for (const sheet of [task, rules]) sheet.showGridLines = false

  title(task, task.getRange('A1:G1'), '方寸 PDF 配印助手｜复杂脱敏任务', colors.blueDark)
  note(task, task.getRange('A2:G2'), 'SYNTHETIC DEMO｜文件名、标题、页数要求与备注均为虚构数据；用于展示逐页任务结构。', colors.bluePale)
  task.getRange('A4:G4').values = [['源 PDF', '虚构文档标题', '源页码', '目标份数', '规则说明', '预计输出页数', '检查']]
  styleHeader(task.getRange('A4:G4'), colors.blue)
  const rows = pdfTaskRows()
  task.getRange(`A5:G${4 + rows.length}`).values = rows.map((row) => [...row, null, null])
  task.getRange('F5').formulas = [['=D5']]
  task.getRange(`F5:F${4 + rows.length}`).fillDown()
  task.getRange('G5').formulas = [['=IF(D5>=0,"PASS","CHECK")']]
  task.getRange(`G5:G${4 + rows.length}`).fillDown()
  styleBody(task.getRange(`A5:G${4 + rows.length}`))
  task.getRange(`C5:D${4 + rows.length}`).format.numberFormat = '#,##0'
  task.getRange(`F5:F${4 + rows.length}`).format.numberFormat = '#,##0'
  task.freezePanes.freezeRows(4)
  setWidths(task, { A: 22, B: 20, C: 10, D: 11, E: 24, F: 14, G: 11 })
  const totalRow = 6 + rows.length
  task.getRange(`A${totalRow}:E${totalRow}`).merge()
  task.getRange(`A${totalRow}:E${totalRow}`).values = [['预计输出总页数']]
  task.getRange(`A${totalRow}:G${totalRow}`).format = { fill: colors.soft, font: { bold: true, color: colors.ink } }
  task.getRange(`F${totalRow}`).formulas = [[`=SUM(F5:F${4 + rows.length})`]]
  task.getRange(`G${totalRow}`).values = [['页']]

  title(rules, rules.getRange('A1:F1'), '规则说明与真实性边界', colors.blueDark)
  rules.getRange('A3:B9').values = [
    ['字段', '说明'],
    ['源 PDF', 'SYNTH-PDF-A / B / C，均由本包生成'],
    ['目标份数', '每一源页应在加工后文件中出现的次数'],
    ['0 份规则', '忽略该源页，不写入加工后文件'],
    ['加工后 PDF', '由展示包构建脚本按任务表重复页面生成'],
    ['逐页审计', '逐行比较目标份数与加工后实际份数'],
    ['结果性质', '结构样例与自校验记录，并非软件真实导出或客户项目证明'],
  ]
  styleHeader(rules.getRange('A3:B3'), colors.blue)
  styleBody(rules.getRange('A4:B9'))
  setWidths(rules, { A: 22, B: 66 })

  return saveAndVerify(
    wb,
    path.join(pdfOut, '01_方寸PDF配印助手_复杂脱敏任务.xlsx'),
    [{ sheetName: '任务输入', range: `A1:G${totalRow}`, path: path.join(pdfOut, '03_任务输入与规则预览.png') }],
  )
}

async function buildPdfAudit() {
  const wb = Workbook.create()
  const audit = wb.worksheets.add('逐页审计')
  const summary = wb.worksheets.add('处理摘要')
  for (const sheet of [audit, summary]) sheet.showGridLines = false

  title(audit, audit.getRange('A1:H1'), '逐页审计记录｜结构示例', colors.blueDark)
  note(audit, audit.getRange('A2:H2'), '目标份数与实际份数由本展示包构建过程复核；该记录不代表成品软件运行日志。', colors.bluePale)
  audit.getRange('A4:H4').values = [['源 PDF', '源页码', '目标份数', '实际份数', '输出起始页', '输出结束页', '状态', '备注']]
  styleHeader(audit.getRange('A4:H4'), colors.blue)
  const taskRows = pdfTaskRows()
  let outputCursorByFile = new Map()
  taskRows.forEach((row, index) => {
    const excelRow = index + 5
    const file = row[0]
    const copies = row[3]
    const cursor = outputCursorByFile.get(file) ?? 1
    const start = copies > 0 ? cursor : 0
    const end = copies > 0 ? cursor + copies - 1 : 0
    outputCursorByFile.set(file, copies > 0 ? end + 1 : cursor)
    audit.getRange(`A${excelRow}:F${excelRow}`).values = [[file, row[2], copies, copies, start, end]]
    audit.getRange(`G${excelRow}`).formulas = [[`=IF(C${excelRow}=D${excelRow},"PASS","CHECK")`]]
    audit.getRange(`H${excelRow}`).values = [[copies > 0 ? '页数一致' : '0 份规则已忽略']]
  })
  styleBody(audit.getRange(`A5:H${4 + taskRows.length}`))
  audit.getRange(`B5:F${4 + taskRows.length}`).format.numberFormat = '#,##0'
  audit.freezePanes.freezeRows(4)
  setWidths(audit, { A: 22, B: 10, C: 11, D: 11, E: 13, F: 13, G: 11, H: 22 })

  title(summary, summary.getRange('A1:F1'), '处理摘要｜结构示例', colors.blueDark)
  summary.getRange('A3:F3').values = [['源 PDF', '源页数', '目标输出页数', '实际输出页数', '忽略页数', '检查']]
  styleHeader(summary.getRange('A3:F3'), colors.blue)
  let startRow = 5
  for (let i = 0; i < data.pdf.sources.length; i += 1) {
    const source = data.pdf.sources[i]
    const row = 4 + i
    const endRow = startRow + source.pages.length - 1
    summary.getRange(`A${row}:E${row}`).values = [[
      source.file,
      source.pages.length,
      source.pages.reduce((sum, page) => sum + page.copies, 0),
      source.pages.reduce((sum, page) => sum + page.copies, 0),
      source.pages.filter((page) => page.copies === 0).length,
    ]]
    summary.getRange(`F${row}`).formulas = [[`=IF(C${row}=D${row},"PASS","CHECK")`]]
    startRow = endRow + 1
  }
  styleBody(summary.getRange('A4:F6'))
  summary.getRange('B4:E6').format.numberFormat = '#,##0'
  setWidths(summary, { A: 22, B: 12, C: 16, D: 16, E: 12, F: 12 })

  return saveAndVerify(
    wb,
    path.join(pdfOut, '逐页审计记录_演示.xlsx'),
    [{ sheetName: '逐页审计', range: `A1:H${4 + taskRows.length}`, path: path.join(pdfOut, '04_逐页审计总览.png') }],
  )
}

const results = []
results.push(await buildLabelInput())
results.push(await buildLabelOutput())
results.push(await buildPdfInput())
results.push(await buildPdfAudit())
await fs.writeFile(path.join(outputRoot, 'spreadsheet-build-report.json'), JSON.stringify(results, null, 2), 'utf8')
console.log(JSON.stringify({ outputRoot, workbooks: results.map((result) => result.xlsxPath) }, null, 2))
