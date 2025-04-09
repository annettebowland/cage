import indentString from 'indent-string'
import ts from 'typescript'

let formatDiagnosticsHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: function (fileName: string): string {
    return fileName
  },
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: function (): string {
    return ts.sys.newLine
  }
}

export function formatTypeScriptErrorMessage(
  diagnostics: readonly ts.Diagnostic[]
) {
  let string = ts.formatDiagnosticsWithColorAndContext(
    diagnostics,
    formatDiagnosticsHost
  )
  return `TypeScript error\n\n${indentString(string, 4)}`
}
