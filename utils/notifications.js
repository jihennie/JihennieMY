// utils/notifications.js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// 알림 권한 요청 및 알림 채널 생성
export async function requestNotificationPermission() {
  if (!Device.isDevice) return;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('알림 권한이 거부됨');
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: '기본 알림',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
}

// 매주 월요일 오전 9시 알림 등록
export async function scheduleWeeklyHealthCheck() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '오늘의 건강상태를 체크하세요 🩺',
      body: '앱을 열고 건강 상태를 기록해보세요!',
      sound: 'default',
    },
    trigger: {
      weekday: 2, // 월요일 (일:1, 월:2, ..., 토:7)
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });
}
