import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = path.resolve(siteRoot, '..')

test('the current operation-video build preserves clear frames and removes only idle sections and audio', async () => {
  const script = await readFile(path.join(repoRoot, 'scripts', 'build-sanitized-operation-video.ps1'), 'utf8')
  assert.match(script, /trim=start=34:end=103/)
  assert.match(script, /trim=start=121:end=140/)
  assert.match(script, /-an/)
  assert.match(script, /-movflags\s+'?\+faststart'?/)
  assert.doesNotMatch(script, /pixel|mosaic|boxblur|gblur/i)
})
