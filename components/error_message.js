import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function ErrorMessage({ error }) {
  if (error) {
    return <Text style={styles.errorMessage}>{error}</Text>;
  }
  return null;
}

const styles = StyleSheet.create({
  errorMessage: { color: 'red', fontSize: 12, marginLeft: 2 },
});
