import * as React from 'react'
import { TouchableProps } from './PropsType'
import useTouchable from './useTouchable'
import View from './View'

const PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 }

function detectIsTouchable(props: TouchableProps) {
  if (
    props.onPress ||
    props.onLongPress ||
    props.onPressIn ||
    props.onPressOut
  ) {
    return true
  }

  return false
}

const Touchable: React.FC<TouchableProps> = (props) => {
  const child = React.Children.only(props.children)

  // 判断是否真的需要 touchable, 以便让嵌套的 Touchable 能正常冒泡
  // 比如 Button 带 Icon 的场景
  if (!detectIsTouchable(props)) {
    return child as any
  }

  const {
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    delayPressIn,
    delayPressOut,
    delayLongPress,
    ...rest
  } = props

  const { touch } = useTouchable(props, {
    touchableHandleActivePressIn(e) {
      onPressIn?.(e)
    },
    touchableHandleActivePressOut(e) {
      onPressOut?.(e)
    },
    touchableHandlePress(e) {
      onPress?.(e)
    },
    touchableHandleLongPress(e) {
      if (props.onLongPress) props.onLongPress(e)
      onLongPress?.(e)
    },
    touchableGetPressRectOffset() {
      return PRESS_RETENTION_OFFSET
    },
    touchableGetHighlightDelayMS() {
      return delayPressIn || 0
    },
    touchableGetLongPressDelayMS() {
      return delayLongPress ?? 500
    },
    touchableGetPressOutDelayMS() {
      return delayPressOut
    },
  })

  const addProps = {
    onKeyDown: touch.touchableHandleKeyEvent,
    onKeyUp: touch.touchableHandleKeyEvent,
    onResponderGrant: touch.touchableHandleResponderGrant,
    onResponderMove: touch.touchableHandleResponderMove,
    onResponderRelease: touch.touchableHandleResponderRelease,
    onResponderTerminate: touch.touchableHandleResponderTerminate,
    onResponderTerminationRequest:
      touch.touchableHandleResponderTerminationRequest,
    onStartShouldSetResponder: touch.touchableHandleStartShouldSetResponder,
  }

  return <View {...rest} {...addProps} />
}

// Why need TouchableExport ?
// since onPress and others is not used by View
// to make test simulate press work
/**
 *
 * it('onPressIn', () => {
 *   const fn = jest.fn()
 *   const component = shallow(
 *     <Touchable onPressIn={fn}>
 *       <div />
 *     </Touchable>,
 *   )
 *   component.simulate('press')
 *   expect(fn).toHaveBeenCalled()
 * })
 */
const TouchableExport: React.FC<TouchableProps> = (props) => {
  return <Touchable {...props} />
}

TouchableExport.displayName = 'Touchable'

export default TouchableExport
