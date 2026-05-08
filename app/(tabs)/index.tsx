import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Scam detection function
const detectScam = (message: string) => {
  if (!message.trim()) {
    return { risk: 'Safe', confidence: 100, reason: 'Empty message' };
  }

  // Define phishing keywords (case-insensitive)
  const keywords = ['urgent', 'click here', 'bank', 'password', 'winner'];
  
  // Convert message to lowercase for case-insensitive matching
  const lowerMessage = message.toLowerCase();
  
  // Count how many keywords are found
  let keywordCount = 0;
  const foundKeywords: string[] = [];
  
  keywords.forEach(keyword => {
    if (lowerMessage.includes(keyword.toLowerCase())) {
      keywordCount++;
      foundKeywords.push(keyword);
    }
  });

  // Determine risk level and confidence based on keyword count
  let risk: 'Safe' | 'Suspicious' | 'Dangerous';
  let confidence: number;
  let reason: string;

  if (keywordCount === 0) {
    risk = 'Safe';
    confidence = 100;
    reason = 'No suspicious keywords detected';
  } else if (keywordCount === 1) {
    risk = 'Suspicious';
    confidence = 75;
    reason = `Found suspicious keyword: ${foundKeywords[0]}`;
  } else if (keywordCount === 2) {
    risk = 'Suspicious';
    confidence = 85;
    reason = `Found suspicious keywords: ${foundKeywords.join(', ')}`;
  } else {
    risk = 'Dangerous';
    confidence = Math.min(95, 70 + (keywordCount * 10));
    reason = `Found ${keywordCount} suspicious keywords: ${foundKeywords.join(', ')}`;
  }

  return { risk, confidence, reason };
};

export default function HomeScreen() {
  const [message, setMessage] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  const analyzeMessage = () => {
    const result = detectScam(message);
    
    if (result.reason === 'Empty message') {
      setAnalysisResult('Please enter a message to analyze.');
    } else {
      setAnalysisResult(
        `Risk Level: ${result.risk}\nConfidence: ${result.confidence}%\n${result.reason}`
      );
    }
  };

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
      <ThemedView style={styles.buttonContainer}>
        <Button title="Analyze Message" onPress={analyzeMessage} />
      </ThemedView>
      {analysisResult ? (
        <ThemedView style={styles.resultContainer}>
          <ThemedText type="subtitle">Analysis Result:</ThemedText>
          <ThemedText>{analysisResult}</ThemedText>
        </ThemedView>
      ) : null}
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
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
  },
  resultContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});
