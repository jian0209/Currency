/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, Platform, View } from 'react-native';
import { CalculatorStyle } from '../styling/CalculatorStyle';
import { EMPTY_NUMBER } from '../utils/constant';
import I18n from 'react-native-i18n';
import { GlobalStyle } from '../styling/Global';

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
    } else if (symbol === '') {
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
    // check num length
    if (newNumber.length > 9 && !['+', '-', '*', '/'].includes(num)) {
      return;
    }
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

  return (
    <>
      {/* first line */}
      <View style={[GlobalStyle.row, CalculatorStyle.cont]}>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrBtn
              : CalculatorStyle.button
          }
          onPress={() => {
            calculate('7');
          }}>
          <Text style={CalculatorStyle.text}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrBtn
              : CalculatorStyle.button
          }
          onPress={() => {
            calculate('8');
          }}>
          <Text style={CalculatorStyle.text}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrBtn
              : CalculatorStyle.button
          }
          onPress={() => {
            calculate('9');
          }}>
          <Text style={CalculatorStyle.text}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrSymbolBtn
              : CalculatorStyle.symbolButton
          }
          onPress={() => {
            calculate('+');
          }}>
          <Text style={CalculatorStyle.text}>+</Text>
        </TouchableOpacity>
      </View>
      {/* second line */}
      <View style={[GlobalStyle.row, CalculatorStyle.cont]}>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrBtn
              : CalculatorStyle.button
          }
          onPress={() => {
            calculate('4');
          }}>
          <Text style={CalculatorStyle.text}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrBtn
              : CalculatorStyle.button
          }
          onPress={() => {
            calculate('5');
          }}>
          <Text style={CalculatorStyle.text}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrBtn
              : CalculatorStyle.button
          }
          onPress={() => {
            calculate('6');
          }}>
          <Text style={CalculatorStyle.text}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrSymbolBtn
              : CalculatorStyle.symbolButton
          }
          onPress={() => {
            calculate('-');
          }}>
          <Text style={CalculatorStyle.text}>-</Text>
        </TouchableOpacity>
      </View>
      {/* third line */}
      <View style={[GlobalStyle.row, CalculatorStyle.cont]}>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrBtn
              : CalculatorStyle.button
          }
          onPress={() => {
            calculate('1');
          }}>
          <Text style={CalculatorStyle.text}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrBtn
              : CalculatorStyle.button
          }
          onPress={() => {
            calculate('2');
          }}>
          <Text style={CalculatorStyle.text}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrBtn
              : CalculatorStyle.button
          }
          onPress={() => {
            calculate('3');
          }}>
          <Text style={CalculatorStyle.text}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrSymbolBtn
              : CalculatorStyle.symbolButton
          }
          onPress={() => {
            calculate('*');
          }}>
          <Text style={CalculatorStyle.text}>x</Text>
        </TouchableOpacity>
      </View>
      {/* fourth line */}
      <View style={[GlobalStyle.row, CalculatorStyle.cont]}>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrBtn
              : CalculatorStyle.button
          }
          onPress={() => {
            calculate('.');
          }}>
          <Text style={CalculatorStyle.text}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrBtn
              : CalculatorStyle.button
          }
          onPress={() => {
            calculate('0');
          }}>
          <Text style={CalculatorStyle.text}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrBtn
              : CalculatorStyle.button
          }
          onLongPress={() => {
            cleanCalculator();
          }}
          onPress={() => {
            calculate('DELETE');
          }}>
          <Text style={CalculatorStyle.deleteText}>
            {I18n.t('calculatorDelete')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'android'
              ? CalculatorStyle.adrSymbolBtn
              : CalculatorStyle.symbolButton
          }
          onPress={() => {
            calculate('/');
          }}>
          <Text style={CalculatorStyle.text}>÷</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
