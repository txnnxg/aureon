import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
// Adicionamos a importação dos ícones do MaterialCommunityIcons
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { BackgroundWrapper } from '@/components/BackgroundWrapper';
import { ProgressBar } from '@/components/ProgressBar';

export function PerfilScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { height } = useWindowDimensions();
  
  const currentStep = route.params?.currentStep || 1;
  const totalSteps = route.params?.totalSteps || 2;

  return (
    <BackgroundWrapper>
      <View style={[styles.container, { paddingTop: height * 0.08 }]}>

        <ScreenHeader 
          title="SELECIONE SEU PERFIL" 
          subtitle="quem vai treinar hoje?" 
        />

        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <View style={styles.cardsContainer}>
          
          {/* CARTÃO: MEMBRO */}
          <TouchableOpacity 
            style={styles.card}
            // Repassa o totalSteps, e soma +1 no currentStep
            onPress={() => navigation.navigate('MonteTreino', { 
            currentStep: currentStep + 1, 
            totalSteps: totalSteps 
         })}
          >
            <Image 
              source={require('@/assets/membro.png')} // Lembre de checar se a sua é .png ou .jpg
              style={styles.cardImage}
              resizeMode="contain"
            />
            <View style={styles.cardContent}>
              
              <Text style={styles.cardTitle}>MEMBRO</Text>
              
              {/* Linha Divisória Dourada */}
              <View style={styles.divider} />
              
              <Text style={styles.cardText}>Ainda não tem treino e dieta pra Seguir?</Text>
              
              {/* Bloco de Ação: Ícone + Texto */}
              <View style={styles.actionContainer}>
                <MaterialCommunityIcons name="dumbbell" size={26} color="#C59B27" />
                <Text style={styles.cardActionGold}>Montamos pra você</Text>
              </View>

            </View>
          </TouchableOpacity>

          {/* CARTÃO: PROFISSIONAL */}
          <TouchableOpacity style={styles.card}>
            <Image 
              source={require('@/assets/profissional.png')} 
              style={styles.cardImage}
              resizeMode="contain"
            />
            <View style={styles.cardContent}>
              
              <Text style={styles.cardTitle}>PROFISSIONAL</Text>
              
              {/* Linha Divisória Dourada */}
              <View style={styles.divider} />
              
              <Text style={styles.cardText}>Monte treinos e dietas 10x mais rápido para seus alunos</Text>
              
              {/* Bloco de Ação: Apenas o Ícone de Gráfico */}
              <View style={styles.actionContainer}>
                <MaterialCommunityIcons name="chart-line" size={32} color="#C59B27" />
              </View>

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
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginTop: 10,
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(20, 12, 0, 0.8)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C59B27',
    height: 330, // Aumentei um pouquinho para o ícone respirar melhor
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
    transform: [{ scale: 1.9 }, { translateY: 15 }],
  },
  cardContent: {
    flex: 1,
    padding: 12, // Diminuí um pouco o padding interno para caber tudo confortavelmente
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  // ESTILO NOVO: A linha que separa o título do texto
  divider: {
    height: 1,
    backgroundColor: 'rgba(197, 155, 39, 0.4)', // Dourado com transparência
    width: '50%', // Não ocupa a largura toda, fica centralizado e elegante
    marginVertical: 10, // Espaço em cima e embaixo da linha
  },
  cardText: {
    color: '#A0A0A0',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 16,
  },
  // ESTILO NOVO: Container que empurra os ícones para o fundo
  actionContainer: {
    marginTop: 'auto', // O "auto" empurra esse bloco lá para o final do cartão
    alignItems: 'center',
    gap: 4, // Espacinho entre o ícone e o texto (no caso do membro)
  },
  cardActionGold: {
    color: '#C59B27',
    fontSize: 11,
    textAlign: 'center',
  }
});