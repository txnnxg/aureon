import React, { useState } from 'react';
// 1. Importe o useWindowDimensions
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { BackgroundWrapper } from '../components/BackgroundWrapper';
import { ScreenHeader } from '../components/ScreenHeader';
import { CustomInput } from '../components/CustomInput';
import { ProgressBar } from '../components/ProgressBar';
import { PrimaryButton } from '../components/PrimaryButton';
import { Checkbox } from '../components/Checkbox';
import { maskWhatsapp } from '../utils/masks';
import { useNavigation, useRoute } from '@react-navigation/native';

export function CadastroScreen() {
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');

  const navigation = useNavigation<any>();
  const route = useRoute<any>(); 
  // 2. Chame a ferramenta aqui
  const { height } = useWindowDimensions(); 

  const currentStep = route.params?.currentStep || 1;
  const totalSteps = route.params?.totalSteps || 3;

  return (
    <BackgroundWrapper>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView 
          // 3. Aplique a proporção (ex: 8% da tela para o cadastro)
          contentContainerStyle={[styles.content, { paddingTop: height * 0.08 }]} 
          showsVerticalScrollIndicator={false} 
          keyboardShouldPersistTaps="handled"
        >
          
          <ScreenHeader title="CADASTRO" subtitle="crie sua conta para começar a sua jornada" />
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          
          <View style={styles.formContainer}>
            <CustomInput iconName="user" placeholder="nome completo" />
            <CustomInput iconName="mail" placeholder="email" keyboardType="email-address" autoCapitalize="none" />
            <CustomInput iconName="smartphone" placeholder="whatsapp" keyboardType="numeric" value={whatsapp} onChangeText={(texto) => setWhatsapp(maskWhatsapp(texto))} />
            <CustomInput iconName="lock" placeholder="senha" isPassword={true} />
            <CustomInput iconName="lock" placeholder="confirmar senha" isPassword={true} />

            <Checkbox isChecked={termosAceitos} onToggle={() => setTermosAceitos(!termosAceitos)} />
            <PrimaryButton 
              title="PROSSEGUIR" 
              disabled={!termosAceitos} 
              onPress={() => navigation.navigate('Perfil', { currentStep: currentStep + 1, totalSteps: totalSteps })} 
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1, 
    paddingHorizontal: 35, 
    // APAGUE o paddingTop: 50 daqui
    paddingBottom: 50, 
  },
  formContainer: {
    width: '100%',
  }
});