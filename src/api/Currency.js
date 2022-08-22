import axios from 'axios';
import { UserStore } from '../stores/UserStore';
import moment from 'moment';
import { CurrencyStore } from '../stores/CurrencyStore';

export const getCountryList = async () => {
  let returnData;
  await axios
    .get('https://api.frankfurter.app/currencies')
    .then((data) => {
      returnData = data.data;
    })
    .catch((err) => {
      console.log(err);
      returnData = {
        CAD: 'Canadian Dollar',
        EUR: 'Euro',
        GBP: 'British Pound',
        JPY: 'Japanese Yen',
        SGD: 'Singapore Dollar',
        USD: 'United States Dollar',
      };
      UserStore.update((s) => {
        s.isOnline = false;
      });
    });
  return returnData;
};

export const getSingleCurrency = async (base, to) => {
  let returnData;
  await axios
    .get('https://api.frankfurter.app/latest?from=' + base + '&to=' + to)
    .then((data) => {
      returnData = data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return returnData;
};

export const getMultiCurrency = async (base, to) => {
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
    .get('https://api.frankfurter.app/latest?from=' + base + '&to=' + tempTo)
    .then((data) => {
      returnData = data.data;
      CurrencyStore.update((s) => {
        s.updatedDate = moment().unix();
      });
    });
  // .catch((err) => {
  //   console.log(err);
  //   returnData = {
  //     amount: 1.0,
  //     base: 'USD',
  //     date: '2022-08-04',
  //     rates: {
  //       CAD: 1.2838,
  //       EUR: 0.98222,
  //       GBP: 0.82734,
  //       JPY: 133.4,
  //       SGD: 1.3787,
  //     },
  //   };
  //   reject();
  // });
  return returnData;
};

export const getCurrencyDetails = async (base, to) => {
  let returnData;
  await axios
    .get('https://api.frankfurter.app/latest?from=' + base + '&to=' + to)
    .then((data) => {
      returnData = data.data;
    });
  // .catch((err) => {
  //   returnData = { rates: { to: 'Network Error' } };
  //   console.log(err);
  // });
  return returnData;
};

export const getCurrencyHistory = async (base, to, dateStart, dateEnd) => {
  let returnData;
  await axios
    .get(
      'https://api.frankfurter.app/' +
        dateStart +
        '..' +
        dateEnd +
        '?from=' +
        base +
        '&to=' +
        to
    )
    .then((data) => {
      returnData = data.data;
    });
  // .catch((err) => {
  //   returnData = { rates: { [tempTo]: 'Network Error, Try Again Later' } };
  //   console.log(err);
  //   reject();
  // });
  return returnData;
};
