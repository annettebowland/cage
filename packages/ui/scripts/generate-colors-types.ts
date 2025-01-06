import fs from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { writeFileAsync } from '../../common/src/write-file-async.js'

let __dirname = dirname(fileURLToPath(import.meta.url))

let DEFAULT_SUFFIX = 'default'

let TYPE_NAMES: Record<string, string> = {
  bg: 'BackgroundColor',
  border: 'BorderColor',
  icon: 'IconColor',
  text: 'TextColor'
}

async function main() {
  try {
    let themeCssFilePath = join(
      resolve(__dirname, '..', 'src'),
      'css',
      'theme.css'
    )
    let outputFilePath = resolve(__dirname, '..', 'src', 'types', 'colors.ts')
    await generateColorsTypesAsync(themeCssFilePath, outputFilePath)
  } catch (error: any) {
    console.error(error.message) // eslint-disable-line no-console
    process.exit(1)
  }
}
main()

async function generateColorsTypesAsync(
  themeCssFilePath: string,
  outputFilePath: string
): Promise<void> {
  let colors = await parseIconColorsAsync(themeCssFilePath)
  let fileContents: Array<string> = []
  for (let tokenPrefix in colors) {
    if (typeof TYPE_NAMES[tokenPrefix] === 'undefined') {
      throw new Error('Unrecognized `tokenPrefix`')
    }
    let result: Array<string> = [`export type ${TYPE_NAMES[tokenPrefix]} =`]
    for (let color of colors[tokenPrefix]) {
      result.push(`  | '${color}'`)
    }
    fileContents.push(`${result.join('\n')}`)
  }
  await writeFileAsync(outputFilePath, `${fileContents.join('\n\n')}\n`)
}

async function parseIconColorsAsync(
  themeCssFilePath: string
): Promise<Record<string, Array<string>>> {
  let content = await fs.readFile(themeCssFilePath, 'utf8')
  let matches = content.match(/\{([^}]+)\}/m)
  if (matches === null) {
    throw new Error('`match` is `null`')
  }
  let lines = matches[1].trim().split(/\n/g)
  let cssVariableRegex = /--figma-color-([^-]+)(?:-([^:]+))?:/
  let result: Record<string, Array<string>> = {}
  for (let line of lines) {
    let matches = line.trim().match(cssVariableRegex)
    if (matches === null) {
      continue
    }
    let prefix = matches[1]
    let suffix =
      typeof matches[2] === 'undefined' ? DEFAULT_SUFFIX : matches[2]
    if (typeof result[prefix] === 'undefined') {
      result[prefix] = []
    }
    result[prefix].push(suffix)
  }
  for (let type in result) {
    result[type].sort()
  }
  return result
}
