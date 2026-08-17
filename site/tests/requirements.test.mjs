import test from 'node:test'
import assert from 'node:assert/strict'

import {
  buildRequirementSummary,
  getRequirementCompletion,
  normalizePrefill,
} from '../src/lib/requirements.js'

const completeRequirement = {
  scene: '图文店',
  slowProcess: '每天整理 Excel 订单并逐页核对 PDF',
  inputs: 'Excel、PDF',
  expected: '得到可执行排版计划和复核明细',
  constraints: '本月内先完成可用版本',
}

test('getRequirementCompletion reports the four required fields', () => {
  const state = getRequirementCompletion({ ...completeRequirement, expected: '  ' })
  assert.equal(state.completed, 3)
  assert.equal(state.total, 4)
  assert.equal(state.ready, false)
  assert.deepEqual(state.missing, ['expected'])
})

test('buildRequirementSummary emits a structured local-only summary when complete', () => {
  const summary = buildRequirementSummary(completeRequirement)
  assert.match(summary, /【业务类型】图文店/)
  assert.match(summary, /【目前最耗时的工作环节】每天整理 Excel 订单并逐页核对 PDF/)
  assert.match(summary, /【可提供的资料】Excel、PDF/)
  assert.match(summary, /【期望的交付结果】得到可执行排版计划和复核明细/)
  assert.match(summary, /【补充要求】本月内先完成可用版本/)
})

test('buildRequirementSummary returns an empty string until all required fields exist', () => {
  assert.equal(buildRequirementSummary({ ...completeRequirement, inputs: '' }), '')
})

test('normalizePrefill accepts known scenarios and ignores unknown values', () => {
  const known = normalizePrefill(new URLSearchParams('scenario=printing-shop&product=bleed'))
  assert.deepEqual(known, { scenario: 'printing-shop', product: 'bleed' })

  const unknown = normalizePrefill(new URLSearchParams('scenario=made-up&product=secret'))
  assert.deepEqual(unknown, { scenario: null, product: null })
})
