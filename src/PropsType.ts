export type TouchableEvent = {}

type Callback = (e: TouchableEvent) => void

export interface TouchableProps {
  /**
   * Delay in ms, from onPressIn, before onLongPress is called.
   */
  delayLongPress?: number
  /**
   * Delay in ms, from the start of the touch, before onPressIn is called.
   */
  delayPressIn?: number
  /**
   * Delay in ms, from the release of the touch, before onPressOut is called.
   */
  delayPressOut?: number
  /**
   * If true, disable all interactions for this component.
   */
  disabled?: boolean
  onLongPress?: Callback
  /**
   * Called when the touch is released, but not if cancelled (e.g. by a scroll
   * that steals the responder lock).
   */
  onPress?: Callback
  onPressIn?: Callback
  onPressOut?: Callback
}
