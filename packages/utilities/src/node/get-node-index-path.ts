/**
 * Gets the index path to the `node`.
 *
 * @returns Returns an array representing the index path to the given `node`,
 * starting from `figma.root`
 * @category Node
 */
export function getNodeIndexPath(node: SceneNode): Array<number> {
  let parentNode = node.parent
  if (parentNode === null) {
    throw new Error('`parentNode` is `null`')
  }
  let nodeIndex = parentNode.children.findIndex(function (
    childNode: SceneNode
  ): boolean {
    return childNode.id === node.id
  })
  if (nodeIndex === -1 || parentNode.type === 'DOCUMENT') {
    throw new Error('Invariant violation')
  }
  if (parentNode.type === 'PAGE') {
    let pageIndex = figma.root.children.findIndex(function (
      pageNode: PageNode
    ): boolean {
      return pageNode.id === parentNode.id
    })
    if (pageIndex === -1) {
      throw new Error('Invariant violation')
    }
    return [pageIndex, nodeIndex]
  }
  return [...getNodeIndexPath(parentNode), nodeIndex]
}
