export type ShowNotificationOptions = {
  duration?: number
}

export type NotificationOptions = {
  title: string
  message: string
  imageUrl?: string
  onPress?: () => void
}

export type NotificationQueueItem = NotificationOptions & {
  animateOut: boolean
  id: string
}
