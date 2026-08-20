import test from 'node:test'
import assert from 'node:assert/strict'

import { getProductAction } from '../src/lib/product-actions.js'

test('available products lead to the verified download section', () => {
  assert.deepEqual(getProductAction('available'), {
    label: '下载客户端',
    href: '#downloads',
  })
})

test('validation products lead to their real demo package downloads', () => {
  assert.deepEqual(getProductAction('validation'), {
    label: '下载展示包',
    href: '#downloads',
  })
})

test('unknown product status fails closed', () => {
  assert.throws(() => getProductAction('made-up'), /Unknown product status/)
})
