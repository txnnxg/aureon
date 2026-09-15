import React, { useState, useCallback } from 'react'; // <-- useCallback adicionado, useEffect removido
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'; // <-- Alert adicionado
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // <-- useFocusEffect adicionado
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons, Ionicons, FontAwesome5, Fontisto } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { BlurView } from 'expo-blur';

const obterDataAtual = () => {
  const hoje = new Date();
  const diasSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  return `${diasSemana[hoje.getDay()]}, ${String(hoje.getDate()).padStart(2, '0')} ${meses[hoje.getMonth()]}`;
};

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const dataDinamica = obterDataAtual();

  const [treinoVisitante, setTreinoVisitante] = useState<any>(null);

  // <-- Mágica da Atualização de Foco Adicionada -->
  useFocusEffect(
    useCallback(() => {
      async function buscarTreino() {
        try {
          const pacoteSalvo = await SecureStore.getItemAsync('treino_visitante');
          if (pacoteSalvo) {
            setTreinoVisitante(JSON.parse(pacoteSalvo));
          } else {
            setTreinoVisitante(null); // Limpa caso tenha sido deletado
          }
        } catch (error) {
          console.error("Erro ao buscar treino:", error);
        }
      }
      buscarTreino();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 + insets.bottom }} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Image source={require('@/assets/logo_dourada.png')} style={styles.logo} resizeMode="contain" />
          <View style={styles.avatarContainer}>
            <Feather name="user" size={24} color="#C59B27" />
          </View>
        </View>

        <View style={styles.calendarRow}>
          <Text style={styles.calendarTextInactive}>28</Text>
          <Text style={styles.calendarTextInactive}>29</Text>
          <Text style={styles.calendarTextInactive}>30</Text>
          <View style={styles.calendarActivePill}>
            <Text style={styles.calendarTextActive}>{dataDinamica}</Text>
          </View>
          <View style={styles.calendarCircleInactive}>
            <Text style={styles.calendarTextInactive}>02</Text>
          </View>
          <Text style={styles.calendarTextInactive}>03</Text>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.gridButton}>
            <MaterialCommunityIcons name="flask-outline" size={32} color="#C59B27" style={styles.gridIcon} />
            <Text style={styles.gridText}>Pesquisa{"\n"}Científica</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridButton}>
            <Ionicons name="location-sharp" size={32} color="#C59B27" style={styles.gridIcon} />
            <Text style={styles.gridText}>Academias{"\n"}próximas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridButton}>
            <Ionicons name="person" size={32} color="#C59B27" style={styles.gridIcon} />
            <Text style={styles.gridText}>Personal{"\n"}Trainer</Text>
          </TouchableOpacity>

          {/* <-- Proteção Adicionada no Botão --> */}
          <TouchableOpacity 
            style={styles.gridButton} 
            onPress={() => {
              if (treinoVisitante) {
                Alert.alert("Treino Pronto!", "Você já possui um treino aguardando desbloqueio logo abaixo.");
              } else {
                navigation.navigate('MonteTreino');
              }
            }}
          >
            <MaterialCommunityIcons name="dumbbell" size={32} color="#C59B27" style={styles.gridIcon} />
            <Text style={styles.gridText}>Gerar{"\n"}Treino</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.workoutSectionWrapper}>
          <View style={styles.tabsRow}>
            <View style={styles.activeTab}>
              <Text style={styles.tabTextActive}>Treinos Personalizados</Text>
            </View>
            <View style={styles.inactiveTab}>
              <Text style={styles.tabTextInactive}>Treinos prontos →</Text>
            </View>
          </View>

          <View style={styles.workoutContent}>
            <View style={styles.workoutCard}>
              <Image source={require('@/assets/membro.png')} style={styles.workoutImage} resizeMode="cover" />
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutTitle}>Treino de Peito</Text>
                <TouchableOpacity style={styles.agendarButton}>
                  <Text style={styles.agendarText}>AGENDAR</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.workoutCard}>
              <Image source={require('@/assets/membro.png')} style={styles.workoutImage} resizeMode="cover" />
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutTitle}>Treino de Glúteos</Text>
                <TouchableOpacity style={styles.agendarButton}>
                  <Text style={styles.agendarText}>AGENDAR</Text>
                </TouchableOpacity>
              </View>
            </View>

            {treinoVisitante && (
              <View style={StyleSheet.absoluteFill}>
                <BlurView intensity={400} tint="dark" style={styles.blurOverlay}>
                  <FontAwesome5 name="lock" size={40} color="#C59B27" style={{ marginBottom: 15 }} />
                  <Text style={styles.blurTitle}>Seu Treino está Pronto!</Text>
                  
                  <Text style={styles.blurSubtitle}>
                    Geramos um planejamento focado em {treinoVisitante.objetivo.toLowerCase()}.
                  </Text>
                  
                  <TouchableOpacity 
                    style={styles.unlockButton} 
                    onPress={() => navigation.navigate('Cadastro')}
                  >
                    <Text style={styles.unlockButtonText}>CRIAR CONTA E DESBLOQUEAR</Text>
                  </TouchableOpacity>
                </BlurView>
              </View>
            )}
            
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomNav, { paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : 25 }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="dumbbell" size={28} color="#C59B27" />
          <Text style={styles.bottomNavTextActive}>TREINO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Fontisto name="test-bottle" size={24} color="#666" />
          <Text style={styles.bottomNavText}>SUPLEMENTO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dieta')}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={28} color="#666" />
          <Text style={styles.bottomNavText}>DIETA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="menu" size={32} color="#666" />
          <Text style={styles.bottomNavText}>MAIS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A' },
  header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, position: 'relative' },
  logo: { width: 120, height: 25 },
  avatarContainer: { position: 'absolute', right: 20, width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#C59B27', alignItems: 'center', justifyContent: 'center' },
  calendarRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingHorizontal: 10, marginBottom: 30 },
  calendarTextInactive: { color: '#A0A0A0', fontSize: 14 },
  calendarTextActive: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  calendarActivePill: { backgroundColor: '#C59B27', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  calendarCircleInactive: { borderWidth: 1, borderColor: '#A0A0A0', width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 30 },
  gridButton: { width: '48%', backgroundColor: 'rgba(30, 30, 30, 0.8)', borderWidth: 1, borderColor: '#C59B27', borderRadius: 15, paddingVertical: 20, alignItems: 'center', marginBottom: 15 },
  gridIcon: { marginBottom: 10 },
  gridText: { color: '#FFF', textAlign: 'center', fontWeight: 'bold', fontSize: 14 },
  workoutSectionWrapper: { paddingHorizontal: 20 },
  tabsRow: { flexDirection: 'row' },
  activeTab: { backgroundColor: '#2E2E2E', paddingVertical: 12, paddingHorizontal: 18, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  inactiveTab: { paddingVertical: 12, paddingHorizontal: 18 },
  tabTextActive: { color: '#A0A0A0', fontSize: 14 },
  tabTextInactive: { color: '#666', fontSize: 14 },
  workoutContent: { backgroundColor: '#2E2E2E', borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: 20, minHeight: 300, overflow: 'hidden' },
  workoutCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  workoutImage: { width: 80, height: 60, borderRadius: 10, marginRight: 15 },
  workoutInfo: { flex: 1 },
  workoutTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  agendarButton: { backgroundColor: '#C59B27', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 8, alignSelf: 'flex-start' },
  agendarText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  blurOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  blurTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  blurSubtitle: { color: '#CCC', fontSize: 14, textAlign: 'center', marginBottom: 25 },
  unlockButton: { backgroundColor: '#C59B27', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 10, width: '100%', alignItems: 'center' },
  unlockButtonText: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  bottomNav: { position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#000', paddingTop: 15, borderTopWidth: 1, borderTopColor: '#333' },
  navItem: { flex: 1, alignItems: 'center', gap: 4 },
  bottomNavText: { color: '#666', fontWeight: 'bold', fontSize: 10, marginTop: 2 },
  bottomNavTextActive: { color: '#FFF', fontWeight: 'bold', fontSize: 10, marginTop: 2 },
});