import { StyleSheet } from 'react-native';
import color from './Color';
import { height } from './Global';

export const CalculatorStyle = StyleSheet.create({
  button: {
    flex: 1,
    height: height * 0.08,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbolButton: {
    flex: 1,
    backgroundColor: color.lightPrimaryColor,
    borderRadius: 999,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.08,
  },
  cont: {
    paddingHorizontal: 27,
  },
  text: {
    color: color.white,
    fontSize: 24,
  },
});
