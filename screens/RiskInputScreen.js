import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function RiskInputScreen({ navigation }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [cholesterol, setCholesterol] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');

  const calculateRisk = () => {
    if (!age || !cholesterol || !bloodPressure) {
      alert('Please fill in all fields.');
      return;
    }

    const ageNum = parseInt(age, 10);
    const chol = parseInt(cholesterol, 10);
    const bp = parseInt(bloodPressure, 10);

    if (isNaN(ageNum) || isNaN(chol) || isNaN(bp)) {
      alert('Please enter valid numbers.');
      return;
    }

    let risk = 0;
    risk += ageNum * 0.1;
    risk += gender === 'male' ? 5 : 3;
    risk += chol * 0.05;
    risk += bp * 0.04;

    navigation.navigate('RiskResult', { risk: Math.round(risk) });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>🧮 Framingham Risk Score</Text>

        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(value) => setGender(value)}
          style={styles.picker}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholder="e.g. 45"
        />

        <Text style={styles.label}>Total Cholesterol (mg/dL)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cholesterol}
          onChangeText={setCholesterol}
          placeholder="e.g. 200"
        />

        <Text style={styles.label}>Systolic Blood Pressure (mmHg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={bloodPressure}
          onChangeText={setBloodPressure}
          placeholder="e.g. 120"
        />

        <View style={styles.buttonContainer}>
          <Button title="Calculate Risk →" onPress={calculateRisk} color="#2563EB" />
        </View>

        <Text style={styles.privacyNotice}>
          📘 Privacy Policy {'\n'}
          - Collected items: heart rate, blood pressure, activity data, etc. {'\n'}
          - Purpose: Health risk assessment and management features {'\n'}
          - Third-party sharing: None {'\n'}
          - Security: Encrypted storage and transmission {'\n'}
          - Rights: View, edit, or delete your data at any time {'\n'}
          - Contact: a01071604586@gmail.com
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  privacyNotice: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 20,
    textAlign: 'left',
  },
});
