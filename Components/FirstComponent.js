import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FirstComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>First Component</Text>
      <Text style={styles.text}>Dette er den første komponent i projektet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    margin: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#374151',
  },
});
