/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
      headerTitle: () => <Text style={TextStyle.mainText}>Currency</Text>,
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
    console.log(defaultLegalDecimal);
  }, [defaultLegalDecimal]);

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
            amount: tempDict[key].defaultAmount / defaultNumber,
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
      for (const res in data.results) {
        tempDict[res] = {
          amount: data.results[res] * defaultNumber,
          defaultAmount: data.results[res],
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
        <Text style={TextStyle.swipeableLeftText}>Switch Currency</Text>
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
        <Text style={TextStyle.swipeableRightText}>Rate Details</Text>
      </LinearGradient>
    );
  };

  return (
    <View style={GlobalStyle.container}>
      {selectedCurrency.map((item, index, i) => {
        return (
          <View key={index}>
            <Swipeable
              ref={(ref) => (index = ref)}
              renderLeftActions={showChangeCurrency}
              renderRightActions={showRateDetails}
              onSwipeableOpen={() => {
                index.close();
              }}
              onSwipeableLeftWillOpen={() => {
                navigation.navigate('CurrencyList', { item });
                if (item.name === isSelected && item.id === 1) {
                  setIsSelected(selectedCurrency[+item.id].name);
                } else if (item.name === isSelected) {
                  setIsSelected(selectedCurrency[+item.id - 2].name);
                }
              }}
              onSwipeableRightWillOpen={() => {
                navigation.navigate('CurrencyDetails', { item });
              }}>
              <TouchableOpacity
                onPress={() => {
                  setOldNumber(0);
                  setNewNumber(0);
                  setSymbol('');
                  CurrencyStore.update((s) => {
                    s.currencyDict[isSelected].amount = 0;
                  });
                  setIsSelected(item.name);
                }}
                style={[
                  CardStyle.currencyCard,
                  item.name === isSelected ? CardStyle.selectedCard : null,
                ]}>
                <View>
                  {/*<Image source={image}/>*/}
                  <Text style={TextStyle.mainText}>{item.name}</Text>
                </View>
                <View>
                  <View style={GlobalStyle.endRow}>
                    {oldNumber && newNumber && isSelected === item.name ? (
                      <Text style={TextStyle.currencyText}>
                        {oldNumber + ' ' + symbol + ' ' + newNumber + ' = '}
                      </Text>
                    ) : null}
                    {isSelected === item.name ? (
                      <Text numberOfLines={1} style={TextStyle.currencyText}>
                        {currencyDict[item.name].amount && !total
                          ? +currencyDict[item.name].amount.toFixed(4)
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
                        {currencyDict[item.name] &&
                        currencyDict[item.name].amount
                          ? currencyDict[item.name].amount.toFixed(
                              +defaultLegalDecimal.split('_')[0]
                            )
                          : currencyDict[item.name] &&
                            currencyDict[item.name].defaultAmount
                          ? currencyDict[item.name].defaultAmount
                          : null}
                      </Text>
                    )}
                  </View>
                  <Text style={TextStyle.subText}>{item.currency || ''}</Text>
                </View>
              </TouchableOpacity>
            </Swipeable>
          </View>
        );
      })}
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
    </View>
  );
}
