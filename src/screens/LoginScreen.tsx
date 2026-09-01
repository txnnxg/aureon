import React, { useState } from 'react';
// 1. Adicione o useWindowDimensions na importação
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackgroundWrapper } from '../components/BackgroundWrapper';
import { ScreenHeader } from '../components/ScreenHeader';
import { CustomInput } from '../components/CustomInput';
import { PrimaryButton } from '../components/PrimaryButton';

export function LoginScreen() {
  const navigation = useNavigation<any>();
  // 2. Chame a ferramenta de matemática aqui
  const { height } = useWindowDimensions();
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <BackgroundWrapper>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          // 3. Aplique a matemática: height * 0.15 = 15% da tela! (Ajuste esse número como preferir)
          contentContainerStyle={[styles.content, { paddingTop: height * 0.15 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ScreenHeader 
            title="ACESSE SEU PERFIL" 
            subtitle="crie sua conta para começar a sua jornada" 
          />

          <View style={styles.formContainer}>
            <CustomInput iconName="mail" placeholder="email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            <CustomInput iconName="lock" placeholder="senha" isPassword={true} value={senha} onChangeText={setSenha} />

            <PrimaryButton 
              title="ENTRAR" 
              hideArrow={true} // <-- Daqui a pouco vamos criar essa função no botão!
              onPress={() => navigation.navigate('Home')} 
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
    // APAGUE o paddingTop: 150 daqui, pois agora é dinâmico!
    paddingBottom: 50,
  },
  formContainer: {
    width: '100%',
    marginTop: 30, 
  }
});