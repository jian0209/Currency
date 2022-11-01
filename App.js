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
  getCrypto,
} from './src/stores/LocalStorage';
import { getCountryList, getMultiCurrency } from './src/api/Currency';
import { getCryptoList, getMultiCrypto } from './src/api/Crypto';
import { getBannerList } from './src/api/Banner';
import { SettingStore } from './src/stores/SettingStorage';
import color from './src/styling/Color';
import {
  DEFAULT_NUMBER,
  DEFAULT_DECIMAL,
  DEFAULT_SCREEN,
  DEFAULT_SELECTED_CURRENCY,
  DEFAULT_SELECTED_CRYPTO,
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
      await getBannerList();
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
      let selectedCryptoName;
      await getCrypto().then((item) => {
        selectedCryptoName = item || DEFAULT_SELECTED_CRYPTO;
        CurrencyStore.update((s) => {
          s.selectedCryptoName = item || DEFAULT_SELECTED_CRYPTO;
        });
      });
      setProgress(25);
      // init country list
      let countryList = [];
      let countryDict = {};
      let cryptoCoinList = [];
      let cryptoCoinDict = {};
      await getCryptoList().then((data) => {
        // console.log(data);
        data.forEach((item) => {
          cryptoCoinList.push({
            code: item.CoinInfo.Name,
            country: item.CoinInfo.FullName,
          });
          cryptoCoinList.sort((a, b) => {
            if (a.country < b.country) {
              return -1;
            }
            if (a.country > b.country) {
              return 1;
            }
            return 0;
          });
          cryptoCoinDict[item.CoinInfo.Name] = item.CoinInfo.FullName;
        });
        CurrencyStore.update((s) => {
          s.cryptoCoinArr = cryptoCoinList;
          s.cryptoCoinDict = cryptoCoinDict;
        });
      });
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
      // init selected crypto
      let selectedCryptoArr = [];
      let cryptoDict = {};
      let j = 1;
      await getMultiCrypto(
        selectedCryptoName[0],
        selectedCryptoName.slice(1, 6)
      ).then((data) => {
        selectedCryptoArr.push({
          id: j,
          name: Object.keys(data)[0],
          currency: cryptoCoinDict[Object.keys(data)[0]],
          amount: 1,
          isSelected: true,
        });
        j++;
        for (const res in data[Object.keys(data)[0]]) {
          selectedCryptoArr.push({
            id: j,
            name: res,
            currency: cryptoCoinDict[res] || countryDict[res],
            amount: data[Object.keys(data)[0]][res],
            isSelected: false,
          });
          j++;
        }
        CurrencyStore.update((s) => {
          s.selectedCrypto = selectedCryptoArr;
        });
      });
      selectedCryptoArr.forEach((item) => {
        cryptoDict[item.name] = { amount: 0, defaultAmount: item.amount };
      });
      CurrencyStore.update((s) => {
        s.cryptoDict = cryptoDict;
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
