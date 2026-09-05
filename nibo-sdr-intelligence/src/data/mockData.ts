import { AccountingFirm, SDRMetrics, Badge, TrainingModule, CallAnalysis, User } from '../types';

export const DEMO_ACCOUNTING_FIRMS: AccountingFirm[] = [
  {
    id: 'firm-1',
    cnpj: '61.412.112/0001-85',
    razaoSocial: 'ORGANIZACAO CONTABIL CAMPINAS LTDA',
    nomeFantasia: 'Campinas Contabilidade & Gestão',
    socioResponsavel: 'Marcos Vinicius de Oliveira',
    telefone: '(19) 3254-8800',
    celular: '(19) 99712-4410',
    whatsapp: '5519997124410',
    cidade: 'Campinas',
    estado: 'SP',
    regiao: 'Sudeste',
    cep: '13010-111',
    site: 'https://campinascontabil.com.br',
    email: 'contato@campinascontabil.com.br',
    status: 'Novo',
    score: 84,
    scoreBreakdown: {
      presencaDigital: 85,
      tamanhoAparenti: 80,
      estruturaEscritorio: 88,
      complexidadeOperacional: 83,
      justificativa: 'Escritório médio/grande com site ativo, múltiplos telefones e presença digital consolidada. Alto volume potencial de extratos bancários e guias fiscais.'
    },
    source: 'MinhaReceita API (Oficial - Receita Federal)',
    retrievedAt: '2026-08-01 10:15',
    confidence: 'Alta',
    isDemoData: false,
    addedToPipeline: true,
    dataAbertura: '2010-04-12',
    porte: 'Demais (Médio/Grande)',
    summary: {
      perfilProvavel: 'Escritório contábil tradicional estruturado em Campinas-SP com foco em PMEs da região metropolitana.',
      possiveisDores: [
        'Demora dos clientes na entrega de extratos bancários para conciliação mensal',
        'Gargalo na checagem diária do e-CAC de múltiplos CNPJs com certificado digital',
        'Equipe perdendo tempo reenviando guias de impostos no e-mail'
      ],
      hipotesesProcessosManuais: [
        'Utilização de planilha Excel interna para acompanhamento de prazos do departamento fiscal',
        'Cobrança reativa de extratos no final do mês via mensagens individuais de WhatsApp'
      ],
      produtoNiboRelevante: 'Conciliador Open Finance + Nibo Obrigações Plus',
      perguntasDescoberta: [
        'Como a sua equipe lida hoje com os clientes que deixam para enviar os extratos no último dia do mês?',
        'Qual o impacto no tempo do time fiscal para consultar a caixa postal e pendências no e-CAC de todos os seus clientes?'
      ],
      ganchoAbertura: 'Olá Marcos, vi que a Campinas Contabilidade atende diversas PMEs da região. Muitos escritórios de Campinas nos relatam que perdem semanas só cobrando extrato bancário. Como funciona esse processo aí hoje?',
      objecoesProvaveis: ['Já uso sistema contábil que importa arquivo', 'Não tenho tempo para mudar de sistema agora'],
      proximoPasso: 'Apresentar simulação de tempo economizado com busca automática Open Finance em +25 bancos.'
    }
  },
  {
    id: 'firm-2',
    cnpj: '42.881.002/0001-19',
    razaoSocial: 'CONTABILIDADE SUL ASSESSORIA EMPRESARIAL LTDA',
    nomeFantasia: 'Sul Contábil',
    socioResponsavel: 'Luciana Aparecida Santos',
    telefone: '(41) 3322-9011',
    celular: '(41) 98843-1200',
    whatsapp: '5541988431200',
    cidade: 'Curitiba',
    estado: 'PR',
    regiao: 'Sul',
    cep: '80020-000',
    site: 'https://sulcontabilpr.com.br',
    email: 'luciana@sulcontabilpr.com.br',
    status: 'Conversando',
    score: 78,
    scoreBreakdown: {
      presencaDigital: 75,
      tamanhoAparenti: 80,
      estruturaEscritorio: 78,
      complexidadeOperacional: 79,
      justificativa: 'Empresa ativa no Paraná com equipe média. Demonstra alto potencial para automação do fluxo de guias de impostos e emissor de notas.'
    },
    source: 'MinhaReceita API (Oficial)',
    retrievedAt: '2026-08-02 14:30',
    confidence: 'Alta',
    isDemoData: false,
    addedToPipeline: true,
    dataAbertura: '2015-08-20',
    porte: 'Empresa de Pequeno Porte (EPP)',
    summary: {
      perfilProvavel: 'Escritório contábil dinâmico em Curitiba focado em prestadores de serviços e comércio.',
      possiveisDores: [
        'Erros recorrentes de alíquotas na emissão de notas fiscais pelos próprios clientes',
        'Comunicação dispersa em celulares pessoais da equipe'
      ],
      hipotesesProcessosManuais: [
        'Emissão de notas pelo portal da prefeitura com preenchimento manual repetitivo'
      ],
      produtoNiboRelevante: 'Nibo Emissor + WhatsApp para Contabilidade',
      perguntasDescoberta: [
        'Quantas ligações por semana o setor fiscal recebe tirando dúvidas sobre emissão de NFS-e?',
        'Como vocês registram hoje as conversas e solicitações dos clientes do escritório?'
      ],
      ganchoAbertura: 'Olá Luciana! Vi que a Sul Contábil atende prestadores de serviços. Como seus clientes emitem as notas hoje? Eles usam o portal da prefeitura ou uma ferramenta padronizada com vocês?',
      objecoesProvaveis: ['Meus clientes já se acostumaram com o portal da prefeitura'],
      proximoPasso: 'Enviar demonstração em vídeo do Nibo Emissor com parametrização fiscal automática.'
    }
  },
  {
    id: 'firm-3',
    cnpj: '08.112.990/0001-44',
    razaoSocial: 'SOLUCOES CONTABEIS INTEGRADAS NORDESTE EIRELI',
    nomeFantasia: 'Integrada Contabilidade Recife',
    socioResponsavel: 'Rafael Mendonça Filho',
    telefone: '(81) 3421-5500',
    celular: '(81) 99120-3344',
    whatsapp: '5581991203344',
    cidade: 'Recife',
    estado: 'PE',
    regiao: 'Nordeste',
    cep: '50030-230',
    site: 'https://integradacontabil.com.br',
    email: 'atendimento@integradacontabil.com.br',
    status: 'Qualificado',
    score: 91,
    scoreBreakdown: {
      presencaDigital: 92,
      tamanhoAparenti: 90,
      estruturaEscritorio: 90,
      complexidadeOperacional: 92,
      justificativa: 'Escritório de alto crescimento em Pernambuco com forte apelo em inovação. Perfeito fit para o ecossistema Nibo completo (Obrigações Plus + App Personalizado).'
    },
    source: 'MinhaReceita API (Oficial)',
    retrievedAt: '2026-08-03 09:00',
    confidence: 'Alta',
    isDemoData: false,
    addedToPipeline: true,
    dataAbertura: '2012-03-15',
    porte: 'Demais',
    summary: {
      perfilProvavel: 'Contabilidade consultiva e moderna em expansão no Nordeste.',
      possiveisDores: ['Necessidade de diferencial competitivo contra contabilidades online baratas', 'Desejo de entregar experiência mobile de alto nível para os clientes'],
      hipotesesProcessosManuais: ['E-mails institucionais com baixa taxa de abertura para envio de guias'],
      produtoNiboRelevante: 'Aplicativo Personalizado + Obrigações Plus',
      perguntasDescoberta: ['Qual é o seu principal diferencial hoje quando envia uma proposta para um cliente em potencial?'],
      ganchoAbertura: 'Rafael, vi o posicionamento inovador da Integrada. Como seria para a marca de vocês se os seus clientes baixassem um aplicativo próprio do seu escritório para receber guias e falar com vocês?',
      objecoesProvaveis: ['Qual é o investimento para ter um aplicativo com a nossa marca?'],
      proximoPasso: 'Agendar reunião com Executivo de Vendas para demonstração da App Store personalizada.'
    }
  },
  {
    id: 'firm-4',
    cnpj: '18.990.111/0001-05',
    razaoSocial: 'EXTREMO OESTE CONTABILIDADE E CONSULTORIA LTDA',
    nomeFantasia: 'Oeste Contábil',
    socioResponsavel: 'Juliano de Souza',
    telefone: '(62) 3212-0099',
    celular: '(62) 98111-2233',
    whatsapp: '5562981112233',
    cidade: 'Goiânia',
    estado: 'GO',
    regiao: 'Centro-Oeste',
    cep: '74000-000',
    site: '',
    email: 'oeste.contabil@hotmail.com',
    status: 'Novo',
    score: 48,
    scoreBreakdown: {
      presencaDigital: 20,
      tamanhoAparenti: 55,
      estruturaEscritorio: 50,
      complexidadeOperacional: 67,
      justificativa: 'Sem site oficial, e-mail comercial genérico. Empresa em operação com oportunidade para modernização inicial de processos.'
    },
    source: 'Bases Públicas CNPJ',
    retrievedAt: '2026-08-04 11:20',
    confidence: 'Média',
    isDemoData: false,
    addedToPipeline: false,
    dataAbertura: '2018-01-10',
    porte: 'Microempresa (ME)',
    summary: {
      perfilProvavel: 'Escritório tradicional de pequeno porte com operação centralizada no sócio.',
      possiveisDores: ['Operação braçal pesada', 'Pouco tempo para captação de clientes'],
      hipotesesProcessosManuais: ['Controle de tarefas em cadernos ou planilhas locais'],
      produtoNiboRelevante: 'Conciliador Open Finance',
      perguntasDescoberta: ['Hoje quanto tempo você gasta fazendo digitação contábil de extratos dos seus clientes?'],
      ganchoAbertura: 'Juliano, tudo bem? Sei que gerenciar um escritório exige desdobrar em vários papéis. Como você lida hoje com a parte de conciliação bancária dos clientes?',
      objecoesProvaveis: ['Minha estrutura é pequena, prefiro continuar do jeito atual'],
      proximoPasso: 'Apresentação curta focada na economia de tempo pessoal do contador.'
    }
  }
];

