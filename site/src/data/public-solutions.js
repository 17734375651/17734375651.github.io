const requirementDefaults = {
  route: '/custom/requirements/',
  fields: {
    constraints: '补充规则、预算、时间（选填）',
  },
}

export const SOLUTIONS = [
  {
    id: 'graphic-print-shop',
    label: '图文店',
    currentStaticCard: '整理订单、排版任务与文件输出',
    audience: '适合需要整理订单、排版任务与文件输出的图文店。',
    currentPainPoints: [
      '订单、数量表和文件分散，重复整理占用时间。',
      '不同数量与尺寸需要反复核算版面、纸张和余量。',
      '加工结果需要形成便于复核的文件与明细。',
    ],
    commonInputs: [
      '表格（可对应 Excel 数量表或 Excel 订单）',
      'PDF（单页或合并 PDF，适用于胀色裁切流程）',
      '文字规则或页数要求（适用于 PDF 配印流程）',
      '标签尺寸、版面容量、冗余与成本参数',
    ],
    keyProcessing: [
      '读取同尺寸、多内容标签数量表，给出版面、纸张、机器与余量建议。',
      '识别多工作表表头并汇总数量，匹配 PDF 并优化版面。',
      '解析每页目标份数与冲突规则，生成任务表并按要求加工 PDF。',
      '按输入、处理、输出组织规则校验与异常提示。',
    ],
    verifiableOutputs: [
      'Word 排版说明、Excel 计算明细与成本余量。',
      'CMYK 排版 PDF、复检报告、操作日志与项目文件。',
      '规范化任务 Excel、加工后 PDF 与逐页复核 Excel。',
      '可执行、可复核、可追踪的文件或任务结果。',
    ],
    relatedProducts: [
      {
        productId: 'label',
        name: '标签印刷排版计划',
        relationship: '与订单排版任务相符；使用前请核对输入资料是否齐全。',
        matchOn: ['Excel 数量表', '标签尺寸与版面容量', '冗余与成本参数'],
      },
    ],
    prefilledCustomizationParams: {
      ...requirementDefaults,
      fields: {
        scene: '图文店',
        slowProcess: '重复核算、反复整理或逐页核对（请改成当前最耗时环节）',
        inputs: 'Excel 数量表；PDF；文字或页数规则；标签尺寸与版面容量（请按实际资料修改）',
        expected: '可执行、可复核的排版计划；可直接使用的 PDF、Excel 或 Word 文件（请按实际交付修改）',
        constraints: requirementDefaults.fields.constraints,
      },
    },
  },
  {
    id: 'printing-shop',
    label: '印刷店',
    currentStaticCard: '整理订单、排版任务与文件输出',
    audience: '适合需要衔接订单、PDF、排版、裁切与印前复检的印刷店。',
    currentPainPoints: [
      '订单与 PDF 文件需要反复匹配和核对。',
      '胀色、裁切、拼版与复检步骤容易分散。',
      '加工过程需要留下便于复核的记录。',
    ],
    commonInputs: [
      'Excel .xls / .xlsx 订单或数量表',
      '单页或合并 PDF、原始 PDF',
      '版面、胀色与裁切参数',
      '文字页数要求、逐页目标份数与冲突规则',
    ],
    keyProcessing: [
      '识别多工作表表头并汇总数量，匹配 PDF 并优化多版面。',
      '生成 CMYK 胀色、外置裁切标记及复检报告。',
      '解析逐页份数与冲突规则，并记录处理结果。',
      '把订单、规则、加工与复检串成可追踪流程。',
    ],
    verifiableOutputs: [
      'CMYK 排版 PDF。',
      '复检报告与操作日志。',
      '可继续调整的项目文件。',
      '规范化任务 Excel、加工后 PDF 与逐页复核 Excel。',
    ],
    relatedProducts: [
      {
        productId: 'bleed',
        name: '方寸有序胀色裁切',
        relationship: '与 Excel 订单、PDF、胀色裁切、拼版和印前复检流程相符。',
        matchOn: ['Excel 订单', '单页或合并 PDF', '版面、胀色与裁切参数'],
      },
    ],
    prefilledCustomizationParams: {
      ...requirementDefaults,
      fields: {
        scene: '印刷店',
        slowProcess: '订单整理、排版、逐页核对或印前复检（请改成当前最耗时环节）',
        inputs: 'Excel 订单；单页或合并 PDF；版面、胀色与裁切参数；文字页数要求（请按实际资料修改）',
        expected: 'CMYK 排版 PDF、复检报告与操作日志，或规范化任务 Excel、加工后 PDF、逐页复核 Excel（请按实际交付修改）',
        constraints: requirementDefaults.fields.constraints,
      },
    },
  },
  {
    id: 'small-and-medium-enterprise',
    label: '中小企业',
    currentStaticCard: '表格、审批、资料与执行协同',
    audience: '适合希望把跨表格、审批、资料整理与执行流程梳理得更清楚的中小企业。',
    currentPainPoints: [
      '表格、审批、文件与待办分散，衔接过程不够清楚。',
      '同一份资料需要在不同环节重复整理。',
      '执行结果缺少统一、便于复核的输出。',
    ],
    commonInputs: [
      'Excel 或 CSV 表格',
      'PDF 与业务文件',
      '审批、校验或计算规则',
      '期望交付的结果格式',
    ],
    keyProcessing: [
      '先梳理当前最耗时的环节与可提供资料。',
      '把重复整理、校验与异常提示转成明确规则。',
      '在关键步骤保留人工复核与确认入口。',
      '按实际流程确认可执行、可复核的交付形式。',
    ],
    verifiableOutputs: [
      '规范化表格或任务清单。',
      '处理后的 PDF、Excel 或 Word 文件。',
      '异常提示、复核明细或操作记录。',
      '按需求确认的可执行、可复核、可追踪结果。',
    ],
    relatedProducts: [],
    prefilledCustomizationParams: {
      ...requirementDefaults,
      fields: {
        scene: '中小企业',
        slowProcess: '跨表格整理、审批衔接、文件核对或结果汇总（请改成当前最耗时环节）',
        inputs: 'Excel 或 CSV；PDF；业务文件；审批、校验或计算规则（请按实际资料修改）',
        expected: '规范化表格、处理后文件、异常提示或复核明细（请按实际交付修改）',
        constraints: requirementDefaults.fields.constraints,
      },
    },
  },
  {
    id: 'other-repetitive-workflows',
    label: '其他重复流程',
    currentStaticCard: '按你的现场规则梳理并定制',
    audience: '适合现有产品尚未覆盖，但输入、规则与交付结果可以明确描述的重复流程。',
    currentPainPoints: [
      '重复核算、反复整理或逐页核对占用时间。',
      '现有产品与现场规则之间仍有差异。',
      '希望把具体规则整理成可复核流程。',
    ],
    commonInputs: ['表格', 'PDF', '文字要求', '其他资料（请在需求摘要中说明）'],
    keyProcessing: [
      '先收集当前最耗时的环节、可提供资料和期望结果。',
      '评估是否匹配现有产品，或进入个性化工具路径。',
      '按规则化、校验与异常提示组织可复核处理流程。',
    ],
    verifiableOutputs: [
      '由需求确认具体形式的文件或任务结果。',
      '当前页面生成的可复制微信需求摘要；内容不上传、不保存。',
    ],
    relatedProducts: [
      {
        productId: 'label',
        name: '标签印刷排版计划',
        relationship: '当资料包含标签数量表、尺寸与版面容量、冗余与成本参数时，可先查看该产品。',
        matchOn: ['Excel 数量表', '标签尺寸与版面容量', '冗余与成本参数'],
      },
    ],
    prefilledCustomizationParams: {
      ...requirementDefaults,
      fields: {
        scene: '其他（请说明）',
        slowProcess: '重复核算、反复整理或逐页核对（请补充具体业务环节）',
        inputs: '表格；PDF；文字要求；其他资料（请具体说明）',
        expected: '可执行、可复核、可追踪的文件或任务结果（请说明具体交付形式）',
        constraints: '请说明具体业务场景；补充规则、预算、时间',
      },
    },
  },
]
