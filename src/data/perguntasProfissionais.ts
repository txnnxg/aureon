// ==========================================
// TIPAGENS DA ARQUITETURA (Tipos Discriminados)
// ==========================================

export interface CampoInput {
  id: string;
  label: string;
  tipo: 'texto' | 'numero';
}

export interface OpcaoResposta {
  id: string;
  label: string;
  requerTextoComplementar?: boolean;
}

export interface BasePergunta {
  step: number;
  idInterno: string;
  identificacaoStep: string;
  titulo: string;
  subtitulo?: string;
}

export interface PerguntaInput extends BasePergunta {
  tipo: 'input' | 'texto-longo';
  campos: CampoInput[];
  opcoes?: never; 
  fonteOpcoesId?: never;
}

export interface PerguntaEscolha extends BasePergunta {
  tipo: 'escolha-simples' | 'escolha-multipla';
  opcoes: OpcaoResposta[];
  limiteEscolhas?: number;
  campos?: never;
  fonteOpcoesId?: never;
}

export interface PerguntaDinamica extends BasePergunta {
  tipo: 'escolha-dinamica';
  fonteOpcoesId: string;
  campos?: never;
  opcoes?: never;
}

export type PerguntaConfig = PerguntaInput | PerguntaEscolha | PerguntaDinamica;

