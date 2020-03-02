import React, { FunctionComponent } from 'react'
import { FlexRow, View } from 'styled-native-kit'
import {
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle
} from 'react-native'
import { useLayout } from '@redmindab/react-hooks'
import { Card, Title, Message, TextContainer, Circle } from './styled'
import { SlideDownFadeIn, Shrink } from './animations'
import { NotificationQueueItem } from '../types'

type OwnProps = {
  animated?: boolean
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  messageStyle?: StyleProp<TextStyle>
  imageStyle?: StyleProp<ImageStyle>
}

type Props = OwnProps & NotificationQueueItem

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
  titleStyle
}) => {
  const [layout, bindLayout] = useLayout()

  let AnimationWrapper = View

  if (animated) {
    AnimationWrapper = animateOut ? Shrink : SlideDownFadeIn
  }

  return (
    <AnimationWrapper height={layout.height}>
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
            <Title style={titleStyle}>{title}</Title>
            <Message style={messageStyle}>{message}</Message>
          </TextContainer>
        </FlexRow>
      </Card>
    </AnimationWrapper>
  )
}

export default AppNotificationUI
