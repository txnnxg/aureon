import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/theme/colors';

// Aqui definimos o que o nosso Input vai receber.
// O "extends TextInputProps" é um truque do TypeScript para dizer que nosso CustomInput
// aceita todas as propriedades normais de um TextInput do React Native (como maxLength, onChangeText, etc).
interface CustomInputProps extends TextInputProps {
  iconName: keyof typeof Feather.glyphMap; // Obriga a passar um nome de ícone válido do Feather
  isPassword?: boolean; // É opcional. Se for true, ativa a função de esconder senha
}

export function CustomInput({ iconName, isPassword, ...rest }: CustomInputProps) {
  // useState é a memória do componente. Aqui ele lembra se a senha está oculta ou visível.
  // Se 'isPassword' for passado como true, ele começa escondendo a senha (true).
  const [hidePassword, setHidePassword] = useState(isPassword);

  return (
    <View style={styles.container}>
      
      {/* Ícone da esquerda */}
      <Feather name={iconName} size={20} color={colors.primaryGold} style={styles.icon} />
      
      {/* Campo de digitação */}
      <TextInput
        style={styles.input}
        placeholderTextColor="rgba(255, 255, 255, 0.5)" // Cor do texto de dica (placeholder)
        secureTextEntry={hidePassword} // Se for true, o texto vira bolinhas
        {...rest} // Pega todas as outras propriedades (placeholder, keyboardType) e injeta aqui
      />

      {/* Ícone da direita (Olhinho da senha) - Só renderiza se for um campo de senha */}
      {isPassword && (
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Feather 
            name={hidePassword ? "eye-off" : "eye"} // Troca o ícone dependendo do estado
            size={20} 
            color={colors.primaryGold} 
          />
        </TouchableOpacity>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Coloca ícone, texto e olhinho na mesma linha
    alignItems: 'center', // Centraliza verticalmente
    backgroundColor: colors.inputBackground, // Aquele fundo que configuramos no colors.ts
    borderWidth: 0.5, // Espessura da borda
    borderColor: colors.primaryGold, // Borda dourada
    borderRadius: 12, // Arredondamento das pontas
    paddingHorizontal: 15, // Espaço interno nas laterais
    height: 48, // Altura fixa para todos os inputs ficarem padronizados
    marginBottom: 10, // Espaço em baixo para não grudar no próximo input
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1, // Faz a caixa de texto ocupar todo o espaço livre entre os ícones
    color: colors.textLight, // Letra branca ao digitar
    fontSize: 16,
  }
});