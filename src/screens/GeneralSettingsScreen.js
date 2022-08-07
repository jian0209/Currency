import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import I18n from '../language/i18n';

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
            navigation.navigate('CurrencySettings');
          }}>
          <BackIcon />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text style={TextStyle.mainText}>{I18n.t('accountSetting')}</Text>
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
            Alert.alert(I18n.t('logout'), I18n.t('logoutDesc'), [
              {
                text: I18n.t('yes'),
                onPress: () => {
                  UserStore.update((s) => {
                    s.token = '';
                    s.userInfo = {};
                  });
                },
                style: 'cancel',
              },
              { text: I18n.t('no'), onPress: () => console.log('No') },
            ]);
          }
        }}
        style={CardStyle.settingSubCard}>
        <Text style={TextStyle.settingSubTextWhite}>
          {token
            ? I18n.t('username') + ': ' + userInfo.username
            : I18n.t('accountSettingLogin')}
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
            <Text style={TextStyle.settingText}>{I18n.t('language')}</Text>
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
                  if (item.value === 0) {
                    I18n.locale = 'en';
                  } else if (item.value === 1) {
                    I18n.locale = 'zh_cn';
                  } else {
                    I18n.locale = 'zh_tw';
                  }
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
