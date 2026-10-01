import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';

import { ScreenHeader } from '@/components/ScreenHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { BackgroundWrapper } from '@/components/BackgroundWrapper';
import { ProgressBar } from '@/components/ProgressBar';

export function PerfilScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { height } = useWindowDimensions();

  const currentStep = route.params?.currentStep || 1;
  const totalSteps = route.params?.totalSteps || 2;

  return (
    <BackgroundWrapper>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: height * 0.08 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="SELECIONE SEU PERFIL"
          subtitle="como você irá utilizar a Aureon?"
        />

        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
        />

        <View style={styles.cardsContainer}>

          {/* CARTÃO: MEMBRO */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('MonteTreino', {
                currentStep: currentStep + 1,
                totalSteps: totalSteps,
              })
            }
          >
            <View style={[styles.imageContainer, styles.imageContainerMembro]}>
              <Image
                source={require('@/assets/membro.png')}
                style={[styles.cardImage, styles.cardImageMembro]}
                resizeMode="contain"
              />
            </View>

            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={28}
                  color="#C59B27"
                />
              </View>

              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>MEMBRO</Text>
              </View>

              <View style={styles.divider} />

              <Text style={styles.cardText}>
                Quero treinar e ter dieta
              </Text>
            </View>
          </TouchableOpacity>

          {/* CARTÃO: PERSONAL */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate(
                'QuestionarioProfissional',
                { tipo: 'personal' }
              )
            }
          >
            <View style={styles.imageContainer}>
              <Image
                source={require('@/assets/profissional.png')}
                style={[styles.cardImage, styles.cardImagePersonal]}
                resizeMode="contain"
              />
            </View>

            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="chart-line"
                  size={28}
                  color="#C59B27"
                />
              </View>

              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>PERSONAL</Text>
              </View>

              <View style={styles.divider} />

              <Text style={styles.cardText}>
                Quero criar treinos
              </Text>
            </View>
          </TouchableOpacity>

          {/* CARTÃO: NUTRICIONISTA */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate(
                'QuestionarioProfissional',
                { tipo: 'nutricionista' }
              )
            }
          >
            <View style={styles.imageContainer}>
              <Image
                source={require('@/assets/nutricionista.png')}
                style={[styles.cardImage, styles.cardImageNutricionista]}
                resizeMode="contain"
              />
            </View>

            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="food-apple-outline"
                  size={28}
                  color="#C59B27"
                />
              </View>

              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>
                  NUTRICIONISTA
                </Text>
              </View>

              <View style={styles.divider} />

              <Text style={styles.cardText}>
                Quero prescrever dietas
              </Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 40,
  },

  cardsContainer: {
    flexDirection: 'column',
    gap: 20,
    marginTop: 25,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 12, 0, 0.6)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C59B27',
    height: 160,
    overflow: 'hidden',
  },

  imageContainer: {
    width: '46%',
    height: '100%',
    position: 'relative',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },

  /*
   * Ajuste exclusivo do MEMBRO.
   * Personal e Nutricionista continuam usando 40%.
   */
  imageContainerMembro: {
    width: '50%',
  },

  cardImageMembro: {
    transform: [
      { scale: 1.25 },
      { translateY: 20 },
    ],
  },

  cardImagePersonal: {
    transform: [
      { scale: 1.25 },
      { translateY: 20 },
      { translateX: 5 },
    ],
  },

  cardImageNutricionista: {
    transform: [
      { scale: 1.15 },
      { translateY: 18 },
      { translateX: 8 },
    ],
  },

  cardImage: {
    width: '100%',
    height: '100%',
  },

  fadeOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 25,
  },

  /*
   * Ajuste exclusivo do fade do MEMBRO.
   */
  fadeOverlayMembro: {
    width: 40,
  },

  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },

  iconContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 2,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },

  cardTitle: {
    color: '#C59B27',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  divider: {
    height: 1,
    width: '75%',
    backgroundColor: 'rgba(197, 155, 39, 0.55)',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },

  cardText: {
    color: '#E0E0E0',
    fontSize: 15,
    lineHeight: 20,
  },
});