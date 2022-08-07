import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SettingStore } from '../stores/SettingStorage';
import color from '../styling/Color';
import GeneralSettingsScreen from '../screens/GeneralSettingsScreen';
import CurrencyScreen from '../screens/CurrencyScreen';
import CurrencySettingsScreen from '../screens/CurrencySettingsScreen';
import CurrencyListScreen from '../screens/CurrencyListScreen';
import LoginScreen from '../screens/LoginScreen';
import CurrencyDetailsScreen from '../screens/CurrencyDetailsScreen';

const Stack = createStackNavigator();

function MainNavigator() {
  const defaultScreen = SettingStore.useState((s) => s.defaultScreen);
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      gestureEnabled={false}
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          alignSelf: 'center',
          flex: 1,
          color: color.white,
        },
        headerStyle: {
          backgroundColor: color.primary,
        },
        headerShadowVisible: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="Currency" component={CurrencyScreen} />
      <Stack.Screen name="GeneralSettings" component={GeneralSettingsScreen} />
      <Stack.Screen
        name="CurrencySettings"
        component={CurrencySettingsScreen}
      />
      <Stack.Screen name="CurrencyList" component={CurrencyListScreen} />
      <Stack.Screen name="CurrencyDetails" component={CurrencyDetailsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
