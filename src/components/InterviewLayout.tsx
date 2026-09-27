import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export interface InterviewLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  profissionalType: string;
  title: string;
  question: string;
  onBack: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
}

export function InterviewLayout({
  children,
  currentStep,
  totalSteps,
  profissionalType,
  title,
  question,
  onBack,
  onNext,
  isNextDisabled = false
}: InterviewLayoutProps) {
  const progressPercentage = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  return (
    <LinearGradient
      colors={['#D8A524', '#6B4708', '#120C02', '#000000']}
      locations={[0, 0.25, 0.6, 0.9]}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Image 
            source={require('@/assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
          <Text style={styles.profissionalText}>{profissionalType}</Text>
          <Text style={styles.stepText}>{currentStep} de {totalSteps}</Text>
        </View>

        {/* BARRA DE PROGRESSO CENTRALIZADA E CURTA */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
        </View>

        {/* TÍTULO E PERGUNTA COMPACTOS */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.question}>{question}</Text>
        </View>

        {/* CONTEÚDO DINÂMICO */}
        <View style={styles.content}>
          {children}
        </View>

        {/* RODAPÉ E NAVEGAÇÃO COMPACTADOS E RETANGULARES */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.btnVoltar} 
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Text style={styles.btnVoltarText}>Voltar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.btnContinuar, isNextDisabled && styles.btnContinuarDisabled]} 
            onPress={onNext}
            disabled={isNextDisabled}
            activeOpacity={0.8}
          >
            <Text style={styles.btnContinuarText}>
              {currentStep === totalSteps ? 'Concluir' : 'Continuar'}
            </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20, 
  },
  header: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  logo: {
    width: 100, 
    height: 22,
    marginBottom: 12,
  },
  profissionalText: {
    color: '#FBEBCE', 
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  stepText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 11,
    fontWeight: '500',
  },
  progressTrack: {
    height: 2, 
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 2,
    marginTop: 15,
    marginBottom: 25, 
    width: '35%', 
    alignSelf: 'center', 
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#EAB320', 
    borderRadius: 2,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 21, 
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  question: {
    color: '#E0E0E0',
    fontSize: 15, 
    textAlign: 'center',
    lineHeight: 22, 
  },
  content: {
    flex: 1,
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 20,
    gap: 15, 
  },
  btnVoltar: {
    height: 48, 
    paddingHorizontal: 25, 
    minWidth: 120,
    borderRadius: 8, 
    borderWidth: 1,
    borderColor: 'rgba(197, 155, 39, 0.6)', 
    backgroundColor: '#050505', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnVoltarText: {
    color: '#FFFFFF', 
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  btnContinuar: {
    height: 48, 
    paddingHorizontal: 30, 
    minWidth: 140, 
    borderRadius: 8, 
    backgroundColor: '#EAB320', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContinuarDisabled: {
    opacity: 0.5,
  },
  btnContinuarText: {
    color: '#000000', 
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});