import { yellow } from 'kleur/colors'

export function trackElapsedTime(): () => string {
  let time = process.hrtime()
  return function (): string {
    let elapsedTime = process.hrtime(time)
    let duration = elapsedTime[0] + elapsedTime[1] / 1e9
    return yellow(`${duration.toFixed(3)}s`)
  }
}
