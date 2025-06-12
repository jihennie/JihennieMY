// screens/LoadingScreen.js
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
    {/* <Image source={{ uri: 'https://i.ibb.co/23VFJqb1/IMG-0352.jpg' }} style={styles.logo} /> */}
    <Text style={styles.title}>로딩화면</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 160, height: 160, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
});