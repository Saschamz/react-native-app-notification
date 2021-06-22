import React, { FunctionComponent } from 'react'
import { Image } from 'react-native'
import { FlexRow } from 'styled-native-kit'
import {
  AppNotificationComponentProps,
  AppNotificationStyleProps,
  NotificationQueueItem,
} from '../types'
import { Card, Circle, Message, TextContainer, Title } from './styled'

type OwnProps = AppNotificationStyleProps

type Props = OwnProps & NotificationQueueItem & AppNotificationComponentProps

export const AppNotificationUI: FunctionComponent<Props> = ({
  title,
  message,
  imageUrl,
  onPress,
  containerStyle,
  imageStyle,
  messageStyle,
  titleStyle,
}) => {
  return (
    <Card
      style={containerStyle}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
    >
      <FlexRow style={{ alignItems: 'flex-start' }}>
        {imageUrl && (
          <Circle as={Image} source={{ uri: imageUrl }} style={imageStyle} />
        )}
        <TextContainer>
          {title && (
            <Title style={[{ marginBottom: 4 }, titleStyle]}>{title}</Title>
          )}
          <Message style={messageStyle}>{message}</Message>
        </TextContainer>
      </FlexRow>
    </Card>
  )
}

export default AppNotificationUI
