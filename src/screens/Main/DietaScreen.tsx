import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons, Ionicons, FontAwesome6, Fontisto } from '@expo/vector-icons';

export function DietaScreen() {
    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets();

    // Controle das abas superiores
    const [activeTab, setActiveTab] = useState('Cardapios');
    // Controle do filtro (Emagrecimento, etc)
    const [activeFilter, setActiveFilter] = useState('Emagrecimento');

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 + insets.bottom }} showsVerticalScrollIndicator={false}>

                {/* Título Principal */}
                <Text style={styles.screenTitle}>DIETA</Text>

                {/* Menu Superior (Pílula) */}
                <View style={styles.topMenuContainer}>
                    <TouchableOpacity
                        style={[styles.topMenuButton, activeTab === 'MeuPlano' && styles.topMenuButtonActive]}
                        onPress={() => setActiveTab('MeuPlano')}
                    >
                        <Text style={[styles.topMenuText, activeTab === 'MeuPlano' && styles.topMenuTextActive]}>Meu Plano</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.topMenuButton, activeTab === 'Cardapios' && styles.topMenuButtonActive]}
                        onPress={() => setActiveTab('Cardapios')}
                    >
                        <Text style={[styles.topMenuText, activeTab === 'Cardapios' && styles.topMenuTextActive]}>Cardápios</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.topMenuButton, activeTab === 'Receitas' && styles.topMenuButtonActive]}
                        onPress={() => setActiveTab('Receitas')}
                    >
                        <Text style={[styles.topMenuText, activeTab === 'Receitas' && styles.topMenuTextActive]}>Receitas</Text>
                    </TouchableOpacity>
                </View>

                {/* ======================================= */}
                {/* ABA: MEU PLANO                          */}
                {/* ======================================= */}
                {activeTab === 'MeuPlano' && (
                    <View style={styles.abaContainer}>
                        
                        {/* Card Objetivo */}
                        <View style={styles.cardBlock}>
                            <Text style={styles.planTitle}>Hipertrofia</Text>
                            <Text style={styles.planCalories}>2.800 kcal</Text>
                        </View>

                        {/* Card Macros */}
                        <View style={styles.cardBlock}>
                            <Text style={styles.macrosTitle}>Macros do dia</Text>
                            <View style={styles.macrosRow}>
                                <View style={styles.macroItem}>
                                    <Text style={styles.macroLabel}>Proteínas</Text>
                                    <Text style={styles.macroValue}>180g</Text>
                                    <View style={styles.progressBg}><View style={[styles.progressFill, { width: '70%' }]} /></View>
                                </View>
                                
                                <View style={styles.macroItem}>
                                    <Text style={styles.macroLabel}>Carboidratos</Text>
                                    <Text style={styles.macroValue}>350g</Text>
                                    <View style={styles.progressBg}><View style={[styles.progressFill, { width: '85%' }]} /></View>
                                </View>

                                <View style={styles.macroItem}>
                                    <Text style={styles.macroLabel}>Gorduras</Text>
                                    <Text style={styles.macroValue}>70g</Text>
                                    <View style={styles.progressBg}><View style={[styles.progressFill, { width: '40%' }]} /></View>
                                </View>
                            </View>
                        </View>

                        {/* Card Refeições (Horários) */}
                        <View style={styles.mealsListContainer}>
                            <View style={styles.scheduleRow}>
                                <View>
                                    <Text style={styles.mealTitle}>Café da Manhã</Text>
                                    <Text style={styles.mealSubtitle}>Omelete • Aveia</Text>
                                </View>
                                <Text style={styles.scheduleTime}>7:30</Text>
                            </View>
                            
                            <View style={styles.divider} />

                            <View style={styles.scheduleRow}>
                                <View>
                                    <Text style={styles.mealTitle}>Almoço</Text>
                                    <Text style={styles.mealSubtitle}>Frango • Arroz • Batata</Text>
                                </View>
                                <Text style={styles.scheduleTime}>12:30</Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.scheduleRow}>
                                <View>
                                    <Text style={styles.mealTitle}>Lanche</Text>
                                    <Text style={styles.mealSubtitle}>Iogurte • Frutas • Castanhas</Text>
                                </View>
                                <Text style={styles.scheduleTime}>15:30</Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.scheduleRow}>
                                <View>
                                    <Text style={styles.mealTitle}>Jantar</Text>
                                    <Text style={styles.mealSubtitle}>Peixe • Arroz • Legumes</Text>
                                </View>
                                <Text style={styles.scheduleTime}>19:30</Text>
                            </View>
                        </View>

                    </View>
                )}

                {/* ======================================= */}
                {/* ABA: CARDÁPIOS                          */}
                {/* ======================================= */}
                {activeTab === 'Cardapios' && (
                    <View>
                        {/* Filtros de Objetivo */}
                        <View style={styles.filterMenuContainer}>
                            <TouchableOpacity style={styles.filterButton} onPress={() => setActiveFilter('Emagrecimento')}>
                                <Text style={[styles.filterText, activeFilter === 'Emagrecimento' && styles.filterTextActive]}>Emagrecimento</Text>
                                {activeFilter === 'Emagrecimento' && <View style={styles.activeIndicator} />}
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.filterButton} onPress={() => setActiveFilter('Manutencao')}>
                                <Text style={[styles.filterText, activeFilter === 'Manutencao' && styles.filterTextActive]}>Manutenção</Text>
                                {activeFilter === 'Manutencao' && <View style={styles.activeIndicator} />}
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.filterButton} onPress={() => setActiveFilter('Hipertrofia')}>
                                <Text style={[styles.filterText, activeFilter === 'Hipertrofia' && styles.filterTextActive]}>Hipertrofia</Text>
                                {activeFilter === 'Hipertrofia' && <View style={styles.activeIndicator} />}
                            </TouchableOpacity>
                        </View>

                        {/* Círculos de Refeições */}
                        <View style={styles.mealsCirclesContainer}>
                            <View style={styles.mealCircleItem}>
                                <Feather name="sun" size={20} color="#C59B27" />
                                <Text style={styles.mealCircleText}>Café da Manhã</Text>
                                <Image source={require('@/assets/cafe-da-manha.jpg')} style={styles.mealCircleImage} />
                            </View>

                            <View style={styles.mealCircleItem}>
                                <Feather name="sun" size={20} color="#C59B27" />
                                <Text style={styles.mealCircleText}>Almoço</Text>
                                <Image source={require('@/assets/almoco.jpg')} style={styles.mealCircleImage} />
                            </View>

                            <View style={styles.mealCircleItem}>
                                <MaterialCommunityIcons name="weather-sunset" size={20} color="#C59B27" />
                                <Text style={styles.mealCircleText}>Lanche</Text>
                                <Image source={require('@/assets/lanche.jpg')} style={styles.mealCircleImage} />
                            </View>

                            <View style={styles.mealCircleItem}>
                                <Feather name="moon" size={20} color="#C59B27" />
                                <Text style={styles.mealCircleText}>Jantar</Text>
                                <Image source={require('@/assets/janta.jpg')} style={styles.mealCircleImage} />
                            </View>
                        </View>

                        {/* Lista de Refeições */}
                        <View style={styles.mealsListContainer}>
                            <TouchableOpacity style={styles.mealCard}>
                                <View style={styles.mealIconWrapper}>
                                    <Feather name="sun" size={20} color="#C59B27" />
                                </View>
                                <View style={styles.mealInfo}>
                                    <Text style={styles.mealTitle}>Café da Manhã</Text>
                                    <Text style={styles.mealSubtitle}>Omelete • Aveia</Text>
                                </View>
                                <Feather name="chevron-right" size={20} color="#C59B27" />
                            </TouchableOpacity>

                            <View style={styles.divider} />

                            <TouchableOpacity style={styles.mealCard}>
                                <View style={styles.mealIconWrapper}>
                                    <Feather name="sun" size={20} color="#C59B27" />
                                </View>
                                <View style={styles.mealInfo}>
                                    <Text style={styles.mealTitle}>Almoço</Text>
                                    <Text style={styles.mealSubtitle}>Frango • Arroz • Batata</Text>
                                </View>
                                <Feather name="chevron-right" size={20} color="#C59B27" />
                            </TouchableOpacity>

                            <View style={styles.divider} />

                            <TouchableOpacity style={styles.mealCard}>
                                <View style={styles.mealIconWrapper}>
                                    <MaterialCommunityIcons name="weather-sunset" size={20} color="#C59B27" />
                                </View>
                                <View style={styles.mealInfo}>
                                    <Text style={styles.mealTitle}>Lanche</Text>
                                    <Text style={styles.mealSubtitle}>Iogurte • Frutas • Castanhas</Text>
                                </View>
                                <Feather name="chevron-right" size={20} color="#C59B27" />
                            </TouchableOpacity>

                            <View style={styles.divider} />

                            <TouchableOpacity style={styles.mealCard}>
                                <View style={styles.mealIconWrapper}>
                                    <Feather name="moon" size={20} color="#C59B27" />
                                </View>
                                <View style={styles.mealInfo}>
                                    <Text style={styles.mealTitle}>Jantar</Text>
                                    <Text style={styles.mealSubtitle}>Peixe • Arroz • Legumes</Text>
                                </View>
                                <Feather name="chevron-right" size={20} color="#C59B27" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            </ScrollView>

            {/* Menu Inferior */}
            <View style={[styles.bottomNav, { paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : 25 }]}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Home')}
                >
                    <MaterialCommunityIcons name="dumbbell" size={28} color="#666" />
                    <Text style={styles.bottomNavText}>TREINO</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Fontisto name="test-bottle" size={24} color="#666" />
                    <Text style={styles.bottomNavText}>SUPLEMENTO</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <MaterialCommunityIcons name="silverware-fork-knife" size={28} color="#C59B27" />
                    <Text style={styles.bottomNavTextActive}>DIETA</Text>
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
    container: { flex: 1, backgroundColor: '#141414' },
    screenTitle: { color: '#FFF', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20, marginBottom: 20 },

    // Menu Superior
    topMenuContainer: { flexDirection: 'row', backgroundColor: '#1A1A1A', borderRadius: 30, marginHorizontal: 20, padding: 4, marginBottom: 20, borderWidth: 1, borderColor: '#333' },
    topMenuButton: { flex: 1, paddingVertical: 10, borderRadius: 25, alignItems: 'center' },
    topMenuButtonActive: { backgroundColor: '#C59B27' },
    topMenuText: { color: '#A0A0A0', fontSize: 14, fontWeight: 'bold' },
    topMenuTextActive: { color: '#000' },

    // Estilos da Aba: Meu Plano
    abaContainer: { width: '100%' },
    cardBlock: { backgroundColor: '#1A1A1A', marginHorizontal: 20, borderRadius: 20, padding: 20, marginBottom: 20 },
    planTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
    planCalories: { color: '#C59B27', fontSize: 16, fontWeight: 'bold' },
    
    macrosTitle: { color: '#C59B27', fontSize: 14, fontWeight: 'bold', marginBottom: 15 },
    macrosRow: { flexDirection: 'row', justifyContent: 'space-between' },
    macroItem: { flex: 1, paddingRight: 10 },
    macroLabel: { color: '#A0A0A0', fontSize: 12, marginBottom: 4 },
    macroValue: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
    progressBg: { height: 4, backgroundColor: '#333', borderRadius: 2, width: '100%' },
    progressFill: { height: '100%', backgroundColor: '#C59B27', borderRadius: 2 },
  
    scheduleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
    scheduleTime: { color: '#C59B27', fontSize: 14, fontWeight: 'bold' },

    // Filtros
    filterMenuContainer: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20, marginBottom: 30, backgroundColor: '#1A1A1A', borderRadius: 20, paddingVertical: 10, borderWidth: 1, borderColor: '#333' },
    filterButton: { alignItems: 'center' },
    filterText: { color: '#A0A0A0', fontSize: 14, marginBottom: 4 },
    filterTextActive: { color: '#C59B27', fontWeight: 'bold' },
    activeIndicator: { width: 30, height: 2, backgroundColor: '#C59B27', borderRadius: 2 },

    // Imagens Circulares
    mealsCirclesContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, marginBottom: 40 },
    mealCircleItem: { alignItems: 'center' },
    mealCircleText: { color: '#FFF', fontSize: 10, marginVertical: 5 },
    mealCircleImage: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: '#333' },

    // Lista de Refeições
    mealsListContainer: { backgroundColor: '#1A1A1A', marginHorizontal: 20, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10 },
    mealCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
    mealIconWrapper: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#333', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    mealInfo: { flex: 1 },
    mealTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
    mealSubtitle: { color: '#666', fontSize: 12 },
    divider: { height: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)' },

    // Navegação Inferior
    bottomNav: { position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#000', paddingTop: 15, borderTopWidth: 1, borderTopColor: '#333' },
    navItem: { flex: 1, alignItems: 'center', gap: 4 },
    bottomNavText: { color: '#666', fontWeight: 'bold', fontSize: 10, marginTop: 2 },
    bottomNavTextActive: { color: '#FFF', fontWeight: 'bold', fontSize: 10, marginTop: 2 },
});