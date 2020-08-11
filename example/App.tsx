import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, Alert} from 'react-native';
import AppNotification from './react-native-app-notification/src';
import {View} from 'styled-native-kit';

console.disableYellowBox = true;

const App = () => {
  const onPress = () => {
    AppNotification.show({
      title: 'Title',
      message: 'Message',
      onPress: () => Alert.alert('Notification pressed!'),
    });
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
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            Press Anywhere
          </Text>
        </TouchableOpacity>
      </View>
      <AppNotification />
    </SafeAreaView>
  );
};

export default App;
