import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

export function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  return (
    <LinearGradient
      colors={['#FF9900BD', '#2E1F04', '#000000']} 
      
      start={{ x: 0, y: 0 }} 
      
      // 1. Mudamos o X para 0.5. Isso faz a luz descer mais reta e menos "fatiada" na diagonal
      end={{ x: 1, y: 1 }} 
      
      // 2. A MÁGICA: Espaçamos a transição!
      // Agora o amarelo tem até 45% da tela para virar marrom calmamente,
      // e o marrom só vira preto total lá nos 85% da tela.
      locations={[0, 0.45, 0.85]} 
      
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  }
});