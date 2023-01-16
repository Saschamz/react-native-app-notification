import React, {useRef} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import AppNotification from './react-native-app-notification/src';
import {NotificationOptions} from './react-native-app-notification/src/types';

const notifications: NotificationOptions[] = [
  {
    title: 'Your title',
    message: 'Your message',
  },
  {
    title: 'Saved changes',
    message: 'Your profile has been updated',
    right: <Text style={{color: 'blue'}}>Revert</Text>,
  },
  {
    imageUrl: 'https://picsum.photos/80/80',
    title: 'Message from John Doe',
    message: 'Hello, how are you?',
  },
];

function App(): JSX.Element {
  const indexRef = useRef(0);

  const onPress = () => {
    if (indexRef.current === notifications.length) indexRef.current = 0;
    const options = notifications[indexRef.current++];

    AppNotification.show({duration: 1000 * 3, ...options});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
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
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            Press Anywhere
          </Text>
        </TouchableOpacity>
      </View>
      <AppNotification
      // Add custom animations!
      // animationWrappers={{
      //   in: AppNotification.AnimationWrappers.FadeIn,
      //   out: AppNotification.AnimationWrappers.FadeOut,
      // }}
      />
    </SafeAreaView>
  );
}

export default App;
