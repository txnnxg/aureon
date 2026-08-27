import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importamos o nosso mapa organizador
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    // O SafeAreaProvider envolve tudo para proteger as bordas do celular
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}