// screens/HealthCareGuidelinesScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HealthCareGuidelinesScreen({ navigation }) {
  const tips = [
    "🫀What is cardiovascular disease (CVD)?", 
    "Cardiovascular disease (CVD) refers to all diseases that occur in the heart and blood vessels.", 
    "Representative examples include myocardial infarction, stroke, hypertension, and angina.",
    "",
    "⚠️Be especially careful of these people!", 
    "- People with high blood pressure",
    "- People with high cholesterol", 
    "- People with diabetes", 
    "- People who smoke", 
    "- People with a history of heart disease in their family",
    "- People who rarely exercise", 
    "",
    "✅How can I prevent it?",
    "- Eat lightly (don't eat salty food)",
    "- Walk for about 30 minutes a day",
    "- Quit smoking",
    "- Reduce stress, get enough sleep",
    "- Go to the hospital for a checkup at least once a year!",
    "- If you change little by little, you can keep your heart healthy for a long time.",
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