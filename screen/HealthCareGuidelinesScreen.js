// screens/HealthCareGuidelinesScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HealthCareGuidelinesScreen({ navigation }) {
  const tips = [
    "매일 30분 이상 걷기 운동을 하세요.",
    "가공식품보다 신선한 야채와 과일을 섭취하세요.",
    "담배와 술은 건강에 해로우니 피하는 것이 좋습니다.",
    "수면은 하루 7~8시간 충분히 취하세요.",
    "정기적인 건강검진을 받으세요.",
    "스트레스를 줄이는 명상이나 취미 활동을 하세요.",
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 왼쪽 상단 Back 버튼 */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Health Care Guidelines</Text>
      {tips.map((tip, index) => (
        <Text key={index} style={styles.tip}>• {tip}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80, // 상단 Back 버튼 여백 확보
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40, // iPad나 상태바 고려
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tip: {
    marginBottom: 10,
    fontSize: 16,
  },
});