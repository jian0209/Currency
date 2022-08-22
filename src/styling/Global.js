import { Dimensions, StyleSheet } from 'react-native';
import color from './Color';

export const { height, width } = Dimensions.get('window');

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  swipeableLeftCont: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  swipeableRightCont: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: color.primary,
  },
  testBorder: {
    borderWidth: 1,
  },
  spaceBetween: {
    width: width * 0.5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  endRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    maxWidth: width * 0.7,
  },
  squareOne: {
    height: height * 0.1,
    width: height * 0.1,
  },
  centerCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
