import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import ErrorMessage from './error_message';

export default function Input({ error, style, ...rest }) {
  return (
    <View style={styles.formGroup}>
      <TextInput
        {...rest}
        style={[styles.input, style, error && styles.invalid]}
      />
      <ErrorMessage error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: { marginBottom: 15 },
  invalid: { borderColor: 'red', borderWidth: 1 },
  input: {
    padding: 10,
    borderRadius: 5,
    borderColor: '#E7E5DF',
    borderWidth: 0.5,
    textAlignVertical: 'top',
  },
});
