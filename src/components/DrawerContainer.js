import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
          navigation.closeDrawer();
        }}>
        <Text>Go To Home Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Test');
          navigation.closeDrawer();
        }}>
        <Text>Go To Test Screen</Text>
      </TouchableOpacity>
    </View>
  );
}
