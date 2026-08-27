import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackgroundWrapper } from '../components/BackgroundWrapper';
import { ScreenHeader } from '../components/ScreenHeader';
import { OptionButton } from '../components/OptionButton';

export function FrequenciaScreen() {
  const navigation = useNavigation<any>();
  const { height } = useWindowDimensions();

  const handleSelectOption = (opcao: string) => {
    navigation.navigate('Objetivo', { frequencia: opcao });
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
    marginTop: 40, // Espaço entre o subtítulo e a primeira opção
  }
});