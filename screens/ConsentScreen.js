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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConsentScreen({ navigation }) {
  const [agreed, setAgreed] = useState(false);

  const handleContinue = async () => {
    if (agreed) {
      try {
        await AsyncStorage.setItem('consentGiven', 'true');
        navigation.replace('Loading');
      } catch (e) {
        Alert.alert('오류', '동의 상태 저장에 실패했습니다.');
      }
    } else {
      Alert.alert('동의 필요', '계속하려면 동의해 주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>개인정보 수집 및 권리 안내</Text>
      <Text style={styles.description}>
        사용자의 개인 정보 수집 및 어플의 권리{'\n'}
        (개인 건강 데이터를 언제든지 보고, 수정하고, 삭제할 수 있는 기본적인 권리)
      </Text>

      <TouchableOpacity onPress={() => setAgreed(!agreed)} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, agreed && styles.checkboxChecked]} />
        <Text style={styles.checkboxLabel}>동의합니다</Text>
      </TouchableOpacity>

      <Button title="계속하기" onPress={handleContinue} />
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
