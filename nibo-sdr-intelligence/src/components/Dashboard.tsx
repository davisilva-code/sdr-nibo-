import React from 'react';
import { 
  PhoneCall, 
  MessageSquare, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Target, 
  AlertCircle, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Flame,
  PieChart,
  BarChart3,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { SDRMetrics } from '../types';
import { TabType } from './Sidebar';

interface DashboardProps {
  metrics: SDRMetrics;
  setActiveTab: (tab: TabType) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ metrics, setActiveTab }) => {
  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Quick Overview (Bento Hero Block) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>// AI_SALES_COACH_ONLINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Nibo SDR Intelligence Dashboard
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Acompanhamento de alta performance na prospecção e conversão de escritórios contábeis.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => setActiveTab('prospecting')}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(79,70,229,0.35)] flex items-center gap-2 cursor-pointer"
          >
            <Target className="w-4 h-4" />
            <span>Nova Prospecção</span>
          </button>
          <button
            onClick={() => setActiveTab('call-simulator')}
            className="px-5 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Treinar Chamada</span>
          </button>
        </div>
      </div>

      {/* Primary Metrics Bento Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 shadow-md hover:border-indigo-500/40 transition-all group">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-semibold font-mono uppercase">Ligações</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{metrics.totalCalls}</p>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5 mt-2">
            <ArrowUpRight className="w-3 h-3" /> +12% esta sem.
          </span>
        </div>

        <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 shadow-md hover:border-indigo-500/40 transition-all group">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-semibold font-mono uppercase">WhatsApps</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{metrics.totalWhatsApps}</p>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5 mt-2">
            <ArrowUpRight className="w-3 h-3" /> +18% esta sem.
          </span>
        </div>

        <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 shadow-md hover:border-indigo-500/40 transition-all group">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-semibold font-mono uppercase">Reuniões</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-indigo-400">{metrics.reunioesAgendadas}</p>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5 mt-2">
            <ArrowUpRight className="w-3 h-3" /> Meta 85%
          </span>
        </div>

        <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 shadow-md hover:border-indigo-500/40 transition-all group">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-semibold font-mono uppercase">Score Média</span>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{metrics.notaMediaLigacoes}<span className="text-xs text-neutral-500 font-normal">/100</span></p>
          <span className="text-[11px] text-neutral-400 font-medium mt-2 block font-mono">
            QUALIDADE: ALTA
          </span>
        </div>

        <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 shadow-md hover:border-indigo-500/40 transition-all group">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-semibold font-mono uppercase">Conversão</span>
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{metrics.taxaConversao}%</p>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5 mt-2">
            <ArrowUpRight className="w-3 h-3" /> +2.4% vs mês ant.
          </span>
        </div>

        <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 shadow-md hover:border-indigo-500/40 transition-all group">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-semibold font-mono uppercase">Conexão</span>
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{metrics.taxaConexao}%</p>
          <span className="text-[11px] text-neutral-400 font-medium mt-2 block font-mono">
            3min 35s méd.
          </span>
        </div>
      </div>

      {/* Featured AI Bento Card: "Seu Próximo Foco" */}
      <div className="bg-neutral-900 border border-amber-500/30 rounded-3xl p-6 lg:p-7 shadow-[0_0_30px_rgba(245,158,11,0.1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="flex items-start gap-4 z-10">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <Target className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-wider font-mono">
                RECOMMENDATION_AI
              </span>
              <h3 className="text-base font-bold text-white">
                Seu Próximo Foco: {metrics.focoRecomendado.titulo}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
              {metrics.focoRecomendado.descricao}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('call-simulator')}
          className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs shadow-lg transition-all shrink-0 flex items-center gap-2 cursor-pointer z-10"
        >
          <Sparkles className="w-4 h-4 fill-neutral-950 text-neutral-950" />
          <span>Treinar Foco Agora</span>
        </button>
      </div>

      {/* Middle Grid: Charts & Analytics Bento Tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Evolution of SDR Quality Score */}
        <div className="lg:col-span-2 bg-neutral-900 p-6 rounded-3xl border border-neutral-800 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-sm">Evolução da Nota do SDR & Atividades</h3>
              <p className="text-xs text-neutral-400">Média ponderada nas simulações e ligações reais</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              +8.2 pts nesta semana
            </span>
          </div>

          {/* Simulated Visual Chart Bars */}
          <div className="pt-6 pb-2 px-2 flex items-end justify-between h-48 border-b border-neutral-800">
            {[
              { day: 'Seg', calls: 24, score: 68 },
              { day: 'Ter', calls: 32, score: 72 },
              { day: 'Qua', calls: 28, score: 75 },
              { day: 'Qui', calls: 35, score: 81 },
              { day: 'Sex', calls: 23, score: 84 },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                <div className="text-[10px] font-mono font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.score} pts
                </div>
                <div className="w-full max-w-[40px] bg-neutral-800/80 rounded-t-xl relative flex items-end justify-center overflow-hidden h-36">
                  <div 
                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-xl transition-all duration-500 group-hover:brightness-125 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                    style={{ height: `${item.score}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-neutral-400">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-around text-xs text-neutral-400 pt-2 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              <span>Nota da Abordagem</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-neutral-800" />
              <span>Volume da Semana</span>
            </div>
          </div>
        </div>

        {/* Top Objections Frequency Bento Tile */}
        <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Principais Objeções
            </h3>
            <button 
              onClick={() => setActiveTab('scripts-objections')}
              className="text-xs text-indigo-400 font-semibold hover:underline font-mono"
            >
              Biblioteca →
            </button>
          </div>

          <div className="space-y-3.5">
            {metrics.principaisObjecoes.map((obj, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-neutral-300">
                  <span>{obj.name}</span>
                  <span className="font-bold font-mono text-amber-400">{obj.count}x</span>
                </div>
                <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-400 h-full rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                    style={{ width: `${Math.min(100, (obj.count / 50) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800 text-xs text-neutral-400 leading-relaxed">
            💡 <strong className="text-white">Dica Nibo:</strong> Para &quot;Já uso sistema contábil&quot;, reforce que o Nibo roda JUNTO como camada de automação sem trocar o ERP fiscal.
          </div>
        </div>
      </div>

      {/* Bottom Grid: Weaknesses & Strengths Bento Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Points to Improve */}
        <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 shadow-md space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 text-rose-400">
            <AlertCircle className="w-4 h-4" />
            Oportunidades de Melhoria (IA)
          </h3>
          <div className="space-y-2.5">
            {metrics.principaisErros.map((erro, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-400 mt-1 shrink-0 shadow-[0_0_8px_rgba(251,113,133,0.5)]" />
                <span>{erro}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SDR Strengths */}
        <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 shadow-md space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            Seus Pontos Fortes em Destaque
          </h3>
          <div className="space-y-2.5">
            {metrics.principaisPontosFortes.map((forte, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <span>{forte}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