export const INITIAL_USER: User = {
  id: 'u-sdr-1',
  name: 'Lucas SDR Nibo',
  email: 'lucas.sdr@nibo.com.br',
  role: 'sdr',
  level: 'SDR Hunter',
  xp: 1450,
};

export const DEFAULT_METRICS: SDRMetrics = {
  totalCalls: 142,
  totalWhatsApps: 289,
  leadsProspectados: 310,
  leadsContatados: 185,
  conversasIniciadas: 94,
  reunioesAgendadas: 28,
  taxaConversao: 15.1,
  taxaResposta: 50.8,
  taxaConexao: 65.5,
  tempoMedioLigacaoSeconds: 215,
  notaMediaLigacoes: 78.4,
  notaMediaWhatsApps: 81.2,
  principaisObjecoes: [
    { name: 'Já uso sistema contábil', count: 42 },
    { name: 'Estou sem tempo / Manda WhatsApp', count: 35 },
    { name: 'Achei caro / Orçamento', count: 28 },
    { name: 'Uso concorrente (Acessórias/Gestta)', count: 19 },
    { name: 'Não tenho interesse', count: 12 }
  ],
  principaisErros: [
    'Apresentar o produto Nibo antes de aprofundar na dor do processo atual',
    'Fazer perguntas fechadas ("Vocês usam Open Finance?") ao invés de abertas ("Como é o processo hoje?")',
    'Aceitar enviar material genérico por WhatsApp sem alinhar dia/horário de retorno'
  ],
  principaisPontosFortes: [
    'Excelente tom de voz, clareza e autoridade na abertura das chamadas',
    'Bom contorno da objeção de "Já uso sistema contábil" explicando a complementaridade do Nibo',
    'Definição clara de próximo passo com data e hora no encerramento'
  ],
  focoRecomendado: {
    titulo: 'Aprofundar a Etapa de Descoberta',
    descricao: 'Você está apresentando a solução Nibo muito cedo na ligação (em média aos 40 segundos). Experimente fazer pelo menos 2 perguntas sobre o impacto do problema antes de falar do produto.',
    tipo: 'descoberta'
  }
};

