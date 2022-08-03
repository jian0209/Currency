import React, { useLayoutEffect, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View, Alert } from 'react-native';
import { GlobalStyle } from '../styling/Global';
import { TextStyle } from '../styling/TextStyle';
import { CardStyle } from '../styling/CardStyle';
import { ButtonStyle } from '../styling/ButtonStyle';
import {
  DownIcon,
  RightIcon,
  BackIcon,
  CheckIcon,
  LoginUserIcon,
} from '../components/Icon';
import { SettingStore } from '../stores/SettingStorage';
import { UserStore } from '../stores/UserStore';
import { setLanguage } from '../stores/LocalStorage';

export default function GeneralSettingsScreen(props) {
  const { navigation } = props;

  const language = [
    {
      name: 'English',
      value: 0,
    },
    {
      name: '简体中文',
      value: 1,
    },
    {
      name: '繁体中文',
      value: 2,
    },
  ];

  const defaultLanguage = SettingStore.useState((s) => s.language);
  const token = UserStore.useState((s) => s.token);
  const userInfo = UserStore.useState((s) => s.userInfo);

  const [showLanguage, setShowLanguage] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={ButtonStyle.headerLeftBtn}
          onPress={() => {
            navigation.goBack();
          }}>
          <BackIcon />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text style={TextStyle.mainText}>Account Setting</Text>
      ),
      //   headerRight: () => <View>{/* <Text>asd</Text> */}</View>,
    });
  }, [navigation]);

  return (
    <View style={GlobalStyle.container}>
      <Pressable
        onPress={() => {
          if (!token) {
            navigation.navigate('Login');
          } else {
            Alert.alert('Logout', 'Are You sure you want to logout?', [
              {
                text: 'Yes',
                onPress: () => {
                  UserStore.update((s) => {
                    s.token = '';
                    s.userInfo = {};
                  });
                },
                style: 'cancel',
              },
              { text: 'No', onPress: () => console.log('No') },
            ]);
          }
        }}
        style={CardStyle.settingSubCard}>
        <Text style={TextStyle.settingSubTextWhite}>
          {token ? 'Username: ' + userInfo.username : 'Login / Register'}
        </Text>
        <LoginUserIcon />
      </Pressable>
      <View style={CardStyle.settingCard}>
        <TouchableOpacity
          onPress={() => {
            setShowLanguage(!showLanguage);
          }}
          style={CardStyle.insideSettingCard}>
          <View style={CardStyle.settingMainLeftCard}>
            {showLanguage ? <DownIcon /> : <RightIcon />}
            <Text style={TextStyle.settingText}>Language</Text>
          </View>
          <Text style={TextStyle.settingDropDownText}>
            {language[+defaultLanguage].name}
          </Text>
        </TouchableOpacity>
        {showLanguage &&
          language.map((item, index) => (
            <View key={index} style={CardStyle.settingDropDownCard}>
              <TouchableOpacity
                style={CardStyle.settingDropDownInsideCard}
                onPress={() => {
                  SettingStore.update((s) => {
                    s.language = item.value;
                  });
                  setLanguage(item.value.toString());
                }}>
                <Text
                  style={
                    +defaultLanguage === item.value
                      ? TextStyle.selectedSettingDropDownText
                      : TextStyle.settingDropDownText
                  }>
                  {item.name}
                </Text>
                {+defaultLanguage === item.value ? <CheckIcon /> : null}
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </View>
  );
}
