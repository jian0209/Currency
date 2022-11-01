import axios from 'axios';
import { UserStore } from '../stores/UserStore';
import moment from 'moment';
import { CurrencyStore } from '../stores/CurrencyStore';

const API_KEY =
  '6c9b08e2f29032ad0779121331c14ffd2c48652e29b493548254becef0a271ab';

export const getCryptoList = async () => {
  let returnData;
  await axios
    .get(
      'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD&api_key=' +
        API_KEY
    )
    .then((data) => {
      returnData = data.data.Data;
    })
    .catch((err) => {
      console.log(err);
      returnData = {
        BTC: 'Bitcoin',
        ETH: 'Ethereum',
        XRP: 'XRP',
        BCH: 'Bitcoin Cash',
        LTC: 'Litecoin',
        SOL: 'Solana',
      };
      UserStore.update((s) => {
        s.isOnline = false;
      });
    });
  return returnData;
};

export const getSingleCrypto = async (base, to) => {
  let returnData;
  await axios
    .get(
      'https://min-api.cryptocompare.com/data/price?fsyms=' +
        base +
        '&tsyms=' +
        to +
        '&api_key=' +
        API_KEY
    )
    .then((data) => {
      returnData = data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return returnData;
};

export const getMultiCrypto = async (base, to) => {
  let returnData;
  let tempTo = '';
  for (let i = 0; i < to.length; i++) {
    if (to.length === i + 1) {
      tempTo += to[i];
    } else {
      tempTo += to[i] + ',';
    }
  }
  await axios
    .get(
      'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' +
        base +
        '&tsyms=' +
        tempTo +
        '&api_key=' +
        API_KEY
    )
    .then((data) => {
      returnData = data.data;
      CurrencyStore.update((s) => {
        s.updatedDate = moment().unix();
      });
    });
  return returnData;
};

export const getCryptoDetails = async (base, to) => {
  let returnData;
  await axios
    .get(
      'https://min-api.cryptocompare.com/data/price?fsym=' +
        base +
        '&tsyms=' +
        to +
        '&api_key=' +
        API_KEY
    )
    .then((data) => {
      returnData = data.data;
    });
  // .catch((err) => {
  //   returnData = { rates: { to: 'Network Error' } };
  //   console.log(err);
  // });
  return returnData;
};

export const getCryptoHistory = async (base, to, dateCount) => {
  let returnData;
  await axios
    .get(
      'https://min-api.cryptocompare.com/data/v2/histoday?fsym=' +
        base +
        '&tsym=' +
        to +
        '&limit=' +
        dateCount +
        '&api_key=' +
        API_KEY
    )
    .then((data) => {
      returnData = data.data.Data.Data;
    });
  // .catch((err) => {
  //   returnData = { rates: { [tempTo]: 'Network Error, Try Again Later' } };
  //   console.log(err);
  //   reject();
  // });
  return returnData;
};
