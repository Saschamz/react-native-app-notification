import React, { Component } from 'react'
import AppNotificationUI from './AppNotificationUI'
import { FadeIn, FadeOut, Shrink, SlideUpFadeIn } from './AppNotificationUI/animations'
import AppNotificationWrapper from './AppNotificationWrapper'
import { AppNotificationContainer } from './styled'
import {
  AppNotificationComponentProps,
  NotificationOptions,
  NotificationQueueItem,
  ShowNotificationOptions,
} from './types'

type Props = AppNotificationComponentProps

type State = {
  notificationQueue: NotificationQueueItem[]
}

export class AppNotification extends Component<Props, State> {
  public static DEFAULT_DURATION = 5000

  public static refs: Map<string, AppNotification> = new Map()

  public readonly id: string

  private static readonly _defaultId = 'AppNotificationDefaultIdentifier' as const

  public static AnimationWrappers = {
    Shrink,
    SlideUpFadeIn,
    FadeIn,
    FadeOut,
  }

  public static clear = (id?: string): void => {
    if (id) AppNotification.getRef(id)?.clearNotifications()
    else AppNotification.refs.forEach(ref => ref.clearNotifications())
  }

  private static getRef = (
    id: string = AppNotification._defaultId,
  ): AppNotification | undefined => {
    return AppNotification.refs.get(id) ?? AppNotification.refs.values().next().value
  }

  public static show = (options: NotificationOptions & ShowNotificationOptions) => {
    const ref = AppNotification.getRef(options.id)

    if (!ref) return console.warn('notificationRef is undefined')

    return ref.showNotification(options)
  }

  constructor(props: Props) {
    super(props)
    this.id = props.id ?? AppNotification._defaultId
    AppNotification.refs.set(this.id, this)
  }

  componentWillUnmount(): void {
    AppNotification.refs.delete(this.id)
  }

  state = {
    notificationQueue: [],
  }

  public showNotification({
    duration,
    styles,
    ...notificationOptions
  }: NotificationOptions & ShowNotificationOptions) {
    const { notificationQueue } = this.state
    const { duration: defaultDuration, maxAmount } = this.props
    const id = Math.random().toString()
    const newNotificationQueue = [
      ...notificationQueue,
      {
        ...notificationOptions,
        ...styles,
        onPress:
          typeof notificationOptions.onPress === 'function'
            ? () => this._onPress(id, notificationOptions.onPress)
            : null,
        id,
      },
    ]

    this.setState({
      notificationQueue:
        maxAmount === undefined
          ? newNotificationQueue
          : newNotificationQueue.slice(newNotificationQueue.length - maxAmount),
    })

    setTimeout(
      () => this.animateOutNotification(id),
      duration || defaultDuration || AppNotification.DEFAULT_DURATION,
    )
  }

  public clearNotifications = () => this.setState({ notificationQueue: [] })

  animateOutNotification = (id: string) => {
    const { notificationQueue } = this.state

    const newQueue = notificationQueue.map(notification =>
      notification.id === id ? { ...notification, animateOut: true } : notification,
    )

    this.setState({ notificationQueue: newQueue })
    setTimeout(() => this.removeNotification(id), AppNotification.DEFAULT_DURATION)
  }

  removeNotification = (id: string) => {
    const { notificationQueue } = this.state

    const newQueue = notificationQueue.filter(notification => notification.id !== id)
    this.setState({ notificationQueue: newQueue })
  }

  _onPress = (id: string, callback: () => void) => {
    callback()
    this.removeNotification(id)
  }

  renderNotification = (notification: NotificationQueueItem) => (
    <AppNotificationWrapper key={notification.id} {...this.props} {...notification}>
      {this.props.renderNotification ? (
        this.props.renderNotification({
          ...notification,
          close: () => this.removeNotification(notification.id),
        })
      ) : (
        <AppNotificationUI
          {...this.props}
          {...notification}
          onPress={notification.panEnabled ? undefined : notification.onPress}
        />
      )}
    </AppNotificationWrapper>
  )

  render() {
    const { contentContainerStyle, alignBottom, bottomOffset, topOffset } = this.props
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
