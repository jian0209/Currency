import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TextStyle } from '../styling/TextStyle';
import { CardStyle } from '../styling/CardStyle';

export function CurrencyCard(props) {
  const { name, image, currencyName, setIsSelected } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        setIsSelected(true);
      }}
      style={CardStyle.currencyCard}>
      <View>
        <Image source={image} />
        <Text style={TextStyle.mainText}>{name}</Text>
      </View>
      <View>
        <Text>{}</Text>
        <Text style={TextStyle.mainText}>{currencyName}</Text>
      </View>
    </TouchableOpacity>
  );
}
