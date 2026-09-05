export type UserRole = 'sdr' | 'gestor' | 'admin';

export type SDRLevel = 
  | 'SDR Iniciante' 
  | 'SDR Explorador' 
  | 'SDR Hunter' 
  | 'SDR Elite' 
  | 'SDR Master';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  level: SDRLevel;
  xp: number;
  avatarUrl?: string;
}

export type LeadStatus = 
  | 'Novo'
  | 'Contatado'
  | 'Conversando'
  | 'Qualificado'
  | 'Reunião'
  | 'Oportunidade'
  | 'Ganho'
  | 'Perdido';

export type BrazilianRegion = 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';

export interface ScoreBreakdown {
  presencaDigital: number;
  tamanhoAparenti: number;
  estruturaEscritorio: number;
  complexidadeOperacional: number;
  justificativa: string;
}

export interface LeadSummary {
  perfilProvavel: string;
  possiveisDores: string[];
  hipotesesProcessosManuais: string[];
  produtoNiboRelevante: string;
  perguntasDescoberta: string[];
  ganchoAbertura: string;
  objecoesProvaveis: string[];
  proximoPasso: string;
}

export interface AccountingFirm {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  socioResponsavel: string;
  telefone: string;
  celular: string;
  whatsapp: string;
  cidade: string;
  estado: string;
  regiao: BrazilianRegion;
  cep: string;
  site: string;
  email: string;
  status: LeadStatus;
  score: number;
  scoreBreakdown?: ScoreBreakdown;
  source: string;
  retrievedAt: string;
  confidence: 'Alta' | 'Média' | 'Estimada';
  isDemoData: boolean;
  notes?: string;
  addedToPipeline: boolean;
  dataAbertura?: string;
  porte?: string;
  summary?: LeadSummary;
}

export interface NiboProduct {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Financeiro' | 'Fiscal/Notas' | 'Gestão/Operação' | 'Comunicação' | 'Conformidade';
  keyBenefits: string[];
  problemSolved: string;
  targetPain: string;
  pitchScript: string;
  discoveryQuestions: string[];
  objectionHandlers: Record<string, string>;
}

export interface Objection {
  id: string;
  category: 'Preço' | 'Tempo' | 'Concorrente' | 'Sistema Atual' | 'Falta de Interesse' | 'Decisão' | 'Estrutura';
  objectionText: string;
  prospectMindset: string;
  sdrPitfallToAvoid: string;
  strategy: string;
  sampleResponse: string;
  followUpQuestion: string;
  nextStep: string;
  productRelated?: string;
}

export interface Script {
  id: string;
  title: string;
  category: 'Cold Call' | 'WhatsApp' | 'Follow-up' | 'Reativação' | 'Pós-reunião' | 'Contato Decisor';
  targetProduct: string;
  objective: string;
  openingLine: string;
  discoveryQuestions: string[];
  painExploration: string;
  transition: string;
  pitch: string;
  cta: string;
  commonObjections: string[];
}

export type SimulationDifficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'EXTREME';

export interface Persona {
  id: string;
  name: string;
  role: string;
  firmType: string;
  size: string;
  mindset: string;
  keyFears: string[];
  mainPains: string[];
  behavior: string;
  decisionCriteria: string[];
  avatarIcon?: string;
}

export interface SimulationMessage {
  id: string;
  sender: 'sdr' | 'prospect' | 'system';
  content: string;
  timestamp: string;
  fillerWordsDetected?: string[];
}

export interface CallSimulation {
  id: string;
  title: string;
  date: string;
  product: string;
  personaId: string;
  difficulty: SimulationDifficulty;
  scenario: string;
  messages: SimulationMessage[];
  score?: number;
  subScores?: {
    abertura: number;
    rapport: number;
    descoberta: number;
    escuta: number;
    objecoes: number;
    pitch: number;
    cta: number;
  };
  feedback?: {
    oQueFoiBem: string[];
    oQueMelhorar: string[];
    erros: string[];
    frasesAEvitar: string[];
    recomendacao: string;
  };
}

export interface WhatsAppSimulation {
  id: string;
  date: string;
  personaId: string;
  difficulty: SimulationDifficulty;
  messages: {
    id: string;
    sender: 'sdr' | 'prospect';
    text: string;
    time: string;
  }[];
  score?: number;
  analysis?: {
    clareza: number;
    pressaoComercial: number;
    naturalidade: number;
    capacidadeGerarResposta: number;
    sugestaoResposta: string;
  };
}

export interface CallAnalysis {
  id: string;
  title: string;
  audioFileName: string;
  audioDuration: string;
  date: string;
  isExample?: boolean;
  transcript: {
    speaker: 'SDR' | 'Prospect';
    text: string;
    timestamp: string;
  }[];
  talkRatio: {
    sdr: number;
    prospect: number;
  };
  callScore: number;
  subScores: {
    abertura: number;
    descoberta: number;
    escuta: number;
    objecoes: number;
    argumentacao: number;
    cta: number;
  };
  oQueFoiBem: string[];
  oQueMelhorar: string[];
  erros: string[];
  oportunidadesPerdidas: string[];
  objecoesIdentificadas: string[];
  frasesEficazes: string[];
  frasesPrejudiciais: string[];
  maiorOportunidadeMelhoria: string;
  comoFazerMelhor: string;
}

export interface TrainingExercise {
  id: string;
  type: 'descoberta' | 'objeção' | 'pitch' | 'cta';
  scenario: string;
  prospectStatement: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  week: number;
  category: string;
  xpReward: number;
  durationMinutes: number;
  description: string;
  completed: boolean;
  exercises: TrainingExercise[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface SDRMetrics {
  totalCalls: number;
  totalWhatsApps: number;
  leadsProspectados: number;
  leadsContatados: number;
  conversasIniciadas: number;
  reunioesAgendadas: number;
  taxaConversao: number;
  taxaResposta: number;
  taxaConexao: number;
  tempoMedioLigacaoSeconds: number;
  notaMediaLigacoes: number;
  notaMediaWhatsApps: number;
  principaisObjecoes: { name: string; count: number }[];
  principaisErros: string[];
  principaisPontosFortes: string[];
  focoRecomendado: {
    titulo: string;
    descricao: string;
    tipo: 'descoberta' | 'objeção' | 'escuta' | 'fechamento';
  };
}

export interface PainMatrixItem {
  dor: string;
  produto: string;
  perguntaDescoberta: string;
  argumentoValor: string;
  impactoEsperado: string;
}

export interface AiVsAiMessage {
  speaker: 'SDR_AI' | 'PROSPECT_AI' | 'SDR_HUMAN';
  text: string;
  timestamp: string;
}

export interface AiVsAiSession {
  id: string;
  product: string;
  personaId: string;
  difficulty: SimulationDifficulty;
  status: 'running' | 'paused' | 'finished';
  messages: AiVsAiMessage[];
  winner?: 'SDR' | 'Prospect';
  evaluation?: {
    score: number;
    sdrHighlights: string[];
    sdrFlaws: string[];
    recommendedTurn: string;
  };
}
