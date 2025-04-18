/**
 * Creates a deep copy of the given object.
 *
 * @category Object
 */
export function cloneObject<T>(object: T): T {
  if (
    object === null ||
    typeof object === 'undefined' ||
    typeof object === 'boolean' ||
    typeof object === 'number' ||
    typeof object === 'string'
  ) {
    return object
  }
  if (Array.isArray(object)) {
    let result: Array<unknown> = []
    for (let value of object as Array<unknown>) {
      result.push(cloneObject(value))
    }
    return result as any
  }
  let result: Record<string, unknown> = {}
  for (let key in object) {
    result[key] = cloneObject(object[key])
  }
  return result as T
}
