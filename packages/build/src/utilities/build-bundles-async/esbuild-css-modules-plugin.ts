import fs from 'node:fs/promises'
import { basename, extname, join, resolve } from 'node:path'

import cssNano from 'cssnano'
import { OnResolveArgs, Plugin, PluginBuild } from 'esbuild'
import { findUp } from 'find-up'
import { pathExists } from 'path-exists'
import postcss, { AcceptedPlugin } from 'postcss'
import postCssModules from 'postcss-modules'
import revHash from 'rev-hash'
import tempWrite from 'temp-write'

export function esbuildCssModulesPlugin(minify: boolean): Plugin {
  return {
    name: 'css-modules',
    setup: function (build: PluginBuild): void {
      build.onResolve(
        { filter: /\.css$/ },
        async function (args: OnResolveArgs): Promise<{ path: string }> {
          var { path, isGlobalCss } = parseCssFilePath(args.path)
          var cssfilePath = await createCssFilePathAsync(
            path,
            args.resolveDir
          )
          if (
            cssfilePath === null ||
            (await pathExists(cssfilePath)) === false
          ) {
            throw new Error(`CSS file not found: ${args.path}`)
          }
          var js = isGlobalCss
            ? await createGlobalCssJavaScriptAsync(cssfilePath, minify)
            : await createCssModulesJavaScriptAsync(cssfilePath, minify)
          var jsFilePath = await tempWrite(
            js,
            `${basename(args.path, extname(args.path))}.js`
          )
          return {
            path: jsFilePath
          }
        }
      )
    }
  }
}

function parseCssFilePath(path: string): {
  path: string
  isGlobalCss: boolean
} {
  if (path[0] === '!') {
    return {
      isGlobalCss: true,
      path: path.slice(1)
    }
  }
  return {
    isGlobalCss: false,
    path
  }
}

async function createCssFilePathAsync(
  path: string,
  resolveDirectory: string
): Promise<null | string> {
  if (path[0] === '/') {
    return path
  }
  if (path[0] === '.') {
    return resolve(resolveDirectory, path)
  }
  var result = await findUp(join('node_modules', path))
  if (typeof result === 'undefined') {
    return null
  }
  return result
}

var backQuoteRegex = /`/g
var backSlashRegex = /\\/g

function escapeCss(css: string) {
  return css.replace(backSlashRegex, '\\\\').replace(backQuoteRegex, '\\`')
}

async function createGlobalCssJavaScriptAsync(
  cssFilePath: string,
  minify: boolean
): Promise<string> {
  let css = await fs.readFile(cssFilePath, 'utf8')
  if (minify === true) {
    var plugins: Array<AcceptedPlugin> = [cssNano()]
    var result = await postcss(plugins).process(css, {
      from: cssFilePath,
      map:
        minify === true
          ? false
          : {
              inline: true
            }
    })
    css = result.css
  }
  var elementId: string = revHash(cssFilePath)
  var isBaseCss =
    cssFilePath.indexOf('@create-figma-plugin/ui/lib/css/base.css') !== -1
  return `
    if (document.getElementById('${elementId}') === null) {
      var element = document.createElement('style');
      element.id = '${elementId}';
      element.textContent = \`${escapeCss(css)}\`;
      document.head.${isBaseCss === true ? 'prepend' : 'append'}(element);
    }
    export default {};
  `
}

async function createCssModulesJavaScriptAsync(
  cssFilePath: string,
  minify: boolean
): Promise<string> {
  let css = await fs.readFile(cssFilePath, 'utf8')
  let classNamesJson: null | string = null
  var plugins: Array<AcceptedPlugin> = []
  plugins.push(
    postCssModules({
      getJSON: function (_: string, json: Record<string, string>): void {
        if (classNamesJson !== null) {
          throw new Error('`getJSON` callback called more than once')
        }
        classNamesJson = JSON.stringify(json)
      }
    })
  )
  if (minify === true) {
    plugins.push(cssNano())
  }
  var result = await postcss(plugins).process(css, {
    from: cssFilePath,
    map:
      minify === true
        ? false
        : {
            inline: true
          }
  })
  css = result.css
  if (classNamesJson === null) {
    throw new Error('`getJSON` callback was not called')
  }
  var elementId: string = revHash(cssFilePath)
  return `
    if (document.getElementById('${elementId}') === null) {
      var element = document.createElement('style');
      element.id = '${elementId}';
      element.textContent = \`${escapeCss(css)}\`;
      document.head.append(element);
    }
    export default ${classNamesJson};
  `
}
