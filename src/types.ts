import { FunctionComponent } from 'react'
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native'

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

export type AnimationWrapperConfig = {
  in?: FunctionComponent
  out?: FunctionComponent
}

export type AppNotificationComponentProps = {
  contentContainerStyle?: StyleProp<ViewStyle>
  topOffset?: number
  bottomOffset?: number
  alignBottom?: boolean
  animated?: boolean
  panEnabled?: boolean
  duration?: number
  maxAmount?: number
  animationWrappers?: AnimationWrapperConfig
  renderNotification?: (props: NotificationOptions) => FunctionComponent
} & AppNotificationStyleProps

export type NotificationOptions = {
  title?: string
  message: string
  imageUrl?: string
  onPress?: () => void
  animated?: boolean
  panEnabled?: boolean
  styles?: AppNotificationStyleProps
  data?: any
}

export type NotificationQueueItem = NotificationOptions & {
  animateOut: boolean
  id: string
}
