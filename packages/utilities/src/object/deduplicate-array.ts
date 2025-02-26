/**
 * Returns the result of deduplicating the given `array`. Does not modify the
 * original `array`.
 *
 * @returns Returns a new array with unique values.
 * @category Object
 */
export function deduplicateArray<T extends boolean | number | string>(
  array: Array<T>
): Array<T> {
  let object: Record<string, true> = {}
  let result: Array<T> = []
  for (let value of array) {
    if (object[`${value}`] === true) {
      continue
    }
    object[`${value}`] = true
    result.push(value)
  }
  return result
}
