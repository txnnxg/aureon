import React, { useState } from 'react';
// 1. O Alert foi adicionado aqui em cima, junto com as outras ferramentas do react-native!
import { StyleSheet, View, useWindowDimensions, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// 2. O SecureStore importado no topo para o arquivo reconhecê-lo!
import * as SecureStore from 'expo-secure-store'; 

import { BackgroundWrapper } from '../../components/BackgroundWrapper';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextArea } from '../../components/TextArea';
import { PrimaryButton } from '../../components/PrimaryButton';

export function ObservacaoScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { height } = useWindowDimensions();
  
  const [observacao, setObservacao] = useState('');

  const metodoCriacao = route.params?.metodoCriacao || 'Não informado';
  const frequencia = route.params?.frequencia || 'Não informada';
  const objetivo = route.params?.objetivo || 'Não informado';
  const diaADia = route.params?.diaADia || 'Não informado';

  const handleFinalizar = async () => {
    const pacoteFinal = {
      metodoCriacao,
      frequencia,
      objetivo,
      diaADia,
      observacao
    };

    try {
      await SecureStore.setItemAsync('treino_visitante', JSON.stringify(pacoteFinal));
      
      // O Alerta de Diagnóstico
      Alert.alert("SUCESSO!", "Os dados foram salvos na memória física do celular.");
      
      navigation.navigate('Home');
      
    } catch (error) {
      Alert.alert("ERRO NO SECURE STORE", String(error));
      console.error(error);
    }
  };

  return (
    <BackgroundWrapper>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={[styles.container, { paddingTop: height * 0.10 }]} keyboardShouldPersistTaps="handled">
          
          <ScreenHeader title="OBSERVAÇÃO" />

          <View style={styles.formContainer}>
            <TextArea 
              placeholder="Digite aqui" 
              value={observacao}
              onChangeText={setObservacao}
            />
            
            <PrimaryButton title="GERAR TREINO" onPress={handleFinalizar} />
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 35,
    paddingBottom: 50,
  },
  formContainer: {
    width: '100%',
    marginTop: 30,
  }
});