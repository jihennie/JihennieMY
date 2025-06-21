// screens/ConsentScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';

export default function ConsentScreen({ navigation }) {
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (agreed) {
      navigation.replace('Loading'); // 동의하면 다음 화면으로
    } else {
      Alert.alert('Consent Required', 'Please agree to continue.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consent to Personal Data Collection</Text>
      <Text style={styles.description}>
        This app collects personal health information.{'\n'}
        You have full rights to view, edit, and delete your data at any time.
      </Text>

      <TouchableOpacity onPress={() => setAgreed(!agreed)} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, agreed && styles.checkboxChecked]} />
        <Text style={styles.checkboxLabel}>I Agree</Text>
      </TouchableOpacity>

      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  description: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#555',
    marginRight: 10
  },
  checkboxChecked: {
    backgroundColor: '#4caf50'
  },
  checkboxLabel: { fontSize: 16 }
});
