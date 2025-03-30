import { traverseNode } from '../traverse-node.js'

/**
 * Returns all the local Components in the current document.
 *
 * @category Node
 */
export function getDocumentComponents(): Array<ComponentNode> {
  let result: Array<ComponentNode> = []
  for (let page of figma.root.children) {
    for (let node of page.children) {
      traverseNode(
        node,
        function (node: SceneNode): void {
          if (node.type === 'COMPONENT') {
            result.push(node)
          }
        },
        function (node: SceneNode): boolean {
          return node.type === 'COMPONENT'
        }
      )
    }
  }
  return result
}
