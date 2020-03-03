import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, Alert} from 'react-native';
import AppNotification from './react-native-app-notification/src';
import {View} from 'styled-native-kit';

const App = () => {
  const onPress = () => {
    AppNotification.show({
      message: 'Message',
      onPress: () => Alert.alert('123'),
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity
          onPress={onPress}
          style={{backgroundColor: 'black', padding: 16}}>
          <Text style={{color: 'white'}}>
            Render react-native-app-notification
          </Text>
        </TouchableOpacity>
      </View>
      <AppNotification
        ref={AppNotification.setRef}
        containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
        messageStyle={{color: 'white'}}
      />
    </SafeAreaView>
  );
};

export default App;
