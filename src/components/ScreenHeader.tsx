import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string; // O '?' torna o subtítulo opcional!
  logoVariant?: 'dark' | 'golden';
}

export function ScreenHeader({ title, subtitle, logoVariant = 'dark' }: ScreenHeaderProps) {

  // A condição que seleciona a imagem correta para o Metro Bundler
  // Quando a tela estiver escura no fundo colocar essa tag <ScreenHeader logoVariant="golden" title="EXEMPLO"/>.
  const logoSource = logoVariant === 'golden' 
    ? require('@/assets/logo_dourada.png') 
    : require('@/assets/logo.png');

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain" 
      />
      <Text style={styles.title}>{title}</Text>
      
      {/* O React Native só vai desenhar esta linha se o 'subtitle' for enviado */}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
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