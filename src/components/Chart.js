import React from 'react';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import color from '../styling/Color';
import { width } from '../styling/Global';

export default function Chart({ spacing, objData, to, maxValue }) {
  //   object to arr
  const arrData = Object.keys(objData.rates || {}).map((key) => {
    return {
      date: key,
      value: objData.rates[key][to] || 0,
    };
  });

  useEffect(() => {
    console.log(maxValue);
  }, [maxValue]);

  return (
    <View
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
        width={width * 0.76}
        hideDataPoints
        maxValue={maxValue + 1 * maxValue}
        spacing={15}
        initialSpacing={10}
        color={color.gradiantFromSwipeable}
        thickness={2}
        isAnimated={true}
        showScrollIndicator={false}
        scrollToEnd={true}
        // height={height * 0.2}
        noOfSections={10}
        hideRules
        yAxisSide={'right'}
        hideAxesAndRules={true}
        pointerConfig={{
          pointerStripColor: 'lightgray',
          activatePointersDelay: 700,
          pointerStripWidth: 2,
          pointerColor: 'lightgray',
          activatePointersOnLongPress: true,
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          pointerLabelComponent: (items) => {
            return (
              <View
                style={{
                  height: 90,
                  width: 100,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    marginBottom: 6,
                    textAlign: 'center',
                  }}>
                  {items[0].date}
                </Text>

                <View
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 16,
                    backgroundColor: 'white',
                  }}>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {+items[0].value.toFixed(4)}
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
