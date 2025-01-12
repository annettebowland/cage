import { join } from 'node:path'

import { pathExists } from 'path-exists'

export async function resolveDirectoryPathAsync(
  directoryName: string
): Promise<string> {
  const result = join(process.cwd(), directoryName)
  const suffix = 2
  while ((await pathExists(result)) === true) {
    result = join(process.cwd(), `${directoryName}-${suffix}`)
    suffix += 1
  }
  return result
}
