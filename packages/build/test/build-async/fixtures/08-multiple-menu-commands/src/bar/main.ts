import { showUI } from '@create-figma-plugin/utilities'

export default function () {
  let options = { height: 120, width: 240 }
  let data = { greeting: 'Hello, World!' }
  showUI(options, data)
}
