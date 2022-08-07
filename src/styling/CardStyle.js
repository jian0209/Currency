import { StyleSheet } from 'react-native';
import color from './Color';
import { height, width } from './Global';

export const CardStyle = StyleSheet.create({
  currencyCard: {
    backgroundColor: color.lightPrimaryColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  selectedCard: {
    borderWidth: 1,
    borderColor: color.white,
  },
  settingCard: {
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  settingMainLeftCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingSubCard: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderBottomColor: color.lightPrimaryColor,
    borderBottomWidth: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insideSettingCard: {
    minHeight: height * 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedSettingDropDownCard: {
    borderWidth: 1,
    borderColor: color.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingDropDownCard: {
    paddingLeft: 23,
  },
  settingDropDownInsideCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  settingDropDownDecimalLeftCard: {
    flexDirection: 'row',
    width: width * 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  logSignMainCard: {
    flex: 1,
    paddingHorizontal: width * 0.06,
  },
  logSignTextCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.05,
  },
  logTextInputCard: {
    backgroundColor: color.lightPrimaryColor,
    borderRadius: 10,
    paddingTop: height * 0.03,
    height: height * 0.28,
    paddingHorizontal: width * 0.05,
  },
  signTextInputCard: {
    backgroundColor: color.lightPrimaryColor,
    borderRadius: 10,
    paddingTop: height * 0.03,
    height: height * 0.37,
    paddingHorizontal: width * 0.05,
  },
  btnCard: {
    position: 'absolute',
    bottom: height * -0.033,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.873,
  },
  horizontalScrollCard: {
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.1,
  },
  selectedHorizontalScrollCard: {
    borderBottomWidth: 1,
    borderBottomColor: color.white,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.1,
  },
  horizontalDateScrollCard: {
    paddingVertical: height * 0.01,
    width: width * 0.135,
    alignItems: 'center',
  },
  selectedHorizontalDateScrollCard: {
    borderBottomWidth: 1,
    borderBottomColor: color.white,
    paddingVertical: height * 0.01,
    width: width * 0.135,
    alignItems: 'center',
  },
});
