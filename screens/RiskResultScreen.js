import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function RiskResultScreen({ route, navigation }) {
  const { risk } = route.params;

  const radius = 80;
  const strokeWidth = 15;
  const cx = 100;
  const cy = 100;
  const angle = Math.PI * (risk / 100);

  const x = cx + radius * Math.cos(Math.PI - angle);
  const y = cy - radius * Math.sin(Math.PI - angle);
  const largeArc = risk > 50 ? 1 : 0;

  const riskLevel =
    risk < 10 ? 'Low Risk' : risk < 20 ? 'Moderate Risk' : 'High Risk';
  const color =
    risk < 10 ? '#34d399' : risk < 20 ? '#facc15' : '#ef4444';

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your Risk Score</Text>

      <Svg width="200" height="100">
        {/* Gray background arc */}
        <Path
          d="M 20,100 A 80,80 0 0 1 180,100"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Colored arc based on risk */}
        <Path
          d={`M 20,100 A 80,80 0 ${largeArc} 1 ${x},${y}`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </Svg>

      <Text style={styles.percent}>{risk.toFixed(1)}%</Text>
      <Text style={styles.level}>{riskLevel}</Text>

      {riskLevel === 'High Risk' && (
        <Text style={styles.warning}>
          ⚠️ You are identified as high risk. Please visit a nearby hospital for professional care.
        </Text>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => navigation.navigate('CheckingHealth')}>
          <Text style={styles.link}>→ Check My Health</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MedicationMap')}>
          <Text style={styles.link}>→ Set Medication Reminder</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HealthCareGuidelines')}>
          <Text style={styles.link}>→ View Health Guidelines</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, alignItems: 'center', backgroundColor: '#fff' },
  backButton: { position: 'absolute', top: 30, left: 20 },
  backText: { fontSize: 28 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  percent: { fontSize: 36, fontWeight: 'bold', marginTop: 10 },
  level: { fontSize: 20, marginVertical: 10, color: '#555' },
  buttons: { marginTop: 30, alignItems: 'center', gap: 12 },
  link: { fontSize: 16, color: '#2563eb', fontWeight: 'bold' },
  warning: {
    marginTop: 20,
    fontSize: 16,
    color: '#b91c1c',
    textAlign: 'center',
    fontWeight: '600',
    backgroundColor: '#fee2e2',
    padding: 10,
    borderRadius: 8,
  },
});
