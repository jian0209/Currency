/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyle } from '../styling/Global';
import { TextStyle } from '../styling/TextStyle';
import { ButtonStyle } from '../styling/ButtonStyle';
import { BackIcon } from '../components/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import { CurrencyStore } from '../stores/CurrencyStore';
import { CardStyle } from '../styling/CardStyle';

export default function GeneralSettingsScreen(props) {
  const { navigation, route } = props;

  const selectedCurrencyArr = CurrencyStore.useState((s) => s.selectedCurrency);

  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [tempSelectedCurrencyArr, setTempSelectedCurrencyArr] = useState([]);

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
        <Text style={TextStyle.mainText}>{route.params.item.name}</Text>
      ),
      //   headerRight: () => <View>{/* <Text>asd</Text> */}</View>,
    });
  }, [navigation]);

  useEffect(() => {
    let tempArr = [...selectedCurrencyArr];
    tempArr.forEach((item, index) => {
      if (item.name === route.params.item.name) {
        tempArr.splice(index, 1);
      }
    });
    setTempSelectedCurrencyArr(tempArr);
    setSelectedCurrency(tempArr[0]);
  }, []);

  return (
    <View style={GlobalStyle.container}>
      <View>
        <ScrollView horizontal={true}>
          {tempSelectedCurrencyArr.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCurrency(item);
              }}
              key={index}
              style={
                selectedCurrency.name === item.name
                  ? CardStyle.selectedHorizontalScrollCard
                  : CardStyle.horizontalScrollCard
              }>
              <Text style={TextStyle.mainText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
