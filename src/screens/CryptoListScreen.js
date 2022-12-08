import React, { useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList, Platform } from 'react-native';
import { TextStyle } from '../styling/TextStyle';
import { CurrencyStore } from '../stores/CurrencyStore';
import { CardStyle } from '../styling/CardStyle';
import { ButtonStyle } from '../styling/ButtonStyle';
import { GlobalStyle } from '../styling/Global';
import { getMultiCrypto } from '../api/Crypto';
import { setCrypto } from '../stores/LocalStorage';
import { BackIcon } from '../components/Icon';
import I18n from 'react-native-i18n';

export default function CryptoListScreen(props) {
  const { navigation, route } = props;

  const [isCurrency, setIsCurrency] = useState(false);

  const cryptoCoinList = CurrencyStore.useState((s) => s.cryptoCoinArr);
  const selectedCryptoName = CurrencyStore.useState(
    (s) => s.selectedCryptoName
  );
  const cryptoCoinDict = CurrencyStore.useState((s) => s.cryptoCoinDict);

  const countryList = CurrencyStore.useState((s) => s.countryArr);
  const countryDict = CurrencyStore.useState((s) => s.countryDict);

  const [isLoading, setIsLoading] = useState(false);
  const [showCountryList] = useState(
    cryptoCoinList.filter((item) => {
      for (let i = 0; i < selectedCryptoName.length; i++) {
        if (selectedCryptoName[i] === item.code) {
          return false;
        }
      }
      return true;
    })
  );
  const [showCurrencyCountryList] = useState(
    countryList.filter((item) => {
      for (let i = 0; i < selectedCryptoName.length; i++) {
        if (selectedCryptoName[i] === item.code) {
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
        <Text style={TextStyle.mainText}>{I18n.t('cryptoList')}</Text>
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

  const renderCryptoList = (item, index) => {
    return (
      <TouchableOpacity
        style={CardStyle.currencyCard}
        onPress={async () => {
          setIsLoading(true);
          let selectedIndex = selectedCryptoName.indexOf(
            route.params.item.name
          );
          let temp = [...selectedCryptoName];
          temp.splice(selectedIndex, 1, item.item.code);
          CurrencyStore.update((s) => {
            s.selectedCryptoName = temp;
          });
          await setCrypto(temp).catch(console.error);
          let selectedCryptoArr = [];
          let cryptoDict = {};
          let i = 1;
          await getMultiCrypto(temp[0], temp.slice(1, 6)).then((data) => {
            selectedCryptoArr.push({
              id: i,
              name: Object.keys(data)[0],
              currency: cryptoCoinDict[Object.keys(data)[0]],
              amount: 1,
              isSelected: true,
            });
            i++;
            for (const res in data[Object.keys(data)[0]]) {
              selectedCryptoArr.push({
                id: i,
                name: res,
                currency: countryDict[res] || cryptoCoinDict[res],
                amount: data[Object.keys(data)[0]][res],
                isSelected: false,
              });
              i++;
            }
            CurrencyStore.update((s) => {
              s.selectedCrypto = selectedCryptoArr;
            });
          });
          selectedCryptoArr.forEach((cur) => {
            cryptoDict[cur.name] = {
              amount: 0,
              defaultAmount: cur.amount,
            };
          });
          CurrencyStore.update((s) => {
            s.cryptoDict = cryptoDict;
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

  const renderCountryList = (item, index) => {
    return (
      <TouchableOpacity
        style={CardStyle.currencyCard}
        onPress={async () => {
          setIsLoading(true);
          let selectedIndex = selectedCryptoName.indexOf(
            route.params.item.name
          );
          let temp = [...selectedCryptoName];
          temp.splice(selectedIndex, 1, item.item.code);
          CurrencyStore.update((s) => {
            s.selectedCryptoName = temp;
          });
          await setCrypto(temp).catch(console.error);
          let selectedCryptoArr = [];
          let cryptoDict = {};
          let i = 1;
          await getMultiCrypto(temp[0], temp.slice(1, 6)).then((data) => {
            selectedCryptoArr.push({
              id: i,
              name: Object.keys(data)[0],
              currency: cryptoCoinDict[Object.keys(data)[0]],
              amount: 1,
              isSelected: true,
            });
            i++;
            for (const res in data[Object.keys(data)[0]]) {
              selectedCryptoArr.push({
                id: i,
                name: res,
                currency: countryDict[res] || cryptoCoinDict[res],
                amount: data[Object.keys(data)[0]][res],
                isSelected: false,
              });
              i++;
            }
            CurrencyStore.update((s) => {
              s.selectedCrypto = selectedCryptoArr;
            });
          });
          selectedCryptoArr.forEach((cur) => {
            cryptoDict[cur.name] = {
              amount: 0,
              defaultAmount: cur.amount,
            };
          });
          CurrencyStore.update((s) => {
            s.cryptoDict = cryptoDict;
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

  const RenderSeparator = () => {
    return (
      <View style={CardStyle.titleListCard}>
        <TouchableOpacity
          style={ButtonStyle.listBtn}
          onPress={() => setIsCurrency(false)}>
          <Text style={[TextStyle.mainText, TextStyle.borderBottomText]}>
            {I18n.t('crypto')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ButtonStyle.listBtn}
          onPress={() => setIsCurrency(true)}>
          <Text style={[TextStyle.mainText, TextStyle.borderBottomText]}>
            {I18n.t('currency')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RenderFlat = () => {
    if (isCurrency) {
      return (
        <FlatList
          data={showCurrencyCountryList}
          renderItem={renderCountryList}
          initialNumToRender={1} // 首批渲染的元素数量
          windowSize={3} // 渲染区域高度
          removeClippedSubviews={Platform.OS === 'android'}
          maxToRenderPerBatch={10} // 增量渲染最大数量
          updateCellsBatchingPeriod={50} // 增量渲染时间间隔
        />
      );
    } else {
      return (
        <FlatList
          data={showCountryList}
          renderItem={renderCryptoList}
          initialNumToRender={1} // 首批渲染的元素数量
          windowSize={3} // 渲染区域高度
          removeClippedSubviews={Platform.OS === 'android'}
          maxToRenderPerBatch={10} // 增量渲染最大数量
          updateCellsBatchingPeriod={50} // 增量渲染时间间隔
        />
      );
    }
  };

  return (
    <View style={GlobalStyle.container}>
      {isLoading ? (
        <View style={CardStyle.loadingCard}>
          <Text style={TextStyle.mainText}>{I18n.t('loading')}</Text>
        </View>
      ) : (
        <>
          <RenderSeparator />
          <RenderFlat />
        </>
      )}
    </View>
  );
}