// ==========================================
// FUNIL DO PERSONAL TRAINER
// ==========================================
export const perguntasPersonal: PerguntaConfig[] = [
  {
    step: 1,
    idInterno: 'personal_identificacao',
    identificacaoStep: 'IDENTIFICAÇÃO',
    titulo: 'Qual é seu nome e número\nde registro no CREF?',
    tipo: 'input',
    campos: [
      { id: 'nome', label: 'Nome completo', tipo: 'texto' },
      { id: 'cref', label: 'Registro no CREF', tipo: 'texto' },
    ],
  },
  {
    step: 2,
    idInterno: 'personal_atendimento',
    identificacaoStep: 'ATENDIMENTO',
    titulo: 'Como você atende\natualmente?',
    tipo: 'escolha-simples',
    opcoes: [
      { id: 'presencial', label: 'Presencial' },
      { id: 'online', label: 'Online' },
      { id: 'hibrido', label: 'Híbrido' },
      { id: 'nao_atendo', label: 'Ainda não atendo' },
    ],
  },
  {
    step: 3,
    idInterno: 'personal_alunos',
    identificacaoStep: 'ALUNOS',
    titulo: 'Quantos alunos você\nacompanha atualmente?',
    tipo: 'input',
    campos: [
      { id: 'quantidade', label: 'Quantidade de alunos', tipo: 'numero' },
    ],
  },
  {
    step: 4,
    idInterno: 'personal_publico',
    identificacaoStep: 'PÚBLICO',
    titulo: 'Quais públicos você atende?',
    subtitulo: 'Selecione mais de uma opção.',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'iniciantes', label: 'Iniciantes' },
      { id: 'hipertrofia', label: 'Hipertrofia' },
      { id: 'emagrecimento', label: 'Emagrecimento' },
      { id: 'condicionamento', label: 'Condicionamento físico' },
      { id: 'idosos', label: 'Pessoas idosas' },
      { id: 'atletas', label: 'Atletas' },
      { id: 'outros', label: 'Outros', requerTextoComplementar: true },
    ],
  },
  {
    step: 5,
    idInterno: 'personal_objetivos',
    identificacaoStep: 'OBJETIVOS',
    titulo: 'O que você mais deseja melhorar\nno seu trabalho?',
    subtitulo: 'Selecione até 3 opções.',
    tipo: 'escolha-multipla',
    limiteEscolhas: 3,
    opcoes: [
      { id: 'tempo', label: 'Economizar tempo' },
      { id: 'agendamentos', label: 'Organizar agendamentos' },
      { id: 'planejar', label: 'Planejar com antecedência' },
      { id: 'personalizar', label: 'Personalizar planejamentos' },
      { id: 'evolucao', label: 'Acompanhar evolução' },
      { id: 'frequencia', label: 'Melhorar frequência e continuidade' },
      { id: 'divulgar', label: 'Divulgar e atrair alunos' },
    ],
  },
  {
    step: 6,
    idInterno: 'personal_prioridade',
    identificacaoStep: 'PRIORIDADE',
    titulo: 'Qual desses objetivos é sua\nprioridade neste momento?',
    subtitulo: 'Objetivos escolhidos na etapa anterior.',
    tipo: 'escolha-dinamica',
    fonteOpcoesId: 'personal_objetivos',
  },
  {
    step: 7,
    idInterno: 'personal_rotina',
    identificacaoStep: 'SUA ROTINA',
    titulo: 'Qual tarefa ocupa mais tempo\nna sua rotina?',
    tipo: 'texto-longo',
    campos: [
      { id: 'resposta', label: 'Conte para nós...', tipo: 'texto' },
    ],
  },
  {
    step: 8,
    idInterno: 'personal_planejamento',
    identificacaoStep: 'PLANEJAMENTO',
    titulo: 'Qual é sua maior dificuldade ao\nmontar ou atualizar um\nplanejamento?',
    tipo: 'escolha-simples', 
    opcoes: [
      { id: 'selecionar_exercicios', label: 'Selecionar exercícios' },
      { id: 'definir_volume', label: 'Definir volume, intensidade e progressões' },
      { id: 'organizar_cronograma', label: 'Organizar o cronograma completo' },
      { id: 'adaptar_disponibilidade', label: 'Adaptar à disponibilidade do aluno' },
      { id: 'analisar_evolucao', label: 'Analisar a evolução' },
      { id: 'preparar_pdfs', label: 'Preparar PDFs e planilhas' },
      { id: 'outras', label: 'Outras', requerTextoComplementar: true },
    ],
  },
  {
    step: 9,
    idInterno: 'personal_adaptacoes',
    identificacaoStep: 'ADAPTAÇÕES',
    titulo: 'Quais situações exigem mais\nadaptações?',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'faltas', label: 'Faltas frequentes' },
      { id: 'viagens', label: 'Viagens ou mudanças de rotina' },
      { id: 'falta_equipamentos', label: 'Falta de equipamentos' },
      { id: 'limitacoes', label: 'Limitações relatadas' },
      { id: 'dificuldade_execucao', label: 'Dificuldade de execução' },
      { id: 'pouca_evolucao', label: 'Pouca evolução' },
      { id: 'outra', label: 'Outra', requerTextoComplementar: true },
    ],
  },
  {
    step: 10,
    idInterno: 'personal_organizacao',
    identificacaoStep: 'ORGANIZAÇÃO',
    titulo: 'Como você organiza treinos,\nagendamentos e informações\ndos alunos?',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'papel', label: 'Papel' },
      { id: 'planilhas', label: 'Planilhas' },
      { id: 'whatsapp', label: 'WhatsApp' },
      { id: 'aplicativo', label: 'Aplicativo' },
      { id: 'combinacao', label: 'Combinação de ferramentas' },
    ],
  },
  {
    step: 11,
    idInterno: 'personal_antecedencia',
    identificacaoStep: 'ANTECEDÊNCIA',
    titulo: 'Com quanto tempo de antecedência\nvocê costuma planejar?',
    tipo: 'escolha-simples',
    opcoes: [
      { id: 'uma_semana', label: 'Uma semana' },
      { id: 'um_mes', label: 'Um mês' },
      { id: 'dois_tres_meses', label: 'Dois a três meses' },
      { id: 'mais_tres_meses', label: 'Mais de três meses' },
      { id: 'sem_periodo', label: 'Sem período definido' },
    ],
  },
  {
    step: 12,
    idInterno: 'personal_rascunho',
    identificacaoStep: 'RASCUNHO COMPLETO',
    titulo: 'Você gostaria de receber um\nplanejamento para revisar, editar\ne aprovar?',
    subtitulo: 'A versão final depende da sua aprovação.',
    tipo: 'escolha-simples',
    opcoes: [
      { id: 'sim', label: 'Sim' },
      { id: 'nao', label: 'Não' },
      { id: 'entender', label: 'Quero entender como funciona' },
    ],
  },
  {
    step: 13,
    idInterno: 'personal_seu_planejamento',
    identificacaoStep: 'SEU PLANEJAMENTO',
    titulo: 'O que esse rascunho precisa incluir?',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'treinos_exercicios', label: 'Treinos e exercícios' },
      { id: 'frequencia', label: 'Frequência' },
      { id: 'series_repeticoes', label: 'Séries, repetições e intervalos' },
      { id: 'progressoes', label: 'Progressões previstas' },
      { id: 'cronograma', label: 'Cronograma semanal e mensal' },
      { id: 'observacoes', label: 'Observações e adaptações individuais' },
    ],
  },
  {
    step: 14,
    idInterno: 'personal_acompanhamento',
    identificacaoStep: 'ACOMPANHAMENTO',
    titulo: 'Quais informações você precisa\nacompanhar para decidir os ajustes?',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'metas_reavaliacoes', label: 'Metas e reavaliações' },
      { id: 'cargas_repeticoes', label: 'Cargas e repetições' },
      { id: 'esforco', label: 'Esforço percebido' },
      { id: 'feedback', label: 'Feedback do aluno' },
      { id: 'avaliacoes', label: 'Avaliações' },
      { id: 'outras', label: 'Outras', requerTextoComplementar: true },
    ],
  },
  {
    step: 15,
    idInterno: 'personal_documentos',
    identificacaoStep: 'DOCUMENTOS',
    titulo: 'Quais materiais você gostaria\nde gerar?',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'pdf_treino', label: 'PDF do treino' },
      { id: 'pdf_planejamento', label: 'PDF do planejamento completo' },
      { id: 'planilha', label: 'Planilha editável' },
      { id: 'cronograma', label: 'Cronograma' },
      { id: 'relatorio', label: 'Relatório de evolução' },
    ],
  },
  {
    step: 16,
    idInterno: 'personal_comunidade',
    identificacaoStep: 'COMUNIDADE',
    titulo: 'Você gostaria de divulgar seu trabalho\nna AUREON e receber agendamentos\npelo seu perfil?',
    tipo: 'escolha-simples',
    opcoes: [
      { id: 'sim', label: 'Sim' },
      { id: 'nao', label: 'Não' },
      { id: 'conhecer', label: 'Quero conhecer o recurso' },
    ],
  },
  {
    step: 17,
    idInterno: 'personal_divulgacao',
    identificacaoStep: 'DIVULGAÇÃO',
    titulo: 'O que mais dificulta sua divulgação?',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'falta_tempo', label: 'Falta de tempo' },
      { id: 'falta_ideias', label: 'Falta de ideias' },
      { id: 'dificuldade_conteudo', label: 'Dificuldade para criar conteúdo' },
      { id: 'pouco_alcance', label: 'Pouco alcance' },
      { id: 'transformar_interesse', label: 'Transformar interesse em agendamentos' },
      { id: 'outro', label: 'Outro', requerTextoComplementar: true },
    ],
  },
  {
    step: 18,
    idInterno: 'personal_sua_aureon',
    identificacaoStep: 'SUA AUREON',
    titulo: 'Se a AUREON pudesse facilitar\numa única tarefa do seu dia,\nqual seria?',
    tipo: 'texto-longo',
    campos: [
      { id: 'resposta', label: 'Escreva sua resposta...', tipo: 'texto' },
    ],
  },
];

