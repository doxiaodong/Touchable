import { findDOMNode } from 'react-dom'

const findNodeHandle = component => {
  let node

  try {
    node = findDOMNode(component)
  } catch (e) {}

  return node
}

export default findNodeHandle
