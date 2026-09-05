import React, { useState } from 'react';
import { X, Sparkles, MessageSquare, Send, Copy, CheckCircle2 } from 'lucide-react';
import { ApiService } from '../services/apiService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallChatAnalyzerModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [chatText, setChatText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!chatText.trim() || loading) return;
    setLoading(true);

    try {
      const res = await ApiService.analyzeChat(chatText);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-base text-slate-900">
              Análise Rápida de Mensagem ou Conversa do WhatsApp
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">
            Cole abaixo o texto recebido ou a conversa recente com o prospect contador:
          </label>
          <textarea
            rows={5}
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            placeholder="Ex: 'Dr. Roberto: Pode mandar no WhatsApp, mas já temos um sistema e não queremos trocar nada agora.'"
            className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading || !chatText.trim()}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>Analisar com IA & Gerar Melhor Resposta</span>
          </button>
        </div>

        {result && (
          <div className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-3 text-xs text-indigo-950">
            <div className="grid grid-cols-2 gap-2 p-3 bg-white rounded-xl border border-indigo-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">INTERESSE</span>
                <span className="font-bold text-slate-900">{result.nivelInteresse}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">OBJEÇÃO / DOR</span>
                <span className="font-bold text-slate-900">{result.dorIdentificada}</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
              <span className="text-emerald-900 font-bold text-xs uppercase block">SUGESTÃO DE RESPOSTA PRONTA:</span>
              <p className="font-medium text-emerald-950 italic text-sm">&quot;{result.respostaRecomendada}&quot;</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
