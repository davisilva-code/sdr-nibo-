import React, { useState, useRef, useEffect } from 'react';
import { 
  PhoneCall, 
  Mic, 
  Square, 
  Sparkles, 
  Trophy, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  Volume2, 
  Send, 
  User as UserIcon, 
  Bot, 
  Info,
  Flame,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { NIBO_PRODUCTS } from '../data/niboKnowledge';
import { PERSONAS_LIST } from '../data/personas';
import { SimulationDifficulty, Persona, SimulationMessage, CallSimulation } from '../types';
import { ApiService } from '../services/apiService';

interface CallSimulatorProps {
  initialFirmName?: string;
  onSimulationCompleted: (xpEarned: number) => void;
}

export const CallSimulator: React.FC<CallSimulatorProps> = ({
  initialFirmName,
  onSimulationCompleted,
}) => {
  // Config State
  const [selectedProduct, setSelectedProduct] = useState(NIBO_PRODUCTS[0].name);
  const [selectedPersona, setSelectedPersona] = useState<Persona>(PERSONAS_LIST[0]);
  const [difficulty, setDifficulty] = useState<SimulationDifficulty>('MEDIUM');
  const [scenario, setScenario] = useState('Contador sem tempo no fechamento do mês');

  // Active Call State
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDurationSeconds, setCallDurationSeconds] = useState(0);
  const [messages, setMessages] = useState<SimulationMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Mic recording simulation
  const [isRecording, setIsRecording] = useState(false);

  // Report State
  const [simulationReport, setSimulationReport] = useState<any | null>(null);
  const [evaluatingReport, setEvaluatingReport] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Call timer effect
  useEffect(() => {
    let timer: any;
    if (isCallActive) {
      timer = setInterval(() => {
        setCallDurationSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCallActive]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    setCallDurationSeconds(0);
    setSimulationReport(null);

    // Initial greeting
    const openingMsg: SimulationMessage = {
      id: 'm-1',
      sender: 'sdr',
      content: `Olá, ${selectedPersona.name.split(' ')[0]}! Tudo bem? Aqui é o Lucas do Nibo. Estou ligando sobre o escritório ${initialFirmName || selectedPersona.firmType}.`,
      timestamp: new Date().toLocaleTimeString().slice(0, 5),
    };

    setMessages([openingMsg]);

    // Initial prospect AI response
    setIsAiThinking(true);
    ApiService.simulateCallTurn({
      product: selectedProduct,
      persona: selectedPersona,
      difficulty,
      history: [{ sender: 'SDR', content: openingMsg.content }],
      userMessage: 'Olá, gostaria de falar sobre as suas rotinas de conciliação e entregas de impostos.',
    }).then((res) => {
      setMessages((prev) => [
        ...prev,
        {
          id: 'm-2',
          sender: 'prospect',
          content: res.reply || 'Pode falar, mas estou bem ocupado aqui no meio do fechamento de folha. Do que se trata?',
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
        },
      ]);
      setIsAiThinking(false);
    });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isAiThinking) return;

    // Detect filler words ("né", "tipo", "basicamente")
    const fillerWords: string[] = [];
    const lowerMsg = inputMessage.toLowerCase();
    if (lowerMsg.includes('né')) fillerWords.push('né');
    if (lowerMsg.includes('tipo')) fillerWords.push('tipo');
    if (lowerMsg.includes('basicamente')) fillerWords.push('basicamente');

    const newSdrMsg: SimulationMessage = {
      id: 'msg-' + Date.now(),
      sender: 'sdr',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString().slice(0, 5),
      fillerWordsDetected: fillerWords.length > 0 ? fillerWords : undefined,
    };

    const updatedMessages = [...messages, newSdrMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsAiThinking(true);

    try {
      const response = await ApiService.simulateCallTurn({
        product: selectedProduct,
        persona: selectedPersona,
        difficulty,
        history: updatedMessages.map((m) => ({ sender: m.sender, content: m.content })),
        userMessage: inputMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-' + (Date.now() + 1),
          sender: 'prospect',
          content: response.reply,
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleEndCall = async () => {
    setIsCallActive(false);
    setEvaluatingReport(true);

    try {
      const report = await ApiService.scoreSimulation({
        history: messages.map((m) => ({ sender: m.sender, content: m.content })),
        product: selectedProduct,
        difficulty,
      });

      setSimulationReport(report);
      onSimulationCompleted(10); // +10 XP
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluatingReport(false);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold mb-2">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>// AI_ROLEPLAY_SIMULATOR: LIVE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Simulador de Chamadas de Vendas em Tempo Real
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Treine suas ligações com IAs que atuam como contadores reais em múltiplos cenários e receba nota 0-100.
          </p>
        </div>
      </div>

      {!isCallActive && !simulationReport && !evaluatingReport && (
        /* Setup Form */
        <div className="bg-neutral-900 p-6 lg:p-8 rounded-3xl border border-neutral-800 shadow-xl space-y-6 max-w-4xl mx-auto">
          <h3 className="font-bold text-base text-white border-b border-neutral-800 pb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Configuração do Cenário de Simulação
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Product Selector */}
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 uppercase">
                PRODUTO NIBO A SER OFERECIDO:
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full p-3 rounded-2xl border border-neutral-800 text-xs font-semibold bg-neutral-950 text-white focus:outline-none focus:border-indigo-500 font-sans"
              >
                {NIBO_PRODUCTS.map((prod) => (
                  <option key={prod.id} value={prod.name}>{prod.name} ({prod.category})</option>
                ))}
              </select>
            </div>

            {/* Persona Selector */}
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 uppercase">
                PERSONA DO PROSPECT CONTADOR:
              </label>
              <select
                value={selectedPersona.id}
                onChange={(e) => {
                  const p = PERSONAS_LIST.find((item) => item.id === e.target.value);
                  if (p) setSelectedPersona(p);
                }}
                className="w-full p-3 rounded-2xl border border-neutral-800 text-xs font-semibold bg-neutral-950 text-white focus:outline-none focus:border-indigo-500 font-sans"
              >
                {PERSONAS_LIST.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} — {p.role} ({p.size})</option>
                ))}
              </select>
            </div>

            {/* Difficulty Selector */}
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 uppercase">
                NÍVEL DE DIFICULDADE:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['EASY', 'MEDIUM', 'HARD', 'EXTREME'] as SimulationDifficulty[]).map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                      difficulty === diff 
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.35)]' 
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenario Selector */}
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 uppercase">
                CENÁRIO DA ABORDAGEM:
              </label>
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="w-full p-3 rounded-2xl border border-neutral-800 text-xs bg-neutral-950 text-white focus:outline-none focus:border-indigo-500 font-sans"
              >
                <option value="Contador sem tempo no fechamento do mês">Contador sem tempo no fechamento do mês</option>
                <option value="Contador satisfeito com o sistema atual">Contador satisfeito com o sistema atual</option>
                <option value="Contador que acha a solução cara">Contador que acha a solução cara</option>
                <option value="Contador pedindo para mandar no WhatsApp">Contador pedindo para mandar no WhatsApp</option>
                <option value="Contador utilizando concorrente (Acessórias/Gestta)">Contador utilizando concorrente</option>
              </select>
            </div>
          </div>

          {/* Persona Card Preview */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs text-neutral-300">
            <div className="flex items-center justify-between font-bold text-white">
              <span>Persona Selecionada: {selectedPersona.name} ({selectedPersona.role})</span>
              <span className="text-neutral-500 font-mono text-[10px]">{selectedPersona.firmType}</span>
            </div>
            <p className="text-neutral-400"><strong>Comportamento:</strong> {selectedPersona.behavior}</p>
            <p className="text-neutral-400"><strong>Principais Dores:</strong> {selectedPersona.mainPains.join(', ')}</p>
          </div>

          <button
            onClick={handleStartCall}
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-[0_0_20px_rgba(79,70,229,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Iniciar Ligação de Simulação Agora</span>
          </button>
        </div>
      )}

      {/* Active Call Interface */}
      {isCallActive && (
        <div className="bg-neutral-900 rounded-3xl border border-neutral-800 shadow-2xl p-6 lg:p-8 text-white space-y-5 max-w-4xl mx-auto">
          {/* Active Call Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  Em Chamada com: {selectedPersona.name}
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                    {difficulty}
                  </span>
                </h3>
                <p className="text-xs text-neutral-400">{selectedProduct} • {scenario}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="font-mono text-base font-bold text-emerald-400 px-3.5 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800">
                {formatTimer(callDurationSeconds)}
              </div>
              <button
                onClick={handleEndCall}
                className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Encerrar Chamada</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="bg-neutral-950 rounded-2xl p-4 border border-neutral-800 h-96 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((msg) => {
              const isSdr = msg.sender === 'sdr';
              return (
                <div key={msg.id} className={`flex flex-col ${isSdr ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 mb-1 font-mono">
                    <span>{isSdr ? 'SDR (Você)' : selectedPersona.name}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className={`
                    max-w-lg p-3.5 rounded-2xl text-xs leading-relaxed space-y-1
                    ${isSdr 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-neutral-900 text-neutral-100 rounded-tl-none border border-neutral-800'}
                  `}>
                    <p>{msg.content}</p>

                    {/* Filler Words Alert */}
                    {msg.fillerWordsDetected && (
                      <span className="inline-block mt-1 text-[9px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                        Muleta: {msg.fillerWordsDetected.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {isAiThinking && (
              <div className="flex items-center gap-2 text-xs text-neutral-400 italic">
                <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>{selectedPersona.name} está respondendo...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* SDR Response Input */}
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua fala de resposta na ligação (ex: 'Entendo, quanto tempo vocês gastam por mês?')..."
              className="flex-1 px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isAiThinking || !inputMessage.trim()}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Falar</span>
            </button>
          </form>
        </div>
      )}

      {/* Loading state during report evaluation */}
      {evaluatingReport && (
        <div className="p-12 bg-neutral-900 rounded-3xl border border-neutral-800 text-center space-y-4 max-w-xl mx-auto shadow-xl">
          <Sparkles className="w-10 h-10 text-indigo-400 mx-auto animate-spin" />
          <h3 className="font-bold text-base text-white">Analisando sua Ligação com IA...</h3>
          <p className="text-xs text-neutral-400">
            Avaliando abertura, perguntas de descoberta, tratamento de objeções, tom de voz e CTA de fechamento.
          </p>
        </div>
      )}

      {/* Simulation Report Result */}
      {simulationReport && (
        <div className="bg-neutral-900 rounded-3xl border border-neutral-800 shadow-2xl p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold text-xs">
                ANÁLISE FINAL DA LIGAÇÃO (+10 XP)
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-2">
                Relatório de Qualidade da Chamada
              </h2>
              <p className="text-xs text-neutral-400">Produto: {selectedProduct} • Persona: {selectedPersona.name}</p>
            </div>

            <div className="text-center p-4 rounded-2xl bg-neutral-950 text-white border border-neutral-800 shadow-md">
              <span className="text-xs text-neutral-400 block font-mono font-bold">NOTA DA CALL</span>
              <span className="text-3xl font-extrabold text-amber-400">{simulationReport.score}</span>
              <span className="text-xs text-neutral-400">/100</span>
            </div>
          </div>

          {/* Subscores Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {Object.entries(simulationReport.subScores || {}).map(([key, val]: any) => (
              <div key={key} className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800">
                <span className="text-neutral-400 uppercase block text-[10px] font-mono font-bold">{key}</span>
                <span className="text-base font-extrabold text-white">{val}/100</span>
              </div>
            ))}
          </div>

          {/* Feedback Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 text-xs text-emerald-200">
              <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                O que você fez de bom:
              </h4>
              <ul className="list-disc pl-4 space-y-1">
                {simulationReport.feedback?.oQueFoiBem?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs text-amber-200">
              <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                O que pode melhorar:
              </h4>
              <ul className="list-disc pl-4 space-y-1">
                {simulationReport.feedback?.oQueMelhorar?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 space-y-1">
            <strong className="block font-mono font-bold text-white">RECOMENDAÇÃO DO COACH NIBO:</strong>
            <p>{simulationReport.feedback?.recomendacao}</p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setSimulationReport(null);
                setMessages([]);
              }}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Fazer Nova Simulação
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
