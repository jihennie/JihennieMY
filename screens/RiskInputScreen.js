import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // 추가한 경우

export default function RiskInputScreen({ navigation }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [cholesterol, setCholesterol] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');

  const calculateRisk = () => {
    if (!age || !cholesterol || !bloodPressure) {
      alert('모든 값을 입력해주세요.');
      return;
    }

    const ageNum = parseInt(age, 10);
    const chol = parseInt(cholesterol, 10);
    const bp = parseInt(bloodPressure, 10);

    if (isNaN(ageNum) || isNaN(chol) || isNaN(bp)) {
      alert('숫자를 올바르게 입력해주세요.');
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
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
        <TextInput style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} placeholder="예: 45" />
        <Text style={styles.label}>총 콜레스테롤 (mg/dL)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={cholesterol} onChangeText={setCholesterol} placeholder="예: 200" />
        <Text style={styles.label}>수축기 혈압 (mmHg)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={bloodPressure} onChangeText={setBloodPressure} placeholder="예: 120" />

        <View style={styles.buttonContainer}>
          <Button title="위험도 계산하기 →" onPress={calculateRisk} color="#2563EB" />
        </View>
      </KeyboardAvoidingView>
      {/* 개인정보 안내 문구 */}
      <Text style={styles.privacyNotice}>
        📘 개인정보 처리방침 {'\n'}
        - 수집 항목: 심박수, 혈압, 활동량 등 {'\n'}
        - 사용 목적: 건강 위험도 평가 및 관리 기능 제공 {'\n'}
        - 제3자 제공: 없음 {'\n'}
        - 보안 방법: 암호화된 저장 및 전송 {'\n'}
        - 정보주체 권리: 열람, 수정, 삭제 요청 가능 {'\n'}
        - 문의: support@yourapp.com
      </Text>
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
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  label: { marginBottom: 6, fontWeight: '600', marginTop: 12 },
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
  buttonContainer: { marginTop: 24, borderRadius: 8, overflow: 'hidden' },
  privacynotice: {
     marginTop: 30,
     fontSize: 12,
     color: '#6b7280',
     lineHeight: 20,
     textAlign: 'left'
  }
});