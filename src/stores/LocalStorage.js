import AsyncStorage from '@react-native-async-storage/async-storage';

// store user token
const tokenKey = 'Exchange_token_key';
export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem(tokenKey, token);
  } catch (err) {
    console.error('LocalStorage: setToken: ', err);
  }
};

export const getToken = async () => {
  let returnData;
  try {
    await AsyncStorage.getItem(tokenKey).then((data) => {
      returnData = data;
    });
  } catch (err) {
    console.error('LocalStorage: getToken: ', err);
  }
  return returnData;
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(tokenKey);
  } catch (err) {
    console.error('LocalStorage: removeToken: ', err);
  }
};

// store first screen when user open app
const firstScreenKey = 'Exchange_First_screen_key';
export const setFirstScreen = async (firstScreen) => {
  try {
    await AsyncStorage.setItem(firstScreenKey, firstScreen);
  } catch (err) {
    console.error('LocalStorage: setFirstScreen: ', err);
  }
};

export const getFirstScreen = async () => {
  let returnData;
  try {
    await AsyncStorage.getItem(firstScreenKey).then((data) => {
      returnData = data;
    });
  } catch (err) {
    console.error('LocalStorage: getFirstScreen: ', err);
  }
  return returnData;
};

// store language
const languageKey = 'Language_key';
export const setLanguage = async (language) => {
  try {
    await AsyncStorage.setItem(languageKey, language);
  } catch (err) {
    console.error('LocalStorage: setLanguage: ', err);
  }
};

export const getLanguage = async () => {
  let returnData;
  try {
    await AsyncStorage.getItem(languageKey).then((data) => {
      returnData = data;
    });
  } catch (err) {
    console.error('LocalStorage: getLanguage: ', err);
  }
  return returnData;
};

// store decimal
const decimalKey = 'Decimal_key';
export const setDecimal = async (decimal) => {
  try {
    await AsyncStorage.setItem(decimalKey, decimal);
  } catch (err) {
    console.error('LocalStorage: setDecimal: ', err);
  }
};

export const getDecimal = async () => {
  let returnData;
  try {
    await AsyncStorage.getItem(decimalKey).then((data) => {
      returnData = data;
    });
  } catch (err) {
    console.error('LocalStorage: getDecimal: ', err);
  }
  return returnData;
};

// store crypto decimal
const cryptoDecimalKey = 'Crypto_Decimal_key';
export const setCryptoDecimal = async (decimal) => {
  try {
    await AsyncStorage.setItem(cryptoDecimalKey, decimal);
  } catch (err) {
    console.error('LocalStorage: setCryptoDecimal: ', err);
  }
};

export const getCryptoDecimal = async () => {
  let returnData;
  try {
    await AsyncStorage.getItem(cryptoDecimalKey).then((data) => {
      returnData = data;
    });
  } catch (err) {
    console.error('LocalStorage: getCryptoDecimal: ', err);
  }
  return returnData;
};

// store currency value
const currencyValueKey = 'Currency_Value_key';
export const setCurrencyValue = async (value) => {
  try {
    await AsyncStorage.setItem(currencyValueKey, value);
  } catch (err) {
    console.error('LocalStorage: setCurrencyValue: ', err);
  }
};

export const getCurrencyValue = async () => {
  let returnData;
  try {
    await AsyncStorage.getItem(currencyValueKey).then((data) => {
      returnData = data;
    });
  } catch (err) {
    console.error('LocalStorage: getCurrencyValue: ', err);
  }
  return returnData;
};

// store selected currency
const currencyKey = 'Currency_key';
export const setCurrency = async (currency) => {
  try {
    await AsyncStorage.setItem(currencyKey, JSON.stringify(currency));
  } catch (err) {
    console.error('LocalStorage: setCurrency: ', err);
  }
};

export const getCurrency = async () => {
  let returnData;
  try {
    await AsyncStorage.getItem(currencyKey)
      .then((req) => JSON.parse(req))
      .then((json) => (returnData = json));
  } catch (err) {
    console.error('LocalStorage: getCurrency: ', err);
  }
  return returnData;
};

export const clearAllStorage = async () => {
  // use it be careful
  try {
    await AsyncStorage.clear();
  } catch (err) {
    console.error('LocalStorage: clearAllStorage: ', err);
  }
};

// get object
// const getMyObject = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('@key');
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     // read error
//   }

//   console.log('Done.');
// };

// set object
// const setObjectValue = async (value) => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem('key', jsonValue);
//   } catch (e) {
//     // save error
//   }

//   console.log('Done.');
// };
