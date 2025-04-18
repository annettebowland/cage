/**
 * Creates an `async` function that will invoke the given `callback` and run
 * for at least `minimumTime` (in milliseconds).
 *
 * @category Function
 */
export function ensureMinimumTime<S, T extends any[]>(
  minimumTime: number,
  callback: (...args: T) => Promise<S>
): (...args: T) => Promise<S> {
  return async function (...args: T): Promise<S> {
    let startTimestamp = Date.now()
    let result = await callback(...args)
    let elapsedTime = Date.now() - startTimestamp
    if (elapsedTime >= minimumTime) {
      return result
    }
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(result)
      }, minimumTime - elapsedTime)
    })
  }
}
