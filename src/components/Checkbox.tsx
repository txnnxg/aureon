import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// O nosso manual de instruções pede duas coisas:
// 1. isChecked: Um aviso dizendo se ele está marcado (true) ou não (false)
// 2. onToggle: Uma função para avisar o App.tsx que o usuário clicou nele
interface CheckboxProps {
  isChecked: boolean;
  onToggle: () => void;
}

export function Checkbox({ isChecked, onToggle }: CheckboxProps) {
  return (
    // Quando o usuário clicar em qualquer parte dessa linha, aciona o onToggle
    <TouchableOpacity style={styles.container} onPress={onToggle} activeOpacity={0.8}>
      
      {/* A caixinha visual. Se isChecked for true, ela ganha o estilo de 'fundo dourado' */}
      <View style={[styles.box, isChecked && styles.boxChecked]}>
        {/* Só mostra o ícone de 'V' se estiver marcado */}
        {isChecked && <Feather name="check" size={16} color="#000" />}
      </View>

      {/* O texto do lado da caixinha */}
      <Text style={styles.text}>
        Li e concordo com os <Text style={styles.highlight}>Termos de Uso</Text> e <Text style={styles.highlight}>Política de Privacidade</Text>.
      </Text>
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Coloca a caixa e o texto lado a lado
    alignItems: 'center', // Centraliza os dois verticalmente
    marginTop: 10,
    marginBottom: 20, // Dá um espaço antes do botão PROSSEGUIR
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: colors.primaryGold, // Bordinha dourada
    borderRadius: 6, // Caixinha levemente arredondada
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  boxChecked: {
    backgroundColor: colors.primaryGold, // Fundo fica dourado quando clica
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)', // Texto cinza clarinho
    fontSize: 14,
    flex: 1, // Faz o texto quebrar de linha se for muito grande
  },
  highlight: {
    color: colors.primaryGold, // Destaca as palavras importantes em dourado
    fontWeight: 'bold',
  }
});