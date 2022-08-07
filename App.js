import * as React from 'react';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
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
  DEFAUKT_NUMBER,
  DEFAULT_DECIMAL,
  DEFAULT_SCREEN,
  DEFAULT_SELECTED_CURRENCY,
} from './src/utils/constant';
import I18n from './src/language/i18n';
import { width } from './src/styling/Global';
import RNLanguages from 'react-native-languages';

const App = () => {
  const language = SettingStore.useState((s) => s.language);
  const [isLoading, setIsLoading] = useState(false);

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
          s.defaultNumber = item || DEFAUKT_NUMBER;
        });
      });

      // init selected currency
      let selectedCurrencyName;
      await getCurrency().then((item) => {
        selectedCurrencyName = item || DEFAULT_SELECTED_CURRENCY;
        CurrencyStore.update((s) => {
          s.selectedCurrencyName = item || DEFAULT_SELECTED_CURRENCY;
        });
      });

      // init country list
      let countryList = [];
      let countryDict = {};
      await getCountryList().then((data) => {
        for (const key in data) {
          countryList.push({
            code: key,
            country: data[key],
          });
        }

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

      // init selected currency
      let selectedCurrencyArr = [];
      let currencyDict = {};
      let i = 1;
      await getMultiCurrency(
        selectedCurrencyName[0],
        selectedCurrencyName.slice(1, 6)
      ).then((data) => {
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
    };
    initData()
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isLoading ? (
    <Spinner
      overlayColor={color.primary}
      visible={true}
      customIndicator={
        <Image
          style={{ width: width * 0.5, height: width * 0.5 }}
          source={require('./src/assets/icon.png')}
        />
      }
    />
  ) : (
    <Navigator />
  );
};
export default App;
