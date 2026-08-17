import test from 'node:test'
import assert from 'node:assert/strict'
import { access, mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { assertSafeDestination, publishPages } from '../scripts/publish-pages.mjs'

test('publish destination must be the repository docs directory', () => {
  const repo = path.resolve('C:/fixture/repository')
  assert.equal(assertSafeDestination(repo, path.join(repo, 'docs')), path.join(repo, 'docs'))
  assert.throws(() => assertSafeDestination(repo, repo), /docs directory/)
  assert.throws(() => assertSafeDestination(repo, path.join(repo, '..', 'docs')), /docs directory/)
})

test('publishPages replaces stale output and keeps the generated route tree', async () => {
  const repo = await mkdtemp(path.join(os.tmpdir(), 'fangcun-pages-'))
  const source = path.join(repo, 'site', 'dist', 'client')
  const destination = path.join(repo, 'docs')
  await mkdir(path.join(source, 'products', 'bleed'), { recursive: true })
  await mkdir(destination, { recursive: true })
  await writeFile(path.join(source, 'index.html'), '<h1>home</h1>')
  await writeFile(path.join(source, '404.html'), '<h1>missing</h1>')
  await writeFile(path.join(source, 'products', 'bleed', 'index.html'), '<h1>bleed</h1>')
  await writeFile(path.join(destination, 'stale.txt'), 'remove me')

  const result = await publishPages({ repoRoot: repo, source, destination })
  assert.equal(result.files >= 4, true)
  assert.equal(await readFile(path.join(destination, 'index.html'), 'utf8'), '<h1>home</h1>')
  assert.equal(await readFile(path.join(destination, 'products', 'bleed', 'index.html'), 'utf8'), '<h1>bleed</h1>')
  await access(path.join(destination, '.nojekyll'))
  await assert.rejects(access(path.join(destination, 'stale.txt')))
})
