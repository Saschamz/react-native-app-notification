import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native'

export type ShowNotificationOptions = {
  duration?: number
  topOffset?: number
  bottomOffset?: number
  alignBottom?: number
}

export type AppNotificationStyleProps = {
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  messageStyle?: StyleProp<TextStyle>
  imageStyle?: StyleProp<ImageStyle>
}

export type AppNotificationComponentProps = {
  contentContainerStyle?: StyleProp<ViewStyle>
  topOffset?: number
  bottomOffset?: number
  alignBottom?: boolean
  animated?: boolean
  panEnabled?: boolean
  duration?: number
} & AppNotificationStyleProps

export type NotificationOptions = {
  title?: string
  message: string
  imageUrl?: string
  onPress?: () => void
  animated?: boolean
  panEnabled?: boolean
  styles?: AppNotificationStyleProps
}

export type NotificationQueueItem = NotificationOptions & {
  animateOut: boolean
  id: string
}
