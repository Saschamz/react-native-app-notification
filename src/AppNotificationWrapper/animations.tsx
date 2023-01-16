import { useAnimatedValue } from '@redmindab/react-hooks'
import React, { FunctionComponent, useEffect } from 'react'
import { Animated } from 'react-native'

type Props = {
  duration?: number
  yOffset?: number
  delay?: number
  height?: number
  reversed?: boolean
  children?: JSX.Element
}

export const DEFAULT_DURATION = 200
const DEFAULT_Y_OFFSET = -48

export const SlideUpFadeIn: FunctionComponent<Props> = ({
  children,
  delay = 0,
  duration = DEFAULT_DURATION,
  yOffset = DEFAULT_Y_OFFSET,
  reversed,
}) => {
  const opacity = useAnimatedValue(0)
  const translateY = useAnimatedValue(reversed ? -yOffset : yOffset)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <Animated.View
      style={{
        opacity: opacity,
        transform: [{ translateY }],
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
  height: initialHeight,
}) => {
  const scale = useAnimatedValue(1)
  const height = useAnimatedValue(initialHeight)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(height, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: false,
      }),
    ]).start()
  }, [])

  return (
    <Animated.View style={{ height }}>
      <Animated.View
        style={{
          transform: [{ scale }],
        }}
      >
        {children}
      </Animated.View>
    </Animated.View>
  )
}
