// screens/MedicationMapScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { requestNotificationPermission, scheduleWeeklyHealthCheck } from '../utils/notifications';

export default function MedicationMapScreen({ navigation }) {
  const [medName, setMedName] = useState('');
  const [medTime, setMedTime] = useState(new Date());
  const [medications, setMedications] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
  const setupNotifications = async () => {
    await requestNotificationPermission();
    await scheduleWeeklyHealthCheck();
  };
  setupNotifications();
}, []);

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('푸시 알림 권한이 필요합니다.');
      }
    }
  };

  const scheduleNotification = async (name, date) => {
    const trigger = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      repeats: true, // 매일 반복
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '약 복용 알림',
        body: `${name} 복용 시간입니다!`,
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

    setMedications([...medications, newMed]);
    setMedName('');
    setMedTime(new Date());

    await scheduleNotification(newMed.name, medTime);
  };

  const removeMedication = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Set medication alarm</Text>

      <TextInput
        placeholder="약 이름"
        style={styles.input}
        value={medName}
        onChangeText={setMedName}
      />

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timeButton}>
        <Text style={styles.timeText}>복용 시간: {medTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
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

      <Button title="복약 추가" onPress={addMedication} />

      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.medItem}>
            <Text>{item.name} - {item.time}</Text>
            <TouchableOpacity onPress={() => removeMedication(item.id)}>
              <Text style={styles.delete}>삭제</Text>
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