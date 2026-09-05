import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  HelpCircle, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { ApiService } from '../services/apiService';

export const NiboCoach: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [coachResponse, setCoachResponse] = useState<any | null>(null);

  const quickPrompts = [
    'Como eu respondo quando o contador diz que já tem sistema?',
    'Como gerar curiosidade na abertura da Cold Call?',
    'Como abordar um contador que não quer falar e pede pra mandar no Whats?',
    'Como vender o Nibo Obrigações Plus para um escritório tradicional?',
    'Como descobrir se o escritório tem problemas com controle de guias?',
  ];

  const handleAsk = async (qText?: string) => {
    const query = qText || question;
    if (!query.trim() || loading) return;

    setLoading(true);
    setQuestion(query);

    try {
      const res = await ApiService.askCoach(query);
      setCoachResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-2">
          <Bot className="w-3.5 h-3.5 text-blue-600" />
          <span>Nibo Coach — Assistente de IA de Vendas B2B</span>
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
          AI Sales Copilot do SDR Nibo
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Tire dúvidas em tempo real sobre argumentação comercial, contorno de objeções e ganchos para contabilidades.
        </p>
      </div>

      {/* Quick Prompts Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 block">Dúvidas Frequentes Rápidas:</span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(prompt)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium transition-all shadow-sm flex items-center gap-1.5"
            >
              <HelpCircle className="w-3 h-3 text-blue-600 shrink-0" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Question Form */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Pergunte qualquer dúvida comercial (ex: 'Como responder quando o contador diz que o sistema é caro?')..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleAsk()}
            disabled={loading || !question.trim()}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>Perguntar ao Coach</span>
          </button>
        </div>
      </div>

      {/* Coach Response Display */}
      {coachResponse && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 lg:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Bot className="w-6 h-6 text-blue-600" />
            <h3 className="font-extrabold text-base text-slate-900">
              Resposta do Nibo Coach
            </h3>
          </div>

          <div className="space-y-4 text-xs text-slate-800">
            {/* Estratégia */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
              <span className="font-bold text-blue-900 text-xs uppercase tracking-wide block">
                1. Estratégia Recomendada:
              </span>
              <p className="text-slate-800 leading-relaxed font-medium">{coachResponse.estrategia}</p>
            </div>

            {/* Frase Pronta */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-900 text-xs uppercase tracking-wide block">
                2. Frase Pronta para Usar na Ligação ou WhatsApp:
              </span>
              <p className="text-emerald-950 font-semibold text-sm italic">
                &quot;{coachResponse.frasePronta}&quot;
              </p>
            </div>

            {/* Pergunta Recomendada */}
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
              <span className="font-bold text-indigo-900 text-xs uppercase tracking-wide block">
                3. Pergunta de Descoberta para Fazer em Sequência:
              </span>
              <p className="text-indigo-950 font-bold">{coachResponse.perguntaRecomendada}</p>
            </div>

            {/* Erro a Evitar */}
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
              <span className="font-bold text-rose-900 text-xs uppercase tracking-wide block flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                4. Erro Clássico a Evitar:
              </span>
              <p className="text-rose-950 font-medium">{coachResponse.erroAEvitar}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
