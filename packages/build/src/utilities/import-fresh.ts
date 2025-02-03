import { platform } from 'node:os'
import { pathToFileURL } from 'node:url'

let isWindows = platform() === 'win32'

export function importFresh(filePath: string) {
  let normalizedFilePath =
    isWindows === true ? pathToFileURL(filePath).href : filePath
  let timestamp = Date.now()
  return import(`${normalizedFilePath}?${timestamp}`)
}
