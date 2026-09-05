import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Sparkles, 
  User as UserIcon, 
  Zap, 
  Bot, 
  ShieldCheck, 
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  TrendingUp
} from 'lucide-react';
import { User, UserRole } from '../types';
import { ApiService } from '../services/apiService';

interface HeaderProps {
  user: User;
  setUserRole: (role: UserRole) => void;
  setIsMobileOpen: (open: boolean) => void;
  openChatAnalyzer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  setUserRole,
  setIsMobileOpen,
  openChatAnalyzer,
}) => {
  const [geminiStatus, setGeminiStatus] = useState<{ configured: boolean; model: string }>({
    configured: true,
    model: 'gemini-3.6-flash',
  });

  useEffect(() => {
    ApiService.getGeminiStatus().then((status) => {
      setGeminiStatus(status);
    });
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-800 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Left section: Mobile menu button + Greeting */}
      <div className="flex items-center gap-3 lg:gap-6">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-neutral-400 hover:bg-neutral-800 focus:outline-none"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base lg:text-lg font-bold text-white flex items-center gap-2">
            Bom dia, {user.name.split(' ')[0]} 👋
          </h2>
          <p className="text-xs text-neutral-400 hidden sm:block font-mono">
            // METRICS_LIVE: Veja sua performance de prospecção hoje.
          </p>
        </div>
      </div>

      {/* Right section: AI Status, Quick Action & Role Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Gemini Status Pill */}
        <div className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border ${
          geminiStatus.configured 
            ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' 
            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Gemini AI Engine:</span>
          <span className="font-bold text-white">{geminiStatus.configured ? 'Ativo' : 'Fallback'}</span>
        </div>

        {/* Quick Action: Analyze Chat */}
        <button
          onClick={openChatAnalyzer}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/40 text-xs font-bold transition-all shadow-[0_0_15px_rgba(79,70,229,0.25)] cursor-pointer"
          title="Analisar conversa de WhatsApp e gerar resposta imediata"
        >
          <MessageCircle className="w-3.5 h-3.5 text-white" />
          <span className="hidden sm:inline">Analisar Conversa</span>
        </button>

        {/* Role Switcher (SDR / Gestor / Admin) */}
        <div className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs">
          <button
            onClick={() => setUserRole('sdr')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              user.role === 'sdr' 
                ? 'bg-indigo-600 text-white shadow-sm font-bold' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            SDR
          </button>
          <button
            onClick={() => setUserRole('gestor')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              user.role === 'gestor' 
                ? 'bg-indigo-600 text-white shadow-sm font-bold' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Gestor
          </button>
          <button
            onClick={() => setUserRole('admin')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              user.role === 'admin' 
                ? 'bg-indigo-600 text-white shadow-sm font-bold' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Admin
          </button>
        </div>
      </div>
    </header>
  );
};
