import { Store } from 'pullstate';

export const CurrencyStore = new Store({
  currencyDict: {},
  selectedCurrencyName: ['USD', 'EUR', 'JPY', 'GBP', 'SGD', 'CAD'],
  countryArr: [],
  countryDict: {},
  decimalLegalList: [
    {
      key: 'None',
      num: '1,234',
      value: '0_BITS',
    },
    {
      key: '2 Bits',
      num: '1,234.00',
      value: '2_BITS',
    },
    {
      key: '4 Bits',
      num: '1,234.0000',
      value: '4_BITS',
    },
    {
      key: '6 Bits',
      num: '1,234.000000',
      value: '6_BITS',
    },
    {
      key: '8 Bits',
      num: '1,234.00000000',
      value: '8_BITS',
    },
  ],
  decimalCryptoList: [
    {
      key: '2 Bits',
      num: '1,234.00',
      value: '2_BITS',
    },
    {
      key: '4 Bits',
      num: '1,234.0000',
      value: '4_BITS',
    },
    {
      key: '6 Bits',
      num: '1,234.000000',
      value: '6_BITS',
    },
    {
      key: '8 Bits',
      num: '1,234.00000000',
      value: '8_BITS',
    },
    {
      key: '10 Bits',
      num: '1,234.0000000000',
      value: '10_BITS',
    },
    {
      key: '12 Bits',
      num: '1,234.000000000000',
      value: '12_BITS',
    },
  ],
  selectedCurrency: [],
  updatedDate: '',
  currencyDetails: {},
});
