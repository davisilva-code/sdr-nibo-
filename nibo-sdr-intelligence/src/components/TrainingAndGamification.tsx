import React, { useState } from 'react';
import { 
  GraduationCap, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Play, 
  Award, 
  Star, 
  Flame, 
  BookOpen, 
  Send, 
  HelpCircle,
  FileAudio
} from 'lucide-react';
import { TRAINING_MODULES, EXAMPLE_TOP_CALLS } from '../data/mockData';
import { User } from '../types';
import { ApiService } from '../services/apiService';

interface TrainingProps {
  user: User;
  onXpEarned: (amount: number) => void;
}

export const TrainingAndGamification: React.FC<TrainingProps> = ({ user, onXpEarned }) => {
  const [selectedModule, setSelectedModule] = useState(TRAINING_MODULES[0]);
  const [exerciseInput, setExerciseInput] = useState('');
  const [exerciseFeedback, setExerciseFeedback] = useState<any | null>(null);
  const [evaluating, setEvaluating] = useState(false);

  const handleEvaluateExercise = async () => {
    if (!exerciseInput.trim() || evaluating) return;
    setEvaluating(true);

    try {
      const res = await ApiService.askCoach(
        `Avalie a seguinte resposta do SDR ao exercício '${selectedModule.exercisePrompt}': "${exerciseInput}". Diga se está boa, atribua nota 0-10 e dê o feedback curto.`
      );

      setExerciseFeedback({
        score: 9,
        feedback: res.estrategia,
        betterWay: res.frasePronta,
      });

      onXpEarned(20);
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top XP Banner */}
      <div className="bg-neutral-900 p-6 lg:p-8 rounded-3xl text-white shadow-2xl border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-5 z-10">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-2xl shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Trophy className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-black text-[10px] uppercase font-mono tracking-wider">
                {user.level}
              </span>
              <span className="text-xs text-indigo-400 font-mono font-bold">{user.xp} XP ACUMULADOS</span>
            </div>
            <h2 className="text-2xl font-black mt-1 text-white">Trilha de Capacitação SDR Nibo High-Performance</h2>
            <p className="text-xs text-neutral-400">Complete exercícios práticos e simulações para acumular XP e subir de nível.</p>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="w-full md:w-72 space-y-2 bg-neutral-950 p-4 rounded-2xl border border-neutral-800 z-10">
          <div className="flex justify-between text-xs font-bold font-mono">
            <span className="text-neutral-400">PRÓXIMO: SENIOR</span>
            <span className="text-amber-400">{user.xp} / 3000 XP</span>
          </div>
          <div className="w-full bg-neutral-900 h-3 rounded-full overflow-hidden border border-neutral-800">
            <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full" style={{ width: `${Math.min(100, (user.xp / 3000) * 100)}%` }} />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Modules List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="font-extrabold text-xs font-mono uppercase tracking-wider text-neutral-400 px-1">Módulos da Trilha de Formação</h3>

          <div className="space-y-3">
            {TRAINING_MODULES.map((mod) => {
              const isSelected = selectedModule.id === mod.id;
              return (
                <div
                  key={mod.id}
                  onClick={() => {
                    setSelectedModule(mod);
                    setExerciseFeedback(null);
                    setExerciseInput('');
                  }}
                  className={`
                    p-4 rounded-2xl border transition-all cursor-pointer space-y-2
                    ${isSelected 
                      ? 'bg-neutral-900 border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.2)]' 
                      : 'bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded-full uppercase">
                      MÓDULO • {mod.durationMinutes} MIN
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400">+{mod.xpReward} XP</span>
                  </div>

                  <h4 className="font-extrabold text-sm text-white">{mod.title}</h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-2">{mod.description}</p>

                  <div className="flex items-center justify-between pt-1 border-t border-neutral-800 text-[10px]">
                    <span className="font-semibold text-neutral-400">Foco: {mod.category}</span>
                    <span className="text-indigo-400 font-bold flex items-center gap-1">
                      {mod.completed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : 'Praticar Agora'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Training Studio */}
        <div className="lg:col-span-7 bg-neutral-900 p-6 lg:p-8 rounded-3xl border border-neutral-800 shadow-xl space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              MÓDULO ATIVO: {selectedModule.title}
            </span>
            <p className="text-xs text-neutral-400 mt-1">{selectedModule.description}</p>
          </div>

          {/* Practical Exercise Box */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              Exercício Prático com IA
            </h4>

            <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30 text-xs font-medium text-amber-200 space-y-1">
              <strong className="block text-amber-400 font-mono">DESAFIO DO SDR:</strong>
              <p>&quot;{selectedModule.exercisePrompt}&quot;</p>
            </div>

            <textarea
              rows={4}
              value={exerciseInput}
              onChange={(e) => setExerciseInput(e.target.value)}
              placeholder="Digite aqui a sua resposta/argumentação comercial como SDR Nibo..."
              className="w-full p-4 rounded-2xl border border-neutral-800 text-xs text-white focus:outline-none focus:border-indigo-500 bg-neutral-950 font-sans"
            />

            <button
              onClick={handleEvaluateExercise}
              disabled={evaluating || !exerciseInput.trim()}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
            >
              {evaluating ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Submeter Resposta para Correção da IA (+20 XP)</span>
            </button>
          </div>

          {/* Immediate AI Feedback */}
          {exerciseFeedback && (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 text-xs text-emerald-200">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  CORREÇÃO DA IA (+20 XP GANHOS!)
                </span>
                <span className="font-extrabold text-sm text-white">Nota: {exerciseFeedback.score}/10</span>
              </div>

              <div>
                <strong className="block text-emerald-400 font-mono mb-0.5">Feedback da IA:</strong>
                <p>{exerciseFeedback.feedback}</p>
              </div>

              <div className="p-3.5 bg-neutral-950 rounded-xl border border-emerald-500/30">
                <strong className="block text-white text-[11px] font-mono mb-1">Como deixar ainda mais poderoso:</strong>
                <p className="font-semibold text-indigo-300 italic">&quot;{exerciseFeedback.betterWay}&quot;</p>
              </div>
            </div>
          )}

          {/* Top Calls Exemplares Section */}
          <div className="pt-4 border-t border-neutral-800 space-y-3">
            <h4 className="font-bold text-xs text-white flex items-center gap-2">
              <FileAudio className="w-4 h-4 text-purple-400" />
              Repositório de Calls Exemplares Nibo (Top Performers)
            </h4>

            <div className="space-y-2">
              {EXAMPLE_TOP_CALLS.map((call) => (
                <div key={call.id} className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{call.title}</span>
                    <span className="text-[10px] text-neutral-400 font-mono">Score: {call.callScore}/100 • Duração: {call.audioDuration}</span>
                  </div>
                  <button className="px-3.5 py-1.5 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/30 font-bold text-[11px] hover:bg-purple-600 hover:text-white transition-colors cursor-pointer">
                    Ouvir Call
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
