import { getParentNode } from '../get-nodes/get-parent-node.js'

/**
 * Splits `nodes` into groups of sibling nodes.
 *
 * @returns Returns an array of array of sibling `SceneNode` objects.
 * @category Node
 */
export function computeSiblingNodes<Node extends SceneNode>(
  nodes: Array<Node>
): Array<Array<Node>> {
  let groups = resolveGroups(nodes)
  let result: Array<Array<Node>> = []
  for (let group of groups) {
    let parentNode = getParentNode(group[0])
    let siblingNodes = group
      .map(function (node: Node): { index: number; node: Node } {
        return {
          index: parentNode.children.indexOf(node),
          node
        }
      })
      .sort(function (a: { index: number }, b: { index: number }): number {
        return a.index - b.index
      })
      .map(function ({ node }: { node: Node }): Node {
        return node
      })
    result.push(siblingNodes)
  }
  return result
}

function resolveGroups<Node extends SceneNode>(
  nodes: Array<Node>
): Array<Array<Node>> {
  let result: Record<string, Array<Node>> = {}
  for (let node of nodes) {
    let parentNode = getParentNode(node)
    let parentId = parentNode.id
    if (parentId in result === false) {
      result[parentId] = []
    }
    result[parentId].push(node)
  }
  return Object.values(result)
}
