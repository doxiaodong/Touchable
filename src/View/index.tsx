import * as React from 'react'
import setAndForwardRef from '../setAndForwardRef'
import useResponderEvents from '../useResponderEvents'

const View = React.forwardRef<any, any>((props, ref) => {
  const {
    // for useElementLayout
    onLayout,

    // for setAndForwardRef
    forwardedRef,

    // for useResponderEvent
    onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture,
    onResponderEnd,
    onResponderGrant,
    onResponderMove,
    onResponderReject,
    onResponderRelease,
    onResponderStart,
    onResponderTerminate,
    onResponderTerminationRequest,
    onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder,
    onStartShouldSetResponderCapture,

    // do not copy children
    children,

    // rest for real dom
    ...rest
  } = props

  const child = React.Children.only(props.children)

  const hostRef = React.useRef(null)
  const setRef = setAndForwardRef({
    getForwardedRef: () => forwardedRef,
    setLocalRef: (c) => {
      hostRef.current = c
    },
  })

  useResponderEvents(hostRef, {
    onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture,
    onResponderEnd,
    onResponderGrant,
    onResponderMove,
    onResponderReject,
    onResponderRelease,
    onResponderStart,
    onResponderTerminate,
    onResponderTerminationRequest,
    onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder,
    onStartShouldSetResponderCapture,
  })

  return React.cloneElement(child, {
    ...rest,
    ref: setRef,
  })
})

export default View
