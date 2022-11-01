import { StyleSheet } from 'react-native';
import color from './Color';
import { width, height } from './Global';

export const ButtonStyle = StyleSheet.create({
  closeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    width: width * 0.1,
    height: width * 0.1,
  },
  settingBtn: {
    backgroundColor: color.lightPrimaryColor,
    height: 24,
    width: 24,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeftBtn: {
    paddingHorizontal: 10,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerRightBtn: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loginBtn: {
    borderRadius: 999,
    height: height * 0.035 + 25,
    width: height * 0.035 + 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
