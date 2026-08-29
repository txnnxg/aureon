import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export function TextArea({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      multiline={true} 
      textAlignVertical="top" 
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(20, 12, 0, 0.6)',
    borderWidth: 1,
    borderColor: '#C59B27',
    borderRadius: 12,
    padding: 15,
    minHeight: 120, 
    color: '#FFF',
    fontSize: 16,
    width: '100%',
    marginBottom: 20,
  }
});