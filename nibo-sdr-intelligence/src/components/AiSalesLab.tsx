import React, { useState } from 'react';
import { 
  Swords, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Bot, 
  UserCheck, 
  Send, 
  Trophy,
  AlertCircle
} from 'lucide-react';
import { NIBO_PRODUCTS } from '../data/niboKnowledge';
import { PERSONAS_LIST } from '../data/personas';
import { SimulationDifficulty } from '../types';
import { ApiService } from '../services/apiService';

export const AiSalesLab: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(NIBO_PRODUCTS[0].name);
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS_LIST[0]);
  const [difficulty, setDifficulty] = useState<SimulationDifficulty>('HARD');

  const [isRunning, setIsRunning] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [humanHasTakenOver, setHumanHasTakenOver] = useState(false);

  const [messages, setMessages] = useState<any[]>([]);
  const [humanInput, setHumanInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStartLab = async () => {
    setIsRunning(true);
    setHumanHasTakenOver(false);
    setTurnCount(1);
    setMessages([]);
    setIsGenerating(true);

    try {
      const firstTurn = await ApiService.nextAiVsAiTurn({
        product: selectedProduct,
        persona: selectedPersona,
        difficulty,
        currentTurn: 0,
        previousMessages: [],
      });

      setMessages([{
        speaker: 'SDR_AI',
        text: firstTurn.text || `Olá ${selectedPersona.name}! Vi que o seu escritório em ${selectedPersona.firmType} atende PMEs. Como vocês fazem a cobrança de extratos bancários no fim do mês?`,
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
      }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNextTurn = async () => {
    if (!isRunning || isGenerating) return;
    setIsGenerating(true);

    try {
      const res = await ApiService.nextAiVsAiTurn({
        product: selectedProduct,
        persona: selectedPersona,
        difficulty,
        currentTurn: turnCount,
        previousMessages: messages,
      });

      setMessages((prev) => [
        ...prev,
        {
          speaker: res.speaker,
          text: res.text,
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
        }
      ]);
      setTurnCount((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleHumanTakeover = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!humanInput.trim() || isGenerating) return;

    setHumanHasTakenOver(true);
    const humanMsg = {
      speaker: 'SDR_HUMAN',
      text: humanInput,
      timestamp: new Date().toLocaleTimeString().slice(0, 5),
    };

    const updated = [...messages, humanMsg];
    setMessages(updated);
    setHumanInput('');
    setIsGenerating(true);

    try {
      const response = await ApiService.nextAiVsAiTurn({
        product: selectedProduct,
        persona: selectedPersona,
        difficulty,
        currentTurn: turnCount + 1,
        previousMessages: updated,
        userTakeoverMessage: humanInput,
      });

      setMessages((prev) => [
        ...prev,
        {
          speaker: 'PROSPECT_AI',
          text: response.text,
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
        }
      ]);
      setTurnCount((prev) => prev + 2);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold mb-2">
          <Swords className="w-3.5 h-3.5 text-indigo-600" />
          <span>AI vs AI Sales Lab — Duelo de Inteligências</span>
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Duelo IA SDR Nibo vs IA Contador Prospect
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Assista ao embate de inteligência comercial entre duas IAs e use o botão &quot;Pausar e Assumir&quot; para assumir a posição humana no meio da conversa.
        </p>
      </div>

      {!isRunning ? (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 max-w-3xl mx-auto">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
            Configurar Duelo de Inteligências
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">PRODUTO NIBO:</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
              >
                {NIBO_PRODUCTS.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">PERSONA PROSPECT:</label>
              <select
                value={selectedPersona.id}
                onChange={(e) => {
                  const p = PERSONAS_LIST.find((x) => x.id === e.target.value);
                  if (p) setSelectedPersona(p);
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
              >
                {PERSONAS_LIST.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.role})</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleStartLab}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Iniciar Duelo IA vs IA</span>
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-2xl space-y-5 text-white max-w-4xl mx-auto">
          {/* Header Controls */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="font-bold text-sm">
                  Duelo em Andamento — Turno {turnCount}
                </h3>
                <p className="text-xs text-slate-400">{selectedProduct} vs {selectedPersona.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleNextTurn}
                disabled={isGenerating}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all disabled:opacity-50"
              >
                Avançar Turno IA
              </button>

              <button
                onClick={() => setIsRunning(false)}
                className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Reiniciar
              </button>
            </div>
          </div>

          {/* Transcript stream */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-96 overflow-y-auto space-y-3 custom-scrollbar">
            {messages.map((m, idx) => {
              const isSdrAi = m.speaker === 'SDR_AI';
              const isHuman = m.speaker === 'SDR_HUMAN';
              return (
                <div key={idx} className={`p-3 rounded-xl text-xs space-y-1 ${
                  isHuman 
                    ? 'bg-amber-950/80 border border-amber-700 text-amber-100' 
                    : isSdrAi 
                      ? 'bg-blue-950/80 border border-blue-800 text-blue-100' 
                      : 'bg-slate-800 text-slate-100 border border-slate-700'
                }`}>
                  <div className="flex items-center justify-between text-[10px] opacity-75 font-bold">
                    <span>{isHuman ? 'HUMANO (Você)' : isSdrAi ? 'IA SDR Nibo' : selectedPersona.name}</span>
                    <span>{m.timestamp}</span>
                  </div>
                  <p>{m.text}</p>
                </div>
              );
            })}
            {isGenerating && <p className="text-xs text-slate-400 italic">Próxima IA formulando resposta...</p>}
          </div>

          {/* PAUSAR E ASSUMIR Section */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-amber-400" />
                PAUSAR E ASSUMIR A CONVERSA
              </span>
              <span className="text-[10px] text-amber-400 font-medium">Assuma o controle humano do SDR a qualquer momento!</span>
            </div>

            <form onSubmit={handleHumanTakeover} className="flex gap-2">
              <input
                type="text"
                value={humanInput}
                onChange={(e) => setHumanInput(e.target.value)}
                placeholder="Digite sua mensagem para responder ao prospect como SDR Humano..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!humanInput.trim() || isGenerating}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-colors disabled:opacity-50"
              >
                Assumir e Enviar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
