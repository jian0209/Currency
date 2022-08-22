/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { GlobalStyle } from '../styling/Global';
import { TextStyle } from '../styling/TextStyle';
import { ButtonStyle } from '../styling/ButtonStyle';
import { BackIcon } from '../components/Icon';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { CurrencyStore } from '../stores/CurrencyStore';
import { CardStyle } from '../styling/CardStyle';
import Chart from '../components/Chart';
import { getCurrencyDetails, getCurrencyHistory } from '../api/Currency';
import color from '../styling/Color';
import moment from 'moment';
import I18n from 'react-native-i18n';
import { useCallback } from 'react';

export default function GeneralSettingsScreen(props) {
  const { navigation } = props;

  const dateSelect = ['1W', '1M', '3M', '6M', '9M', '1Y'];

  const selectedCurrencyArr = CurrencyStore.useState((s) => s.selectedCurrency);
  const currencyDetails = CurrencyStore.useState((s) => s.currencyDetails);

  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [selectedDate, setSelectedDate] = useState(dateSelect[1]);
  const [tempSelectedCurrencyArr, setTempSelectedCurrencyArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [selectedDataHistory, setSelectedDataHistory] = useState({});
  const [highest, setHighest] = useState(0);
  const [lowest, setLowest] = useState(0);
  const [isDisconnected, setIsDisconnected] = useState(false);

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
        <Text style={TextStyle.mainText}>{currencyDetails.name}</Text>
      ),
      //   headerRight: () => <View>{/* <Text>asd</Text> */}</View>,
    });
  }, [navigation]);

  useEffect(() => {
    // to remove the selected currency and display other currencies
    // search for the selected currency in the array
    const tempArr = selectedCurrencyArr.filter((item) => {
      return item.name !== currencyDetails.name;
    });
    setTempSelectedCurrencyArr(tempArr);
    setSelectedCurrency(tempArr[0]);
  }, []);

  useEffect(() => {
    // to display the selected currency
    changeCurrency(selectedCurrency.name);
  }, [selectedCurrency, selectedDate]);

  const changeCurrency = async (to) => {
    setIsLoading(true);
    setIsDisconnected(false);
    await getCurrencyDetails(currencyDetails.name, to)
      .then(async (data) => {
        setSelectedData({
          toCurrency: to,
          currency: data.rates[to],
        });
        setIsDisconnected(false);
        await changeHistory(selectedCurrency.name).finally(() => {
          setIsLoading(false);
        });
      })
      .catch((err) => {
        setIsDisconnected(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      });
  };

  const changeHistory = async () => {
    setIsLoading(true);
    let reduceDate = 0;
    switch (selectedDate) {
      case '1W':
        reduceDate = 7;
        break;
      case '1M':
        reduceDate = 30;
        break;
      case '3M':
        reduceDate = 90;
        break;
      case '6M':
        reduceDate = 180;
        break;
      case '9M':
        reduceDate = 270;
        break;
      case '1Y':
        reduceDate = 365;
        break;
      default:
        break;
    }
    let dateStart = moment().subtract(reduceDate, 'days').format('YYYY-MM-DD');
    let dateEnd = moment().format('YYYY-MM-DD');
    await getCurrencyHistory(
      currencyDetails.name,
      selectedCurrency.name,
      dateStart,
      dateEnd
    )
      .then((data) => {
        setSelectedDataHistory(data);
        let tempHi = 0;
        let tempLo = 10000000;
        Object.keys(data.rates).forEach((key) => {
          if (data.rates[key][selectedCurrency.name] > tempHi) {
            tempHi = data.rates[key][selectedCurrency.name];
          }
          if (data.rates[key][selectedCurrency.name] < tempLo) {
            tempLo = data.rates[key][selectedCurrency.name];
          }
        });
        setHighest(tempHi);
        setLowest(tempLo);
        setIsDisconnected(false);
      })
      .catch((err) => {
        setIsDisconnected(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderDate = useCallback(
    (item, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setSelectedDate(item.item);
          }}
          style={
            selectedDate === item.item
              ? CardStyle.selectedHorizontalDateScrollCard
              : CardStyle.horizontalDateScrollCard
          }>
          <Text style={TextStyle.currencyText}>{item.item}</Text>
        </TouchableOpacity>
      );
    },
    [selectedDate]
  );

  const RenderCurrency = useCallback(() => {
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
    );
  }, [selectedCurrency]);

  return (
    <View style={GlobalStyle.container}>
      <View>
        <RenderCurrency />
      </View>
      <View style={CardStyle.currencyCard}>
        <Text style={TextStyle.currencyText}>
          1 {currencyDetails.name} = {selectedData.currency}{' '}
          {selectedCurrency.name}
        </Text>
      </View>

      <View style={CardStyle.currencyCard}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          horizontal={true}
          data={dateSelect}
          renderItem={renderDate}
        />
      </View>
      <View style={[CardStyle.currencyCard, { flexDirection: 'column' }]}>
        {isDisconnected ? (
          <Text style={TextStyle.currencyText}>{I18n.t('disconnect')}</Text>
        ) : isLoading ? (
          <ActivityIndicator size="large" color={color.gradiantFromSwipeable} />
        ) : (
          <>
            <Chart
              objData={selectedDataHistory}
              to={selectedCurrency.name}
              maxValue={highest}
              minValue={lowest}
            />
            <View style={GlobalStyle.spaceBetween}>
              <View style={GlobalStyle.row}>
                <Text style={[TextStyle.currencyText, { marginRight: 10 }]}>
                  H
                </Text>
                <Text style={TextStyle.currencyText}>{highest}</Text>
              </View>
              <View style={GlobalStyle.row}>
                <Text style={[TextStyle.currencyText, { marginRight: 10 }]}>
                  L
                </Text>
                <Text style={TextStyle.currencyText}>{lowest}</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
