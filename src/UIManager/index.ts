/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import { getBoundingClientRect } from '../useResponderEvents/utils'

const getRect = (node: any) => {
  // Unlike the DOM's getBoundingClientRect, React Native layout measurements
  // for "height" and "width" ignore scale transforms.
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

const focusableElements = {
  A: true,
  INPUT: true,
  SELECT: true,
  TEXTAREA: true,
}

const UIManager = {
  blur(node: any) {
    try {
      node.blur()
    } catch (err) {}
  },

  focus(node: any) {
    try {
      const name = node.nodeName
      // A tabIndex of -1 allows element to be programmatically focused but
      // prevents keyboard focus, so we don't want to set the value on elements
      // that support keyboard focus by default.
      if (
        node.getAttribute('tabIndex') == null &&
        (focusableElements as any)[name] == null
      ) {
        node.setAttribute('tabIndex', '-1')
      }
      node.focus()
    } catch (err) {}
  },

  measure(node: any, callback: any) {
    measureLayout(node, null, callback)
  },

  measureInWindow(node: any, callback: any) {
    if (node) {
      setTimeout(() => {
        const { height, left, top, width } = getRect(node)
        callback(left, top, width, height)
      }, 0)
    }
  },

  measureLayout(
    node: any,
    relativeToNativeNode: any,
    onFail: any,
    onSuccess: any
  ) {
    measureLayout(node, relativeToNativeNode, onSuccess)
  },

  updateView(node: any, props: any) {
    for (const prop in props) {
      if (!Object.prototype.hasOwnProperty.call(props, prop)) {
        continue
      }

      const value = props[prop]
      switch (prop) {
        case 'style': {
          // @dxd 暂时不做样式处理
          node.style = value
          break
        }
        case 'class':
        case 'className': {
          node.setAttribute('class', value)
          break
        }
        case 'text':
        case 'value':
          // native platforms use `text` prop to replace text input value
          node.value = value
          break
        default:
          node.setAttribute(prop, value)
      }
    }
  },

  configureNextLayoutAnimation(config: any, onAnimationDidEnd: any) {
    onAnimationDidEnd()
  },

  // mocks
  setLayoutAnimationEnabledExperimental() {},
}

export default UIManager
