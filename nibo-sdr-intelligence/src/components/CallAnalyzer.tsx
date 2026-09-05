import React, { useState } from 'react';
import { 
  FileAudio, 
  Upload, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Trophy, 
  Mic, 
  FileText, 
  PieChart, 
  Volume2, 
  TrendingUp, 
  ShieldAlert,
  ArrowRight,
  Info
} from 'lucide-react';
import { CallAnalysis } from '../types';
import { EXAMPLE_TOP_CALLS } from '../data/mockData';
import { ApiService } from '../services/apiService';

export const CallAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CallAnalysis | null>(EXAMPLE_TOP_CALLS[0]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setAnalyzing(true);

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Str = (reader.result as string).split(',')[1];
        const result = await ApiService.analyzeCall({
          audioBase64: base64Str,
          mimeType: file.type || 'audio/mp3',
        });

        setAnalysisResult({
          ...result,
          audioFileName: file.name,
        });
        setAnalyzing(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold mb-2">
            <FileAudio className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Call Analyzer & Audio Transcription Engine</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Analisador de Ligações Gravadas do Nibo
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Faça upload do áudio da sua ligação (MP3/WAV/M4A) para obter transcrição automática e diagnóstico por IA.
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-3xl mx-auto text-center">
        <label className="border-2 border-dashed border-slate-300 hover:border-purple-500 transition-colors p-8 rounded-2xl cursor-pointer block bg-slate-50/50">
          <Upload className="w-10 h-10 text-purple-600 mx-auto mb-2 animate-pulse" />
          <p className="font-bold text-sm text-slate-800">
            {selectedFile ? selectedFile.name : 'Clique para selecionar arquivo de áudio ou solte aqui'}
          </p>
          <p className="text-xs text-slate-400 mt-1">Formatos suportados: MP3, WAV, M4A, MP4 (máx. 25MB)</p>
          <input
            type="file"
            accept="audio/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {analyzing && (
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-purple-700 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Processando transcrição e gerando indicadores com Gemini AI...</span>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
          {/* Header Result */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-xs">
                RELATÓRIO AUDITADO POR IA
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                {analysisResult.title}
              </h2>
              <p className="text-xs text-slate-500">Arquivo: {analysisResult.audioFileName} • Duração: {analysisResult.audioDuration}</p>
            </div>

            <div className="text-center p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
              <span className="text-xs text-slate-400 block font-bold">SCORE DA CALL</span>
              <span className="text-3xl font-extrabold text-amber-400">{analysisResult.callScore}</span>
              <span className="text-xs text-slate-400">/100</span>
            </div>
          </div>

          {/* Talk Ratio Indicator */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>PROPORÇÃO DE FALA (TALK RATIO)</span>
              <span>SDR: {analysisResult.talkRatio.sdr}% | Prospect: {analysisResult.talkRatio.prospect}%</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
              <div className="bg-blue-600 h-full" style={{ width: `${analysisResult.talkRatio.sdr}%` }} title="SDR" />
              <div className="bg-emerald-500 h-full" style={{ width: `${analysisResult.talkRatio.prospect}%` }} title="Prospect" />
            </div>
            <p className="text-[11px] text-slate-500">
              Ideal Nibo: SDR falando entre 40% e 50% do tempo. {analysisResult.talkRatio.prospect >= 50 ? 'Excelente escuta ativa!' : 'Cuidado: você falou mais que o prospect.'}
            </p>
          </div>

          {/* Subscores Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-xs">
            {Object.entries(analysisResult.subScores).map(([k, v]) => (
              <div key={k} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{k}</span>
                <span className="text-base font-extrabold text-slate-900">{v}/100</span>
              </div>
            ))}
          </div>

          {/* Transcript Sample */}
          <div className="p-4 rounded-xl bg-slate-950 text-white space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            <h4 className="font-bold text-xs text-slate-300 border-b border-slate-800 pb-2">TRANSCRIÇÃO DA LIGAÇÃO</h4>
            <div className="space-y-2 text-xs">
              {analysisResult.transcript.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${t.speaker === 'SDR' ? 'bg-blue-900 text-blue-200' : 'bg-emerald-900 text-emerald-200'}`}>
                    {t.speaker} ({t.timestamp})
                  </span>
                  <p className="text-slate-200">{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Bullet Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs text-emerald-950">
              <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                O que foi muito bem:
              </h4>
              <ul className="list-disc pl-4 space-y-1">
                {analysisResult.oQueFoiBem.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2 text-xs text-rose-950">
              <h4 className="font-bold text-rose-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                Erros e Oportunidades Perdidas:
              </h4>
              <ul className="list-disc pl-4 space-y-1">
                {analysisResult.erros.concat(analysisResult.oportunidadesPerdidas).map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>

          {/* Actionable Improvement Suggestion */}
          <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs text-amber-950">
            <strong className="block font-bold text-amber-900 text-sm">
              MAIOR OPORTUNIDADE DE MELHORIA:
            </strong>
            <p>{analysisResult.maiorOportunidadeMelhoria}</p>
            <div className="p-3 bg-white rounded-lg border border-amber-300 mt-2 font-medium">
              💡 <strong>Como fazer melhor:</strong> {analysisResult.comoFazerMelhor}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
