import { basename } from 'node:path'

import { constants, log } from '@create-figma-plugin/common'
import slugify from '@sindresorhus/slugify'
import { green } from 'kleur/colors'

import { copyTemplateAsync } from './utilities/copy-template-async.js'
import { createName } from './utilities/create-name.js'
import { installDependenciesAsync } from './utilities/install-dependencies-async.js'
import { interpolateValuesIntoFilesAsync } from './utilities/interpolate-values-into-files-async.js'
import { resolveCreateFigmaPluginLatestStableVersions } from './utilities/resolve-create-figma-plugin-latest-stable-versions.js'
import { resolveDirectoryPathAsync } from './utilities/resolve-directory-path-async.js'
import { resolveTemplateNameAsync } from './utilities/resolve-template-name-async.js'

export async function createFigmaPluginAsync(options: {
  name?: string
  template?: string
}): Promise<void> {
  try {
    let templateName = await resolveTemplateNameAsync(options.template)
    let templateType =
      templateName.indexOf('plugin/') === 0 ? 'plugin' : 'widget'
    let directoryName =
      typeof options.name !== 'undefined'
        ? options.name
        : basename(templateName)
    let directoryPath = await resolveDirectoryPathAsync(directoryName)
    log.info(`Copying "${templateName}" template...`)
    await copyTemplateAsync(templateName, directoryPath)
    log.info('Resolving package versions...')
    let versions = await resolveCreateFigmaPluginLatestStableVersions()
    await interpolateValuesIntoFilesAsync(directoryPath, {
      id: slugify(directoryName),
      name: createName(directoryName),
      versions: {
        createFigmaPlugin: versions,
        figma: {
          pluginTypings: constants.packageJson.versions.pluginTypings,
          widgetTypings: constants.packageJson.versions.widgetTypings
        }
      }
    })
    log.info('Installing dependencies...')
    await installDependenciesAsync(directoryPath)
    log.success('Done')
    // eslint-disable-next-line no-console
    console.log(`\nFirst:
  ${green(`cd ${basename(directoryPath)}`)}

To build the ${templateType}:
  ${green('npm run build')}

To watch for code changes and rebuild the ${templateType} automatically:
  ${green('npm run watch')}\n`)
  } catch (error: any) {
    log.error(error.message)
    process.exit(1)
  }
}
