import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importamos o useRoute
import { BackgroundWrapper } from '@/components/BackgroundWrapper';
import { ScreenHeader } from '@/components/ScreenHeader';
import { OptionButton } from '@/components/OptionButton';

export function FrequenciaScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>(); // Habilitamos a leitura da mochila
  const { height } = useWindowDimensions();

  // 1. Recebe o que o usuário clicou na tela MonteTreino (ex: 'IA')
  const metodoEscolhido = route.params?.metodoCriacao || 'Nao informado';

  const handleSelectOption = (opcao: string) => {
    // 2. Navega para Objetivo levando a mochila com as DUAS informações
    navigation.navigate('Objetivo', { 
      metodoCriacao: metodoEscolhido,
      frequencia: opcao 
    });
  };

  return (
    <BackgroundWrapper>
      <View style={[styles.container, { paddingTop: height * 0.10 }]}>
        
        <ScreenHeader 
          title="FREQUÊNCIA" 
          subtitle="Qual sua frequência de treino?" 
        />

        <View style={styles.optionsContainer}>
          <OptionButton 
            title="Raramente ou Nunca (0 a 1 vez na semana)" 
            onPress={() => handleSelectOption("Raramente")}
          />
          <OptionButton 
            title="Ocasionalmente (2 a 3 vezes na semana)" 
            onPress={() => handleSelectOption("Ocasionalmente")}
          />
          <OptionButton 
            title="Frequentemente (4 a 5 vezes na semana)" 
            onPress={() => handleSelectOption("Frequentemente")}
          />
          <OptionButton 
            title="Intensamente (6 a 7 vezes na semana)" 
            onPress={() => handleSelectOption("Intensamente")}
          />
        </View>

      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35,
  },
  optionsContainer: {
    width: '100%',
    marginTop: 40, 
  }
});