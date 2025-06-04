// screens/RiskInputScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export default function RiskInputScreen({ navigation }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [cholesterol, setCholesterol] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');

  const calculateRisk = () => {
    const ageNum = parseInt(age);
    const chol = parseInt(cholesterol);
    const bp = parseInt(bloodPressure);

    if (isNaN(ageNum) || isNaN(chol) || isNaN(bp)) {
      alert('모든 값을 올바르게 입력해주세요.');
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
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={styles.title}>🧮 Framingham 위험도 계산</Text>

        <Text style={styles.label}>성별</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(value) => setGender(value)}
          style={styles.picker}
        >
          <Picker.Item label="남성" value="male" />
          <Picker.Item label="여성" value="female" />
        </Picker>

        <Text style={styles.label}>나이</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholder="예: 45"
        />

        <Text style={styles.label}>총 콜레스테롤 (mg/dL)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cholesterol}
          onChangeText={setCholesterol}
          placeholder="예: 200"
        />

        <Text style={styles.label}>수축기 혈압 (mmHg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={bloodPressure}
          onChangeText={setBloodPressure}
          placeholder="예: 120"
        />

        <View style={styles.buttonContainer}>
          <Button title="위험도 계산하기 →" onPress={calculateRisk} color="#2563EB" />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fafb',
    flexGrow: 1,
    justifyContent: 'center',
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
    borderRadius: 8,
    overflow: 'hidden',
  },
});