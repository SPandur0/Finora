import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PropsComponent({ title, subtitle, color = '#2563eb' }) {
  return (
    <View style={[styles.card, { borderColor: color }]}> 
      <Text style={[styles.title, { color }]}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
  },
});
