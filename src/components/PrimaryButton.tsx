import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';

// 1. Atualizamos o manual de instruções! O "?" significa que é opcional.
interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string; 
  hideArrow?: boolean; 
}

// 2. Avisamos a função que ela pode receber o hideArrow
export function PrimaryButton({ title, disabled, hideArrow, ...rest }: PrimaryButtonProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={[styles.buttonWrapper, { opacity: disabled ? 0.5 : 1 }]} 
      disabled={disabled}
      {...rest}
    >
      <LinearGradient
        colors={['#CF9F3A', '#A3751E']} 
        start={{ x: 0, y: 0.5 }} 
        end={{ x: 1, y: 0.5 }}   
        style={styles.gradient}
      >
        {/* 3. Se não tiver seta, tiramos a margem direita para o texto ficar bem centralizado */}
        <Text style={[styles.title, hideArrow && { marginRight: 0 }]}>{title}</Text>
        
        {/* 4. A MÁGICA: Só desenha o ícone se hideArrow NÃO for verdadeiro */}
        {!hideArrow && (
          <MaterialIcons name="navigate-next" size={26} color="#1A1500" />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    marginTop: 15, 
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4, 
  },
  gradient: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 50,
  },
  title: {
    color: '#1A1500', 
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10, // Margem padrão quando tem a seta
    letterSpacing: 0.5,
  }
});