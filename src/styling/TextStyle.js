import { StyleSheet } from 'react-native';
import color from './Color';

export const TextStyle = StyleSheet.create({
  mainText: {
    color: color.white,
    fontSize: 20,
  },
  subText: {
    color: color.gray,
    fontSize: 14,
    textAlign: 'right',
  },
  swipeableLeftText: {
    color: color.white,
    fontSize: 16,
    marginRight: 10,
  },
  swipeableRightText: {
    color: color.white,
    fontSize: 16,
    textAlign: 'right',
    marginLeft: 10,
  },
  currencyText: {
    textAlign: 'right',
    color: color.white,
    fontSize: 16,
  },
  decimalLeftText: {
    color: color.white,
    fontSize: 16,
  },
  decimalRightText: {
    color: color.gray,
    fontSize: 14,
  },
  settingSubText: {
    color: color.gray,
    fontSize: 14,
  },
  settingSubTextWhite: {
    color: color.white,
    fontSize: 16,
  },
  settingText: {
    color: color.white,
    fontSize: 16,
    marginLeft: 10,
  },
  selectedSettingDropDownText: {
    color: color.white,
    fontSize: 16,
  },
  settingDropDownText: {
    color: color.gray,
    fontSize: 14,
  },
  isSelectedLogSignText: {
    color: color.white,
    fontSize: 20,
    // marginHorizontal: width * 0.1,
  },
  logSignText: {
    color: color.gray,
    fontSize: 20,
    // marginHorizontal: width * 0.1,
  },
  pointerItemText: {
    color: color.white,
    fontSize: 16,
  },
  logSignPlaceholderText: {
    color: color.white,
    fontSize: 14,
    paddingLeft: 30,
  },
  centerText: {
    textAlign: 'center',
  },
  calculatorDeleteText: {
    fontSize: 12,
  },
});
