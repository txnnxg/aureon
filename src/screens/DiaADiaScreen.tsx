import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackgroundWrapper } from '../components/BackgroundWrapper';
import { ScreenHeader } from '../components/ScreenHeader';
import { OptionButton } from '../components/OptionButton';

export function DiaADiaScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { height } = useWindowDimensions();

  // Recebe as respostas das telas anteriores
  const frequenciaEscolhida = route.params?.frequencia || 'Não informada';
  const objetivoEscolhido = route.params?.objetivo || 'Não informado';

  const handleSelectOption = (diaADia: string) => {
    console.log("--- RESUMO ATÉ AQUI ---");
    console.log("Frequência:", frequenciaEscolhida);
    console.log("Objetivo:", objetivoEscolhido);
    console.log("Dia a Dia:", diaADia);
    
   
     navigation.navigate('Observacao', { 
       frequencia: frequenciaEscolhida, 
       objetivo: objetivoEscolhido,
       diaADia: diaADia
     });
  };

  return (
    <BackgroundWrapper>
      <View style={[styles.container, { paddingTop: height * 0.10 }]}>
        
        <ScreenHeader 
          title="DIA A DIA" 
          subtitle="Como você gostaria de treinar" 
        />

        <View style={styles.optionsContainer}>
          <OptionButton 
            title="Tenho pouco tempo livre" 
            onPress={() => handleSelectOption("Pouco tempo")}
          />
          <OptionButton 
            title="Consigo encaixar na rotina" 
            onPress={() => handleSelectOption("Encaixar na rotina")}
          />
          <OptionButton 
            title="Estou focado no processo" 
            onPress={() => handleSelectOption("Focado no processo")}
          />
          <OptionButton 
            title="Treino é prioridade máxima" 
            onPress={() => handleSelectOption("Prioridade máxima")}
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