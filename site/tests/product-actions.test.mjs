import test from 'node:test'
import assert from 'node:assert/strict'

import { getProductAction } from '../src/lib/product-actions.js'
import { PRODUCTS } from '../src/data/products.js'

test('available products lead to the verified download section', () => {
  assert.deepEqual(getProductAction('available'), {
    label: '下载客户端',
    href: '#downloads',
  })
})

test('validation products lead to the factual release-progress section', () => {
  assert.deepEqual(getProductAction('validation'), {
    label: '查看发布进度',
    href: '#downloads',
  })
})

test('all retained products expose a verified client action', () => {
  assert.deepEqual(PRODUCTS.map((product) => product.id), [
    'label',
    'bleed',
    'multisize-bleed',
    'pdf',
    'accounting',
    'gtin-pdf',
    'color-size',
  ])
  for (const product of PRODUCTS) {
    assert.equal(product.status.effectiveStatus, 'available')
    assert.equal(product.status.downloadable, true)
    assert.equal(product.download.state, 'available')
    assert.match(product.download.publicLink, /^https:\/\/github\.com\/.*\/releases\/download\//)
    assert.equal(getProductAction(product.status.effectiveStatus).label, '下载客户端')
  }
})

test('unknown product status fails closed', () => {
  assert.throws(() => getProductAction('made-up'), /Unknown product status/)
})
