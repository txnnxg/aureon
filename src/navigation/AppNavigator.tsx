import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas de Autenticação
import { WelcomeScreen } from '@/screens/Auth/WelcomeScreen';
import { LoginScreen } from '@/screens/Auth/LoginScreen';
import { CadastroScreen } from '@/screens/Auth/CadastroScreen';

// Telas do Funil de Treino
import { MonteTreinoScreen } from '@/screens/CriacaoTreino/MonteTreinoScreen';
import { FrequenciaScreen } from '@/screens/CriacaoTreino/FrequenciaScreen';
import { ObjetivoScreen } from '@/screens/CriacaoTreino/ObjetivoScreen';
import { DiaADiaScreen } from '@/screens/CriacaoTreino/DiaADiaScreen';
import { ObservacaoScreen } from '@/screens/CriacaoTreino/ObservacaoScreen';

// Telas Principais
import { HomeScreen } from '@/screens/Main/HomeScreen';
import { PerfilScreen } from '@/screens/Main/PerfilScreen';
import { DietaScreen } from '@/screens/Main/DietaScreen';

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
      <Stack.Screen name="Observacao" component={ObservacaoScreen} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ animation: 'none' }} />
      <Stack.Screen name="Dieta" component={DietaScreen} options={{ animation: 'none' }} />
    </Stack.Navigator>
  );
}