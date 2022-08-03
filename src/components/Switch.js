import React from 'react';
import { StyleSheet } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import color from '../styling/Color';
import { width, height } from '../styling/Global';

export const SwitchComp = (props) => {
  const { value, setValue } = props;
  return (
    <SwitchToggle
      switchOn={value}
      onPress={() => setValue(!value)}
      circleColorOff={color.red}
      circleColorOn={color.green}
      backgroundColorOn={color.primary}
      backgroundColorOff={color.primary}
      containerStyle={Styles.containerStyle}
      circleStyle={Styles.circleStyle}
    />
  );
};

const Styles = StyleSheet.create({
  containerStyle: {
    width: width * 0.12,
    height: height * 0.035,
    borderRadius: 25,
    padding: 5,
  },
  circleStyle: {
    width: height * 0.02,
    height: height * 0.02,
    borderRadius: 20,
  },
});
