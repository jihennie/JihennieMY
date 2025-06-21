import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ConsentScreen from './screens/ConsentScreen';
import LoadingScreen from './screens/LoadingScreen';
import RiskInputScreen from './screens/RiskInputScreen';
import RiskResultScreen from './screens/RiskResultScreen';
import CheckingHealthScreen from './screens/CheckingHealthScreen';
import MedicationMapScreen from './screens/MedicationMapScreen';
import HealthCareGuidelinesScreen from './screens/HealthCareGuidelinesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Consent" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Consent" component={ConsentScreen} />          
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="RiskInput" component={RiskInputScreen} />
        <Stack.Screen name="RiskResult" component={RiskResultScreen} />
        <Stack.Screen name="CheckingHealth" component={CheckingHealthScreen} />
        <Stack.Screen name="MedicationMap" component={MedicationMapScreen} />
        <Stack.Screen name="HealthCareGuidelines" component={HealthCareGuidelinesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
