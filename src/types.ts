import { FunctionComponent } from 'react'
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native'

export type ShowNotificationOptions = {
  duration?: number
  topOffset?: number
  bottomOffset?: number
  alignBottom?: number
  id?: string
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
  id?: string
  animationWrappers?: AnimationWrapperConfig
  renderNotification?: (props: RenderNotificationProps) => JSX.Element
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
  left?: JSX.Element
  right?: JSX.Element
}

export type RenderNotificationProps = NotificationOptions & {
  close(): void
}

export type NotificationQueueItem = NotificationOptions & {
  animateOut: boolean
  id: string
}
