export function computeNextValue(
  inputElement: HTMLInputElement,
  insertedString: string
): string {
  let value = inputElement.value
  let selectionStart = inputElement.selectionStart
  let selectionEnd = inputElement.selectionEnd
  return `${value.substring(
    0,
    selectionStart === null ? 0 : selectionStart
  )}${insertedString}${value.substring(
    selectionEnd === null ? 0 : selectionEnd
  )}`
}
