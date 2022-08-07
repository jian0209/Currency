/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { CalculatorStyle } from '../styling/CalculatorStyle';
import { EMPTY_NUMBER } from '../utils/constant';
import I18n from 'react-native-i18n';

export default function Calculator(props) {
  const {
    total,
    setTotal,
    newNumber,
    setNewNumber,
    oldNumber,
    setOldNumber,
    symbol,
    setSymbol,
  } = props;

  const [keyInCalculator, setKeyInCalculator] = useState([]);
  // const [newNumber, setNewNumber] = useState(0);
  // const [oldNumber, setOldNumber] = useState(0);
  // const [symbol, setSymbol] = useState('');

  useEffect(() => {
    // init calculator value
    setKeyInCalculator([
      {
        key: 7,
        value: '7',
      },
      {
        key: 8,
        value: '8',
      },
      {
        key: 9,
        value: '9',
      },
      {
        key: '+',
        value: '+',
      },
      {
        key: 4,
        value: '4',
      },
      {
        key: 5,
        value: '5',
      },
      {
        key: 6,
        value: '6',
      },
      {
        key: '-',
        value: '-',
      },
      {
        key: 1,
        value: '1',
      },
      {
        key: 2,
        value: '2',
      },
      {
        key: 3,
        value: '3',
      },
      {
        key: 'x',
        value: '*',
      },
      {
        key: '.',
        value: '.',
      },
      {
        key: 0,
        value: '0',
      },
      {
        key: I18n.t('calculatorDelete'),
        value: 'DELETE',
      },
      {
        key: '÷',
        value: '/',
      },
    ]);
  }, []);

  useEffect(() => {
    // calculate number
    if (!isNaN(newNumber) && newNumber !== 0) {
      switch (symbol) {
        case '+':
          setTotal(+oldNumber + +newNumber);
          break;
        case '-':
          setTotal(+oldNumber - newNumber);
          break;
        case '*':
          setTotal(+oldNumber * newNumber);
          break;
        case '/':
          setTotal(+oldNumber / newNumber);
          break;
      }
    } else {
      setTotal(0);
    }
  }, [newNumber]);

  // re-init calculator
  const cleanCalculator = () => {
    setNewNumber(0);
    setOldNumber(0);
    setSymbol('');
    setTotal(0);
  };

  // calculator function
  /*
   *  @param {string}
   *  @function {add, sub, mul, div}
   *  @function Ref useEffect with newNumber
   */
  const calculate = (num) => {
    let checkSymbol = { '+': true, '-': true, '*': true, '/': true };
    if (num === 'DELETE') {
      // delete button
      let tempNum = newNumber.toString().split('');
      tempNum.pop();
      setNewNumber(tempNum.join('') || EMPTY_NUMBER);
      if (newNumber === 0) {
        cleanCalculator();
      }
    } else if (num === '.') {
      // not allow double dot
      let tempNum = newNumber.toString().includes('.');
      if (!tempNum) {
        if (newNumber === 0) {
          setNewNumber('0.');
        } else {
          setNewNumber(newNumber + num);
        }
      }
    } else if (checkSymbol[num]) {
      // detect num is symbol or number
      setSymbol(num);
      setOldNumber(total ? total : newNumber);
      setNewNumber(0);
    } else if (+newNumber === 0) {
      // not become 01, 02 else..., direct become 0 -> 1, 0 -> 2
      if (newNumber === '0.') {
        setNewNumber(newNumber + num);
      } else {
        setNewNumber(+num);
      }
    } else {
      setNewNumber(newNumber + num);
    }
  };

  // render calculator
  const renderCalculator = ({ item }) => {
    let checkSymbol = { '+': true, '-': true, '*': true, '/': true };
    let isRounded = checkSymbol[item.value];
    return (
      <TouchableOpacity
        style={
          Platform.OS === 'android' && isRounded
            ? CalculatorStyle.adrSymbolBtn
            : Platform.OS === 'android'
            ? CalculatorStyle.adrBtn
            : isRounded
            ? CalculatorStyle.symbolButton
            : CalculatorStyle.button
        }
        onLongPress={() => {
          if (item.value !== 'DELETE') {
            return;
          }
          cleanCalculator();
        }}
        onPress={() => {
          calculate(item.value);
        }}>
        <Text style={CalculatorStyle.text}>{item.key}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        style={CalculatorStyle.cont}
        scrollEnabled={false}
        data={keyInCalculator}
        numColumns={4}
        renderItem={renderCalculator}
        keyExtractor={(item) => item.value}
      />
    </>
  );
}
