import * as React from 'react'
import { TouchableProps } from './PropsType'

const Touchable: React.FC<TouchableProps> = (props) => {
  return <>{props.children}</>
}

export default Touchable
