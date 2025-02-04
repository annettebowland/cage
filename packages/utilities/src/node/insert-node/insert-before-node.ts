import { getParentNode } from '../get-nodes/get-parent-node.js'

/**
 * Inserts `node` *before* the `referenceNode` in the layer list.
 *
 * @category Node
 */
export function insertBeforeNode(
  node: SceneNode,
  referenceNode: SceneNode
): void {
  let parentNode = getParentNode(referenceNode)
  let index = parentNode.children.indexOf(referenceNode)
  parentNode.insertChild(index + 1, node)
}
