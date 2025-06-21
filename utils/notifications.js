import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// 알림 권한 요청 및 안드로이드 알림 채널 생성
export async function requestNotificationPermission() {
  if (!Device.isDevice) return;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Notification permission denied');
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default Notifications',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
}

// 매주 월요일 오전 9시에 반복 알림 예약
export async function scheduleWeeklyHealthCheck() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🩺 Weekly Health Check',
      body: 'Open the app and log your health status!',
      sound: 'default',
    },
    trigger: {
      weekday: 2, // 월요일 (Sun: 1, Mon: 2, ..., Sat: 7)
      hour: 9,
      minute: 0,
      repeats: true, //반복 알림
    },
  });
}
