import React, { useEffect, useLayoutEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyle } from '../styling/Global';
import LinearGradient from 'react-native-linear-gradient';
import color from '../styling/Color';
import { ButtonStyle } from '../styling/ButtonStyle';
import { TextStyle } from '../styling/TextStyle';

export default function HomeScreen(props) {
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Text>Header</Text>,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Currency');
          }}>
          <Text style={TextStyle.currencyText}>Go To Currency</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    navigation.navigate('Currency');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={GlobalStyle.container}>
      <TouchableOpacity style={ButtonStyle.closeBtn}>
        <LinearGradient
          style={ButtonStyle.closeBtn}
          colors={[color.gradiantFromBtn, color.gradiantToBtn]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}>
          <Text style={TextStyle.mainText}>X</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
