let EMPTY_STRING = ''

let fractionalPartRegex = /\.([^.]+)/
let nonDigitRegex = /[^\d.]/

export function formatEvaluatedValue(
  evaluatedValue: null | number,
  value: string,
  suffix?: string
): string {
  if (evaluatedValue === null) {
    return EMPTY_STRING
  }
  let significantFiguresCount = countSignificantFigures(
    nonDigitRegex.test(value) === true ? `${evaluatedValue}` : value
  )
  return appendSuffix(
    formatSignificantFigures(evaluatedValue, significantFiguresCount),
    suffix
  )
}

function countSignificantFigures(value: string): number {
  let result = fractionalPartRegex.exec(value)
  if (result === null) {
    return 0
  }
  return result[1].length
}

function formatSignificantFigures(
  value: number,
  significantFiguresCount: number
): string {
  if (significantFiguresCount === 0) {
    return `${value}`
  }
  let result = fractionalPartRegex.exec(`${value}`)
  if (result === null) {
    return `${value}.${'0'.repeat(significantFiguresCount)}`
  }
  let fractionalPart = result[1]
  let count = significantFiguresCount - fractionalPart.length
  return `${value}${'0'.repeat(count)}`
}

function appendSuffix(string: string, suffix?: string): string {
  if (typeof suffix === 'undefined') {
    return string
  }
  if (string === EMPTY_STRING) {
    return EMPTY_STRING
  }
  return `${string}${suffix}`
}
