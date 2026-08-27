import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number; 
}

export function ProgressBar({ currentStep, totalSteps = 2 }: ProgressBarProps) {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <View style={styles.container}>
      {steps.map((step) => (
        <View
          key={step}
          style={[
            styles.step,
            currentStep === step ? styles.activeStep : styles.inactiveStep,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 40, 
  },
  step: {
    height: 4,
    borderRadius: 2,
    flex: 1, 
    maxWidth: 40,
  },
  activeStep: {
    backgroundColor: '#C59B27', 
  },
  inactiveStep: {
    backgroundColor: 'rgba(197, 155, 39, 0.3)', 
  },
});