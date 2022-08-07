/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Pressable,
  FlatList,
  Platform,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LinearGradient from 'react-native-linear-gradient';
import Calculator from '../components/Calculator';
import color from '../styling/Color';
import { TextStyle } from '../styling/TextStyle';
import { CurrencyStore } from '../stores/CurrencyStore';
import { CardStyle } from '../styling/CardStyle';
import { GlobalStyle } from '../styling/Global';
import { getMultiCurrency } from '../api/Currency';
import { SettingStore } from '../stores/SettingStorage';
import { ArrowSwitchIcon, SettingIcon, RingIcon } from '../components/Icon';
import { ButtonStyle } from '../styling/ButtonStyle';
import { EMPTY_STRING } from '../utils/constant';
import I18n from 'react-native-i18n';

export default function CurrencyScreen(props) {
  const { navigation } = props;

  const currencyDict = CurrencyStore.useState((s) => s.currencyDict);
  const selectedCurrency = CurrencyStore.useState((s) => s.selectedCurrency);
  const defaultNumber = SettingStore.useState((s) => s.defaultNumber);
  const defaultLegalDecimal = SettingStore.useState(
    (s) => s.defaultLegalDecimal
  );

  const [total, setTotal] = useState(0);
  const [newNumber, setNewNumber] = useState(0);
  const [oldNumber, setOldNumber] = useState(0);
  const [symbol, setSymbol] = useState('');
  const [isSelected, setIsSelected] = useState(selectedCurrency[0].name);

  const MemoCalculator = React.memo(function CalculatorFunc() {
    return (
      <Calculator
        total={total}
        setTotal={(val) => {
          CurrencyStore.update((s) => {
            s.currencyDict[isSelected].amount = +val;
          });
          setTotal(val);
        }}
        newNumber={newNumber}
        setNewNumber={(val) => {
          CurrencyStore.update((s) => {
            s.currencyDict[isSelected].amount = +val;
          });
          setNewNumber(val);
        }}
        oldNumber={oldNumber}
        setOldNumber={(val) => {
          if (val) {
            CurrencyStore.update((s) => {
              s.currencyDict[isSelected].amount = +val;
            });
          }
          setOldNumber(val);
        }}
        symbol={symbol}
        setSymbol={(val) => {
          setSymbol(val);
        }}
      />
    );
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        // <TouchableOpacity
        //   style={ButtonStyle.headerLeftBtn}
        //   onPress={() => {
        //     navigation.navigate('Home');
        //   }}>
        //   <BackIcon />
        // </TouchableOpacity>
        <View />
      ),
      headerTitle: () => (
        <Text style={TextStyle.mainText}>{I18n.t('currency')}</Text>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={ButtonStyle.headerRightBtn}
          onPress={() => {
            navigation.navigate('CurrencySettings');
          }}>
          <SettingIcon />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    let tempTo = [];
    selectedCurrency.forEach((item, index) => {
      if (item.name !== isSelected) {
        tempTo.push(item.name);
      }
    });
    changeCurrency(isSelected, tempTo);
  }, [isSelected, defaultNumber]);

  useEffect(() => {
    let tempDict = { ...currencyDict };
    for (const key in tempDict) {
      if (key !== isSelected) {
        if (tempDict[isSelected].amount === 0) {
          tempDict[key] = {
            amount: tempDict[key].defaultAmount * defaultNumber,
            defaultAmount: tempDict[key].defaultAmount,
          };
        } else {
          tempDict[key] = {
            amount: tempDict[key].defaultAmount * defaultNumber,
            defaultAmount: tempDict[key].defaultAmount,
          };
        }
      }
    }
    if (total !== 0) {
      // use total number to convert currency
      for (const res in tempDict) {
        if (res !== isSelected) {
          tempDict[res] = {
            amount: total * tempDict[res].defaultAmount,
            defaultAmount: tempDict[res].defaultAmount,
          };
        }
      }
    } else if (newNumber !== 0) {
      // use new number to convert currency
      for (const res in tempDict) {
        if (res !== isSelected) {
          tempDict[res] = {
            amount: newNumber * tempDict[res].defaultAmount,
            defaultAmount: tempDict[res].defaultAmount,
          };
        }
      }
    } else if (oldNumber !== 0) {
      // use old number to convert currency
      for (const res in tempDict) {
        if (res !== isSelected) {
          tempDict[res] = {
            amount: oldNumber * tempDict[res].defaultAmount,
            defaultAmount: tempDict[res].defaultAmount,
          };
        }
      }
    }
    CurrencyStore.update((s) => {
      s.currencyDict = tempDict;
    });
  }, [total, newNumber]);

  const changeCurrency = async (base, to) => {
    await getMultiCurrency(base, to).then((data) => {
      let tempDict = { ...currencyDict };
      tempDict[data.base] = { amount: 0, defaultAmount: defaultNumber };
      for (const res in data.rates) {
        tempDict[res] = {
          amount: data.rates[res] * defaultNumber,
          defaultAmount: data.rates[res],
        };
      }
      CurrencyStore.update((s) => {
        s.currencyDict = tempDict;
      });
    });
  };

  const showChangeCurrency = (progress, dragX) => {
    return (
      <LinearGradient
        style={GlobalStyle.swipeableLeftCont}
        colors={[color.gradiantFromSwipeable, color.gradiantToSwipeable]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}>
        <Text style={TextStyle.swipeableLeftText}>
          {I18n.t('switchCurrency')}
        </Text>
        <ArrowSwitchIcon />
      </LinearGradient>
    );
  };

  const showRateDetails = (progress, dragX) => {
    return (
      <LinearGradient
        style={GlobalStyle.swipeableRightCont}
        colors={[color.gradiantFromSwipeable, color.gradiantToSwipeable]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}>
        <RingIcon />
        <Text style={TextStyle.swipeableRightText}>
          {I18n.t('rateDetails')}
        </Text>
      </LinearGradient>
    );
  };

  const renderSelectedCurrency = (item, index) => {
    return (
      <Swipeable
        key={item.item.id}
        ref={(ref) => (index = ref)}
        renderLeftActions={showChangeCurrency}
        renderRightActions={showRateDetails}
        onSwipeableOpen={() => {
          index.close();
        }}
        onSwipeableLeftWillOpen={() => {
          navigation.navigate('CurrencyList', { item: item.item });
          if (item.item.name === isSelected && item.item.id === 1) {
            setIsSelected(selectedCurrency[+item.item.id].name);
          } else if (item.item.name === isSelected) {
            setIsSelected(selectedCurrency[+item.item.id - 2].name);
          }
        }}
        onSwipeableRightWillOpen={() => {
          navigation.navigate('CurrencyDetails', { item });
        }}>
        <Pressable
          onPress={() => {
            setOldNumber(0);
            setNewNumber(0);
            setSymbol('');
            CurrencyStore.update((s) => {
              s.currencyDict[isSelected].amount = 0;
            });
            setIsSelected(item.item.name);
          }}
          style={[
            CardStyle.currencyCard,
            item.item.name === isSelected ? CardStyle.selectedCard : null,
          ]}>
          <Text style={TextStyle.mainText}>{item.item.name}</Text>
          <View>
            <View style={GlobalStyle.endRow}>
              {oldNumber && newNumber && isSelected === item.item.name ? (
                <Text style={TextStyle.currencyText}>
                  {oldNumber + ' ' + symbol + ' ' + newNumber + ' = '}
                </Text>
              ) : null}
              {isSelected === item.item.name ? (
                <Text numberOfLines={1} style={TextStyle.currencyText}>
                  {currencyDict[item.item.name].amount && !total
                    ? +currencyDict[item.item.name].amount.toFixed(4)
                    : total
                    ? +total.toFixed(4)
                    : newNumber
                    ? newNumber
                    : oldNumber
                    ? oldNumber
                    : defaultNumber}
                </Text>
              ) : (
                <Text style={TextStyle.currencyText}>
                  {currencyDict[item.item.name] &&
                  currencyDict[item.item.name].amount
                    ? currencyDict[item.item.name].amount.toFixed(
                        +defaultLegalDecimal.split('_')[0]
                      )
                    : currencyDict[item.item.name] &&
                      currencyDict[item.item.name].defaultAmount
                    ? currencyDict[item.item.name].defaultAmount
                    : null}
                </Text>
              )}
            </View>
            <Text style={TextStyle.subText}>
              {item.item.currency || EMPTY_STRING}
            </Text>
          </View>
        </Pressable>
      </Swipeable>
    );
  };

  return (
    <View style={GlobalStyle.container}>
      <FlatList
        data={selectedCurrency}
        renderItem={renderSelectedCurrency}
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={1} // 首批渲染的元素数量
        windowSize={3} // 渲染区域高度
        maxToRenderPerBatch={10} // 增量渲染最大数量
        updateCellsBatchingPeriod={50} // 增量渲染时间间隔
      />
      <MemoCalculator />
    </View>
  );
}
