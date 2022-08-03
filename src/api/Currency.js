import axios from 'axios';

const apiKey = 'a2903beecc-6b9dc73c40-rfpm16';

export const getCountryList = async () => {
  let returnData;
  await axios
    .get('https://api.fastforex.io/currencies?api_key=' + apiKey)
    .then((data) => {
      returnData = data.data.currencies;
    })
    .catch((err) => {
      console.error(err);
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
      tempTo += to[i] + '%2C';
    }
  }
  await axios
    .get(
      'https://api.fastforex.io/fetch-multi?from=' +
        base +
        '&to=' +
        tempTo +
        '&api_key=' +
        apiKey
    )
    .then((data) => {
      returnData = data.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return returnData;
};
