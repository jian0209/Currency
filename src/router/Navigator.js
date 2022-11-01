import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import color from '../styling/Color';
import GeneralSettingsScreen from '../screens/GeneralSettingsScreen';
import CurrencyScreen from '../screens/CurrencyScreen';
import CurrencySettingsScreen from '../screens/CurrencySettingsScreen';
import CurrencyListScreen from '../screens/CurrencyListScreen';
import CryptoScreen from '../screens/CryptoScreen';
// import LoginScreen from '../screens/LoginScreen';
import CurrencyDetailsScreen from '../screens/CurrencyDetailsScreen';
import CryptoDetailsScreen from '../screens/CryptoDetailsScreen';
import CryptoListScreen from '../screens/CryptoListScreen';
import TermScreen from '../screens/TermScreen';
import PrivacyScreen from '../screens/PrivacyScreen';

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'Term'}
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
      <Stack.Screen name="Crypto" component={CryptoScreen} />
      <Stack.Screen name="CryptoDetails" component={CryptoDetailsScreen} />
      <Stack.Screen name="CryptoList" component={CryptoListScreen} />
      <Stack.Screen name="Term" component={TermScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
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
