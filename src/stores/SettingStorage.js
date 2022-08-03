import { Store } from 'pullstate';

export const SettingStore = new Store({
  defaultScreen: 'home',
  language: '0',
  defaultLegalDecimal: '4_BITS',
  defaultCryptoDecimal: '4_BITS',
  defaultNumber: 100,
});