export const INITIAL_BADGES: Badge[] = [
  { id: 'b1', title: 'Primeiro Contato', description: 'Realizou a primeira simulação de call no sistema', iconName: 'PhoneCall', unlocked: true, unlockedAt: '2026-08-01' },
  { id: 'b2', title: 'Mestre da Descoberta', description: 'Obteve nota acima de 85 na etapa de Pergunta de Descoberta', iconName: 'Search', unlocked: true, unlockedAt: '2026-08-03' },
  { id: 'b3', title: 'Destruidor de Objeções', description: 'Contornou com sucesso 10 objeções do nível EXTREME', iconName: 'ShieldAlert', unlocked: false },
  { id: 'b4', title: 'Analista de Ouro', description: 'Realizou upload e análise de 5 ligações reais', iconName: 'FileText', unlocked: true, unlockedAt: '2026-08-05' },
  { id: 'b5', title: 'SDR Hunter Elite', description: 'Atingiu a marca de 50 reuniões agendadas com contabilidades', iconName: 'Trophy', unlocked: false }
];

export const INITIAL_SDR_METRICS = DEFAULT_METRICS;

export const INITIAL_TRAINING_MODULES: TrainingModule[] = [
  {
    id: 'm1',
    title: 'Perguntas de Descoberta Irresistíveis',
    week: 1,
    category: 'Descoberta',
    xpReward: 50,
    durationMinutes: 15,
    description: 'Aprenda a fazer o contador admitir o impacto financeiro e operacional da falta de automação no escritório.',
    completed: true,
    exercises: [
      {
        id: 'e1',
        type: 'descoberta',
        scenario: 'O contador atende a ligação dizendo que a equipe dele é super organizada e não tem problemas com extratos.',
        prospectStatement: 'Aqui no escritório a gente exige que o cliente mande tudo até o dia 5 e funciona super bem.',
        options: [
          'Ah, que ótimo! Mas o Nibo tem uma ferramenta incrível que vai deixar ainda melhor!',
          'E quando algum cliente não cumpre o dia 5, o que a sua equipe precisa fazer para cobrá-lo?',
          'Você sabia que seu sistema atual está ultrapassado?',
          'Então você não precisa do Nibo, obrigado e bom dia.'
        ],
        correctOptionIndex: 1,
        explanation: 'Excelente! A segunda opção explora a exceção à regra (o cliente recalcitrante) e abre espaço para descobrir a dor oculta sem confrontar a fala do prospect.'
      }
    ]
  },
  {
    id: 'm2',
    title: 'Contorno de Objeções de Sistema Atual',
    week: 2,
    category: 'Objeções',
    xpReward: 75,
    durationMinutes: 20,
    description: 'Como desarmar o contador quando ele diz "Já uso Domínio/Alterdata/Questor e estou satisfeito".',
    completed: false,
    exercises: [
      {
        id: 'e2',
        type: 'objeção',
        scenario: 'O prospect interrompe sua fala dizendo que o sistema contábil dele já faz tudo.',
        prospectStatement: 'Eu já pago caro no meu sistema fiscal e ele já vem com módulo de tarefas.',
        options: [
          'Dizer que o módulo de tarefas do sistema dele é ruim e ultrapassado.',
          'Reconhecer que o sistema fiscal dele é ótimo para impostos, e explicar que o Nibo roda junto automatizando o WhatsApp e Open Finance.',
          'Oferecer 50% de desconto no Nibo imediatamente.',
          'Perguntar se ele quer cancelar o sistema fiscal atual dele.'
        ],
        correctOptionIndex: 1,
        explanation: 'A segunda opção posiciona o Nibo como um aliado complementar e não um concorrente doloroso de substituição.'
      }
    ]
  },
  {
    id: 'm3',
    title: 'Pitch Curto & Chamada para Ação (CTA)',
    week: 3,
    category: 'Pitch & Fechamento',
    xpReward: 100,
    durationMinutes: 25,
    description: 'Como apresentar o valor do ecossistema Nibo em 30 segundos e garantir a reunião na agenda do especialista.',
    completed: false,
    exercises: []
  }
];

