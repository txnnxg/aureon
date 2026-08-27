import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Todas as telas ficam importadas AQUI agora
import { LoginScreen } from '../screens/LoginScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { CadastroScreen } from '../screens/CadastroScreen'; 
import { PerfilScreen } from '../screens/PerfilScreen';
import { MonteTreinoScreen } from '../screens/MonteTreinoScreen';
import { FrequenciaScreen } from '../screens/FrequenciaScreen';
import { ObjetivoScreen } from '../screens/ObjetivoScreen';
import { DiaADiaScreen } from '../screens/DiaADiaScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="Perfil" component={PerfilScreen} />
      <Stack.Screen name="MonteTreino" component={MonteTreinoScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Frequencia" component={FrequenciaScreen} />
      <Stack.Screen name="Objetivo" component={ObjetivoScreen} />
      <Stack.Screen name="DiaADia" component={DiaADiaScreen} />
    </Stack.Navigator>
  );
}