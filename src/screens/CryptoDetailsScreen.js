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
import { CryptoChart } from '../components/Chart';
import { getCryptoDetails, getCryptoHistory } from '../api/Crypto';
import color from '../styling/Color';
import I18n from 'react-native-i18n';
import { useCallback } from 'react';

export default function CryptoDetailsScreen(props) {
  const { navigation } = props;

  const dateSelect = ['1W', '1M', '3M', '6M', '9M', '1Y'];

  const selectedCryptoArr = CurrencyStore.useState((s) => s.selectedCrypto);
  const cryptoDetails = CurrencyStore.useState((s) => s.cryptoDetails);

  const [selectedCrypto, setSelectedCrypto] = useState({});
  const [selectedDate, setSelectedDate] = useState(dateSelect[1]);
  const [tempSelectedCryptoArr, setTempSelectedCryptoArr] = useState([]);
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
        <Text style={TextStyle.mainText}>{cryptoDetails.name}</Text>
      ),
      //   headerRight: () => <View>{/* <Text>asd</Text> */}</View>,
    });
  }, [navigation]);

  useEffect(() => {
    // to remove the selected currency and display other currencies
    // search for the selected currency in the array
    const tempArr = selectedCryptoArr.filter((item) => {
      return item.name !== cryptoDetails.name;
    });
    setTempSelectedCryptoArr(tempArr);
    setSelectedCrypto(tempArr[0]);
  }, []);

  useEffect(() => {
    // to display the selected currency
    changeCurrency(selectedCrypto.name);
  }, [selectedCrypto, selectedDate]);

  const changeCurrency = async (to) => {
    setIsLoading(true);
    setIsDisconnected(false);
    await getCryptoDetails(cryptoDetails.name, to)
      .then(async (data) => {
        setSelectedData({
          toCurrency: to,
          currency: data[to],
        });
        setIsDisconnected(false);
        await changeHistory(selectedCrypto.name).finally(() => {
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
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
    await getCryptoHistory(cryptoDetails.name, selectedCrypto.name, reduceDate)
      .then((data) => {
        setSelectedDataHistory(data);
        let tempHi = 0;
        let tempLo = 10000000;
        data.forEach((item) => {
          if (item.close > tempHi) {
            tempHi = item.close;
          }
          if (item.close < tempLo) {
            tempLo = item.close;
          }
        });
        setHighest(tempHi);
        setLowest(tempLo);
        setIsDisconnected(false);
      })
      .catch((err) => {
        console.log(err);
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
        {tempSelectedCryptoArr.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCrypto(item);
            }}
            key={index}
            style={
              selectedCrypto.name === item.name
                ? CardStyle.selectedHorizontalScrollCard
                : CardStyle.horizontalScrollCard
            }>
            <Text style={TextStyle.mainText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }, [selectedCrypto]);

  return (
    <View style={GlobalStyle.container}>
      <View>
        <RenderCurrency />
      </View>
      <View style={CardStyle.currencyCard}>
        <Text style={TextStyle.currencyText}>
          1 {cryptoDetails.name} = {selectedData.currency} {selectedCrypto.name}
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
          <ActivityIndicator size="large" color={color.gradientFromSwipeable} />
        ) : (
          <>
            <CryptoChart
              objData={selectedDataHistory}
              to={selectedCrypto.name}
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
