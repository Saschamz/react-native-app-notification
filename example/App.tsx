import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useRef } from 'react'
import AppNotification from './react-native-app-notification/src'
import { NotificationOptions } from './react-native-app-notification/src/types'

const notifications: NotificationOptions[] = [
  {
    title: 'Your title',
    message: 'Press me',
    onPress: () => Alert.alert('Pressed'),
  },
  {
    title: 'Unswipeable',
    message: 'Press me',
    panEnabled: false,
    onPress: () => Alert.alert('Pressed'),
  },
  {
    title: 'Saved changes',
    message: 'Your profile has been updated',
    right: <Text style={{ color: 'blue' }}>Revert</Text>,
  },
  {
    imageUrl: 'https://picsum.photos/80/80',
    title: 'Message from John Doe',
    message: 'Hello, how are you?',
  },
]

export default function App() {
  const indexRef = useRef(0)

  const onPress = () => {
    if (indexRef.current === notifications.length) indexRef.current = 0

    const options = notifications[indexRef.current++]
    const id = Math.random() >= 0.5 ? 'toast' : undefined

    AppNotification.show({ duration: 1000 * 3, id, ...options })
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Press Anywhere</Text>
      </TouchableOpacity>
      <AppNotification />
      <AppNotification
        id="toast"
        alignBottom
        maxAmount={1}
        animationWrappers={{
          in: AppNotification.AnimationWrappers.FadeIn,
          out: AppNotification.AnimationWrappers.FadeOut,
        }}
        renderNotification={notification => {
          return (
            <View
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 100,
                marginHorizontal: 16,
              }}
            >
              <Text>{notification.message}</Text>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
