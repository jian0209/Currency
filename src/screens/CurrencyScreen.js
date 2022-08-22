/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import { Text, TouchableOpacity, View, FlatList, Platform } from 'react-native';
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
import { TouchableHighlight } from 'react-native-gesture-handler';

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
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
  }, [isSelected, defaultNumber, selectedCurrency]);

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
    if (total !== 0 || (symbol && newNumber)) {
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
  }, [newNumber, total]);

  const changeCurrency = async (base, to) => {
    setIsDisconnected(false);
    await getMultiCurrency(base, to)
      .then((data) => {
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
      })
      .catch((err) => {
        console.log(err);
        let tempDict = { ...currencyDict };
        tempDict.USD = { amount: 0, defaultAmount: defaultNumber };
        tempDict.CAD = {
          amount: 1.2838 * defaultNumber,
          defaultAmount: 1.2838,
        };
        tempDict.EUR = {
          amount: 0.98222 * defaultNumber,
          defaultAmount: 0.98222,
        };
        tempDict.GBP = {
          amount: 0.82734 * defaultNumber,
          defaultAmount: 0.82734,
        };
        tempDict.JPY = {
          amount: 133.4 * defaultNumber,
          defaultAmount: 133.4,
        };
        tempDict.SGD = {
          amount: 1.3787 * defaultNumber,
          defaultAmount: 1.3787,
        };
        CurrencyStore.update((s) => {
          s.currencyDict = tempDict;
        });
        setIsDisconnected(true);
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

  const renderSelectedCurrency = useCallback(
    (item, index) => {
      const swipeLeft = () => {
        navigation.navigate('CurrencyList', { item: item.item });
        if (item.item.name === isSelected && item.item.id === 1) {
          setIsSelected(selectedCurrency[+item.item.id].name);
        } else if (item.item.name === isSelected) {
          setIsSelected(selectedCurrency[+item.item.id - 2].name);
        }
      };
      const swipeRight = () => {
        CurrencyStore.update((s) => {
          s.currencyDetails = item.item;
        });
        navigation.navigate('CurrencyDetails');
      };
      return (
        <Swipeable
          key={item.item.id}
          ref={(ref) => (index = ref)}
          renderLeftActions={showChangeCurrency}
          renderRightActions={showRateDetails}
          onSwipeableOpen={() => {
            index.close();
          }}
          onSwipeableLeftWillOpen={swipeLeft}
          onSwipeableRightWillOpen={swipeRight}>
          <TouchableHighlight
            underlayColor={color.primary}
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
            <>
              <Text style={TextStyle.mainText}>{item.item.name}</Text>
              <View>
                <View style={GlobalStyle.endRow}>
                  {oldNumber && newNumber && isSelected === item.item.name ? (
                    <Text style={TextStyle.currencyText}>
                      {oldNumber + ' ' + symbol + ' ' + newNumber + ' ='}&nbsp;
                    </Text>
                  ) : null}
                  {isSelected === item.item.name ? (
                    <Text numberOfLines={1} style={TextStyle.currencyText}>
                      {total || (newNumber && oldNumber && !symbol)
                        ? +total.toFixed(4)
                        : total || (newNumber && oldNumber)
                        ? +total.toFixed(4)
                        : currencyDict[item.item.name].amount
                        ? +currencyDict[item.item.name].amount.toFixed(4)
                        : newNumber
                        ? newNumber
                        : oldNumber
                        ? oldNumber
                        : defaultNumber}
                      {/* {currencyDict[item.item.name].amount && !total
                        ? +currencyDict[item.item.name].amount.toFixed(4)
                        : total
                        ? +total.toFixed(4)
                        : newNumber
                        ? newNumber
                        : oldNumber
                        ? oldNumber
                        : defaultNumber} */}
                    </Text>
                  ) : (
                    <Text numberOfLines={1} style={TextStyle.currencyText}>
                      {!total && newNumber && oldNumber
                        ? parseFloat(+total).toFixed(
                            +defaultLegalDecimal.split('_')[0]
                          )
                        : currencyDict[item.item.name] &&
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
            </>
          </TouchableHighlight>
        </Swipeable>
      );
    },
    [currencyDict]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const onRefreshCurrency = async () => {
    setIsRefreshing(true);
    let tempTo = [];
    selectedCurrency.forEach((item, index) => {
      if (item.name !== isSelected) {
        tempTo.push(item.name);
      }
    });
    await changeCurrency(isSelected, tempTo);
    setIsRefreshing(false);
  };

  return (
    <View style={GlobalStyle.container}>
      <FlatList
        data={selectedCurrency}
        renderItem={renderSelectedCurrency}
        keyExtractor={keyExtractor}
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={1} // 首批渲染的元素数量
        windowSize={3} // 渲染区域高度
        maxToRenderPerBatch={3} // 增量渲染最大数量
        updateCellsBatchingPeriod={50} // 增量渲染时间间隔
        onRefresh={onRefreshCurrency}
        refreshing={isRefreshing}
      />
      {isDisconnected && (
        <Text style={[TextStyle.mainText, TextStyle.centerText]}>
          {I18n.t('disconnect')}
        </Text>
      )}
      <Calculator
        total={total}
        setTotal={(val) => {
          setTotal(defaultNumber);
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
    </View>
  );
}
