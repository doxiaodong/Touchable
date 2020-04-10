import { getBoundingClientRect } from '../useResponderEvents/utils'

const getRect = (node: any) => {
  // for "height" and "width" ignore scale transforms.
  // As an example, if the element has width: 100px; and transform: scale(0.5)
  // getBoundingClientRect() will return 50 as the width, while offsetWidth will return 100
  // https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
  const { x, y, top, left } = getBoundingClientRect(node)!
  const width = node.offsetWidth
  const height = node.offsetHeight
  return { x, y, width, height, top, left }
}

const measureLayout = (node: any, relativeToNativeNode: any, callback: any) => {
  const relativeNode = relativeToNativeNode || (node && node.parentNode)
  if (node && relativeNode) {
    setTimeout(() => {
      const relativeRect = getBoundingClientRect(relativeNode)!
      const { height, left, top, width } = getRect(node)
      const x = left - relativeRect.left
      const y = top - relativeRect.top
      callback(x, y, width, height, left, top)
    }, 0)
  }
}

const UIManager = {
  measure(node: any, callback: any) {
    measureLayout(node, null, callback)
  },
}

export default UIManager
