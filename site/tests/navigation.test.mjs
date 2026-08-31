import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getActiveNavHref } from '../src/lib/navigation.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('primary navigation follows the current route instead of always highlighting home', () => {
  assert.equal(getActiveNavHref('/', ''), '/')
  assert.equal(getActiveNavHref('/products/', ''), '/products/')
  assert.equal(getActiveNavHref('/products/label/', ''), '/products/')
  assert.equal(getActiveNavHref('/products/accounting/', ''), '/products/')
  assert.equal(getActiveNavHref('/solutions/', ''), '/solutions/')
  assert.equal(getActiveNavHref('/guides/', ''), '/updates/')
  assert.equal(getActiveNavHref('/downloads/', ''), '/updates/')
  assert.equal(getActiveNavHref('/legal/privacy/', ''), '/legal/service/')
  assert.equal(getActiveNavHref('/legal/service/', ''), '/legal/service/')
  assert.equal(getActiveNavHref('/', '#contact'), '/#contact')
  assert.equal(getActiveNavHref('/missing/', ''), null)
})

test('desktop and mobile navigation render the route-aware current state', async () => {
  const app = await readFile(path.join(root, 'src', 'App.jsx'), 'utf8')
  const css = await readFile(path.join(root, 'src', 'styles.css'), 'utf8')

  assert.match(app, /getActiveNavHref\(window\.location\.pathname, window\.location\.hash\)/)
  assert.match(app, /aria-current=\{item\.href === activeNavHref \? 'page' : undefined\}/)
  assert.match(css, /\.desktop-nav a\.is-current/)
  assert.doesNotMatch(css, /\.desktop-nav a:first-child/)
})
