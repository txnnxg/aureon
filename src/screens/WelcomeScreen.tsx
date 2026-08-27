import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
// Importamos o seu botão que já está pronto e estilizado!
import { PrimaryButton } from '../components/PrimaryButton';


export function WelcomeScreen() {
  const navigation = useNavigation<any>(); // <any> desliga o choro do TypeScript temporariamente
  const { height } = useWindowDimensions();

  return (
    // 1. O Fundo agora é uma Imagem, não mais uma View ou Gradient puro
    <ImageBackground 
      source={require('../assets/bg-welcome.png')} // Ajuste a extensão se for .png
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        // 1. Dourado forte no topo (0.8 de opacidade)
        // 2. Marrom muito escuro no meio (0.8 de opacidade)
        // 3. Preto puro na base (1.0 de opacidade)
        colors={['rgba(255, 153, 0, 0.74)', 'rgba(20, 12, 0, 0.8)', '#000000']}
        
        // Espaçamos a transição: o marrom começa a dominar no meio (50%) 
        // e o preto puro só toma conta lá embaixo (85%)
        locations={[0, 0.5, 0.85]}
        
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.container, { paddingTop: height * 0.10 }]}>
        
        {/* 3. A parte de Cima (Logo e Títulos) */}
        <View style={styles.header}>
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
          <Text style={styles.titleBold}>ALCANCE</Text>
          <Text style={styles.titleLight}>SEU MÁXIMO</Text>
        </View>

        {/* 4. A parte de Baixo (Botão e Menu Inferior) */}
        <View style={styles.footer}>
          
          {/* Reutilizamos o seu botão primário aqui! */}
          <PrimaryButton 
            title="INICIAR" 
            onPress={() => navigation.navigate('Perfil', { currentStep: 1, totalSteps: 2 })}
          />

          {/* O Menu inferior com os 3 ícones */}
          <View style={styles.bottomMenu}>
            
            {/* Botão CRIAR CONTA envia para o Cadastro (Fluxo de 3 barras, Passo 1) */}
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('Cadastro', { currentStep: 1, totalSteps: 3 })}
            >
              <Feather name="user" size={22} color="#C59B27" />
              <Text style={styles.menuText}>Criar Conta</Text>
            </TouchableOpacity>

            {/* ... os outros botões continuam iguais */}

            {/* A linhazinha divisória */}
            <View style={styles.separator} />

            <TouchableOpacity style={styles.menuItem}>
              <Feather name="mail" size={22} color="#C59B27" />
              <Text style={styles.menuText}>Convidado</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

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
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    // JustifyContent space-between empurra o cabeçalho pro topo e o footer pra baixo
    justifyContent: 'space-between', 
    paddingHorizontal: 35,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 30,
    marginBottom: 30,
  },
  titleBold: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
    lineHeight: 50, // Junta um pouco as duas linhas de texto
  },
  titleLight: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '300', // Fonte mais fina para dar contraste
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  footer: {
    width: '100%',
  },
  bottomMenu: {
    flexDirection: 'row', // Coloca os itens um ao lado do outro
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
  },
  separator: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Uma linha branca bem transparente
  }
});