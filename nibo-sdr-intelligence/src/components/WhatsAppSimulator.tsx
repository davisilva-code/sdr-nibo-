import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Bot, 
  CheckCheck, 
  User as UserIcon, 
  RotateCcw, 
  AlertCircle,
  CheckCircle2,
  ThumbsUp
} from 'lucide-react';
import { SimulationDifficulty } from '../types';
import { ApiService } from '../services/apiService';

export const WhatsAppSimulator: React.FC = () => {
  const whatsappPersonalities = [
    { id: 'ocupado', label: 'Contador Ocupado ("manda no Whats e vejo depois")' },
    { id: 'desconfiado', label: 'Contador Desconfiado ("já me mandaram mensagem parecida")' },
    { id: 'objetivo', label: 'Contador Objetivo ("fala direto o preço")' },
    { id: 'curioso', label: 'Contador Curioso ("como assim busca extrato automático?")' },
    { id: 'concorrente', label: 'Contador Usa Concorrente ("já uso Acessórias")' },
    { id: 'curtas', label: 'Contador Respostas Curtas ("ok", "sim", "não")' },
  ];

  const [selectedPersonality, setSelectedPersonality] = useState(whatsappPersonalities[0].id);
  const [messages, setMessages] = useState<any[]>([
    {
      id: 'm-1',
      sender: 'sdr',
      text: 'Olá Dr. Roberto! Vi que a sua contabilidade atende empresas em Campinas. Ajudamos escritórios a zerar a cobrança manual de extratos no fim do mês. Posso mandar um áudio de 1 min mostrando como funciona?',
      time: '10:14',
    },
    {
      id: 'm-2',
      sender: 'prospect',
      text: 'Pode mandar, mas estou em reunião. Quanto custa?',
      time: '10:15',
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [chatAnalysis, setChatAnalysis] = useState<any | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isAiThinking) return;

    const newSdrMsg = {
      id: 'msg-' + Date.now(),
      sender: 'sdr',
      text: inputMessage,
      time: new Date().toLocaleTimeString().slice(0, 5),
    };

    const updated = [...messages, newSdrMsg];
    setMessages(updated);
    setInputMessage('');
    setIsAiThinking(true);

    try {
      const response = await ApiService.simulateCallTurn({
        product: 'Conciliador Open Finance',
        persona: {
          id: selectedPersonality,
          name: 'Contador WhatsApp',
          role: 'Sócio',
          firmType: 'Escritório Contábil',
          size: '100 clientes',
          mindset: 'WhatsApp rápido',
          keyFears: [],
          mainPains: [],
          behavior: 'Respostas curtas de WhatsApp',
          decisionCriteria: [],
        },
        difficulty: 'MEDIUM',
        history: updated.map(m => ({ sender: m.sender, content: m.text })),
        userMessage: inputMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-' + (Date.now() + 1),
          sender: 'prospect',
          text: response.reply,
          time: new Date().toLocaleTimeString().slice(0, 5),
        }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleAnalyzeChat = async () => {
    try {
      const fullText = messages.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');
      const analysis = await ApiService.analyzeChat(fullText);
      setChatAnalysis(analysis);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold mb-2">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>// WHATSAPP_SIMULATOR: ONLINE</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Roleplay de Abordagem Comercial via WhatsApp
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Pratique mensagens curtas, gatilhos de curiosidade e contornos de objeções sem parecer spam.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Simulator Phone Frame */}
        <div className="lg:col-span-7 bg-neutral-900 rounded-3xl border border-neutral-800 p-4 shadow-2xl flex flex-col h-[600px]">
          {/* Phone Header */}
          <div className="bg-neutral-950 p-3.5 rounded-2xl flex items-center justify-between text-white border border-neutral-800 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">
                RC
              </div>
              <div>
                <h4 className="font-bold text-xs">Roberto Contabilidade (Prospect)</h4>
                <p className="text-[10px] text-emerald-400 font-mono">online via WhatsApp</p>
              </div>
            </div>

            <select
              value={selectedPersonality}
              onChange={(e) => setSelectedPersonality(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-neutral-900 text-neutral-200 border border-neutral-800 text-[10px] font-semibold focus:outline-none"
            >
              {whatsappPersonalities.map(p => (
                <option key={p.id} value={p.id} className="bg-neutral-900 text-white">{p.label}</option>
              ))}
            </select>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 bg-neutral-950 rounded-2xl p-4 overflow-y-auto space-y-3 custom-scrollbar border border-neutral-800/80">
            {messages.map((m) => {
              const isSdr = m.sender === 'sdr';
              return (
                <div key={m.id} className={`flex ${isSdr ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[80%] p-3.5 rounded-2xl text-xs space-y-1 shadow-sm
                    ${isSdr 
                      ? 'bg-emerald-700 text-white rounded-tr-none' 
                      : 'bg-neutral-900 text-neutral-100 rounded-tl-none border border-neutral-800'}
                  `}>
                    <p>{m.text}</p>
                    <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200/80 font-mono">
                      <span>{m.time}</span>
                      {isSdr && <CheckCheck className="w-3 h-3 text-emerald-300" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {isAiThinking && (
              <div className="text-[11px] text-neutral-400 italic">
                Digitando resposta...
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua mensagem de WhatsApp..."
              className="flex-1 px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={isAiThinking || !inputMessage.trim()}
              className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors disabled:opacity-50 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right AI Instant Analysis */}
        <div className="lg:col-span-5 bg-neutral-900 p-6 rounded-3xl border border-neutral-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Análise em Tempo Real do WhatsApp
              </h3>
              <button
                onClick={handleAnalyzeChat}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/30 hover:bg-emerald-500/20 cursor-pointer"
              >
                Analisar Agora
              </button>
            </div>

            {chatAnalysis ? (
              <div className="space-y-3 text-xs text-neutral-200">
                <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-500 text-[10px] font-mono font-bold block uppercase">INTERESSE DETECTADO</span>
                  <p className="font-bold text-white">{chatAnalysis.nivelInteresse}</p>
                </div>

                <div>
                  <strong className="text-white block mb-1 font-mono text-[11px]">DOR IDENTIFICADA NA CONVERSA:</strong>
                  <p className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-300 font-medium border border-indigo-500/20">{chatAnalysis.dorIdentificada}</p>
                </div>

                <div className="p-3.5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 space-y-1">
                  <span className="text-emerald-400 font-mono font-bold text-xs block">💡 O QUE EU RESPONDERIA AGORA:</span>
                  <p className="font-medium text-emerald-200 italic">{chatAnalysis.respostaRecomendada}</p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-neutral-500 text-xs space-y-2">
                <Bot className="w-8 h-8 mx-auto text-neutral-600" />
                <p>Clique em &quot;Analisar Agora&quot; para receber a sugestão da melhor resposta para esta conversa.</p>
              </div>
            )}
          </div>

          <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800 text-[11px] text-neutral-400 font-sans">
            <strong className="text-white font-mono">Regra WhatsApp Nibo:</strong> Mantenha mensagens curtas (máximo 3 linhas). Evite enviar blocos gigantes de texto ou arquivos PDF não solicitados.
          </div>
        </div>
      </div>
    </div>
  );
};
