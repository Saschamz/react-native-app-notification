import { useRef } from 'react'
import { Animated } from 'react-native'

const useAnimatedValue = (initialValue: number): Animated.Value => {
  const animatedValue = useRef(new Animated.Value(initialValue))

  return animatedValue.current
}

export default useAnimatedValue
