import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { BackgroundWrapper } from '../components/BackgroundWrapper';
import { ProgressBar } from '../components/ProgressBar';

export function MonteTreinoScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { height } = useWindowDimensions();

  // Lê as variáveis dinâmicas de progresso (ex: Passo 3 de 3, ou Passo 2 de 2)
  const currentStep = route.params?.currentStep || 3;
  const totalSteps = route.params?.totalSteps || 3;

  return (
    <BackgroundWrapper>
      <View style={[styles.container, {paddingTop: height * 0.08}]}>
        
        {/* Logo */}
        <ScreenHeader 
          title="MONTE SEU TREINO" 
          subtitle="como você quer montar seu treino hoje?" 
        />

        {/* Barra de progresso automática */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        {/* Lista de Opções */}
        <View style={styles.optionsContainer}>
          
          {/* BOTÃO EM DESTAQUE (I.A) ILUMINADO */}
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.glowWrapper}
            onPress={() => navigation.navigate('Frequencia')}
            >
            
            <LinearGradient
              // O degradê começa com um dourado forte na esquerda e some para a direita
              colors={['rgba(197, 155, 39, 0.4)', 'rgba(20, 12, 0, 0.9)']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.aiButtonGradient}
            >
              {/* Deixei o ícone com um tom de dourado um pouco mais claro para destacar mais */}
              <MaterialCommunityIcons name="brain" size={40} color="#FAD973" style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>CRIE TREINOS COM I.A</Text>
                <Text style={styles.cardSubtitle}>deixe a IA acompanhar seu ritmo</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* BOTÃO: TREINOS PRONTOS */}
          <TouchableOpacity style={styles.optionCard}>
            <MaterialCommunityIcons name="format-list-bulleted" size={40} color="#C59B27" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>TREINOS PRONTOS</Text>
              <Text style={styles.cardSubtitle}>treinos que se encaixa com você</Text>
            </View>
          </TouchableOpacity>

          {/* BOTÃO: CRIE SEU TREINO */}
          <TouchableOpacity style={styles.optionCard}>
            <MaterialCommunityIcons name="plus-circle-outline" size={40} color="#C59B27" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>CRIE SEU TREINO</Text>
              <Text style={styles.cardSubtitle}>personalize do seu jeito</Text>
            </View>
          </TouchableOpacity>

          {/* BOTÃO: COMEÇAR SEM TREINO */}
          <TouchableOpacity style={styles.optionCard}>
            <MaterialCommunityIcons name="clipboard-edit-outline" size={40} color="#C59B27" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>COMEÇAR SEM TREINO</Text>
              <Text style={styles.cardSubtitle}>personalize do seu jeito</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  logo: {
    width: 120,
    height: 25,
    alignSelf: 'center',
    marginBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 10,
    gap: 15, // Espaçamento automático entre os botões
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 12, 0, 0.8)', // Fundo escuro normal
    borderWidth: 1,
    borderColor: '#C59B27',
    borderRadius: 15,
    padding: 15,
  },
  // O TRUQUE DO BRILHO PARA O BOTÃO DA IA FICA AQUI:
  // Container que envolve o botão iluminado
  glowWrapper: {
    borderRadius: 15,
    // Essa sombra funciona melhor e não cria o "caixote escuro" no texto
    shadowColor: '#C59B27', 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10, 
  },
  // O layout interno do botão I.A (parecido com o optionCard normal, mas com borda acesa)
  aiButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#FAD973', // Borda dourada brilhante
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  cardSubtitle: {
    color: '#A0A0A0',
    fontSize: 12,
  },
});