import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import select from '@inquirer/select'
import { globby } from 'globby'

let __dirname = dirname(fileURLToPath(import.meta.url))

export async function resolveTemplateNameAsync(
  templateName?: string
): Promise<string> {
  let templateNames = await readTemplateNamesAsync()
  if (typeof templateName !== 'undefined') {
    if (templateNames.indexOf(templateName) === -1) {
      throw new Error(`Template must be one of "${templateNames.join('", "')}"`)
    }
    return templateName
  }
  let result: string = await select({
    choices: templateNames.map(function (templateName: string) {
      return {
        value: templateName
      }
    }),
    message: 'Select a template:'
  })
  return result
}

async function readTemplateNamesAsync(): Promise<Array<string>> {
  let pluginTemplatesDirectory = resolve(__dirname, '..', '..', 'templates')
  let result = await globby('*/*', {
    cwd: pluginTemplatesDirectory,
    onlyDirectories: true
  })
  return result
}
