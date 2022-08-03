import I18n from 'react-native-i18n';
import en from './en';
import zh_tw from './zh_tw';
import zh_cn from './zh_cn';

I18n.fallbacks = true;

I18n.translations = {
  en,
  zh_tw,
  zh_cn,
};

export default I18n;
