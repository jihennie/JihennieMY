import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('RiskInput');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/IMG_0352.jpeg')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>로딩화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 200, height: 200, marginBottom: 20 }, // 너비/높이 조정
  title: { fontSize: 24, fontWeight: 'bold' },
});