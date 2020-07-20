import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Button({ disabled, onPress, title, styles }) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Text style={[buttonStyles.default, styles]}>{title}</Text>
    </TouchableOpacity>
  );
}

const buttonStyles = StyleSheet.create({
  default: {
    backgroundColor: '#44BBA4',
    color: 'white',
    fontWeight: 'bold',
    padding: 15,
    borderRadius: 5,
    textAlign: 'center',
  },
});
