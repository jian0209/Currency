import * as React from 'react';
import { useEffect, useState } from 'react';
import { Image, View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Navigator from './src/router/Navigator';
import { CurrencyStore } from './src/stores/CurrencyStore';
import {
  getCryptoDecimal,
  getCurrency,
  getCurrencyValue,
  getDecimal,
  getFirstScreen,
  getLanguage,
} from './src/stores/LocalStorage';
import { getCountryList, getMultiCurrency } from './src/api/Currency';
import { SettingStore } from './src/stores/SettingStorage';
import color from './src/styling/Color';
import {
  DEFAULT_NUMBER,
  DEFAULT_DECIMAL,
  DEFAULT_SCREEN,
  DEFAULT_SELECTED_CURRENCY,
} from './src/utils/constant';
import I18n from './src/language/i18n';
import { GlobalStyle, width } from './src/styling/Global';
import RNLanguages from 'react-native-languages';
import { TextStyle } from './src/styling/TextStyle';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNetworkLoading, setIsNetworkLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // init settings
  useEffect(() => {
    setIsLoading(true);
    const initData = async () => {
      // init settings
      await getDecimal().then((item) => {
        SettingStore.update((s) => {
          s.defaultLegalDecimal = item || DEFAULT_DECIMAL;
        });
      });
      await getCryptoDecimal().then((item) => {
        SettingStore.update((s) => {
          s.defaultCryptoDecimal = item || DEFAULT_DECIMAL;
        });
      });
      await getLanguage().then((item) => {
        const languageDict = { 'zh-TW': 2, 'zh-CN': 1, en: 0 };
        const userLanguage = languageDict[RNLanguages.language]
          ? languageDict[RNLanguages.language]
          : 0;
        SettingStore.update((s) => {
          s.language = item || userLanguage;
        });
        if (!item) {
          if (+userLanguage === 2) {
            I18n.locale = 'zh_tw';
          } else if (+userLanguage === 1) {
            I18n.locale = 'zh_cn';
          } else {
            I18n.locale = 'en';
          }
        } else {
          if (+item === 2) {
            I18n.locale = 'zh_tw';
          } else if (+item === 1) {
            I18n.locale = 'zh_cn';
          } else {
            I18n.locale = 'en';
          }
        }
      });
      await getFirstScreen().then((item) => {
        SettingStore.update((s) => {
          s.defaultScreen = item || DEFAULT_SCREEN;
        });
      });
      await getCurrencyValue().then((item) => {
        SettingStore.update((s) => {
          s.defaultNumber = item || DEFAULT_NUMBER;
        });
      });
      setTimeout(() => {
        setIsNetworkLoading(true);
      }, 1000);
      setProgress(5);

      // init selected currency
      let selectedCurrencyName;
      await getCurrency().then((item) => {
        selectedCurrencyName = item || DEFAULT_SELECTED_CURRENCY;
        CurrencyStore.update((s) => {
          s.selectedCurrencyName = item || DEFAULT_SELECTED_CURRENCY;
        });
      });
      setProgress(25);
      // init country list
      let countryList = [];
      let countryDict = {};
      await getCountryList().then((data) => {
        setProgress(30);
        for (const key in data) {
          countryList.push({
            code: key,
            country: data[key],
          });
        }
        setProgress(45);
        countryList.sort((a, b) => {
          if (a.country < b.country) {
            return -1;
          }
          if (a.country > b.country) {
            return 1;
          }
          return 0;
        });
        countryDict = data;
        CurrencyStore.update((s) => {
          s.countryArr = countryList;
          s.countryDict = data;
        });
      });
      setProgress(57);
      // init selected currency
      let selectedCurrencyArr = [];
      let currencyDict = {};
      let i = 1;
      await getMultiCurrency(
        selectedCurrencyName[0],
        selectedCurrencyName.slice(1, 6)
      ).then((data) => {
        setProgress(75);
        selectedCurrencyArr.push({
          id: i,
          name: data.base,
          currency: countryDict[data.base],
          amount: 1,
          isSelected: true,
        });
        i++;
        for (const res in data.rates) {
          selectedCurrencyArr.push({
            id: i,
            name: res,
            currency: countryDict[res],
            amount: data.rates[res],
            isSelected: false,
          });
          i++;
        }
        setProgress(90);
        CurrencyStore.update((s) => {
          s.selectedCurrency = selectedCurrencyArr;
        });
      });
      selectedCurrencyArr.forEach((item) => {
        currencyDict[item.name] = { amount: 0, defaultAmount: item.amount };
      });
      CurrencyStore.update((s) => {
        s.currencyDict = currencyDict;
      });
      setProgress(100);
    };
    initData()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setTimeout(() => {
          setIsNetworkLoading(false);
        }, 3000);
      });
  }, []);
  return isLoading ? (
    isNetworkLoading ? (
      <View style={[GlobalStyle.container, GlobalStyle.centerCont]}>
        <ProgressBarAnimated
          width={width * 0.8}
          value={progress}
          maxValue={100}
          backgroundColor={color.red}
          backgroundColorOnComplete={color.green}
        />
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Text style={[TextStyle.mainText, { marginTop: 29 }]}>
          {I18n.t('loading')}
        </Text>
      </View>
    ) : (
      <Spinner
        overlayColor={color.primary}
        visible={true}
        animation={'fade'}
        customIndicator={
          <Image
            style={{ width: width * 0.5, height: width * 0.5 }}
            source={require('./src/assets/icon.png')}
          />
        }
      />
    )
  ) : (
    <Navigator />
  );
};
export default App;
