/**
 * Extracts the specified list of `attributes` from the given `array` of
 * plain objects.
 *
 * @returns Returns an array of plain objects.
 * @category Object
 */
export function extractAttributes<PlainObject, Key extends keyof PlainObject>(
  array: Array<PlainObject>,
  attributes: Key[]
): Array<Pick<PlainObject, Key>> {
  let result: Array<Pick<PlainObject, Key>> = []
  for (let object of array) {
    result.push(pick(object, attributes))
  }
  return result
}
function pick<PlainObject, Key extends keyof PlainObject>(
  object: PlainObject,
  keys: Key[]
): Pick<PlainObject, Key> {
  let result = {} as Pick<PlainObject, Key>
  for (let key of keys) {
    let value = object[key]
    if (typeof value === 'undefined') {
      throw new Error(`Key \`${String(key)}\` does not exist on \`object\``)
    }
    result[key] = value
  }
  return result
}
