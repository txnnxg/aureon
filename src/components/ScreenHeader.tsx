import React from 'react';
// 1. Importamos o componente Image do react-native
import { View, Text, StyleSheet, Image } from 'react-native';

interface ScreenHeaderProps {
  title: string;
  subtitle: string;
}

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      
      {/* 2. Colocamos a imagem no lugar do texto! */}
      <Image 
        source={require('../assets/logo.png')} // Aponta para a imagem que você salvou
        style={styles.logo}
        resizeMode="contain" // Isso garante que a imagem não fique esticada ou deformada
      />
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 20, 
    paddingBottom: 30, 
  },
  // 3. Estilizamos a imagem (você pode ajustar a largura e altura como preferir)
  logo: {
    width: 150, 
    height: 35, 
    marginBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)', 
    textShadowOffset: { width: 0, height: 4 }, 
    textShadowRadius: 10, 
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)', 
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 20, 
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  }
});