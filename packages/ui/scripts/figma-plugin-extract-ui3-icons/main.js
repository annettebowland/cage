/* global figma */

let newSelection = []
for (let node of figma.currentPage.selection) {
  let componentNodes = node.findAllWithCriteria({
    types: ['COMPONENT']
  })
  for (let componentNode of componentNodes) {
    if (componentNode.parent.type === 'COMPONENT_SET') {
      let propertyValues = componentNode.name
        .toLowerCase()
        .split(/ ?, ?/)
        .map(function (string) {
          return string.split('=')[1].replace(/[^a-z0-9]+/, '-')
        })
        .join('-')
      componentNode.name = `${componentNode.parent.name}-${propertyValues}`
    }
    let split = componentNode.name.split(/[.-]/)
    if (split[0] === 'favicon') {
      continue
    }
    componentNode.name = `icon-${split[1]}/${split.slice(2).join('-')}`
    componentNode.exportSettings = [{ format: 'SVG' }]
    newSelection.push(componentNode)
  }
}
figma.currentPage.selection = newSelection
figma.closePlugin()
