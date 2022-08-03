/* eslint-disable react-native/no-inline-styles */
import React, { useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextStyle } from '../styling/TextStyle';
import { CurrencyStore } from '../stores/CurrencyStore';
import { CardStyle } from '../styling/CardStyle';
import { ButtonStyle } from '../styling/ButtonStyle';
import { GlobalStyle } from '../styling/Global';
import { ScrollView } from 'react-native-gesture-handler';
import { getMultiCurrency } from '../api/Currency';
import Spinner from 'react-native-loading-spinner-overlay';
import color from '../styling/Color';
import { setCurrency } from '../stores/LocalStorage';
import { BackIcon } from '../components/Icon';

export default function CurrencyListScreen(props) {
  const { navigation, route } = props;

  const countryList = CurrencyStore.useState((s) => s.countryArr);
  const selectedCurrencyName = CurrencyStore.useState(
    (s) => s.selectedCurrencyName
  );
  const countryDict = CurrencyStore.useState((s) => s.countryDict);

  const [isLoading, setIsLoading] = useState(false);

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
      headerTitle: () => <Text style={TextStyle.mainText}>Currency List</Text>,
      //   headerRight: () => (
      //     <TouchableOpacity
      //       onPress={() => {
      //         navigation.navigate('CurrencySettings');
      //       }}>
      //       <Text style={TextStyle.currencyText}>Go To Settings</Text>
      //     </TouchableOpacity>
      //   ),
    });
  }, [navigation]);

  return (
    <ScrollView style={GlobalStyle.container}>
      {countryList.map((item, index) => {
        return (
          <TouchableOpacity
            style={CardStyle.currencyCard}
            onPress={async () => {
              setIsLoading(true);
              let selectedIndex = selectedCurrencyName.indexOf(
                route.params.item.name
              );
              let temp = [...selectedCurrencyName];
              temp.splice(selectedIndex, 1, item.code);
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
              selectedCurrencyArr.forEach((cur) => {
                currencyDict[cur.name] = {
                  amount: 0,
                  defaultAmount: cur.amount,
                };
              });
              CurrencyStore.update((s) => {
                s.currencyDict = currencyDict;
              });
              setIsLoading(false);
              navigation.goBack();
            }}
            key={index}>
            {isLoading ? (
              <Spinner
                overlayColor={color.primary}
                visible={true}
                textContent={'Loading...'}
                textStyle={TextStyle.mainText}
              />
            ) : null}
            <Text style={TextStyle.mainText}>{item.country}</Text>
          </TouchableOpacity>
        );
      })}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}
