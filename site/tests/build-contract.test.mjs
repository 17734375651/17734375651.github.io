import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('package scripts generate static routes before serving and building', async () => {
  const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'))
  assert.match(pkg.scripts.dev, /^node scripts\/generate-route-pages\.mjs && vite$/)
  assert.match(pkg.scripts.build, /^node scripts\/generate-route-pages\.mjs && vite build/)
  assert.equal(pkg.scripts['publish:pages'], 'npm run build && node scripts/publish-pages.mjs')
  assert.equal(
    pkg.scripts.test,
    'node --test tests/build-contract.test.mjs tests/client-release-contract.test.mjs tests/media-contract.test.mjs tests/navigation.test.mjs tests/product-actions.test.mjs tests/public-copy-contract.test.mjs tests/publish-pages.test.mjs tests/requirements.test.mjs tests/route-pages.test.mjs tests/sanitized-video-build-contract.test.mjs tests/ui-content-contract.test.mjs',
  )
})

test('vite multi-page input includes the key static route documents', async () => {
  const { default: config } = await import('../vite.config.mjs')
  const inputs = Object.values(config.build.rollupOptions.input)
    .map((file) => path.relative(root, file).replaceAll('\\', '/'))
  for (const required of [
    'index.html',
    'products/index.html',
    'products/bleed/index.html',
    'products/multisize-bleed/index.html',
    'products/pdf/index.html',
    'products/packing/index.html',
    'products/accounting/index.html',
    'solutions/index.html',
    'custom/requirements/index.html',
    'legal/privacy/index.html',
    '404.html',
  ]) {
    assert.equal(inputs.includes(required), true, `missing Vite input ${required}`)
  }
})
