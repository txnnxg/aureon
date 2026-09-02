import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      <ScrollView contentContainerStyle={{ paddingBottom: 100 + insets.bottom }} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image source={require('../assets/logo_dourada.png')} style={styles.logo} resizeMode="contain" />
          <View style={styles.avatarContainer}>
            <Feather name="user" size={24} color="#C59B27" />
          </View>
        </View>

        {/* Calendário Dinâmico */}
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

        {/* Grid de Ações com Ícones */}
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.gridButton}>
            <MaterialCommunityIcons name="flask-outline" size={32} color="#C59B27" style={styles.gridIcon} />
            <Text style={styles.gridText}>Pesquisa{"\n"}Ciêntifica</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.gridButton}>
            <Ionicons name="location-sharp" size={32} color="#C59B27" style={styles.gridIcon} />
            <Text style={styles.gridText}>Academias{"\n"}próximas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.gridButton}>
            <Ionicons name="person" size={32} color="#C59B27" style={styles.gridIcon} />
            <Text style={styles.gridText}>Personal{"\n"}Trainer</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.gridButton}>
            <MaterialCommunityIcons name="dumbbell" size={32} color="#C59B27" style={styles.gridIcon} />
            <Text style={styles.gridText}>Todos os{"\n"}treinos</Text>
          </TouchableOpacity>
        </View>

        {/* Área de Treinos (Efeito Pasta/Folder) */}
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
            {/* Cartão de Treino 1 - Imagem Adicionada */}
            <View style={styles.workoutCard}>
              <Image 
                source={require('../assets/membro.png')} // Lembre-se de ter essa imagem na pasta assets
                style={styles.workoutImage} 
                resizeMode="cover"
              />
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutTitle}>Treino de Peito</Text>
                <TouchableOpacity style={styles.agendarButton}>
                  <Text style={styles.agendarText}>AGENDAR</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Cartão de Treino 2 - Imagem Adicionada */}
            <View style={styles.workoutCard}>
              <Image 
                source={require('../assets/membro.png')} // Lembre-se de ter essa imagem na pasta assets
                style={styles.workoutImage} 
                resizeMode="cover"
              />
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutTitle}>Treino de Glúteos</Text>
                <TouchableOpacity style={styles.agendarButton}>
                  <Text style={styles.agendarText}>AGENDAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Menu Inferior Fixo com Ícones Acima do Texto */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : 25 }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="dumbbell" size={28} color="#C59B27" />
          <Text style={styles.bottomNavTextActive}>TREINO</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="bottle-tonic" size={28} color="#C59B27" />
          <Text style={styles.bottomNavTextActive}>SUPLEMENTO</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={28} color="#C59B27" />
          <Text style={styles.bottomNavTextActive}>DIETA</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="menu" size={32} color="#C59B27" />
          <Text style={styles.bottomNavTextActive}>MAIS</Text>
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
  workoutContent: { backgroundColor: '#2E2E2E', borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: 20, minHeight: 300 },
  
  workoutCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  workoutImage: { width: 80, height: 60, borderRadius: 10, marginRight: 15 },
  workoutInfo: { flex: 1 },
  workoutTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  agendarButton: { backgroundColor: '#C59B27', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 8, alignSelf: 'flex-start' },
  agendarText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  
  bottomNav: { position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#000', paddingTop: 15, borderTopWidth: 1, borderTopColor: '#333' },
  navItem: { alignItems: 'center', gap: 4 },
  bottomNavTextActive: { color: '#FFF', fontWeight: 'bold', fontSize: 10, marginTop: 2 },
});