# Touchable

```tsx
import * as React from 'react'
import Touchable from '@dxd/touchable'

export default () => {
  return (
    <Touchable
      onPress={(e) => {
        console.log(e.nativeEvent)
      }}
    >
      <button
        onClick={(e) => {
          console.log(2, e.nativeEvent)
        }}
      >
        press
      </button>
    </Touchable>
  )
}
```
