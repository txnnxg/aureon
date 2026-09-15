import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackgroundWrapper } from '@/components/BackgroundWrapper';
import { ScreenHeader } from '@/components/ScreenHeader';
import { OptionButton } from '@/components/OptionButton';

export function ObjetivoScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { height } = useWindowDimensions();

  // Recebe duas respostas da tela anterior (Frequência)
  const metodoEscolhido = route.params?.metodoCriacao || 'Não informado';
  const frequenciaEscolhida = route.params?.frequencia || 'Não informada';

  const handleSelectOption = (objetivoEscolhido: string) => {
    navigation.navigate('DiaADia', { 
      metodoCriacao: metodoEscolhido,
      frequencia: frequenciaEscolhida, 
      objetivo: objetivoEscolhido 
    });
  };

  return (
    <BackgroundWrapper>
      <View style={[styles.container, { paddingTop: height * 0.10 }]}>
        
        <ScreenHeader 
          title="OBJETIVO" 
          subtitle="Aonde você quer chegar?" 
        />

        <View style={styles.optionsContainer}>
          <OptionButton 
            title="Emagrecimento (Perder gordura e reduzir medidas)" 
            onPress={() => handleSelectOption("Emagrecimento")}
          />
          <OptionButton 
            title="Hipertrofia (Ganhar massa muscular e força)" 
            onPress={() => handleSelectOption("Hipertrofia")}
          />
          <OptionButton 
            title="Condicionamento Físico (Melhorar fôlego e resistência)" 
            onPress={() => handleSelectOption("Condicionamento Fisico")}
          />
          <OptionButton 
            title="Saúde e Bem-estar (Qualidade de vida)" 
            onPress={() => handleSelectOption("Saude e Bem-estar")}
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