import { useEffect, useRef } from 'react'
// @ts-ignore
import invariant from 'invariant'
import TouchableMixin from './TouchableMixin'

const ensurePositiveDelayProps = (props: any) => {
  invariant(
    !(
      props.delayPressIn < 0 ||
      props.delayPressOut < 0 ||
      props.delayLongPress < 0
    ),
    'Touchable components cannot have negative delay properties'
  )
}

function getTouch() {
  const touch = {} as any
  Object.keys(TouchableMixin).forEach((key) => {
    if (typeof TouchableMixin[key] === 'function') {
      touch[key] = TouchableMixin[key].bind(touch)
    } else {
      touch[key] = TouchableMixin[key]
    }
  })
  return touch
}

type EventCallback = (e: any) => void

export default function useTouchable(
  props: any,
  options?: {
    touchableHandleActivePressIn?: Function
    touchableHandleActivePressOut?: Function
    touchableHandlePress?: EventCallback
    touchableHandleLongPress?: EventCallback
    touchableGetHighlightDelayMS?: Function
    touchableGetPressRectOffset?: Function
    touchableGetLongPressDelayMS?: Function
    touchableGetPressOutDelayMS?: Function
  }
) {
  const touch = useRef(getTouch())
  const currentTouch = touch.current

  useEffect(() => {
    currentTouch.state = TouchableMixin.touchableGetInitialState()
  }, [])

  // 实时更新 props
  useEffect(() => {
    // @ts-ignore
    Object.keys(options).forEach((key) => {
      // @ts-ignore
      // TODO: 仅更新 props 需要更新的 api
      currentTouch[key] = options[key]
    })
    ensurePositiveDelayProps(props)
    currentTouch.props = props
  })

  return {
    touch: {
      touchableGetInitialState: TouchableMixin.touchableGetInitialState.bind(
        currentTouch
      ),
      touchableHandleResponderTerminationRequest: TouchableMixin.touchableHandleResponderTerminationRequest.bind(
        currentTouch
      ),
      touchableHandleStartShouldSetResponder: TouchableMixin.touchableHandleStartShouldSetResponder.bind(
        currentTouch
      ),
      touchableLongPressCancelsPress: TouchableMixin.touchableLongPressCancelsPress.bind(
        currentTouch
      ),
      touchableHandleResponderGrant: TouchableMixin.touchableHandleResponderGrant.bind(
        currentTouch
      ),
      touchableHandleResponderRelease: TouchableMixin.touchableHandleResponderRelease.bind(
        currentTouch
      ),
      touchableHandleResponderTerminate: TouchableMixin.touchableHandleResponderTerminate.bind(
        currentTouch
      ),
      touchableHandleResponderMove: TouchableMixin.touchableHandleResponderMove.bind(
        currentTouch
      ),
      touchableHandleKeyEvent: TouchableMixin.touchableHandleKeyEvent.bind(
        currentTouch
      ),
    },
  }
}
