import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import color from '../styling/Color';

export const TextInputComp = (props) => {
  const { value, setValue, placeholder } = props;
  return (
    <TextInput
      value={value}
      onChangeText={(val) => setValue(val)}
      placeholder={placeholder}
      style={Styles.containerStyle}
      placeholderTextColor={color.black}
    />
  );
};

const Styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 999,
    padding: 5,
    backgroundColor: color.white,
    marginVertical: 15,
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
});
