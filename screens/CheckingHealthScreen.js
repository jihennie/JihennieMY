import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

export default function CheckingHealthScreen({ navigation }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [exercise, setExercise] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await AsyncStorage.getItem('healthData');
    if (data) {
      setHistory(JSON.parse(data));
    }
  };

  const saveData = async () => {
    const entry = {
      date: new Date().toISOString(),
      height: parseFloat(height),
      weight: parseFloat(weight),
      exercise: parseInt(exercise),
      bloodSugar: parseFloat(bloodSugar),
    };
    const newHistory = [...history, entry];
    setHistory(newHistory);
    await AsyncStorage.setItem('healthData', JSON.stringify(newHistory));
    Alert.alert('Saved', 'Your health data has been saved.');
  };

  const clearData = async () => {
    await AsyncStorage.removeItem('healthData');
    setHistory([]);
    Alert.alert('Cleared', 'All health data has been deleted.');
  };

  const recentData = history.slice(-4);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="arrow-back" size={24} onPress={() => navigation.goBack()} />
      <Text style={styles.title}>📋 Health Check</Text>

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={height} onChangeText={setHeight} />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={weight} onChangeText={setWeight} />

      <Text style={styles.label}>Exercise Frequency (per week)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={exercise} onChangeText={setExercise} />

      <Text style={styles.label}>Blood Sugar (mg/dL)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={bloodSugar} onChangeText={setBloodSugar} />

      <Button title="Save Data" onPress={saveData} />
      <View style={{ marginTop: 10 }} />
      <Button title="Clear Data" color="red" onPress={clearData} />

      {recentData.length > 1 && (
        <>
          <Text style={styles.chartTitle}>Recent Health Trends</Text>
          <LineChart
            data={{
              labels: recentData.map(d => new Date(d.date).toLocaleDateString()),
              datasets: [
                { data: recentData.map(d => d.weight), color: () => 'rgba(255,99,132,1)', strokeWidth: 2, label: 'Weight' },
              ],
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisSuffix="kg"
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: '5', strokeWidth: '2', stroke: '#ffa726' },
            }}
            style={{ marginVertical: 16, borderRadius: 16 }}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { marginTop: 12, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    borderRadius: 8,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
});
