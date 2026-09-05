import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Mic,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
  PhoneCall,
  Search,
  CheckCheck,
  Zap,
  Radio,
  FileAudio,
  User,
  Building2,
  Clock,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Plus,
  Square,
  Copy,
  Check,
  Wand2,
  Bot
} from 'lucide-react';

interface AudioNote {
  id: string;
  sender: 'prospect' | 'sdr';
  durationSeconds: number;
  timestamp: string;
  transcript: string;
  sentiment: 'Positivo' | 'Objeção' | 'Urgente' | 'Dúvida';
  audioFreqs: number[]; // relative wave heights
  keyPainsDetected: string[];
  recommendedReply: string;
}

interface WhatsAppLiveMessage {
  id: string;
  sender: 'prospect' | 'sdr';
  type: 'text' | 'audio';
  content?: string;
  audio?: AudioNote;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface WhatsAppLiveContact {
  id: string;
  nome: string;
  escritorio: string;
  cidade: string;
  socio: string;
  cnpj: string;
  statusPipeline: string;
  unreadAudioCount: number;
  lastMessageTime: string;
  lastMessageSnippet: string;
  sistemaAtual: string;
  leadsScore: number;
  messages: WhatsAppLiveMessage[];
}

const INITIAL_CONTACTS: WhatsAppLiveContact[] = [
  {
    id: 'c1',
    nome: 'Dr. Roberto Silveira',
    escritorio: 'Silveira Contabilidade & Associados',
    cidade: 'São Paulo - SP',
    socio: 'Roberto Silveira',
    cnpj: '12.345.678/0001-90',
    statusPipeline: 'Conversando',
    unreadAudioCount: 2,
    lastMessageTime: '12:34',
    lastMessageSnippet: '🎙️ Áudio (0:48) - Dúvida sobre migração do sistema',
    sistemaAtual: 'Domínio Sistemas',
    leadsScore: 92,
    messages: [
      {
        id: 'm1',
        sender: 'sdr',
        type: 'text',
        content: 'Olá Dr. Roberto! Tudo bem? Aqui é o Gabriel da Nibo. Vi que seu escritório atende mais de 120 empresas na região de SP. Como vocês têm lidado com o fechamento mensal e conciliação bancária dos clientes?',
        timestamp: '12:15',
        status: 'read'
      },
      {
        id: 'm2',
        sender: 'prospect',
        type: 'audio',
        timestamp: '12:20',
        status: 'read',
        audio: {
          id: 'a1',
          sender: 'prospect',
          durationSeconds: 48,
          timestamp: '12:20',
          transcript: 'Fala Gabriel, tudo bom? Cara, a conciliação aqui é um gargalo gigante. O pessoal do meu operacional gasta quase 4 dias por mês só digitando extrato de cliente que manda PDF truncado. Mas o meu sócio fica com o pé atrás de mudar de ferramenta no meio do semestre...',
          sentiment: 'Objeção',
          audioFreqs: [15, 30, 45, 80, 60, 90, 40, 75, 85, 30, 50, 95, 65, 40, 70, 80, 35, 55, 90, 45],
          keyPainsDetected: ['Digitação manual de extratos PDF', 'Atraso de 4 dias por mês no operacional', 'Resistência do sócio a mudanças'],
          recommendedReply: 'Entendo perfeitamente a preocupação do seu sócio, Dr. Roberto. O Nibo tem um importador inteligente de extratos com OCR que reduz esses 4 dias para menos de 30 minutos, e a migração é feita em menos de 48h sem parar a operação. Posso te enviar um vídeo de 2min mostrando como funciona?'
        }
      },
      {
        id: 'm3',
        sender: 'sdr',
        type: 'text',
        content: 'Perfeito, Dr. Roberto! Entendo perfeitamente a cautela do seu sócio. O Nibo Importador de Extratos resolve justamente essa digitação manual em PDF sem precisar trocar seu sistema contábil atual!',
        timestamp: '12:25',
        status: 'read'
      },
      {
        id: 'm4',
        sender: 'prospect',
        type: 'audio',
        timestamp: '12:34',
        status: 'read',
        audio: {
          id: 'a2',
          sender: 'prospect',
          durationSeconds: 32,
          timestamp: '12:34',
          transcript: 'Poxa, se funciona sem trocar meu sistema atual, isso facilita muito a conversa com o meu sócio! Me manda esse vídeo curto sim e me diz se quinta-feira à tarde você tem 15 minutos pra gente alinhar uma demonstração rápida.',
          sentiment: 'Positivo',
          audioFreqs: [20, 50, 70, 90, 80, 100, 60, 40, 85, 95, 70, 50, 60, 80, 90, 40, 30, 60, 75, 50],
          keyPainsDetected: ['Aberto a demonstração', 'Gostou de não precisar trocar o sistema principal', 'Horário sugerido: Quinta-feira à tarde'],
          recommendedReply: 'Excelente, Dr. Roberto! Quinta-feira às 14h30 fica bom para você e seu sócio? Já vou separar aqui o material completo do Nibo Gestão Financeira.'
        }
      }
    ]
  },
  {
    id: 'c2',
    nome: 'Dra. Luciana Ferreira',
    escritorio: 'Ferreira & Mendes Contabilidade',
    cidade: 'Belo Horizonte - MG',
    socio: 'Luciana Ferreira',
    cnpj: '98.765.432/0001-10',
    statusPipeline: 'Qualificado',
    unreadAudioCount: 1,
    lastMessageTime: '11:50',
    lastMessageSnippet: '🎙️ Áudio (0:35) - Pergunta sobre valor da licença',
    sistemaAtual: 'Alterdata / Fortes',
    leadsScore: 88,
    messages: [
      {
        id: 'm20',
        sender: 'prospect',
        type: 'audio',
        timestamp: '11:50',
        status: 'read',
        audio: {
          id: 'a20',
          sender: 'prospect',
          durationSeconds: 35,
          timestamp: '11:50',
          transcript: 'Oi Gabriel, vi a apresentação do Nibo Obrigações no e-mail. Gostei da parte de buscar certidões e NDs automaticamente. Quanto custa a mensalidade para 200 CNPJs?',
          sentiment: 'Dúvida',
          audioFreqs: [25, 40, 65, 85, 95, 70, 45, 80, 60, 30, 50, 75, 85, 90, 40, 30, 50, 60, 40, 20],
          keyPainsDetected: ['Interesse em automação de certidões/NDs', 'Busca cotação para 200 CNPJs', 'Sinal forte de qualificação'],
          recommendedReply: 'Olá Dra. Luciana! O plano para 200 CNPJs fica extremamente acessível com custo por empresa irrisório perante a economia de horas da sua equipe. Vou preparar uma proposta personalizada e te apresentar em uma rápida chamada de 10 minutos hoje às 16h, pode ser?'
        }
      }
    ]
  },
  {
    id: 'c3',
    nome: 'Marcos Vinícius',
    escritorio: 'MV Consultoria Contábil',
    cidade: 'Curitiba - PR',
    socio: 'Marcos Vinícius',
    cnpj: '45.123.789/0001-55',
    statusPipeline: 'Novo',
    unreadAudioCount: 0,
    lastMessageTime: '10:12',
    lastMessageSnippet: 'Mensagem de abertura enviada pelo SDR',
    sistemaAtual: 'Prosoft',
    leadsScore: 79,
    messages: [
      {
        id: 'm30',
        sender: 'sdr',
        type: 'text',
        content: 'Olá Marcos! Vi que a MV Consultoria cresceu bastante em Curitiba. Como vocês estão organizando a recepção de documentos fiscais dos seus clientes no dia a dia?',
        timestamp: '10:12',
        status: 'delivered'
      }
    ]
  }
];

export const WhatsAppLiveViewer: React.FC = () => {
  const [contacts, setContacts] = useState<WhatsAppLiveContact[]>(INITIAL_CONTACTS);
  const [selectedContactId, setSelectedContactId] = useState<string>('c1');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterMode, setFilterMode] = useState<'all' | 'audio' | 'unread' | 'hot'>('all');

