import { access, cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const defaultRepoRoot = path.resolve(siteRoot, '..')

export function assertSafeDestination(repoRoot, destination) {
  const resolvedRepo = path.resolve(repoRoot)
  const resolvedDestination = path.resolve(destination)
  const expected = path.join(resolvedRepo, 'docs')
  if (resolvedDestination !== expected || !resolvedDestination.startsWith(`${resolvedRepo}${path.sep}`)) {
    throw new Error('Publish destination must be the repository docs directory.')
  }
  return resolvedDestination
}

async function countFiles(directory) {
  let count = 0
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) count += await countFiles(path.join(directory, entry.name))
    else count += 1
  }
  return count
}

export async function publishPages({
  repoRoot = defaultRepoRoot,
  source = path.join(siteRoot, 'dist', 'client'),
  destination = path.join(repoRoot, 'docs'),
} = {}) {
  const safeDestination = assertSafeDestination(repoRoot, destination)
  const resolvedSource = path.resolve(source)

  await access(path.join(resolvedSource, 'index.html'))
  await access(path.join(resolvedSource, '404.html'))

  await rm(safeDestination, { recursive: true, force: true })
  await mkdir(safeDestination, { recursive: true })
  await cp(resolvedSource, safeDestination, { recursive: true })
  await writeFile(path.join(safeDestination, '.nojekyll'), '', 'utf8')

  return {
    source: resolvedSource,
    destination: safeDestination,
    files: await countFiles(safeDestination),
  }
}

const isDirectRun = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href

if (isDirectRun) {
  const result = await publishPages()
  process.stdout.write(`Published ${result.files} files to ${result.destination}\n`)
}
