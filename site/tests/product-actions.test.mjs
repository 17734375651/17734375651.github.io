import test from 'node:test'
import assert from 'node:assert/strict'

import { getProductAction } from '../src/lib/product-actions.js'

test('available products lead to the verified download section', () => {
  assert.deepEqual(getProductAction('available'), {
    label: '下载客户端',
    href: '#download',
  })
})

test('validation products explain price and release status instead of promising a download', () => {
  assert.deepEqual(getProductAction('validation'), {
    label: '查看价格与发布状态',
    href: '#availability',
  })
})

test('appointment products lead to the prefilled requirements route', () => {
  assert.deepEqual(getProductAction('appointment', 'erp'), {
    label: '预约体验',
    href: '/custom/requirements/?product=erp',
  })
})

test('unknown product status fails closed', () => {
  assert.throws(() => getProductAction('made-up'), /Unknown product status/)
})
