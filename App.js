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

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  // init settings
  useEffect(() => {
    setIsLoading(true);
    const initData = async () => {
      // init settings
      await getDecimal().then((item) => {
        SettingStore.update((s) => {
          s.defaultLegalDecimal = item || '4_BITS';
        });
      });
      await getCryptoDecimal().then((item) => {
        SettingStore.update((s) => {
          s.defaultCryptoDecimal = item || '4_BITS';
        });
      });
      await getLanguage().then((item) => {
        SettingStore.update((s) => {
          s.language = item || 'en';
        });
      });
      await getFirstScreen().then((item) => {
        SettingStore.update((s) => {
          s.defaultScreen = item || 'home';
        });
      });
      await getCurrencyValue().then((item) => {
        console.log(item);
        SettingStore.update((s) => {
          s.defaultNumber = item || 100;
        });
      });

      // init selected currency
      let selectedCurrencyName;
      await getCurrency().then((item) => {
        selectedCurrencyName = item;
        CurrencyStore.update((s) => {
          s.selectedCurrencyName = item || [
            'USD',
            'EUR',
            'JPY',
            'GBP',
            'SGD',
            'CAD',
          ];
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
        for (const res in data.results) {
          selectedCurrencyArr.push({
            id: i,
            name: res,
            currency: countryDict[res],
            amount: data.results[res],
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
  }, []);
  return isLoading ? (
    <Spinner
      overlayColor={color.primary}
      visible={true}
      customIndicator={<Image source={require('./src/assets/tempIcon.png')} />}
    />
  ) : (
    <Navigator />
  );
};
export default App;
