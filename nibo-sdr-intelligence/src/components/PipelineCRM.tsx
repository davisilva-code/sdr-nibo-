import React, { useState } from 'react';
import { 
  Kanban, 
  Building2, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  MoreVertical, 
  Search, 
  Plus, 
  ChevronRight, 
  Copy, 
  CheckCircle2, 
  Calendar,
  X,
  Filter
} from 'lucide-react';
import { AccountingFirm, LeadStatus } from '../types';

interface PipelineCRMProps {
  pipelineLeads: AccountingFirm[];
  onUpdateLeadStatus: (leadId: string, newStatus: LeadStatus) => void;
  onOpenSimulatorWithLead: (firm: AccountingFirm) => void;
}

export const PipelineCRM: React.FC<PipelineCRMProps> = ({
  pipelineLeads,
  onUpdateLeadStatus,
  onOpenSimulatorWithLead,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeadModal, setSelectedLeadModal] = useState<AccountingFirm | null>(null);

  const stages: { id: LeadStatus; title: string; color: string }[] = [
    { id: 'Novo', title: 'NOVOS', color: 'border-neutral-800 bg-neutral-900/60' },
    { id: 'Contatado', title: 'CONTATADOS', color: 'border-blue-500/30 bg-blue-500/5' },
    { id: 'Conversando', title: 'CONVERSANDO', color: 'border-indigo-500/30 bg-indigo-500/5' },
    { id: 'Qualificado', title: 'QUALIFICADOS', color: 'border-amber-500/30 bg-amber-500/5' },
    { id: 'Reunião', title: 'REUNIÃO', color: 'border-purple-500/30 bg-purple-500/5' },
    { id: 'Oportunidade', title: 'OPORTUNIDADE', color: 'border-sky-500/30 bg-sky-500/5' },
    { id: 'Ganho', title: 'GANHO / FECHADO', color: 'border-emerald-500/30 bg-emerald-500/5' },
  ];

  const filteredLeads = pipelineLeads.filter(lead =>
    lead.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.cnpj.includes(searchTerm)
  );

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Kanban className="w-5 h-5 text-indigo-400" />
            Base de Contabilidades & Pipeline Comercial
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Gerencie o avanço das oportunidades de prospecção do Nibo por estágio de negociação.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar por nome, cidade ou CNPJ..."
            className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-neutral-800 text-xs bg-neutral-900 text-white focus:outline-none focus:border-indigo-500 font-sans"
          />
        </div>
      </div>

      {/* Kanban Board Layout */}
      <div className="flex gap-4 overflow-x-auto pb-6 pt-2 custom-scrollbar min-h-[600px]">
        {stages.map((stage) => {
          const stageLeads = filteredLeads.filter(l => l.status === stage.id);
          return (
            <div 
              key={stage.id} 
              className={`w-72 shrink-0 rounded-3xl border ${stage.color} p-3.5 flex flex-col space-y-3 bg-neutral-900/90 shadow-lg backdrop-blur-md`}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between px-2 py-1 border-b border-neutral-800 pb-2">
                <span className="text-xs font-mono font-bold text-neutral-200 tracking-wider">
                  {stage.title}
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-neutral-800 text-neutral-300">
                  {stageLeads.length}
                </span>
              </div>

              {/* Lead Cards List */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[680px] pr-1">
                {stageLeads.length === 0 ? (
                  <div className="p-4 rounded-2xl border border-dashed border-neutral-800 text-center text-[11px] text-neutral-500 font-mono">
                    Sem oportunidades neste estágio.
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800/90 shadow-md hover:border-indigo-500/50 transition-all space-y-2.5 group relative"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="font-bold text-xs text-white group-hover:text-indigo-400 transition-colors">
                            {lead.nomeFantasia || lead.razaoSocial}
                          </h4>
                          <p className="text-[10px] text-neutral-400 line-clamp-1">{lead.cidade} - {lead.estado}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 shrink-0">
                          {lead.score} pts
                        </span>
                      </div>

                      <div className="text-[11px] text-neutral-400 font-mono flex items-center justify-between">
                        <span>{lead.telefone}</span>
                        <span className="text-[9px] text-neutral-500">{lead.porte || 'Escritório'}</span>
                      </div>

                      {/* Card Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-[10px]">
                        <button
                          onClick={() => setSelectedLeadModal(lead)}
                          className="text-indigo-400 font-bold hover:underline cursor-pointer"
                        >
                          Ver Detalhes
                        </button>

                        <button
                          onClick={() => onOpenSimulatorWithLead(lead)}
                          className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Phone className="w-2.5 h-2.5 text-emerald-300" />
                          <span>Treinar Call</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Detail & Status Change Modal */}
      {selectedLeadModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 w-full max-w-md rounded-3xl border border-neutral-800 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white">
                  {selectedLeadModal.nomeFantasia || selectedLeadModal.razaoSocial}
                </h3>
                <p className="text-xs text-neutral-400">{selectedLeadModal.razaoSocial}</p>
              </div>
              <button 
                onClick={() => setSelectedLeadModal(null)}
                className="p-1 rounded-xl text-neutral-400 hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-300">
              <div className="grid grid-cols-2 gap-2 p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800">
                <div>
                  <span className="text-neutral-500 text-[10px] font-mono">SÓCIO</span>
                  <p className="font-semibold text-white">{selectedLeadModal.socioResponsavel}</p>
                </div>
                <div>
                  <span className="text-neutral-500 text-[10px] font-mono">CIDADE/UF</span>
                  <p className="font-semibold text-white">{selectedLeadModal.cidade} - {selectedLeadModal.estado}</p>
                </div>
                <div>
                  <span className="text-neutral-500 text-[10px] font-mono">TELEFONE</span>
                  <p className="font-mono font-semibold text-white">{selectedLeadModal.telefone}</p>
                </div>
                <div>
                  <span className="text-neutral-500 text-[10px] font-mono">CNPJ</span>
                  <p className="font-mono font-semibold text-white">{selectedLeadModal.cnpj}</p>
                </div>
              </div>

              {/* Status Change Selector */}
              <div>
                <label className="block text-xs font-bold text-white mb-1.5 font-mono">
                  ESTÁGIO NO PIPELINE:
                </label>
                <select
                  value={selectedLeadModal.status}
                  onChange={(e) => {
                    const newSt = e.target.value as LeadStatus;
                    onUpdateLeadStatus(selectedLeadModal.id, newSt);
                    setSelectedLeadModal({ ...selectedLeadModal, status: newSt });
                  }}
                  className="w-full p-3 rounded-2xl border border-indigo-500/30 text-xs font-bold bg-indigo-500/10 text-indigo-300 focus:outline-none"
                >
                  {stages.map(s => (
                    <option key={s.id} value={s.id} className="bg-neutral-900 text-white">{s.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLeadModal(null)}
                className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer"
              >
                Salvar & Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
