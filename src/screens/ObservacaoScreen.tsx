import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackgroundWrapper } from '../components/BackgroundWrapper';
import { ScreenHeader } from '../components/ScreenHeader';
import { TextArea } from '../components/TextArea';
import { PrimaryButton } from '../components/PrimaryButton';

export function ObservacaoScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { height } = useWindowDimensions();
  
  const [observacao, setObservacao] = useState('');

  const frequencia = route.params?.frequencia || '';
  const objetivo = route.params?.objetivo || '';
  const diaADia = route.params?.diaADia || '';

  const handleFinalizar = () => {
    console.log({ frequencia, objetivo, diaADia, observacao });
    // Navegando direto para a Home provisoriamente
    navigation.navigate('Home');
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