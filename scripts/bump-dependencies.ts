import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { globby } from 'globby'
import { run } from 'npm-check-updates'
import { Index } from 'npm-check-updates/build/src/types/IndexType'
import { PackageFile } from 'npm-check-updates/build/src/types/PackageFile'

let __dirname = dirname(fileURLToPath(import.meta.url))

async function main(): Promise<void> {
  try {
    let parentDirectoryPath = resolve(__dirname, '..')
    let globPatterns = [
      join(parentDirectoryPath, 'package.json'),
      join(parentDirectoryPath, 'packages', '*', 'package.json')
    ]
    let ignoredModules = process.argv.slice(2) // Modules passed in as CLI arguments will _not_ be bumped
    await bumpDependencies(globPatterns, ignoredModules)
  } catch (error: any) {
    console.error(error.message) // eslint-disable-line no-console
    process.exit(1)
  }
}
main()

async function bumpDependencies(
  globPatterns: Array<string>,
  ignoredModules: Array<string>
): Promise<void> {
  let packageJsonFilePaths = await globby(globPatterns, {
    deep: 2
  })
  let promises: Array<Promise<void | PackageFile | Index<string>>> = []
  for (let filePath of packageJsonFilePaths) {
    promises.push(
      run({
        packageFile: filePath,
        packageManager: 'npm',
        reject: ignoredModules,
        silent: false,
        target: 'latest',
        upgrade: true
      })
    )
  }
  await Promise.all(promises)
}