// ==========================================
// FUNIL DO NUTRICIONISTA
// ==========================================
export const perguntasNutricionista: PerguntaConfig[] = [
  {
    step: 1,
    idInterno: 'nutri_identificacao',
    identificacaoStep: 'IDENTIFICAÇÃO',
    titulo: 'Qual é seu nome e número\nde registro no CRN?',
    tipo: 'input',
    campos: [
      { id: 'nome', label: 'Nome completo', tipo: 'texto' },
      { id: 'crn', label: 'Registro no CRN', tipo: 'texto' },
    ],
  },
  {
    step: 2,
    idInterno: 'nutri_atendimento',
    identificacaoStep: 'ATENDIMENTO',
    titulo: 'Como você atende\natualmente?',
    tipo: 'escolha-simples',
    opcoes: [
      { id: 'presencial', label: 'Presencial' },
      { id: 'online', label: 'Online' },
      { id: 'hibrido', label: 'Híbrido' },
      { id: 'nao_atendo', label: 'Ainda não atendo' },
    ],
  },
  {
    step: 3,
    idInterno: 'nutri_pacientes',
    identificacaoStep: 'PACIENTES',
    titulo: 'Quantos pacientes você\nacompanha atualmente?',
    tipo: 'input',
    campos: [
      { id: 'quantidade', label: 'Quantidade de pacientes', tipo: 'numero' },
    ],
  },
  {
    step: 4,
    idInterno: 'nutri_atuacao',
    identificacaoStep: 'ATUAÇÃO',
    titulo: 'Quais são suas principais\náreas de atuação?',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'clinica', label: 'Nutrição clínica' },
      { id: 'esportiva', label: 'Nutrição esportiva' },
      { id: 'comportamento', label: 'Comportamento alimentar' },
      { id: 'saude_mulher', label: 'Saúde da mulher' },
      { id: 'infantil', label: 'Nutrição infantil' },
      { id: 'idosos', label: 'Pessoas idosas' },
      { id: 'outras', label: 'Outras', requerTextoComplementar: true },
    ],
  },
  {
    step: 5,
    idInterno: 'nutri_objetivos',
    identificacaoStep: 'OBJETIVOS',
    titulo: 'O que você mais deseja\nmelhorar no seu trabalho?',
    subtitulo: 'Selecione até 3.',
    tipo: 'escolha-multipla',
    limiteEscolhas: 3,
    opcoes: [
      { id: 'tempo', label: 'Economizar tempo' },
      { id: 'consultas', label: 'Organizar consultas e retornos' },
      { id: 'planejar', label: 'Planejar com antecedência' },
      { id: 'personalizar', label: 'Personalizar planos alimentares' },
      { id: 'adesao', label: 'Melhorar adesão' },
      { id: 'evolucao', label: 'Acompanhar evolução' },
      { id: 'divulgar', label: 'Divulgar e atrair pacientes' },
    ],
  },
  {
    step: 6,
    idInterno: 'nutri_prioridade',
    identificacaoStep: 'PRIORIDADE',
    titulo: 'Qual desses objetivos é sua\nprioridade neste momento?',
    subtitulo: 'Objetivos escolhidos na etapa anterior.',
    tipo: 'escolha-dinamica',
    fonteOpcoesId: 'nutri_objetivos',
  },
  {
    step: 7,
    idInterno: 'nutri_rotina',
    identificacaoStep: 'SUA ROTINA',
    titulo: 'Qual tarefa ocupa mais tempo\nna sua rotina?',
    tipo: 'texto-longo',
    campos: [
      { id: 'resposta', label: 'Conte para nós...', tipo: 'texto' },
    ],
  },
  {
    step: 8,
    idInterno: 'nutri_planejamento',
    identificacaoStep: 'PLANEJAMENTO',
    titulo: 'Qual é sua maior dificuldade\nao elaborar ou atualizar\num planejamento?',
    tipo: 'escolha-simples',
    opcoes: [
      { id: 'organizar_avaliacao', label: 'Organizar informações da avaliação' },
      { id: 'adaptar_rotina', label: 'Adaptar à rotina do paciente' },
      { id: 'preferencias_orcamento', label: 'Considerar preferências e orçamento' },
      { id: 'substituicoes', label: 'Organizar substituições alimentares' },
      { id: 'metas_etapas', label: 'Definir metas e etapas' },
      { id: 'preparar_documentos', label: 'Preparar documentos e orientações' },
      { id: 'outra', label: 'Outra', requerTextoComplementar: true },
    ],
  },
  {
    step: 9,
    idInterno: 'nutri_adaptacoes',
    identificacaoStep: 'ADAPTAÇÕES',
    titulo: 'Quais situações exigem\nmais adaptações?',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'alergias', label: 'Alergias ou restrições alimentares' },
      { id: 'mudancas_rotina', label: 'Mudanças na rotina' },
      { id: 'viagens', label: 'Viagens' },
      { id: 'financeiras', label: 'Dificuldades financeiras' },
      { id: 'baixa_adesao', label: 'Baixa adesão' },
      { id: 'necessidades_avaliacao', label: 'Necessidades identificadas na avaliação' },
      { id: 'outras', label: 'Outras', requerTextoComplementar: true },
    ],
  },
  {
    step: 10,
    idInterno: 'nutri_organizacao',
    identificacaoStep: 'ORGANIZAÇÃO',
    titulo: 'Como você organiza consultas,\nplanos e informações dos\npacientes?',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'papel', label: 'Papel' },
      { id: 'planilhas', label: 'Planilhas' },
      { id: 'whatsapp', label: 'WhatsApp' },
      { id: 'software', label: 'Software' },
      { id: 'combinacao', label: 'Combinação de ferramentas' },
    ],
  },
  {
    step: 11,
    idInterno: 'nutri_acompanhamento_duracao',
    identificacaoStep: 'ACOMPANHAMENTO',
    titulo: 'Como você costuma organizar\na duração do acompanhamento\ne a frequência dos retornos?',
    tipo: 'input',
    campos: [
      { id: 'duracao', label: 'Duração (ex.: 3 meses)', tipo: 'texto' },
      { id: 'frequencia', label: 'Frequência (ex.: a cada 15 dias)', tipo: 'texto' },
    ],
  },
  {
    step: 12,
    idInterno: 'nutri_rascunho',
    identificacaoStep: 'RASCUNHO COMPLETO',
    titulo: 'Você gostaria de receber um\nplanejamento para revisar,\neditar e aprovar?',
    subtitulo: 'A versão final depende da sua aprovação.',
    tipo: 'escolha-simples',
    opcoes: [
      { id: 'sim', label: 'Sim' },
      { id: 'nao', label: 'Não' },
      { id: 'entender', label: 'Quero entender como funciona' },
    ],
  },
  {
    step: 13,
    idInterno: 'nutri_seu_planejamento',
    identificacaoStep: 'SEU PLANEJAMENTO',
    titulo: 'O que esse rascunho precisa incluir?',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'organizacao_plano', label: 'Organização do plano alimentar' },
      { id: 'substituicoes', label: 'Substituições' },
      { id: 'orientacoes', label: 'Orientações individualizadas' },
      { id: 'metas', label: 'Metas por etapa' },
      { id: 'cronograma', label: 'Cronograma de acompanhamento' },
      { id: 'consultas_retornos', label: 'Consultas, retornos e reavaliações' },
      { id: 'adaptacoes_especiais', label: 'Adaptações para períodos especiais' },
    ],
  },
  {
    step: 14,
    idInterno: 'nutri_acompanhamento',
    identificacaoStep: 'ACOMPANHAMENTO',
    titulo: 'Quais informações você precisa\nacompanhar para decidir os ajustes?',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'adesao', label: 'Adesão' },
      { id: 'rotina_alimentar', label: 'Rotina alimentar' },
      { id: 'feedback', label: 'Feedback do paciente' },
      { id: 'medidas_avaliacoes', label: 'Medidas e avaliações pertinentes' },
      { id: 'dificuldades', label: 'Dificuldades relatadas' },
      { id: 'outras', label: 'Outras', requerTextoComplementar: true },
    ],
  },
  {
    step: 15,
    idInterno: 'nutri_documentos',
    identificacaoStep: 'DOCUMENTOS',
    titulo: 'Quais materiais você gostaria\nde gerar?',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'pdf_plano', label: 'PDF do plano alimentar' },
      { id: 'orientacoes_pdf', label: 'Orientações em PDF' },
      { id: 'planilha', label: 'Planilha de acompanhamento' },
      { id: 'cronograma', label: 'Cronograma' },
      { id: 'relatorio', label: 'Relatório de evolução' },
    ],
  },
  {
    step: 16,
    idInterno: 'nutri_comunidade',
    identificacaoStep: 'COMUNIDADE',
    titulo: 'Você gostaria de divulgar seu\ntrabalho na AUREON e receber\nagendamentos pelo seu perfil?',
    tipo: 'escolha-simples',
    opcoes: [
      { id: 'sim', label: 'Sim' },
      { id: 'nao', label: 'Não' },
      { id: 'conhecer', label: 'Quero conhecer o recurso' },
    ],
  },
  {
    step: 17,
    idInterno: 'nutri_divulgacao',
    identificacaoStep: 'DIVULGAÇÃO',
    titulo: 'O que mais dificulta sua\ndivulgação?',
    tipo: 'escolha-multipla',
    opcoes: [
      { id: 'falta_tempo', label: 'Falta de tempo' },
      { id: 'falta_ideias', label: 'Falta de ideias' },
      { id: 'dificuldade_conteudo', label: 'Dificuldade para criar conteúdo' },
      { id: 'pouco_alcance', label: 'Pouco alcance' },
      { id: 'transformar_interesse', label: 'Transformar interesse em agendamentos' },
      { id: 'outro', label: 'Outro', requerTextoComplementar: true },
    ],
  },
  {
    step: 18,
    idInterno: 'nutri_sua_aureon',
    identificacaoStep: 'SUA AUREON',
    titulo: 'Se a AUREON pudesse facilitar\numa única tarefa do seu dia,\nqual seria?',
    tipo: 'texto-longo',
    campos: [
      { id: 'resposta', label: 'Escreva sua resposta...', tipo: 'texto' },
    ],
  },
];