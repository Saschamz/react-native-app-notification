# react-native-app-notification

## Content

- [Installation](#installation)
- [Setup](#setup)
- [Props](#props)
- [Methods](#methods)

## Installation

`npm i react-native-app-notification`

## Setup

Inside of `App.js`

```typescript
import AppNotification from 'react-native-app-notification'

const App = () => {
  return (
    <View>
      (...)
      <AppNotification />
    </View>
  )
}
```

## Example usage

```typescript

// Anywhere in the app
AppNotification.show({
  title: 'New message'
  message: 'Someone sent you a message!',
  onPress: navigateToMessages,
})

```

## AppNotification Component Props

| Property              | Type                  | Optional | Default                      | Description                                              |
| --------------------- | --------------------- | -------- | ---------------------------- | -------------------------------------------------------- |
| animated              | boolean               | true     | true                         | Determines if the notification should animate in/out     |
| duration              | number                | true     | 5000                         | Lifetime in MS                                           |
| alignBottom           | boolean               | true     | false                        | Renders the notifications from the bottom                |
| bottomOffset          | number                | true     | layout.height \* 0.07        | Bottom offset                                            |
| topOffset             | number                | true     | layout.height \* 0.07        | Top offset                                               |
| contentContainerStyle | StyleProp<ViewStyle>  | true     | { marginLeft: 8, width: 85%} | Stylesheet for the View renderring all the notifications |
| containerStyle        | StyleProp<ViewStyle>  | true     | **SEE SOURCE**               | Stylesheet for the notification card                     |
| titleStyle            | StyleProp<TextStyle>  | true     | **SEE SOURCE**               | Stylesheet for the title                                 |
| messageStyle          | StyleProp<TextStyle>  | true     | **SEE SOURCE**               | Stylesheet for the messagee                              |
| imageStyle            | StyleProp<ImageStyle> | true     | **SEE SOURCE**               | Stylesheet for the image                                 |

## Methods

| Method        | Description              | Props                                                                                                 |
| ------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| show(options) | Renders a notification   | title, message, imageUrl, onPress, panEnabled (and everything above except for contentContainerStyle) |
| clear()       | Clears all notifications | none                                                                                                  |
