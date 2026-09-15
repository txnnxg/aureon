import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store'; // <-- Importação obrigatória adicionada
import { PrimaryButton } from '@/components/PrimaryButton';

export function WelcomeScreen() {
  const navigation = useNavigation<any>();
  const { height } = useWindowDimensions();

  // <-- Lógica Inteligente Adicionada Aqui -->
  const handleIniciar = async () => {
    try {
      const pacoteSalvo = await SecureStore.getItemAsync('treino_visitante');
      if (pacoteSalvo) {
        // Se tem treino, vai direto pro Blur
        navigation.navigate('Home');
      } else {
        // Se não tem, vai preencher o funil
        navigation.navigate('MonteTreino', { currentStep: 1, totalSteps: 2 });
      }
    } catch (error) {
      navigation.navigate('MonteTreino', { currentStep: 1, totalSteps: 2 });
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/bg-welcome.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(255, 153, 0, 0.74)', 'rgba(20, 12, 0, 0.8)', '#000000']}
        locations={[0, 0.5, 0.85]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.container, { paddingTop: height * 0.10 }]}>
        <View style={styles.header}>
          <Image
            source={require('@/assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.titleBold}>ALCANCE</Text>
          <Text style={styles.titleLight}>SEU MÁXIMO</Text>
        </View>

        <View style={styles.footer}>
          {/* <-- Botão atualizado com a função inteligente --> */}
          <PrimaryButton
            title="INICIAR"
            onPress={handleIniciar} 
          />

          <View style={styles.bottomMenu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Cadastro', { currentStep: 1, totalSteps: 3 })}
            >
              <Feather name="user" size={22} color="#C59B27" />
              <Text style={styles.menuText}>Criar Conta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Login')}
            >
              <Feather name="log-in" size={22} color="#C59B27" />
              <Text style={styles.menuText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%' },
  container: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 35, paddingBottom: 60 },
  header: { alignItems: 'center' },
  logo: { width: 140, height: 30, marginBottom: 30 },
  titleBold: { color: '#FFFFFF', fontSize: 48, fontWeight: '900', letterSpacing: 1, textShadowColor: 'rgba(0, 0, 0, 0.8)', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 10, lineHeight: 50 },
  titleLight: { color: '#FFFFFF', fontSize: 32, fontWeight: '300', textShadowColor: 'rgba(0, 0, 0, 0.8)', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 10 },
  footer: { width: '100%' },
  bottomMenu: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  menuItem: { alignItems: 'center', flex: 1 },
  menuText: { color: '#FFFFFF', fontSize: 12, marginTop: 8, fontWeight: '500' },
  separator: { width: 1, height: 30, backgroundColor: 'rgba(255, 255, 255, 0.3)' }
});