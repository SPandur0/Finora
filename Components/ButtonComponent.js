import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function ButtonComponent() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.8 : 1 },
        ]}
        onPress={() => setCount((prev) => prev + 1)}
      >
        <Text style={styles.buttonText}>Klik her</Text>
      </Pressable>

      <Text style={styles.counter}>Trykket: {count} gange</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  counter: {
    marginTop: 12,
    fontSize: 15,
    color: '#374151',
  },
});
