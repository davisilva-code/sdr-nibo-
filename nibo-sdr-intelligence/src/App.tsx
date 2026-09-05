import React, { useState } from 'react';
import { Sidebar, TabType } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ProspectIntelligence } from './components/ProspectIntelligence';
import { PipelineCRM } from './components/PipelineCRM';
import { CallSimulator } from './components/CallSimulator';
import { WhatsAppSimulator } from './components/WhatsAppSimulator';
import { WhatsAppLiveViewer } from './components/WhatsAppLiveViewer';
import { CallAnalyzer } from './components/CallAnalyzer';
import { AiSalesLab } from './components/AiSalesLab';
import { NiboCoach } from './components/NiboCoach';
import { ScriptsAndObjections } from './components/ScriptsAndObjections';
import { TrainingAndGamification } from './components/TrainingAndGamification';
import { AdminKnowledge } from './components/AdminKnowledge';
import { CallChatAnalyzerModal } from './components/CallChatAnalyzerModal';

import { User, UserRole, SDRMetrics, AccountingFirm, LeadStatus } from './types';
import { INITIAL_USER, INITIAL_SDR_METRICS, DEMO_ACCOUNTING_FIRMS } from './data/mockData';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [metrics, setMetrics] = useState<SDRMetrics>(INITIAL_SDR_METRICS);
  const [pipelineLeads, setPipelineLeads] = useState<AccountingFirm[]>(DEMO_ACCOUNTING_FIRMS);
  
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [simulatorInitialFirm, setSimulatorInitialFirm] = useState<string | undefined>(undefined);

  const handleSetUserRole = (role: UserRole) => {
    setUser((prev) => ({ ...prev, role }));
  };

  const handleAddToPipeline = (firm: AccountingFirm) => {
    if (!pipelineLeads.some((l) => l.id === firm.id)) {
      setPipelineLeads([firm, ...pipelineLeads]);
    }
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    setPipelineLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  const handleOpenSimulatorWithLead = (firm: AccountingFirm) => {
    setSimulatorInitialFirm(firm.nomeFantasia || firm.razaoSocial);
    setActiveTab('call-simulator');
  };

  const handleXpEarned = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      xp: prev.xp + amount,
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-950 bg-bento-grid font-sans text-neutral-100 flex flex-col lg:flex-row antialiased selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Header */}
        <Header
          user={user}
          setUserRole={handleSetUserRole}
          setIsMobileOpen={setIsMobileOpen}
          openChatAnalyzer={() => setIsChatModalOpen(true)}
        />

        {/* Dynamic Tab Views */}
        <main className="flex-1 pb-12">
          {activeTab === 'dashboard' && (
            <Dashboard metrics={metrics} setActiveTab={setActiveTab} />
          )}

          {activeTab === 'prospecting' && (
            <ProspectIntelligence onAddToPipeline={handleAddToPipeline} />
          )}

          {activeTab === 'pipeline' && (
            <PipelineCRM
              pipelineLeads={pipelineLeads}
              onUpdateLeadStatus={handleUpdateLeadStatus}
              onOpenSimulatorWithLead={handleOpenSimulatorWithLead}
            />
          )}

          {activeTab === 'call-simulator' && (
            <CallSimulator
              initialFirmName={simulatorInitialFirm}
              onSimulationCompleted={handleXpEarned}
            />
          )}

          {activeTab === 'whatsapp-simulator' && <WhatsAppSimulator />}

          {activeTab === 'whatsapp-live' && <WhatsAppLiveViewer />}

          {activeTab === 'call-analyzer' && <CallAnalyzer />}

          {activeTab === 'ai-vs-ai' && <AiSalesLab />}

          {activeTab === 'coach' && <NiboCoach />}

          {activeTab === 'scripts-objections' && <ScriptsAndObjections />}

          {activeTab === 'training' && (
            <TrainingAndGamification user={user} onXpEarned={handleXpEarned} />
          )}

          {activeTab === 'admin' && <AdminKnowledge />}
        </main>
      </div>

      {/* Quick WhatsApp Chat Analyzer Modal */}
      <CallChatAnalyzerModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
    </div>
  );
}

export default App;
