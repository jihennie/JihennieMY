// screens/MedicationMapScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  requestNotificationPermission,
  scheduleWeeklyHealthCheck
} from '../utils/notifications';

export default function MedicationMapScreen({ navigation }) {
  const [medName, setMedName] = useState('');
  const [medTime, setMedTime] = useState(new Date());
  const [medications, setMedications] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await requestNotificationPermission();
      await scheduleWeeklyHealthCheck();
      await loadMedications(); // ✅ 복약 리스트 불러오기
    };
    setup();
  }, []);

  // 복약 리스트 저장
  const saveMedications = async (data) => {
    try {
      await AsyncStorage.setItem('medications', JSON.stringify(data));
    } catch (e) {
      console.error('💥 저장 실패:', e);
    }
  };

  // 복약 리스트 불러오기
  const loadMedications = async () => {
    try {
      const saved = await AsyncStorage.getItem('medications');
      if (saved) {
        setMedications(JSON.parse(saved));
      }
    } catch (e) {
      console.error('💥 불러오기 실패:', e);
    }
  };

  // 알림 설정
  const scheduleNotification = async (name, date) => {
    const trigger = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      repeats: true, // ✅ 매일 반복
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Medication Reminder',
        body: `It's time to take ${name}!`,
      },
      trigger,
    });
  };

  const addMedication = async () => {
    if (!medName.trim()) return;

    const newMed = {
      id: Date.now().toString(),
      name: medName,
      time: medTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedList = [...medications, newMed];
    setMedications(updatedList);
    await saveMedications(updatedList); // ✅ 저장

    setMedName('');
    setMedTime(new Date());

    await scheduleNotification(newMed.name, medTime); // ✅ 알림 설정
  };

  const removeMedication = async (id) => {
    const updated = medications.filter((med) => med.id !== id);
    setMedications(updated);
    await saveMedications(updated); // ✅ 저장
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Set Medication Alarm</Text>

      <TextInput
        placeholder="Medication Name"
        style={styles.input}
        value={medName}
        onChangeText={setMedName}
      />

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timeButton}>
        <Text style={styles.timeText}>
          Time to take: {medTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={medTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || medTime;
            setShowPicker(Platform.OS === 'ios');
            setMedTime(currentDate);
          }}
        />
      )}

      <Button title="Add Medication" onPress={addMedication} />

      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.medItem}>
            <Text>{item.name} - {item.time}</Text>
            <TouchableOpacity onPress={() => removeMedication(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: { position: 'absolute', top: 30, left: 20 },
  backText: { fontSize: 28 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  timeButton: { padding: 10, borderWidth: 1, borderColor: '#ccc', marginBottom: 10 },
  timeText: { fontSize: 16 },
  list: { marginTop: 20 },
  medItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  delete: { color: '#ef4444', fontWeight: 'bold' },
});
