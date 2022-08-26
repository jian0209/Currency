import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyle } from '../styling/Global';
import { TextStyle } from '../styling/TextStyle';
import { CardStyle } from '../styling/CardStyle';
import { ButtonStyle } from '../styling/ButtonStyle';
import { CurrencyStore } from '../stores/CurrencyStore';
import { SettingStore } from '../stores/SettingStorage';
import {
  RightIcon,
  CheckIcon,
  DownIcon,
  BackIcon,
  UserIcon,
} from '../components/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import { setCurrencyValue, setDecimal } from '../stores/LocalStorage';
import { EMPTY_NUMBER } from '../utils/constant';
import I18n from 'react-native-i18n';
import moment from 'moment';

export default function CurrencySettingsScreen(props) {
  const { navigation } = props;

  const defaultValueArr = [
    {
      value: '1',
      key: 1,
    },
    {
      value: '10',
      key: 10,
    },
    {
      value: '100',
      key: 100,
    },
    {
      value: '1,000',
      key: 1000,
    },
    {
      value: '10,000',
      key: 10000,
    },
  ];

  const cryptoDict = {
    2: 0,
    4: 1,
    6: 2,
    8: 3,
    10: 4,
    12: 5,
  };

  const decimalLegalList = CurrencyStore.useState((s) => s.decimalLegalList);
  const decimalCryptoList = CurrencyStore.useState((s) => s.decimalCryptoList);
  const updatedDate = CurrencyStore.useState((s) => s.updatedDate);
  const defaultNumber = SettingStore.useState((s) => s.defaultNumber);
  const defaultLegalDecimal = SettingStore.useState(
    (s) => s.defaultLegalDecimal
  );
  const defaultCryptoDecimal = SettingStore.useState(
    (s) => s.defaultCryptoDecimal
  );
  const defaultLanguage = SettingStore.useState((s) => s.language);

  const [showCurrencyValue, setShowCurrencyValue] = useState(false);
  const [showDecimal, setShowDecimal] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={ButtonStyle.headerLeftBtn}
          onPress={() => {
            navigation.navigate('Currency');
          }}>
          <BackIcon />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text style={TextStyle.mainText}>{I18n.t('conversionSetting')}</Text>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={ButtonStyle.headerRightBtn}
          onPress={() => {
            navigation.navigate('GeneralSettings');
          }}>
          <UserIcon />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    navigation.navigate('Currency');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [defaultLanguage]);

  const handleDecimalLegal = (val) => {
    let currentNumber = +defaultLegalDecimal.split('_')[0] || EMPTY_NUMBER;
    if (val) {
      // add decimal
      currentNumber += 2;
      if (currentNumber <= 8) {
        SettingStore.update((s) => {
          s.defaultLegalDecimal = decimalLegalList[currentNumber / 2].value;
        });
        setDecimal(decimalLegalList[currentNumber / 2].value);
      }
    } else {
      // sub decimal
      currentNumber -= 2;
      if (currentNumber >= 0) {
        SettingStore.update((s) => {
          s.defaultLegalDecimal = decimalLegalList[currentNumber / 2].value;
        });
        setDecimal(decimalLegalList[currentNumber / 2].value);
      }
    }
  };

  const handleDecimalCrypto = (val) => {
    let currentNumber = +defaultCryptoDecimal.split('_')[0];
    if (val) {
      // add decimal
      currentNumber += 2;
      if (currentNumber <= 12) {
        SettingStore.update((s) => {
          s.defaultCryptoDecimal =
            decimalCryptoList[cryptoDict[currentNumber]].value;
        });
      }
    } else {
      // sub decimal
      currentNumber -= 2;
      if (currentNumber >= 2) {
        SettingStore.update((s) => {
          s.defaultCryptoDecimal =
            decimalCryptoList[cryptoDict[currentNumber]].value;
        });
      }
    }
  };

  return (
    <ScrollView style={GlobalStyle.container}>
      <View style={CardStyle.settingSubCard}>
        <Text style={TextStyle.settingSubText}>
          {I18n.t('lastUpdate')}{' '}
          {I18n.currentLocale() === 'en'
            ? moment(updatedDate * 1000)
                .format('HH:mm, DD MMM')
                .toString()
            : I18n.t(
                'monthlyAbbreviation.' +
                  moment(updatedDate * 1000)
                    .format('MMM')
                    .toString()
              ) +
              ' ' +
              moment(updatedDate * 1000)
                .format('DD')
                .toString() +
              '日, ' +
              moment(updatedDate * 1000)
                .format('HH:mm')
                .toString()}
        </Text>
      </View>
      <View style={CardStyle.settingCard}>
        <TouchableOpacity
          onPress={() => {
            setShowCurrencyValue(!showCurrencyValue);
          }}
          style={CardStyle.insideSettingCard}>
          <View style={CardStyle.settingMainLeftCard}>
            {showCurrencyValue ? <DownIcon /> : <RightIcon />}
            <Text style={TextStyle.settingText}>
              {I18n.t('defaultCurrency')}
            </Text>
          </View>
          <Text style={TextStyle.settingDropDownText}>{defaultNumber}</Text>
        </TouchableOpacity>
        {showCurrencyValue && (
          <View style={CardStyle.settingDropDownCard}>
            {defaultValueArr.map((item, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      SettingStore.update((s) => {
                        s.defaultNumber = item.key;
                      });
                      setCurrencyValue(item.key.toString());
                    }}
                    style={CardStyle.settingDropDownInsideCard}>
                    <Text
                      style={
                        +defaultNumber === item.key
                          ? TextStyle.selectedSettingDropDownText
                          : TextStyle.settingDropDownText
                      }>
                      {item.value}
                    </Text>
                    {+defaultNumber === item.key ? <CheckIcon /> : null}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            setShowDecimal(!showDecimal);
          }}
          style={CardStyle.insideSettingCard}>
          <View style={CardStyle.settingMainLeftCard}>
            {showDecimal ? <DownIcon /> : <RightIcon />}
            <Text style={TextStyle.settingText}>{I18n.t('decimalDigits')}</Text>
          </View>
        </TouchableOpacity>
        {showDecimal && (
          <View style={CardStyle.settingDropDownCard}>
            <Text style={TextStyle.decimalLeftText}>
              {I18n.t('legalTender')}
            </Text>
            <View style={CardStyle.settingDropDownInsideCard}>
              <View style={CardStyle.settingDropDownDecimalLeftCard}>
                <TouchableOpacity
                  onPress={() => {
                    handleDecimalLegal(false);
                  }}
                  style={ButtonStyle.settingBtn}>
                  <Text style={TextStyle.decimalLeftText}>-</Text>
                </TouchableOpacity>
                <Text style={TextStyle.decimalLeftText}>
                  {defaultLegalDecimal.split('_')[0]}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleDecimalLegal(true);
                  }}
                  style={ButtonStyle.settingBtn}>
                  <Text style={TextStyle.decimalLeftText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={TextStyle.decimalRightText}>
                {decimalLegalList[defaultLegalDecimal.split('_')[0] / 2].num}
              </Text>
            </View>
            <Text style={TextStyle.decimalLeftText}>{I18n.t('crypto')}</Text>
            <View style={CardStyle.settingDropDownInsideCard}>
              <View style={CardStyle.settingDropDownDecimalLeftCard}>
                <TouchableOpacity
                  onPress={() => {
                    handleDecimalCrypto(false);
                  }}
                  style={ButtonStyle.settingBtn}>
                  <Text style={TextStyle.decimalLeftText}>-</Text>
                </TouchableOpacity>
                <Text style={TextStyle.decimalLeftText}>
                  {defaultCryptoDecimal.split('_')[0]}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleDecimalCrypto(true);
                  }}
                  style={ButtonStyle.settingBtn}>
                  <Text style={TextStyle.decimalLeftText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={TextStyle.decimalRightText}>
                {
                  decimalCryptoList[
                    cryptoDict[defaultCryptoDecimal.split('_')[0]]
                  ].num
                }
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
