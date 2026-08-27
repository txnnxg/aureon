import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface OptionButtonProps extends TouchableOpacityProps {
  title: string;
}

export function OptionButton({ title, ...rest }: OptionButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: 'rgba(20, 12, 0, 0.6)', // Fundo escuro com leve transparência
    borderWidth: 1,
    borderColor: '#C59B27', // Borda dourada
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 15, // Espaçamento automático entre as opções
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#A0A0A0', // Cor do texto baseada na sua imagem
    fontSize: 14,
    textAlign: 'center',
  }
});