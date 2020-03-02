import React, { FunctionComponent, useEffect } from 'react'
import { Animated } from 'react-native'
import { useAnimatedValue } from '@redmindab/react-hooks'

type OwnProps = {
  duration?: number
  yOffset?: number
  delay?: number
  height?: number
}
type Props = OwnProps

export const DEFAULT_DURATION = 200
const DEFAULT_Y_OFFSET = 48

export const SlideDownFadeIn: FunctionComponent<Props> = ({
  children,
  delay = 0,
  duration = DEFAULT_DURATION,
  yOffset = DEFAULT_Y_OFFSET
}) => {
  const opacity = useAnimatedValue(0)
  const translateY = useAnimatedValue(-yOffset)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay
      })
    ]).start()
  }, [])

  return (
    <Animated.View
      style={{
        opacity: opacity,
        transform: [{ translateY }]
      }}
    >
      {children}
    </Animated.View>
  )
}

export const Shrink: FunctionComponent<Props> = ({
  children,
  delay = 0,
  duration = DEFAULT_DURATION,
  height: initialHeight
}) => {
  const scale = useAnimatedValue(1)
  const height = useAnimatedValue(initialHeight)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 0,
        duration,
        delay
      }),
      Animated.timing(height, {
        toValue: 0,
        duration,
        delay
      })
    ]).start()
  }, [])

  return (
    <Animated.View style={{ height }}>
      <Animated.View
        style={{
          transform: [{ scale }]
        }}
      >
        {children}
      </Animated.View>
    </Animated.View>
  )
}
