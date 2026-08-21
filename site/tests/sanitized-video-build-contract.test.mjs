import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = path.resolve(siteRoot, '..')

test('the current operation-video build preserves clear frames, removes the taskbar, idle sections and audio', async () => {
  const script = await readFile(path.join(repoRoot, 'scripts', 'build-sanitized-operation-video.ps1'), 'utf8')
  assert.match(script, /trim=start=34:end=103/)
  assert.match(script, /trim=start=121:end=140/)
  assert.match(script, /crop=2432:1368:64:0/)
  assert.match(script, /-an/)
  assert.match(script, /-movflags\s+'?\+faststart'?/)
  assert.doesNotMatch(script, /pixel|mosaic|boxblur|gblur/i)
})

test('the label operation-video build keeps the useful workflow chapters, removes taskbar width, idle sections and audio', async () => {
  const script = await readFile(path.join(repoRoot, 'scripts', 'build-label-operation-video.ps1'), 'utf8')
  assert.match(script, /trim=start=13:end=28\.7/)
  assert.match(script, /trim=start=36:end=41/)
  assert.match(script, /trim=start=46\.4:end=68/)
  assert.match(script, /crop=1456:1160:64:40/)
  assert.match(script, /Demo \/ label-input\.xlsx/)
  assert.match(script, /crop=2432:1368:0:0/)
  assert.match(script, /scale=1920:1080/)
  assert.match(script, /-an/)
  assert.match(script, /-movflags\s+'?\+faststart'?/)
  assert.doesNotMatch(script, /pixel|mosaic|boxblur|gblur/i)
})
