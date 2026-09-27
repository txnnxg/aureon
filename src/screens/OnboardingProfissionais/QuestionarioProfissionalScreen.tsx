import React, { useEffect, useReducer, useState } from 'react';
import { View, TextInput, StyleSheet, Alert, ActivityIndicator, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InterviewLayout } from '@/components/InterviewLayout';
import {
  perguntasPersonal,
  perguntasNutricionista,
  PerguntaConfig,
  OpcaoResposta
} from '@/data/perguntasProfissionais';

// ==================================================
// ESTADO E ARQUITETURA
// ==================================================
interface State {
  stepAtual: number;
  respostas: Record<string, any>;
  isLoading: boolean;
}

type Action =
  | { type: 'CARREGAR_RASCUNHO'; payload: { stepAtual: number; respostas: Record<string, any>; isLoading: boolean } }
  | { type: 'SALVAR_RESPOSTA'; payload: { idInterno: string; resposta: any } }
  | { type: 'AVANCAR_ETAPA' }
  | { type: 'VOLTAR_ETAPA' }
  | { type: 'FINALIZAR' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CARREGAR_RASCUNHO':
      return action.payload;
    case 'SALVAR_RESPOSTA':
      return {
        ...state,
        respostas: {
          ...state.respostas,
          [action.payload.idInterno]: action.payload.resposta,
        },
      };
    case 'AVANCAR_ETAPA':
      return { ...state, stepAtual: state.stepAtual + 1 };
    case 'VOLTAR_ETAPA':
      return { ...state, stepAtual: Math.max(1, state.stepAtual - 1) };
    case 'FINALIZAR':
      return state;
    default:
      return state;
  }
}

// ==================================================
// RENDERER LOCAL EXCLUSIVO (INPUT E TEXTO LONGO)
// ==================================================
function LocalInputRenderer({ value, onChangeText, placeholder, isNumeric, multiline }: any) {
  return (
    <TextInput
      style={[stylesLocal.input, multiline && stylesLocal.textoLongo]}
      placeholder={placeholder}
      placeholderTextColor="rgba(255, 255, 255, 0.6)"
      value={value}
      onChangeText={onChangeText}
      autoCapitalize={multiline ? 'sentences' : 'words'}
      keyboardType={isNumeric ? 'numeric' : 'default'}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  );
}

const stylesLocal = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderWidth: 1,
    borderColor: '#C59B27',
    borderRadius: 8,
    color: '#FFFFFF',
    fontSize: 14,
    paddingHorizontal: 15,
    height: 46,
    marginBottom: 12,
    width: '82%',
    alignSelf: 'center',
  },
  textoLongo: {
    height: 120,
    paddingTop: 15,
  },
  opcaoButton: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    width: '82%',
    alignSelf: 'center',
  },
  opcaoText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  complementarContainer: {
    width: '100%',
    marginTop: 5,
  },
  subtitulo: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  }
});