export const TRAINING_MODULES = INITIAL_TRAINING_MODULES;

export const EXAMPLE_TOP_CALLS: CallAnalysis[] = [
  {
    id: 'call-top-1',
    title: 'Call Exemplar — Fechamento Nibo Obrigações Plus com Contabilidade Sul',
    audioFileName: 'ligacao_marcos_sulcontabil.mp3',
    audioDuration: '04:12',
    date: '2026-08-05',
    isExample: true,
    transcript: [
      { speaker: 'SDR', text: 'Olá Marcos, tudo bem? Aqui é o Lucas do Nibo. Vi que a Sul Contábil atende mais de 100 empresas em Curitiba. Posso te fazer uma pergunta rápida sobre o controle de prazos das guias?', timestamp: '00:05' },
      { speaker: 'Prospect', text: 'Pode falar, Lucas, mas tô meio na correria aqui.', timestamp: '00:12' },
      { speaker: 'SDR', text: 'Prometo ser bem objetivo! Hoje como é que vocês sabem se todas as guias do mês foram entregues e o cliente realmente recebeu?', timestamp: '00:18' },
      { speaker: 'Prospect', text: 'A gente manda por e-mail e a equipe anota na planilha. Mas vira e mexe o cliente diz que caiu no spam e pede pra reemitir com juros.', timestamp: '00:30' },
      { speaker: 'SDR', text: 'Exatamente essa a dor! E quanto tempo seu time perde no fim do mês reemitindo boleto que o cliente não viu no e-mail?', timestamp: '00:42' },
      { speaker: 'Prospect', text: 'Nossa, um bocado. O fiscal reclama direto disso.', timestamp: '00:52' },
      { speaker: 'SDR', text: 'O Nibo Obrigações Plus resolve exatamente isso. Ele envia a guia direto no WhatsApp do cliente com protocolo de leitura automático.', timestamp: '01:05' },
      { speaker: 'Prospect', text: 'Interessante. Quanto custa isso?', timestamp: '01:18' },
      { speaker: 'SDR', text: 'Depende do volume de CNPJs, mas se a gente economizar 10 horas do seu fiscal por mês já se paga com folga. Vamos agendar 15 min nesta quinta para eu te mostrar a tela funcionando?', timestamp: '01:28' },
      { speaker: 'Prospect', text: 'Pode ser. Quinta às 14h tá livre.', timestamp: '01:40' }
    ],
    talkRatio: { sdr: 42, prospect: 58 },
    callScore: 92,
    subScores: {
      abertura: 95,
      descoberta: 94,
      escuta: 90,
      objecoes: 88,
      argumentacao: 92,
      cta: 95
    },
    oQueFoiBem: [
      'Deixou o prospect falar por 58% do tempo',
      'Fez pergunta de impacto de tempo/retrabalho antes de mencionar o produto',
      'Ancorou a objeção de preço no custo da hora de trabalho do setor fiscal',
      'Fechou a reunião com data e hora exatas de forma assertiva'
    ],
    oQueMelhorar: [
      'Poderia ter explorado se eles já usam o e-CAC no mesmo pacote'
    ],
    erros: [],
    oportunidadesPerdidas: ['Perdeu gancho para apresentar o Radar e-CAC em conjunto.'],
    objecoesIdentificadas: ['Pergunta de preço prévia'],
    frasesEficazes: [
      '"Como é que vocês sabem se todas as guias foram entregues?"',
      '"Quanto tempo seu time perde no fim do mês reemitindo boleto?"'
    ],
    frasesPrejudiciais: [],
    maiorOportunidadeMelhoria: 'Manter esse mesmo padrão de escuta ativa e pergunta de impacto em todas as ligações.',
    comoFazerMelhor: 'Excelente ligação! Apenas introduzir o Radar e-CAC como combo de valor.'
  }
];
