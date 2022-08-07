/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyle } from '../styling/Global';
import { TextStyle } from '../styling/TextStyle';
import { ButtonStyle } from '../styling/ButtonStyle';
import { BackIcon } from '../components/Icon';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { CurrencyStore } from '../stores/CurrencyStore';
import { CardStyle } from '../styling/CardStyle';
import Chart from '../components/Chart';
import { getCurrencyDetails, getCurrencyHistory } from '../api/Currency';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import color from '../styling/Color';
import I18n from 'react-native-i18n';
import moment from 'moment';

export default function GeneralSettingsScreen(props) {
  const { navigation, route } = props;

  const dateSelect = ['1W', '1M', '3M', '6M', '9M', '1Y'];

  const selectedCurrencyArr = CurrencyStore.useState((s) => s.selectedCurrency);

  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [selectedDate, setSelectedDate] = useState(dateSelect[1]);
  const [tempSelectedCurrencyArr, setTempSelectedCurrencyArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [spacing, setSpacing] = useState(13);
  const [selectedData, setSelectedData] = useState({});
  const [selectedDataHistory, setSelectedDataHistory] = useState({});
  const [highest, setHighest] = useState(0);
  const [lowest, setLowest] = useState(0);

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
        <Text style={TextStyle.mainText}>{route.params.item.item.name}</Text>
      ),
      //   headerRight: () => <View>{/* <Text>asd</Text> */}</View>,
    });
  }, [navigation]);

  useEffect(() => {
    // to remove the selected currency and display other currencies
    let tempArr = [...selectedCurrencyArr];
    tempArr.forEach((item, index) => {
      if (item.name === route.params.item.item.name) {
        tempArr.splice(index, 1);
      }
    });
    setTempSelectedCurrencyArr(tempArr);
    setSelectedCurrency(tempArr[0]);
  }, []);

  useEffect(() => {
    // to display the selected currency
    changeCurrency(selectedCurrency.name);
  }, [selectedCurrency]);

  useEffect(() => {
    changeHistory();
    switch (selectedDate) {
      case '1W':
        setSpacing(45);
        break;
      default:
        setSpacing(15);
        break;
    }
  }, [selectedDate]);

  const changeCurrency = async (to) => {
    setIsLoading(true);
    await getCurrencyDetails(route.params.item.item.name, to)
      .then(async (data) => {
        setSelectedData({
          toCurrency: to,
          currency: data.rates[to],
        });
        await changeHistory(selectedCurrency.name).finally(() => {
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.error(err);
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
      route.params.item.item.name,
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
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderDate = (item, index) => {
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
  };

  return (
    <View style={GlobalStyle.container}>
      <View>
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
      </View>
      <View style={CardStyle.currencyCard}>
        <Text style={TextStyle.currencyText}>
          1 {route.params.item.item.name} = {selectedData.currency}{' '}
          {selectedCurrency.name}
        </Text>
      </View>
      <View style={CardStyle.currencyCard}>
        <FlatList
          scrollEnabled={false}
          horizontal={true}
          data={dateSelect}
          renderItem={renderDate}
        />
      </View>
      {isLoading ? (
        <Spinner
          overlayColor={color.primary}
          visible={true}
          customIndicator={
            <Text style={TextStyle.mainText}>{I18n.t('loading')}</Text>
          }
        />
      ) : (
        <View style={[CardStyle.currencyCard, { flexDirection: 'column' }]}>
          <Chart
            spacing={spacing}
            objData={selectedDataHistory}
            to={selectedCurrency.name}
            maxValue={highest}
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
        </View>
      )}
    </View>
  );
}
