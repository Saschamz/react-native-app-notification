import React, { FunctionComponent } from 'react'
import { FlexRow, View } from 'styled-native-kit'
import { Image } from 'react-native'
import { useLayout } from '@redmindab/react-hooks'
import { Card, Title, Message, TextContainer, Circle } from './styled'
import { SlideUpFadeIn, Shrink } from './animations'
import {
  NotificationQueueItem,
  AppNotificationStyleProps,
  AppNotificationComponentProps
} from '../types'

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
  containerStyle,
  imageStyle,
  messageStyle,
  titleStyle,
  alignBottom
}) => {
  const [layout, bindLayout] = useLayout()

  let AnimationWrapper = View
  const wrapperProps: WrapperProps = {}

  if (animated) {
    AnimationWrapper = animateOut ? Shrink : SlideUpFadeIn
    wrapperProps.height = layout.height

    if (alignBottom && !animateOut) {
      wrapperProps.reversed = true
    }
  }

  return (
    <AnimationWrapper {...wrapperProps}>
      <Card
        style={containerStyle}
        activeOpacity={onPress ? 0.7 : 1}
        onPress={onPress}
        {...bindLayout}
      >
        <FlexRow style={{ alignItems: 'flex-start' }}>
          {imageUrl && (
            <Circle as={Image} source={{ uri: imageUrl }} style={imageStyle} />
          )}
          <TextContainer>
            {title && <Title style={titleStyle}>{title}</Title>}
            <Message style={messageStyle}>{message}</Message>
          </TextContainer>
        </FlexRow>
      </Card>
    </AnimationWrapper>
  )
}

export default AppNotificationUI