  // Live Audio Player state
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<any>(null);

  // SDR Live Audio Recording state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const recordingTimerRef = useRef<any>(null);
  const [sdrAudioBlob, setSdrAudioBlob] = useState<boolean>(false);

  // SDR Text Input
  const [sdrInputText, setSdrInputText] = useState<string>('');
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);

  // Real-time simulated message stream toggle
  const [isLiveMonitoring, setIsLiveMonitoring] = useState<boolean>(true);
  const [liveLog, setLiveLog] = useState<string>('Conectado via WhatsApp Web Protocol. Sincronizando mensagens e áudios em tempo real.');

  const selectedContact = contacts.find((c) => c.id === selectedContactId) || contacts[0];

  // Web Audio Synthesizer to actually play realistic voice-like harmonic tones when user clicks Play!
  const playSynthesizingAudio = (durationSec: number) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Play pleasant harmonic human-like speech melody notes
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now); // F3
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.6);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch (e) {
      console.warn('Web Audio Playback failed', e);
    }
  };

  const handlePlayAudio = (audioId: string, durationSec: number) => {
    if (playingAudioId === audioId) {
      // Pause
      setPlayingAudioId(null);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setPlayingAudioId(audioId);
    setAudioProgress(0);
    playSynthesizingAudio(durationSec);

    if (timerRef.current) clearInterval(timerRef.current);

    const stepMs = 200 / playbackSpeed;
    let current = 0;
    timerRef.current = setInterval(() => {
      current += 0.2 * playbackSpeed;
      if (current >= durationSec) {
        clearInterval(timerRef.current);
        setPlayingAudioId(null);
        setAudioProgress(100);
      } else {
        setAudioProgress((current / durationSec) * 100);
      }
    }, stepMs);
  };

  // Live Microphone Recording Simulation / Browser MediaRecorder
  const handleToggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      setSdrAudioBlob(true);
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingSeconds(0);
      setSdrAudioBlob(false);

      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  // Send SDR message (Text or Audio)
  const handleSendSdrMessage = (type: 'text' | 'audio') => {
    if (type === 'text' && !sdrInputText.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let newMsg: WhatsAppLiveMessage;

    if (type === 'audio') {
      const dur = Math.max(5, recordingSeconds);
      newMsg = {
        id: `m-sdr-${Date.now()}`,
        sender: 'sdr',
        type: 'audio',
        timestamp: timeStr,
        status: 'delivered',
        audio: {
          id: `a-sdr-${Date.now()}`,
          sender: 'sdr',
          durationSeconds: dur,
          timestamp: timeStr,
          transcript: `Áudio gravado pelo SDR (${dur}s): "${sdrInputText || 'Apresentação das vantagens do Nibo para o escritório'}"`,
          sentiment: 'Positivo',
          audioFreqs: [30, 60, 80, 50, 90, 70, 40, 85, 60, 95, 70, 40, 80, 60, 40, 70, 90, 50],
          keyPainsDetected: ['Demonstração agendada', 'Encaminhamento de material Nibo'],
          recommendedReply: 'Aguardando resposta do prospect.'
        }
      };
      setSdrAudioBlob(false);
      setRecordingSeconds(0);
    } else {
      newMsg = {
        id: `m-sdr-${Date.now()}`,
        sender: 'sdr',
        type: 'text',
        content: sdrInputText,
        timestamp: timeStr,
        status: 'delivered'
      };
      setSdrInputText('');
    }

    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === selectedContactId) {
          return {
            ...c,
            lastMessageTime: timeStr,
            lastMessageSnippet: type === 'audio' ? `🎙️ Áudio enviado pelo SDR (${recordingSeconds}s)` : sdrInputText,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );
  };

  // Simulate Incoming Audio Note from Prospect
  const handleSimulateIncomingAudio = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const simulatedAudioMsg: WhatsAppLiveMessage = {
      id: `m-inc-${Date.now()}`,
      sender: 'prospect',
      type: 'audio',
      timestamp: timeStr,
      status: 'read',
      audio: {
        id: `a-inc-${Date.now()}`,
        sender: 'prospect',
        durationSeconds: 28,
        timestamp: timeStr,
        transcript: 'Gabriel, conversei com o pessoal da TI e eles me liberaram pra testar a plataforma amanhã. Você consegue me mandar o link do teste gratuito do Nibo Gestão?',
        sentiment: 'Urgente',
        audioFreqs: [40, 70, 90, 100, 80, 60, 90, 95, 70, 80, 60, 40, 85, 90, 70, 50, 40, 80, 60, 30],
        keyPainsDetected: ['Aprovação da TI realizada', 'Solicitação de teste gratuito do Nibo Gestão'],
        recommendedReply: 'Excelente notícia, Dr. Roberto! Segue o link exclusivo para criação da sua conta com suporte prioritário da nossa equipe de onboarding.'
      }
    };

    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === selectedContactId) {
          return {
            ...c,
            unreadAudioCount: c.unreadAudioCount + 1,
            lastMessageTime: timeStr,
            lastMessageSnippet: '🎙️ NOVO ÁUDIO RECENTE (0:28)',
            messages: [...c.messages, simulatedAudioMsg]
          };
        }
        return c;
      })
    );

    setLiveLog(`[${timeStr}] 🎙️ Novo áudio em tempo real recebido de ${selectedContact.nome}`);
  };

  // Filter contacts
  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.escritorio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cnpj.includes(searchTerm);

    if (!matchesSearch) return false;

    if (filterMode === 'audio') return c.messages.some((m) => m.type === 'audio');
    if (filterMode === 'unread') return c.unreadAudioCount > 0;
    if (filterMode === 'hot') return c.leadsScore >= 85;

    return true;
  });

  // Calculate totals
  const totalAudiosMonitored = contacts.reduce(
    (acc, c) => acc + c.messages.filter((m) => m.type === 'audio').length,
    0
  );

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Real-time Live Connection Bar */}
      <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE_WHATSAPP_WEB_MONITOR // EM TEMPO REAL</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
              Visualizador de Mensagens & Áudios WhatsApp
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Acompanhe a chegada de mensagens de texto e áudios de contadores em tempo real com transcrição automática e copiloto Nibo IA.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSimulateIncomingAudio}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all cursor-pointer"
            >
              <Mic className="w-4 h-4 text-emerald-200" />
              <span>+ Simular Áudio de Contador (IA)</span>
            </button>

            <button
              onClick={() => setIsLiveMonitoring(!isLiveMonitoring)}
              className={`px-4 py-2.5 rounded-2xl font-mono font-bold text-xs border flex items-center gap-2 cursor-pointer transition-colors ${
                isLiveMonitoring
                  ? 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:bg-neutral-800'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLiveMonitoring ? 'animate-spin text-emerald-400' : ''}`} />
              <span>{isLiveMonitoring ? 'Live Monitor Ativo' : 'Pausado'}</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-neutral-500 text-[10px] block uppercase">CHATS ATIVOS</span>
              <span className="text-base font-bold text-white">{contacts.length} Escritórios</span>
            </div>
          </div>

          <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileAudio className="w-4 h-4" />
            </div>
            <div>
              <span className="text-neutral-500 text-[10px] block uppercase">ÁUDIOS MONITORADOS</span>
              <span className="text-base font-bold text-indigo-300">{totalAudiosMonitored} Áudios</span>
            </div>
          </div>

          <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-neutral-500 text-[10px] block uppercase">DURAÇÃO MÉDIA</span>
              <span className="text-base font-bold text-amber-300">0:42 minutos</span>
            </div>
          </div>

          <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-neutral-500 text-[10px] block uppercase">TRANSCRIÇÃO IA</span>
              <span className="text-base font-bold text-purple-300">100% Automática</span>
            </div>
          </div>
        </div>

        {/* Live log footer */}
        <div className="text-[11px] font-mono text-neutral-400 bg-neutral-950/80 px-4 py-2 rounded-xl border border-neutral-800 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>STATUS: {liveLog}</span>
          </span>
          <span className="text-[10px] text-neutral-500">Protocol: WS_NIBO_LIVE_v2</span>
        </div>
      </div>

      {/* Main Workspace: 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUMN 1: Contacts List */}
        <div className="lg:col-span-3 bg-neutral-900 rounded-3xl border border-neutral-800 p-4 shadow-xl space-y-4 flex flex-col h-[720px]">
          {/* Search & Filters */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar escritório ou CNPJ..."
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-sans"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-mono">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-2.5 py-1 rounded-xl transition-colors cursor-pointer ${
                  filterMode === 'all' ? 'bg-indigo-600 text-white font-bold' : 'bg-neutral-950 text-neutral-400 hover:text-white'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterMode('audio')}
                className={`px-2.5 py-1 rounded-xl transition-colors cursor-pointer ${
                  filterMode === 'audio' ? 'bg-indigo-600 text-white font-bold' : 'bg-neutral-950 text-neutral-400 hover:text-white'
                }`}
              >
                🎙️ Áudios
              </button>
              <button
                onClick={() => setFilterMode('unread')}
                className={`px-2.5 py-1 rounded-xl transition-colors cursor-pointer ${
                  filterMode === 'unread' ? 'bg-indigo-600 text-white font-bold' : 'bg-neutral-950 text-neutral-400 hover:text-white'
                }`}
              >
                🔴 Não Lidos
              </button>
            </div>
          </div>

          {/* Contacts Feed */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filteredContacts.map((contact) => {
              const isSelected = contact.id === selectedContactId;
              const hasAudio = contact.messages.some((m) => m.type === 'audio');

              return (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContactId(contact.id)}
                  className={`
                    p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 relative
                    ${
                      isSelected
                        ? 'bg-neutral-950 border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.25)]'
                        : 'bg-neutral-950/50 border-neutral-800/80 hover:border-neutral-700'
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {contact.nome.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-white truncate">{contact.nome}</h4>
                        <p className="text-[10px] text-neutral-400 truncate">{contact.escritorio}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">{contact.lastMessageTime}</span>
                  </div>

                  <p className="text-[11px] text-neutral-300 line-clamp-1 font-sans">
                    {contact.lastMessageSnippet}
                  </p>

                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-neutral-800 font-mono">
                    <span className="text-neutral-500">{contact.cidade}</span>
                    <div className="flex items-center gap-1.5">
                      {hasAudio && (
                        <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                          🎙️ Áudio
                        </span>
                      )}
                      {contact.unreadAudioCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-extrabold animate-bounce">
                          {contact.unreadAudioCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: Real-time Messages & Audio Viewer Panel */}
        <div className="lg:col-span-6 bg-neutral-900 rounded-3xl border border-neutral-800 p-4 lg:p-6 shadow-2xl flex flex-col h-[720px] justify-between">
          {/* Active Contact Header */}
          <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-center justify-between text-white mb-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                {selectedContact.nome.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  {selectedContact.nome}
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                    Score: {selectedContact.leadsScore} pts
                  </span>
                </h3>
                <p className="text-xs text-neutral-400 font-sans">
                  {selectedContact.escritorio} • {selectedContact.cidade}
                </p>
              </div>
            </div>

            <div className="text-right font-mono text-[11px] hidden sm:block">
              <span className="text-neutral-500 block">SISTEMA ATUAL</span>
              <span className="text-emerald-400 font-bold">{selectedContact.sistemaAtual}</span>
            </div>
          </div>

          {/* Messages & Audio Stream Body */}
          <div className="flex-1 bg-neutral-950 rounded-2xl p-4 overflow-y-auto space-y-4 custom-scrollbar border border-neutral-800/80 mb-3">
            {selectedContact.messages.map((msg) => {
              const isSdr = msg.sender === 'sdr';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isSdr ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 mb-1 font-mono">
                    <span>{isSdr ? 'SDR Nibo (Você)' : selectedContact.nome}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {msg.type === 'text' ? (
                    <div
                      className={`
                        max-w-[85%] p-3.5 rounded-2xl text-xs space-y-1 shadow-md leading-relaxed
                        ${
                          isSdr
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : 'bg-neutral-900 text-neutral-100 rounded-tl-none border border-neutral-800'
                        }
                      `}
                    >
                      <p>{msg.content}</p>
                      <div className="flex items-center justify-end gap-1 text-[9px] text-indigo-200/80 font-mono pt-1">
                        <CheckCheck className="w-3.5 h-3.5 text-indigo-300" />
                      </div>
                    </div>
                  ) : (
                    /* Interactive Audio Message Card */
                    <div
                      className={`
                        max-w-[90%] w-full p-4 rounded-2xl text-xs space-y-3 shadow-xl border
                        ${
                          isSdr
                            ? 'bg-indigo-950/80 border-indigo-800 text-white rounded-tr-none'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-100 rounded-tl-none'
                        }
                      `}
                    >
                      {/* Audio Controls & Waveform */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handlePlayAudio(msg.audio!.id, msg.audio!.durationSeconds)}
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0 ${
                            playingAudioId === msg.audio!.id
                              ? 'bg-amber-500 text-neutral-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                              : 'bg-emerald-600 text-white hover:bg-emerald-500'
                          }`}
                        >
                          {playingAudioId === msg.audio!.id ? (
                            <Pause className="w-5 h-5 fill-neutral-950" />
                          ) : (
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          )}
                        </button>

                        {/* Equalizer / Animated Sound Wave */}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                            <span className="flex items-center gap-1 font-bold text-emerald-400">
                              <Mic className="w-3 h-3" />
                              Áudio de Voz ({msg.audio!.durationSeconds}s)
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                              {msg.audio!.sentiment}
                            </span>
                          </div>

                          <div className="flex items-end gap-0.5 h-7 py-1">
                            {msg.audio!.audioFreqs.map((h, idx) => {
                              const isActive = playingAudioId === msg.audio!.id;
                              return (
                                <div
                                  key={idx}
                                  className={`flex-1 rounded-full transition-all duration-300 ${
                                    isActive
                                      ? 'bg-emerald-400 animate-pulse'
                                      : 'bg-neutral-700'
                                  }`}
                                  style={{ height: `${Math.max(15, h)}%` }}
                                />
                              );
                            })}
                          </div>
                        </div>

                        {/* Speed multiplier selector */}
                        <button
                          onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
                          className="px-2 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-[10px] font-mono font-bold text-neutral-300 hover:text-white cursor-pointer"
                        >
                          {playbackSpeed}x
                        </button>
                      </div>

                      {/* AI Audio Transcript Box */}
                      <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80 text-[11px] space-y-1.5 font-sans">
                        <div className="flex items-center justify-between text-[10px] font-mono text-indigo-400">
                          <span className="flex items-center gap-1 font-bold">
                            <Sparkles className="w-3 h-3 text-indigo-400" />
                            TRANSCRIÇÃO IA DO ÁUDIO:
                          </span>
                        </div>
                        <p className="text-neutral-300 italic">&quot;{msg.audio!.transcript}&quot;</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SDR Live Input & Voice Recorder Bar */}
          <div className="space-y-2 shrink-0">
            {/* Quick response tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono">
              <span className="text-neutral-500 shrink-0">SUGESTÕES:</span>
              <button
                onClick={() => setSdrInputText('Perfeito, Dr.! Posso te apresentar o importador de extratos hoje às 15h?')}
                className="px-2.5 py-1 rounded-xl bg-neutral-950 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 cursor-pointer whitespace-nowrap"
              >
                Propor Reunião 15h
              </button>
              <button
                onClick={() => setSdrInputText('Com certeza! Vou te enviar o estudo de caso de um escritório com 150 empresas que reduziu o tempo de fechamento.')}
                className="px-2.5 py-1 rounded-xl bg-neutral-950 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 cursor-pointer whitespace-nowrap"
              >
                Enviar Caso de Sucesso
              </button>
            </div>

            {/* Input Form & Microphone Recorder */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={sdrInputText}
                onChange={(e) => setSdrInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendSdrMessage('text');
                }}
                placeholder="Digite a mensagem de resposta ou grave um áudio de voz..."
                className="flex-1 px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-sans"
              />

              {/* Record Microphone Audio Button */}
              <button
                onClick={handleToggleRecording}
                className={`p-3 rounded-2xl font-bold transition-all cursor-pointer shadow-md ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse shadow-[0_0_15px_rgba(225,29,72,0.4)]'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
                title={isRecording ? 'Parar Gravação de Áudio' : 'Gravar Áudio de Voz pelo Microfone'}
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleSendSdrMessage(sdrAudioBlob ? 'audio' : 'text')}
                className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Microphone Recording indicator */}
            {isRecording && (
              <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/30 text-rose-300 font-mono text-xs flex items-center justify-between animate-pulse">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Gravando Áudio pelo Microfone...</span>
                </span>
                <span className="font-bold">{recordingSeconds}s</span>
              </div>
            )}
          </div>
        </div>

        {/* COLUMN 3: Gemini WhatsApp Live Copilot */}
        <div className="lg:col-span-3 bg-neutral-900 rounded-3xl border border-neutral-800 p-5 shadow-xl space-y-5 h-[720px] overflow-y-auto custom-scrollbar">
          <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Copiloto IA de Áudio & WhatsApp
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 uppercase">
              Gemini 2.5
            </span>
          </div>

          {/* Lead Summary Card */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold">
              PERFIL DO PROSPECT
            </span>
            <div className="font-bold text-white text-sm">{selectedContact.nome}</div>
            <div className="text-neutral-400 text-[11px] font-mono">{selectedContact.cnpj}</div>
            <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-300 space-y-1">
              <div>
                <strong className="text-neutral-400">Status no CRM:</strong>{' '}
                <span className="text-indigo-400 font-bold">{selectedContact.statusPipeline}</span>
              </div>
              <div>
                <strong className="text-neutral-400">Software Atual:</strong>{' '}
                <span className="text-emerald-400 font-bold">{selectedContact.sistemaAtual}</span>
              </div>
            </div>
          </div>

          {/* Key Audio Pains & Insights */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
            <span className="text-[10px] font-mono text-amber-400 uppercase block font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              DORES IDENTIFICADAS NOS ÁUDIOS
            </span>
            <ul className="space-y-1.5 text-neutral-300">
              <li className="flex items-start gap-1.5 text-[11px]">
                <span className="text-amber-400 font-bold">•</span>
                <span>Demora no fechamento por digitação manual de extratos PDF.</span>
              </li>
              <li className="flex items-start gap-1.5 text-[11px]">
                <span className="text-amber-400 font-bold">•</span>
                <span>Receio de paralisação no atendimento durante a migração.</span>
              </li>
              <li className="flex items-start gap-1.5 text-[11px]">
                <span className="text-amber-400 font-bold">•</span>
                <span>Necessidade de validação prévia com o sócio majoritário.</span>
              </li>
            </ul>
          </div>

          {/* AI Recommended Response Pitch */}
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-3 text-xs">
            <span className="text-[10px] font-mono text-indigo-300 uppercase block font-bold flex items-center gap-1">
              <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
              RESPOSTA RECOMENDADA COM 1-CLIQUE
            </span>

            <p className="text-neutral-200 text-[11px] italic leading-relaxed bg-neutral-950 p-3 rounded-xl border border-neutral-800 font-sans">
              &quot;Dr. Roberto, a migração do Nibo é 100% assistida e zero atrito: importamos seus clientes em paralelo sem interromper a rotina do seu escritório. Posso enviar o estudo de caso?&quot;
            </p>

            <button
              onClick={() =>
                setSdrInputText(
                  'Dr. Roberto, a migração do Nibo é 100% assistida e zero atrito: importamos seus clientes em paralelo sem interromper a rotina do seu escritório. Posso te mostrar em 10 minutos?'
                )
              }
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Usar esta Resposta no Chat</span>
            </button>
          </div>

          {/* Quick CRM Actions */}
          <div className="space-y-2 text-xs font-mono">
            <span className="text-neutral-500 text-[10px] uppercase font-bold block">AÇÕES NO PIPELINE</span>
            <button className="w-full py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold hover:bg-emerald-500/20 cursor-pointer flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Avançar Lead para &quot;Reunião Agendada&quot;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