// ==================================================
// TELA PRINCIPAL
// ==================================================
export function QuestionarioProfissionalScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  const tipoProfissional = route.params?.tipo || 'personal';
  const chaveStorage = `@aureon_rascunho_${tipoProfissional}`;
  const perguntas: PerguntaConfig[] = tipoProfissional === 'personal' ? perguntasPersonal : perguntasNutricionista;
  const totalSteps = perguntas.length;

  const [enviando, setEnviando] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    stepAtual: 1,
    respostas: {},
    isLoading: true,
  });

  useEffect(() => {
    async function carregarDados() {
      try {
        const salvo = await AsyncStorage.getItem(chaveStorage);
        if (salvo) {
          const parsed = JSON.parse(salvo);
          dispatch({ type: 'CARREGAR_RASCUNHO', payload: { ...parsed, isLoading: false } });
        } else {
          dispatch({ type: 'CARREGAR_RASCUNHO', payload: { stepAtual: 1, respostas: {}, isLoading: false } });
        }
      } catch (error) {
        dispatch({ type: 'CARREGAR_RASCUNHO', payload: { stepAtual: 1, respostas: {}, isLoading: false } });
      }
    }
    carregarDados();
  }, [chaveStorage]);

  useEffect(() => {
    if (!state.isLoading) {
      const dadosParaSalvar = {
        stepAtual: state.stepAtual,
        respostas: state.respostas,
      };
      AsyncStorage.setItem(chaveStorage, JSON.stringify(dadosParaSalvar));
    }
  }, [state.stepAtual, state.respostas, state.isLoading, chaveStorage]);

  const handleVoltar = () => {
    if (state.stepAtual === 1) {
      navigation.goBack();
    } else {
      dispatch({ type: 'VOLTAR_ETAPA' });
    }
  };

  const handleAvancar = () => {
    const perguntaAtual = perguntas[state.stepAtual - 1];
    const respostaAtual = state.respostas[perguntaAtual.idInterno] || {};

    // Validação de inputs
    if ((perguntaAtual.tipo === 'input' || perguntaAtual.tipo === 'texto-longo') && perguntaAtual.campos) {
      const todosPreenchidos = perguntaAtual.campos.every(campo => 
        respostaAtual[campo.id] && String(respostaAtual[campo.id]).trim() !== ''
      );
      if (!todosPreenchidos) {
        Alert.alert('Atenção', 'Preencha todos os campos para continuar.');
        return;
      }
    }

    // Validação de escolhas
    if (perguntaAtual.tipo === 'escolha-simples' || perguntaAtual.tipo === 'escolha-multipla') {
      const selecionadas: string[] = respostaAtual.selecionadas || [];
      if (selecionadas.length === 0) {
        Alert.alert('Atenção', 'Selecione pelo menos uma opção para continuar.');
        return;
      }

      const textoComplementar = respostaAtual.textoComplementar || {};
      const faltouTexto = selecionadas.some(id => {
        const opcao = perguntaAtual.opcoes?.find((o: OpcaoResposta) => o.id === id);
        return opcao?.requerTextoComplementar && (!textoComplementar[id] || textoComplementar[id].trim() === '');
      });

      if (faltouTexto) {
        Alert.alert('Atenção', 'Preencha as informações complementares das opções selecionadas.');
        return;
      }
    }

    // Validação de escolha dinâmica (bloqueando opções obsoletas)
    if (perguntaAtual.tipo === 'escolha-dinamica') {
      const selecionadas: string[] = respostaAtual.selecionadas || [];
      const respostaFonte = state.respostas[perguntaAtual.fonteOpcoesId] || {};
      const selecionadasFonte: string[] = respostaFonte.selecionadas || [];

      const isValid = selecionadas.length > 0 && selecionadas.every(id => selecionadasFonte.includes(id));
      
      if (!isValid) {
        Alert.alert('Atenção', 'Sua seleção não é mais válida. Por favor, selecione uma opção atual.');
        return;
      }
    }

    if (state.stepAtual < totalSteps) {
      dispatch({ type: 'AVANCAR_ETAPA' });
    } else {
      handleFinalizar();
    }
  };

  const handleFinalizar = async () => {
    setEnviando(true);
    try {
      // TODO: Implementar integração definitiva com Supabase e persistência real
      // Simulando processamento da requisição
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // CRÍTICO: Rascunho MANTIDO até a implementação do Supabase estar validada
      Alert.alert('Sucesso local', 'Questionário concluído! Seu rascunho permanece salvo com segurança.');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível processar. Seu rascunho está seguro e você pode tentar novamente.');
    } finally {
      setEnviando(false);
    }
  };

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#C59B27" />
      </View>
    );
  }

  const perguntaAtual = perguntas[state.stepAtual - 1];
  if (!perguntaAtual) return null;

  const renderConteudo = () => {
    const idInterno = perguntaAtual.idInterno;
    const respostaAtual = state.respostas[idInterno] || {};

    const subHeader = perguntaAtual.subtitulo ? (
      <Text style={stylesLocal.subtitulo}>{perguntaAtual.subtitulo}</Text>
    ) : null;

    // --------------------------------------------------
    // INPUT E TEXTO LONGO
    // --------------------------------------------------
    if (perguntaAtual.tipo === 'input' || perguntaAtual.tipo === 'texto-longo') {
      return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          {subHeader}
          {perguntaAtual.campos.map(campo => (
            <LocalInputRenderer
              key={campo.id}
              placeholder={campo.label}
              value={respostaAtual[campo.id] || ''}
              isNumeric={campo.tipo === 'numero'}
              multiline={perguntaAtual.tipo === 'texto-longo'}
              onChangeText={(texto: string) => {
                const novaResposta = { ...respostaAtual, [campo.id]: texto };
                dispatch({
                  type: 'SALVAR_RESPOSTA',
                  payload: { idInterno, resposta: novaResposta }
                });
              }}
            />
          ))}
        </ScrollView>
      );
    }

    // --------------------------------------------------
    // ESCOLHA SIMPLES E MÚLTIPLA
    // --------------------------------------------------
    if (perguntaAtual.tipo === 'escolha-simples' || perguntaAtual.tipo === 'escolha-multipla') {
      const selecionadas: string[] = respostaAtual.selecionadas || [];
      const textoComplementar: Record<string, string> = respostaAtual.textoComplementar || {};

      return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          {subHeader}
          {perguntaAtual.opcoes.map((opcao: OpcaoResposta) => {
            const isSelected = selecionadas.includes(opcao.id);

            return (
              <View key={opcao.id} style={{ width: '100%' }}>
                <TouchableOpacity
                  style={[
                    stylesLocal.opcaoButton,
                    {
                      borderColor: isSelected ? '#C59B27' : 'rgba(255, 255, 255, 0.2)',
                      backgroundColor: isSelected ? 'rgba(197, 155, 39, 0.1)' : 'transparent',
                    }
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {
                    let novasSelecionadas = [...selecionadas];
                    let novoTextoComplementar = { ...textoComplementar };

                    if (perguntaAtual.tipo === 'escolha-simples') {
                      novasSelecionadas = [opcao.id];
                      novoTextoComplementar = novoTextoComplementar[opcao.id] ? { [opcao.id]: novoTextoComplementar[opcao.id] } : {};
                    } else {
                      if (isSelected) {
                        novasSelecionadas = novasSelecionadas.filter(id => id !== opcao.id);
                        delete novoTextoComplementar[opcao.id];
                      } else {
                        const limite = perguntaAtual.limiteEscolhas;
                        if (!limite || novasSelecionadas.length < limite) {
                          novasSelecionadas.push(opcao.id);
                        } else {
                          Alert.alert('Atenção', `Você pode selecionar até ${limite} opções.`);
                          return;
                        }
                      }
                    }

                    dispatch({
                      type: 'SALVAR_RESPOSTA',
                      payload: { idInterno, resposta: { ...respostaAtual, selecionadas: novasSelecionadas, textoComplementar: novoTextoComplementar } }
                    });
                  }}
                >
                  <Text style={[stylesLocal.opcaoText, { color: isSelected ? '#C59B27' : '#FFFFFF' }]}>
                    {opcao.label}
                  </Text>
                </TouchableOpacity>

                {/* TEXTO COMPLEMENTAR */}
                {opcao.requerTextoComplementar && isSelected && (
                  <View style={stylesLocal.complementarContainer}>
                    <LocalInputRenderer
                      placeholder="Especifique..."
                      value={textoComplementar[opcao.id] || ''}
                      onChangeText={(texto: string) => {
                        dispatch({
                          type: 'SALVAR_RESPOSTA',
                          payload: {
                            idInterno,
                            resposta: {
                              ...respostaAtual,
                              textoComplementar: { ...textoComplementar, [opcao.id]: texto }
                            }
                          }
                        });
                      }}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      );
    }

    // --------------------------------------------------
    // ESCOLHA DINÂMICA
    // --------------------------------------------------
    if (perguntaAtual.tipo === 'escolha-dinamica') {
      const fonteId = perguntaAtual.fonteOpcoesId;
      const respostaFonte = state.respostas[fonteId] || {};
      const selecionadasFonte: string[] = respostaFonte.selecionadas || [];
      
      const perguntaFonte = perguntas.find(p => p.idInterno === fonteId);
      
      // Narrowing seguro: garantindo que a fonte realmente possui opções
      if (!perguntaFonte || (perguntaFonte.tipo !== 'escolha-simples' && perguntaFonte.tipo !== 'escolha-multipla')) {
        return null;
      }

      const opcoesDinamicas = perguntaFonte.opcoes.filter(opt => selecionadasFonte.includes(opt.id));
      const selecionadas: string[] = respostaAtual.selecionadas || [];

      return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          {subHeader}
          {opcoesDinamicas.map((opcao: OpcaoResposta) => {
            const isSelected = selecionadas.includes(opcao.id) && selecionadasFonte.includes(opcao.id);

            return (
              <TouchableOpacity
                key={opcao.id}
                style={[
                  stylesLocal.opcaoButton,
                  {
                    borderColor: isSelected ? '#C59B27' : 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: isSelected ? 'rgba(197, 155, 39, 0.1)' : 'transparent',
                  }
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  // Adotado como regra funcional de seleção única porque a pergunta atual solicita UMA prioridade.
                  dispatch({ 
                    type: 'SALVAR_RESPOSTA', 
                    payload: { idInterno, resposta: { ...respostaAtual, selecionadas: [opcao.id] } } 
                  });
                }}
              >
                <Text style={[stylesLocal.opcaoText, { color: isSelected ? '#C59B27' : '#FFFFFF' }]}>
                  {opcao.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    }

    return null;
  };

  return (
    <InterviewLayout
      currentStep={state.stepAtual}
      totalSteps={totalSteps}
      profissionalType={
        tipoProfissional === 'personal'
          ? 'PERSONAL TRAINER'
          : 'NUTRICIONISTA'
      }
      title={perguntaAtual.identificacaoStep}
      question={perguntaAtual.titulo}
      onBack={handleVoltar}
      onNext={handleAvancar}
      isNextDisabled={enviando}
    >
      {renderConteudo()}
    </InterviewLayout>
  );
}