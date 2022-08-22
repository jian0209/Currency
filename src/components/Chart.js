import React from 'react';
import { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { CardStyle } from '../styling/CardStyle';
import color from '../styling/Color';
import { width } from '../styling/Global';
import { TextStyle } from '../styling/TextStyle';

export default function Chart({ objData, to, maxValue, minValue }) {
  //   object to arr
  const arrData = Object.keys(objData.rates || {}).map((key) => {
    return {
      date: key,
      value: objData.rates[key][to] || 0,
      defaultValue: objData.rates[key][to] || 0,
    };
  });

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        overflow: 'hidden',
        width: '100%',
      }}>
      <LineChart
        // area configuration
        areaChart
        startFillColor={color.gradiantFromSwipeable}
        endFillColor={color.lightPrimaryColor}
        startOpacity={0.1}
        endOpacity={0.1}
        gradientDirection={'vertical'}
        // line configuration
        data={arrData}
        width={Platform.OS === 'ios' ? width * 0.76 : width * 0.83}
        hideDataPoints
        maxValue={maxValue - minValue}
        yAxisOffset={minValue}
        initialSpacing={10}
        color={color.gradiantFromSwipeable}
        thickness={2}
        isAnimated={true}
        showScrollIndicator={false}
        scrollToEnd={true}
        // height={height * 0.2}
        adjustToWidth={true}
        yAxisSide={'right'}
        hideAxesAndRules={true}
        pointerConfig={{
          pointerStripColor: 'lightgray',
          pointerStripWidth: 2,
          pointerColor: 'lightgray',
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          pointerLabelComponent: (items) => {
            return (
              <View style={CardStyle.pointerCard}>
                <Text style={TextStyle.currencyText}>{items[0].date}</Text>
                <View style={CardStyle.pointerItemCard}>
                  <Text style={TextStyle.pointerItemText}>
                    {+items[0].defaultValue.toFixed(4)}
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
    </View>
    // <></>
  );
}
