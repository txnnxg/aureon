import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions, Alert } from 'react-native';
import { BackgroundWrapper } from '@/components/BackgroundWrapper';
import { ScreenHeader } from '@/components/ScreenHeader';
import { CustomInput } from '@/components/CustomInput';
import { ProgressBar } from '@/components/ProgressBar';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Checkbox } from '@/components/Checkbox';
import { maskWhatsapp } from '@/utils/masks';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '@/lib/supabase';

export function CadastroScreen() {
  // 1. Estados dos novos campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();
  const route = useRoute<any>(); 
  const { height } = useWindowDimensions(); 

  const currentStep = route.params?.currentStep || 1;
  const totalSteps = route.params?.totalSteps || 3;

  // 2. A função mágica que fala com o Supabase
  async function handleCadastro() {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos para continuar.');
      return;
    }

    setLoading(true);

    // Passo A: Cria a conta no "cofre" invisível
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password: senha,
    });

    if (authError) {
      Alert.alert('Erro ao criar conta', authError.message);
      setLoading(false);
      return;
    }

    // Passo B: Salva o nome e email na tabela pública "perfis" usando o ID do cofre
    if (authData.user) {
      const { error: perfilError } = await supabase
        .from('perfis')
        .insert({
          id: authData.user.id,
          nome: nome,
          email: email.trim()
        });

      if (perfilError) {
        Alert.alert('Erro ao salvar perfil', perfilError.message);
      } else {
        // Sucesso total! Mandamos o ID e os dados para a tela de escolha de perfil
        navigation.navigate('Perfil', { 
          userId: authData.user.id,
          currentStep: currentStep + 1, 
          totalSteps: totalSteps 
        }); 
      }
    }
    
    setLoading(false);
  }

  return (
    <BackgroundWrapper>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView 
          contentContainerStyle={[styles.content, { paddingTop: height * 0.08 }]} 
          showsVerticalScrollIndicator={false} 
          keyboardShouldPersistTaps="handled"
        >
          
          <ScreenHeader title="CADASTRO" subtitle="crie sua conta para começar a sua jornada" />
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          
          <View style={styles.formContainer}>
            {/* 3. Conectando as variáveis (value/onChangeText) aos CustomInputs */}
            <CustomInput 
              iconName="user" 
              placeholder="nome completo" 
              value={nome}
              onChangeText={setNome}
            />
            
            <CustomInput 
              iconName="mail" 
              placeholder="email" 
              keyboardType="email-address" 
              autoCapitalize="none" 
              value={email}
              onChangeText={setEmail}
            />
            
            <CustomInput 
              iconName="lock" 
              placeholder="senha" 
              isPassword={true} 
              value={senha}
              onChangeText={setSenha}
            />
            
            {/* Campo "confirmar senha" foi apagado daqui para melhorar a UX! */}

            <Checkbox 
              isChecked={termosAceitos} 
              onToggle={() => setTermosAceitos(!termosAceitos)} 
            />
            
            <PrimaryButton 
              title={loading ? "CRIANDO CONTA..." : "PROSSEGUIR"} 
              disabled={!termosAceitos || loading} 
              onPress={handleCadastro} 
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
    paddingBottom: 50, 
  },
  formContainer: {
    width: '100%',
  }
});