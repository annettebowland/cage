import { log, readConfigAsync } from '@create-figma-plugin/common'

import { BuildOptions } from './types/build.js'
import { buildBundlesAsync } from './utilities/build-bundles-async/build-bundles-async.js'
import { buildCssModulesTypingsAsync } from './utilities/build-css-modules-typings-async.js'
import { buildManifestAsync } from './utilities/build-manifest-async.js'
import { trackElapsedTime } from './utilities/track-elapsed-time.js'
import { typeCheckBuild } from './utilities/type-check/type-check-build.js'

export async function buildAsync(
  options: BuildOptions & { clearPreviousLine: boolean; exitOnError: boolean }
): Promise<void> {
  let { minify, outputDirectory, typecheck, clearPreviousLine, exitOnError } =
    options
  let config = await readConfigAsync()
  try {
    if (typecheck === true) {
      let getTypeCheckElapsedTime = trackElapsedTime()
      await buildCssModulesTypingsAsync() // This must occur before `typeCheckBuild`
      log.info('Typechecking...')
      typeCheckBuild()
      let typeCheckElapsedTime = getTypeCheckElapsedTime()
      log.success(`Typechecked in ${typeCheckElapsedTime}`, {
        clearPreviousLine
      })
      log.info('Building...')
      let getBuildElapsedTime = trackElapsedTime()
      await Promise.all([
        buildBundlesAsync({ config, minify, outputDirectory }),
        buildManifestAsync({ config, minify, outputDirectory })
      ])
      let buildElapsedTime = getBuildElapsedTime()
      log.success(`Built in ${buildElapsedTime}`, { clearPreviousLine })
    } else {
      log.info('Building...')
      let getBuildElapsedTime = trackElapsedTime()
      await Promise.all([
        buildCssModulesTypingsAsync(),
        buildBundlesAsync({ config, minify, outputDirectory }),
        buildManifestAsync({ config, minify, outputDirectory })
      ])
      let buildElapsedTime = getBuildElapsedTime()
      log.success(`Built in ${buildElapsedTime}`, { clearPreviousLine })
    }
  } catch (error: any) {
    log.error(error.message)
    if (exitOnError === true) {
      process.exit(1)
    }
  }
}
