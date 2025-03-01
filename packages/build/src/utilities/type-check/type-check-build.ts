import ts from 'typescript'

import { filterTypeScriptDiagnostics } from './filter-typescript-diagnostics.js'
import { formatTypeScriptErrorMessage } from './format-typescript-error-message.js'
import { readTsConfig } from './read-tsconfig.js'

export function typeCheckBuild(): void {
  let tsConfig = readTsConfig()
  let compilerOptions = {
    ...tsConfig.compilerOptions,
    configFilePath: tsConfig.tsConfigFilePath,
    noEmit: true
  }
  if (tsConfig.filePaths.length === 0) {
    return
  }
  let program = ts.createProgram(tsConfig.filePaths, compilerOptions)
  let diagnostics = filterTypeScriptDiagnostics(
    ts.getPreEmitDiagnostics(program).slice()
  )
  if (diagnostics.length === 0) {
    return
  }
  throw new Error(formatTypeScriptErrorMessage(diagnostics))
}
