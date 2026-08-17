import test from 'node:test'
import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { PRODUCTS } from '../src/data/products.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('every declared local product media path exists in the public tree', async () => {
  for (const product of PRODUCTS) {
    for (const [kind, value] of Object.entries(product.media)) {
      if (typeof value !== 'string' || !value.startsWith('/')) continue
      await assert.doesNotReject(
        access(path.join(root, 'public', value.replace(/^\//, ''))),
        `${product.id} ${kind} is missing: ${value}`,
      )
    }
  }
})
