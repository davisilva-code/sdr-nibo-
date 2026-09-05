import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Kanban, 
  PhoneCall, 
  MessageSquare, 
  FileAudio, 
  Bot, 
  BookOpen, 
  Swords, 
  GraduationCap, 
  Settings, 
  Trophy, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
  Radio
} from 'lucide-react';
import { User } from '../types';

export type TabType = 
  | 'dashboard'
  | 'prospecting'
  | 'pipeline'
  | 'call-simulator'
  | 'whatsapp-simulator'
  | 'whatsapp-live'
  | 'call-analyzer'
  | 'coach'
  | 'scripts-objections'
  | 'ai-vs-ai'
  | 'training'
  | 'admin';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  user: User;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  user,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const menuGroups = [
    {
      title: 'PROSPECÇÃO & VENDAS',
      items: [
        { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'prospecting' as TabType, label: 'Prospectar (Intelligence)', icon: Search, badge: 'IA' },
        { id: 'pipeline' as TabType, label: 'Base & Pipeline', icon: Kanban },
      ]
    },
    {
      title: 'SIMULADORES & IA',
      items: [
        { id: 'whatsapp-live' as TabType, label: 'Visualizador WhatsApp Live', icon: Radio, badge: 'LIVE' },
        { id: 'call-simulator' as TabType, label: 'Simulador de Ligações', icon: PhoneCall },
        { id: 'whatsapp-simulator' as TabType, label: 'Simulador de WhatsApp', icon: MessageSquare },
        { id: 'call-analyzer' as TabType, label: 'Analisador de Chamadas', icon: FileAudio },
        { id: 'ai-vs-ai' as TabType, label: 'AI vs AI Sales Lab', icon: Swords, badge: 'NOVO' },
        { id: 'coach' as TabType, label: 'Nibo Coach (Copilot)', icon: Bot },
      ]
    },
    {
      title: 'CAPACITAÇÃO & CONHECIMENTO',
      items: [
        { id: 'scripts-objections' as TabType, label: 'Scripts & Objeções', icon: BookOpen },
        { id: 'training' as TabType, label: 'Treinamentos & XP', icon: GraduationCap },
        { id: 'admin' as TabType, label: 'Gestão & Conhecimento', icon: Settings },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-neutral-900/90 backdrop-blur-xl text-neutral-200 flex flex-col border-r border-neutral-800 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-5 border-b border-neutral-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.35)]">
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-wide text-white flex items-center gap-1.5 uppercase">
                NIBO <span className="text-indigo-400 font-extrabold text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30">SDR</span>
              </h1>
              <p className="text-[11px] text-neutral-400 font-mono">Bento Intelligence</p>
            </div>
          </div>
        </div>

        {/* User Level Card */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-sm shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">{user.level}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                <span className="text-amber-400 font-bold">{user.xp} XP</span>
                <span>•</span>
                <span>Nível SDR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-6 custom-scrollbar">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 font-mono">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileOpen(false);
                      }}
                      className={`
                        w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group
                        ${isActive 
                          ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.35)] font-bold' 
                          : 'text-neutral-400 hover:bg-neutral-800/80 hover:text-white'}
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`} />
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md font-mono ${
                            isActive ? 'bg-white/20 text-white' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-white opacity-100' : 'text-neutral-600 opacity-0 group-hover:opacity-100'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-neutral-800/80 bg-neutral-950/60 text-[11px] text-neutral-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>LGPD Compliance</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">v2.5 Bento</span>
        </div>
      </aside>
    </>
  );
};
