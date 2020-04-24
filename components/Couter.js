import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react';
import Colors from '../constants/Colors';

const CounterButton = ({ min, max, count, onPress, type, minus, plus, minusIcon, plusIcon }) => {

  const onPressButton = () => {
    const number = isMinus() ? count - 1 : count + 1;

    return onPress(number);
  }

  const isDisabled = () => {
    return (isMinus() ? min : max) === count;
  }

  const isMinus = () => {
    return type === '-';
  }

  const icon = () => {
    const icon = isMinus() ? minusIcon : plusIcon;
    if (icon) {
      return icon(isDisabled());
    }
    return (
      <Text style={Styles.buttonText}>
        {isMinus() ? minus : plus}
      </Text>
    );
  }

  const style = { opacity: isDisabled() ? 0.2 : 1 };

  return (
    <TouchableOpacity
      style={[Styles.touchable, style]}
      onPress={onPressButton}
      disabled={isDisabled()}
    >
      {icon()}
    </TouchableOpacity>
  )
}

export const Counter = ({ onChange, start = 0, min = 0, max = 10, minus = '-', plus = '+', minusIcon = null, plusIcon = null }) => {
  const [count, setCount] = useState(start);
  const onPress = count => {
    setCount(count);
    onChange && onChange(count);
  }
  return (
    <View style={Styles.container}>
      <CounterButton
        type="-"
        count={count}
        onPress={onPress}
        start={start}
        min={min}
        max={max}
        minus={minus}
        plus={plus}
        minusIcon={minusIcon}
        plusIcon={plusIcon}
      />

      <View style={Styles.count}>
        <Text style={Styles.countText}>{count}</Text>
      </View>

      <CounterButton
        type="+"
        count={count}
        onPress={onPress}
        start={start}
        min={min}
        max={max}
        minus={minus}
        plus={plus}
        minusIcon={minusIcon}
        plusIcon={plusIcon}
      />
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },

  countText: {
    fontSize: 16,
    color: Colors.textDark
  },

  count: {
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  touchable: {
    minWidth: 35,
    minHeight: 35,
    borderWidth: 1,
    borderColor: Colors.brand,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    fontSize: 15,
    color: Colors.brand
  }
});