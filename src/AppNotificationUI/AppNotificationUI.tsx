import React, { FunctionComponent } from 'react'
import { FlexRow } from 'styled-native-kit'
import {
  AppNotificationComponentProps,
  AppNotificationStyleProps,
  NotificationQueueItem,
} from '../types'
import {
  BaseImage,
  Card,
  LeftContainer,
  Message,
  RightContainer,
  TextContainer,
  Title,
} from './styled'

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
  left,
  right,
}) => {
  return (
    <Card style={containerStyle} activeOpacity={onPress ? 0.7 : 1} onPress={onPress}>
      <FlexRow style={{ alignItems: 'center', justifyContent: 'center' }}>
        {left && <LeftContainer>{left}</LeftContainer>}
        {imageUrl && <BaseImage source={{ uri: imageUrl }} style={imageStyle} />}
        <TextContainer>
          {title && <Title style={[{ marginBottom: 4 }, titleStyle]}>{title}</Title>}
          <Message style={messageStyle}>{message}</Message>
        </TextContainer>
        {right && <RightContainer>{right}</RightContainer>}
      </FlexRow>
    </Card>
  )
}

export default AppNotificationUI
