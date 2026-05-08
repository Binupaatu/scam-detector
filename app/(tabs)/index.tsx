import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [message, setMessage] = useState('');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Scam Detector
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Enter your message here..."
        value={message}
        onChangeText={setMessage}
        multiline
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
});
