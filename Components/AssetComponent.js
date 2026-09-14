import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function AssetComponent() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Dette billede kommer fra assets-mappen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 16,
    padding: 20,
    backgroundColor: '#eef2ff',
    borderRadius: 12,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: '#1f2937',
    textAlign: 'center',
  },
});
