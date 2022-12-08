/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LinearGradient from 'react-native-linear-gradient';
import Calculator from '../components/Calculator';
import color from '../styling/Color';
import { TextStyle } from '../styling/TextStyle';
import { CurrencyStore } from '../stores/CurrencyStore';
import { CardStyle } from '../styling/CardStyle';
import { GlobalStyle } from '../styling/Global';
import { getMultiCrypto } from '../api/Crypto';
import { SettingStore } from '../stores/SettingStorage';
import { ArrowSwitchIcon, SettingIcon, RingIcon } from '../components/Icon';
import { ButtonStyle } from '../styling/ButtonStyle';
import { EMPTY_STRING } from '../utils/constant';
import I18n from 'react-native-i18n';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { ToThousands } from '../utils/filter';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import BetterBanner from 'react-native-better-banner';
import { BannerStore } from '../stores/BannerStore';
import { CustomTabs } from 'react-native-custom-tabs';
import { getBannerList } from '../api/Banner';
import { BANNER_ARRAY } from '../utils/constant';

export default function CryptoScreen(props) {
  const { navigation } = props;

  const bannerList = BannerStore.useState((s) => s.bannerList);

  const cryptoDict = CurrencyStore.useState((s) => s.cryptoDict);
  const currencyDict = CurrencyStore.useState((s) => s.countryDict);
  const selectedCrypto = CurrencyStore.useState((s) => s.selectedCrypto);
  const defaultNumber = SettingStore.useState((s) => s.defaultNumber);
  const defaultCryptoDecimal = SettingStore.useState(
    (s) => s.defaultCryptoDecimal
  );
  const defaultLegalDecimal = SettingStore.useState(
    (s) => s.defaultLegalDecimal
  );

  const [total, setTotal] = useState(0);
  const [newNumber, setNewNumber] = useState(0);
  const [oldNumber, setOldNumber] = useState(0);
  const [symbol, setSymbol] = useState('');
  const [isSelected, setIsSelected] = useState(selectedCrypto[0].name);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const displayBannerList = useRef(
    // bannerList.map((item) => {
    //   return {
    //     uri: item.ImageUrl,
    //     connectUrl: item.Url,
    //   };
    // })
    BANNER_ARRAY
  );

  useLayoutEffect(() => {
    console.log(displayBannerList.current);
    navigation.setOptions({
      headerLeft: () => (
        // <TouchableOpacity
        //   style={ButtonStyle.headerLeftBtn}
        //   onPress={() => {
        //     navigation.navigate('Currency');
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
          onPress={async () => {
            SettingStore.update((s) => {
              s.isCrypto = true;
            });
            await getBannerList();
            navigation.navigate('CurrencySettings');
          }}>
          <SettingIcon />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    let tempTo = [];
    selectedCrypto.forEach((item, index) => {
      if (item.name !== isSelected) {
        tempTo.push(item.name);
      }
    });
    changeCurrency(isSelected, tempTo);
  }, [isSelected, defaultNumber, selectedCrypto]);

  useEffect(() => {}, [defaultCryptoDecimal, defaultLegalDecimal]);

  useEffect(() => {
    let tempDict = { ...cryptoDict };
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
      s.cryptoDict = tempDict;
    });
  }, [newNumber, total]);

  const changeCurrency = async (base, to) => {
    setIsDisconnected(false);
    await getMultiCrypto(base, to)
      .then((data) => {
        let tempDict = { ...cryptoDict };
        tempDict[Object.keys(data)[0]] = {
          amount: 0,
          defaultAmount: defaultNumber,
        };
        for (const res in data[Object.keys(data)[0]]) {
          tempDict[res] = {
            amount: data[Object.keys(data)[0]][res] * defaultNumber,
            defaultAmount: data[Object.keys(data)[0]][res],
          };
        }
        CurrencyStore.update((s) => {
          s.cryptoDict = tempDict;
        });
      })
      .catch((err) => {
        console.log(err);
        setIsDisconnected(true);
      });
  };

  const inAppBrowser = async (index) => {
    if (index === -1) {
      index = 0;
    }
    const url = displayBannerList.current[index].connectUrl;
    if (Platform.OS === 'android') {
      CustomTabs.openURL(url, {
        toolbarColor: color.primary,
        showPageTitle: true,
        enableDefaultShare: true,
      })
        .then((launched) => {
          console.log(`Launched custom tabs: ${launched}`);
        })
        .catch((err) => {
          console.error(err);
        });
      return;
    }
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'close',
          preferredBarTintColor: color.primary,
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: color.primary,
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        console.log(result);
        // Alert.alert(JSON.stringify(result));
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const showChangeCurrency = (progress, dragX) => {
    return (
      <LinearGradient
        style={GlobalStyle.swipeableLeftCont}
        colors={[color.gradientFromSwipeable, color.gradientToSwipeable]}
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
        colors={[color.gradientFromSwipeable, color.gradientToSwipeable]}
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
        navigation.navigate('CryptoList', { item: item.item });
        if (item.item.name === isSelected && item.item.id === 1) {
          setIsSelected(selectedCrypto[+item.item.id].name);
        } else if (item.item.name === isSelected) {
          setIsSelected(selectedCrypto[+item.item.id - 2].name);
        }
      };
      const swipeRight = () => {
        CurrencyStore.update((s) => {
          s.cryptoDetails = item.item;
        });
        navigation.navigate('CryptoDetails');
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
                s.cryptoDict[isSelected].amount = 0;
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
                      {ToThousands(oldNumber) +
                        ' ' +
                        symbol +
                        ' ' +
                        ToThousands(newNumber) +
                        ' ='}
                      &nbsp;
                    </Text>
                  ) : null}
                  {isSelected === item.item.name ? (
                    <Text numberOfLines={1} style={TextStyle.currencyText}>
                      {total || (newNumber && oldNumber && !symbol)
                        ? ToThousands(+total.toFixed(4))
                        : total || (newNumber && oldNumber)
                        ? ToThousands(+total.toFixed(4))
                        : cryptoDict[item.item.name].amount
                        ? ToThousands(
                            +cryptoDict[item.item.name].amount.toFixed(4)
                          )
                        : newNumber
                        ? ToThousands(newNumber)
                        : oldNumber
                        ? ToThousands(oldNumber)
                        : ToThousands(defaultNumber)}
                      {/* {cryptoDict[item.item.name].amount && !total
                          ? +cryptoDict[item.item.name].amount.toFixed(4)
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
                      {!total &&
                      newNumber &&
                      oldNumber &&
                      currencyDict[item.item.name]
                        ? ToThousands(
                            parseFloat(+total).toFixed(
                              +defaultLegalDecimal.split('_')[0]
                            )
                          )
                        : !total && newNumber && oldNumber
                        ? ToThousands(
                            parseFloat(+total).toFixed(
                              +defaultCryptoDecimal.split('_')[0]
                            )
                          )
                        : currencyDict[item.item.name] &&
                          cryptoDict[item.item.name]?.amount
                        ? ToThousands(
                            cryptoDict[item.item.name].amount.toFixed(
                              +defaultLegalDecimal.split('_')[0]
                            )
                          )
                        : cryptoDict[item.item.name] &&
                          cryptoDict[item.item.name]?.amount
                        ? ToThousands(
                            cryptoDict[item.item.name].amount.toFixed(
                              +defaultCryptoDecimal.split('_')[0]
                            )
                          )
                        : cryptoDict[item.item.name] &&
                          cryptoDict[item.item.name]?.defaultAmount
                        ? ToThousands(cryptoDict[item.item.name].defaultAmount)
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
    [cryptoDict]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const onRefreshCurrency = async () => {
    setIsRefreshing(true);
    let tempTo = [];
    selectedCrypto.forEach((item, index) => {
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
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ flex: 4 }}
        data={selectedCrypto}
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
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ paddingBottom: 10 }}>
        <Calculator
          total={total}
          setTotal={(val) => {
            setTotal(defaultNumber);
            CurrencyStore.update((s) => {
              s.cryptoDict[isSelected].amount = +val;
            });
            setTotal(val);
          }}
          newNumber={newNumber}
          setNewNumber={(val) => {
            CurrencyStore.update((s) => {
              s.cryptoDict[isSelected].amount = +val;
            });
            setNewNumber(val);
          }}
          oldNumber={oldNumber}
          setOldNumber={(val) => {
            if (val) {
              CurrencyStore.update((s) => {
                s.cryptoDict[isSelected].amount = +val;
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
      <BetterBanner
        bannerHeight={50}
        bannerImages={displayBannerList.current}
        // bannerTitles={[
        //   'Page 01 Page 01 Page 01 Page 01 Page 01 Page 01 Page 01 ',
        //   'Page 02',
        //   'Page 03',
        // ]}
        onPress={(index) => inAppBrowser(index)}
        // indicatorContainerBackgroundColor={'rgba(0,0,0,0.3)'}
        isSeamlessScroll={true}
      />
    </View>
  );
}
