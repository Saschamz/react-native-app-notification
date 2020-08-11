import { useAnimatedValue, useLayout } from '@redmindab/react-hooks'
import React, { FunctionComponent, useRef, useState, Fragment } from 'react'
import { Animated, Dimensions, Image, PanResponder } from 'react-native'
import { FlexRow, View } from 'styled-native-kit'
import {
  AppNotificationComponentProps,
  AppNotificationStyleProps,
  NotificationQueueItem,
} from '../types'
import { Shrink, SlideUpFadeIn } from './animations'
import { Card, Circle, Message, TextContainer, Title } from './styled'

type OwnProps = AppNotificationStyleProps

type Props = OwnProps & NotificationQueueItem & AppNotificationComponentProps

type WrapperProps = {
  height?: number
  reversed?: boolean
}

export const AppNotificationUI: FunctionComponent<Props> = ({
  title,
  message,
  imageUrl,
  onPress,
  animateOut,
  animated = true,
  panEnabled = true,
  containerStyle,
  imageStyle,
  messageStyle,
  titleStyle,
  alignBottom,
}) => {
  const [hide, setHide] = useState(false)
  const [layout, bindLayout] = useLayout()
  const translateX = useAnimatedValue(0)
  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (e, { dx }) => {
        translateX.setValue(dx)
      },
      onPanResponderRelease: (e, { vx, dx }) => {
        const screenWidth = Dimensions.get('window').width
        if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
          Animated.timing(translateX, {
            toValue: dx > 0 ? screenWidth : -screenWidth,
            duration: 200,
          }).start(() => setHide(true))
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            bounciness: 10,
          }).start()
        }
      },
    })
  ).current

  let PanWrapper = Fragment
  let panWrapperProps = {}
  let AnimationWrapper = View
  const wrapperProps: WrapperProps = {}

  if (animated) {
    if (panEnabled) {
      PanWrapper = Animated.View
      panWrapperProps = {
        ...pan.panHandlers,
        style: { opacity: +!hide, transform: [{ translateX }] },
      }
    }

    AnimationWrapper = animateOut ? Shrink : SlideUpFadeIn
    wrapperProps.height = layout.height

    if (hide) {
      AnimationWrapper = Shrink
    }

    if (alignBottom && !animateOut) {
      wrapperProps.reversed = true
    }
  }

  return (
    <AnimationWrapper {...wrapperProps}>
      <PanWrapper {...panWrapperProps}>
        <Card
          style={containerStyle}
          activeOpacity={onPress ? 0.7 : 1}
          onPress={onPress}
          {...bindLayout}
        >
          <FlexRow style={{ alignItems: 'flex-start' }}>
            {imageUrl && (
              <Circle
                as={Image}
                source={{ uri: imageUrl }}
                style={imageStyle}
              />
            )}
            <TextContainer>
              {title && <Title style={titleStyle}>{title}</Title>}
              <Message style={messageStyle}>{message}</Message>
            </TextContainer>
          </FlexRow>
        </Card>
      </PanWrapper>
    </AnimationWrapper>
  )
}

export default AppNotificationUI
