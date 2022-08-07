/* eslint-disable react-native/no-inline-styles */
import React, { useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList, Platform } from 'react-native';
import { TextStyle } from '../styling/TextStyle';
import { CurrencyStore } from '../stores/CurrencyStore';
import { CardStyle } from '../styling/CardStyle';
import { ButtonStyle } from '../styling/ButtonStyle';
import { GlobalStyle, height } from '../styling/Global';
import { getMultiCurrency } from '../api/Currency';
import { setCurrency } from '../stores/LocalStorage';
import { BackIcon } from '../components/Icon';
import I18n from 'react-native-i18n';

export default function CurrencyListScreen(props) {
  const { navigation, route } = props;

  const countryList = CurrencyStore.useState((s) => s.countryArr);
  const selectedCurrencyName = CurrencyStore.useState(
    (s) => s.selectedCurrencyName
  );
  const countryDict = CurrencyStore.useState((s) => s.countryDict);

  const [isLoading, setIsLoading] = useState(false);
  const [showCountryList] = useState(
    countryList.filter((item) => {
      for (let i = 0; i < selectedCurrencyName.length; i++) {
        if (selectedCurrencyName[i] === item.code) {
          return false;
        }
      }
      return true;
    })
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={ButtonStyle.headerLeftBtn}
          disabled={isLoading}
          onPress={() => {
            navigation.goBack();
          }}>
          <BackIcon />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text style={TextStyle.mainText}>{I18n.t('currencyList')}</Text>
      ),
      //   headerRight: () => (
      //     <TouchableOpacity
      //       onPress={() => {
      //         navigation.navigate('CurrencySettings');
      //       }}>
      //       <Text style={TextStyle.currencyText}>Go To Settings</Text>
      //     </TouchableOpacity>
      //   ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const renderCountryList = (item, index) => {
    return (
      <TouchableOpacity
        style={CardStyle.currencyCard}
        onPress={async () => {
          setIsLoading(true);
          let selectedIndex = selectedCurrencyName.indexOf(
            route.params.item.name
          );
          let temp = [...selectedCurrencyName];
          temp.splice(selectedIndex, 1, item.item.code);
          CurrencyStore.update((s) => {
            s.selectedCurrencyName = temp;
          });
          await setCurrency(temp).catch(console.error);
          let selectedCurrencyArr = [];
          let currencyDict = {};
          let i = 1;
          await getMultiCurrency(temp[0], temp.slice(1, 6)).then((data) => {
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
          selectedCurrencyArr.forEach((cur) => {
            currencyDict[cur.name] = {
              amount: 0,
              defaultAmount: cur.amount,
            };
          });
          CurrencyStore.update((s) => {
            s.currencyDict = currencyDict;
          });
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          setIsLoading(false);
          navigation.goBack();
        }}
        key={index}>
        <Text style={TextStyle.mainText}>{item.item.country}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={GlobalStyle.container}>
      {isLoading ? (
        <View
          style={{
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={TextStyle.mainText}>{I18n.t('loading')}</Text>
        </View>
      ) : (
        <FlatList
          data={showCountryList}
          renderItem={renderCountryList}
          initialNumToRender={1} // 首批渲染的元素数量
          windowSize={3} // 渲染区域高度
          removeClippedSubviews={Platform.OS === 'android'}
          maxToRenderPerBatch={10} // 增量渲染最大数量
          updateCellsBatchingPeriod={50} // 增量渲染时间间隔
        />
      )}
    </View>
  );
}
