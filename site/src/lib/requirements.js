const REQUIRED_FIELDS = ['scene', 'slowProcess', 'inputs', 'expected']
const KNOWN_SCENARIOS = new Set([
  'graphic-print-shop',
  'printing-shop',
  'small-and-medium-enterprise',
  'other-repetitive-workflows',
])
const KNOWN_PRODUCTS = new Set(['label', 'bleed', 'multisize-bleed', 'pdf', 'packing', 'accounting'])

const hasValue = (value) => typeof value === 'string' && value.trim().length > 0

export function getRequirementCompletion(requirement = {}) {
  const missing = REQUIRED_FIELDS.filter((field) => !hasValue(requirement[field]))
  return {
    completed: REQUIRED_FIELDS.length - missing.length,
    total: REQUIRED_FIELDS.length,
    ready: missing.length === 0,
    missing,
  }
}

export function buildRequirementSummary(requirement = {}) {
  if (!getRequirementCompletion(requirement).ready) return ''

  const lines = [
    '【业务类型】' + requirement.scene.trim(),
    '【目前最耗时的工作环节】' + requirement.slowProcess.trim(),
    '【可提供的资料】' + requirement.inputs.trim(),
    '【期望的交付结果】' + requirement.expected.trim(),
  ]

  if (hasValue(requirement.constraints)) {
    lines.push('【补充要求】' + requirement.constraints.trim())
  }

  return `方寸有序 · 软件需求摘要\n${lines.join('\n')}`
}

export function normalizePrefill(searchParams) {
  const scenario = searchParams?.get?.('scenario') ?? null
  const product = searchParams?.get?.('product') ?? null
  return {
    scenario: KNOWN_SCENARIOS.has(scenario) ? scenario : null,
    product: KNOWN_PRODUCTS.has(product) ? product : null,
  }
}
