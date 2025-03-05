/**
 * Creates an [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
 * from an [`HTMLImageElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement).
 *
 * @category Image
 */
export async function createCanvasElementFromImageElement(
  imageElement: HTMLImageElement
): Promise<HTMLCanvasElement> {
  let canvasElement = document.createElement('canvas')
  canvasElement.width = imageElement.width
  canvasElement.height = imageElement.height
  let context = canvasElement.getContext('2d') as CanvasRenderingContext2D
  context.drawImage(imageElement, 0, 0)
  return canvasElement
}
