import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function InputComponent() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Skriv noget:</Text>
      <TextInput
        style={styles.input}
        placeholder="Indtast tekst..."
        value={text}
        onChangeText={setText}
      />
      <Text style={styles.output}>Du skrev: {text || 'intet endnu'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#f8fafc',
  },
  output: {
    fontSize: 14,
    color: '#374151',
  },
});
