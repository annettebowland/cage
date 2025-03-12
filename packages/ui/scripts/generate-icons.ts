import fs from 'node:fs/promises'
import { basename, dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import slugify from '@sindresorhus/slugify'
import camelcase from 'camelcase'
import { globby } from 'globby'
import { optimize } from 'svgo'

import { writeFileAsync } from '../../common/src/write-file-async.js'

type SvgFile = {
  baseName: string
  storyName: string
  componentName: string
  dimension: number
  svgString: string
}

var __dirname = dirname(fileURLToPath(import.meta.url))

async function main(): Promise<void> {
  try {
    var globPatterns = ['icons/**/*.svg']
    var outputDirectoryPath = resolve(__dirname, '..', 'src', 'icons')
    await generateIconsAsync(globPatterns, outputDirectoryPath)
  } catch (error: any) {
    console.error(error.message) // eslint-disable-line no-console
    process.exit(1)
  }
}
main()

async function generateIconsAsync(
  globPatterns: Array<string>,
  outputDirectoryPath: string
): Promise<void> {
  var filePaths = await globby(globPatterns)
  if (filePaths.length === 0) {
    throw new Error(`No files match \`${globPatterns.join(', ')}\``)
  }
  var svgFiles = await readSvgFilesAsync(filePaths)
  var dimensions: Record<string, Array<SvgFile>> = groupSvgFilesByDimension(
    svgFiles
  )
  var directoryPaths = await globby(join(outputDirectoryPath, 'icon-*'), {
    onlyFiles: false
  })
  for (var directoryPath of directoryPaths) {
    await fs.rm(directoryPath, { force: true, recursive: true })
  }
  for (var dimension in dimensions) {
    var directoryPath = join(outputDirectoryPath, `icon-${dimension}`)
    await writePreactComponentsAsync(dimensions[dimension], directoryPath)
    await writeStoriesAsync(dimensions[dimension], dimension, directoryPath)
  }
}

async function readSvgFilesAsync(
  filePaths: Array<string>
): Promise<Array<SvgFile>> {
  var result: Array<SvgFile> = []
  var usedNames: Record<string, true> = {}
  for (var filePath of filePaths.sort()) {
    var svgFile: SvgFile = await readSvgFileAsync(filePath)
    var { componentName } = svgFile
    if (usedNames[componentName] === true) {
      throw new Error(`Name clash \`${componentName}\`: ${filePath}`)
    }
    usedNames[componentName] = true
    result.push(svgFile)
  }
  return result
}

async function readSvgFileAsync(filePath: string): Promise<SvgFile> {
  var baseName = basename(filePath, extname(filePath))
  var svgString = await fs.readFile(filePath, 'utf8')
  let width = 0
  let height = 0
  var result = optimize(svgString, {
    plugins: [
      {
        fn: function () {
          return {
            element: {
              enter: (node, parentNode) => {
                if (parentNode.type === 'root') {
                  width = parseInt(node.attributes.width, 10)
                  height = parseInt(node.attributes.height, 10)
                }
              }
            }
          }
        },
        name: 'get-svg-size'
      },
      {
        name: 'convertPathData',
        params: {
          floatPrecision: 5
        }
      }
    ]
  })
  if (width === null) {
    throw new Error('`width` is `null`')
  }
  if (height === null) {
    throw new Error('`height` is `null`')
  }
  if (width !== height) {
    throw new Error(`Different \`width\` and \`height\`: ${filePath}`)
  }
  return {
    baseName: slugify(`icon-${baseName}-${width}`),
    componentName: camelcase(`Icon ${baseName} ${width}`, {
      pascalCase: true
    }),
    dimension: width,
    storyName: camelcase(`Icon ${baseName}`, {
      pascalCase: true
    }),
    svgString: result.data
  }
}

function groupSvgFilesByDimension(
  svgFiles: Array<SvgFile>
): Record<string, Array<SvgFile>> {
  var result: Record<string, Array<SvgFile>> = {}
  for (var svgFile of svgFiles) {
    var dimension = `${svgFile.dimension}`
    if (typeof result[dimension] === 'undefined') {
      result[dimension] = []
    }
    result[dimension].push(svgFile)
  }
  return result
}

async function writePreactComponentsAsync(
  svgFiles: Array<SvgFile>,
  directoryPath: string
): Promise<void> {
  for (var { baseName, componentName, svgString } of svgFiles) {
    var fileContents = `import { h } from 'preact'

import { createIcon } from '../create-icon.js'

export var ${componentName} = createIcon(
  ${svgString}
)
`
    var filePath = join(directoryPath, `${baseName}.tsx`)
    await writeTsFileAsync(filePath, fileContents)
  }
}

async function writeStoriesAsync(
  svgFiles: Array<SvgFile>,
  dimension: string,
  directoryPath: string
): Promise<void> {
  var imports: Array<string> = []
  var stories: Array<string> = []
  for (var { baseName, componentName, storyName } of svgFiles) {
    imports.push(`import { ${componentName} } from '../${baseName}.js'`)
    stories.push(`export var ${storyName.replace(/^Icon/, '')} = function () {
  return <${componentName} />
}`)
  }
  var fileContents = `import { h } from 'preact'

${imports.join('\n')}

export default {
  parameters: {
    fixedWidth: false
  },
  title: 'Icons/Size ${dimension}'
}

${stories.join('\n\n')}
`
  var filePath = join(
    directoryPath,
    'stories',
    `icon-${dimension}.stories.tsx`
  )
  await writeTsFileAsync(filePath, fileContents)
}

async function writeTsFileAsync(
  filePath: string,
  fileContents: string
): Promise<void> {
  await writeFileAsync(
    filePath,
    `// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.\n${fileContents}`
  )
}
