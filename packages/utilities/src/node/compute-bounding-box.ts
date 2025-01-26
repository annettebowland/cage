import { getAbsolutePosition } from './absolute-position/get-absolute-position.js'
import { getParentNode } from './get-nodes/get-parent-node.js'

/**
 * Computes the coordinates (`x`, `y`) and dimensions (`width`, `height`) of
 * the smallest bounding box that contains the given `node`. (Does not account
 * for strokes or effects that could extend beyond the node’s bounding box.)
 *
 * @returns Returns the bounding box as a [`Rect`](https://figma.com/plugin-docs/api/Rect/).
 * @category Node
 */
export function computeBoundingBox(node: SceneNode): Rect {
  if ('rotation' in node && node.rotation === 0) {
    let absolutePosition = getAbsolutePosition(node)
    let { width, height } = node
    return { ...absolutePosition, height, width }
  }
  let parentNode = getParentNode(node)
  let index = parentNode.children.indexOf(node)
  let group = figma.group([node], parentNode, index)
  let absolutePosition = getAbsolutePosition(group)
  let { width, height } = group
  parentNode.insertChild(index, node)
  return { ...absolutePosition, height, width }
}
