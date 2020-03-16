import React, { Component } from 'react'
import AppNotificationUI from './AppNotificationUI'
import { AppNotificationContainer } from './styled'
import {
  AppNotificationComponentProps,
  NotificationOptions,
  NotificationQueueItem,
  ShowNotificationOptions
} from './types'

type OwnProps = AppNotificationComponentProps

type Props = OwnProps

type State = {
  notificationQueue: NotificationQueueItem[]
}

export class AppNotification extends Component<Props, State> {
  public static DEFAULT_DURATION = 5000

  public static ref: AppNotification = undefined

  public static clear = () => AppNotification.ref.clearNotifications()

  public static show = (
    options: NotificationOptions & ShowNotificationOptions
  ) => {
    if (
      typeof AppNotification.ref === 'undefined' ||
      !AppNotification.ref.showNotification
    ) {
      return console.warn('notificationRef is undefined')
    }
    AppNotification.ref.showNotification(options)
  }

  constructor(props: Props) {
    super(props)
    AppNotification.ref = this
  }

  state = {
    notificationQueue: []
  }

  public showNotification({
    duration,
    styles,
    ...notificationOptions
  }: NotificationOptions & ShowNotificationOptions) {
    const { notificationQueue } = this.state
    const { duration: defaultDuration } = this.props
    const id = Math.random().toString()

    this.setState({
      notificationQueue: [
        ...notificationQueue,
        {
          ...notificationOptions,
          ...styles,
          onPress:
            typeof notificationOptions.onPress === 'function'
              ? () => this._onPress(id, notificationOptions.onPress)
              : null,
          id
        }
      ]
    })

    setTimeout(
      () => this.animateOutNotification(id),
      duration || defaultDuration || AppNotification.DEFAULT_DURATION
    )
  }

  public clearNotifications = () => this.setState({ notificationQueue: [] })

  animateOutNotification = (id: string) => {
    const { notificationQueue } = this.state

    const newQueue = notificationQueue.map(notification =>
      notification.id === id
        ? { ...notification, animateOut: true }
        : notification
    )

    this.setState({ notificationQueue: newQueue })
    setTimeout(
      () => this.removeNotification(id),
      AppNotification.DEFAULT_DURATION
    )
  }

  removeNotification = (id: string) => {
    const { notificationQueue } = this.state

    const newQueue = notificationQueue.filter(
      notification => notification.id !== id
    )
    this.setState({ notificationQueue: newQueue })
  }

  _onPress = (id: string, callback: () => void) => {
    callback()
    this.removeNotification(id)
  }

  renderNotification = (notification: NotificationQueueItem) => (
    <AppNotificationUI
      key={notification.id}
      {...this.props}
      {...notification}
    />
  )

  render() {
    const {
      contentContainerStyle,
      alignBottom,
      bottomOffset,
      topOffset
    } = this.props
    const { notificationQueue } = this.state

    return (
      <AppNotificationContainer
        style={contentContainerStyle}
        alignBottom={alignBottom}
        bottomOffset={bottomOffset}
        topOffset={topOffset}
      >
        {notificationQueue.map(this.renderNotification)}
      </AppNotificationContainer>
    )
  }
}

export default AppNotification
