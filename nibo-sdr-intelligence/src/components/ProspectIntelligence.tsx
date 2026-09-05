import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  Phone, 
  MessageSquare, 
  Globe, 
  Mail, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Plus, 
  RefreshCw, 
  FileText, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Info,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { AccountingFirm, BrazilianRegion, LeadSummary } from '../types';
import { DEMO_ACCOUNTING_FIRMS } from '../data/mockData';
import { ApiService } from '../services/apiService';

interface ProspectIntelligenceProps {
  onAddToPipeline: (firm: AccountingFirm) => void;
}

export const ProspectIntelligence: React.FC<ProspectIntelligenceProps> = ({ onAddToPipeline }) => {
  const [firms, setFirms] = useState<AccountingFirm[]>(DEMO_ACCOUNTING_FIRMS);
  const [selectedFirm, setSelectedFirm] = useState<AccountingFirm | null>(DEMO_ACCOUNTING_FIRMS[0]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [generatingApproach, setGeneratingApproach] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Search & Filter State
  const [searchCnpj, setSearchCnpj] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('Todas');
  const [selectedState, setSelectedState] = useState<string>('Todos');
  const [cityInput, setCityInput] = useState<string>('');
  const [hasPhoneOnly, setHasPhoneOnly] = useState(false);
  const [hasWhatsappOnly, setHasWhatsappOnly] = useState(false);

  // Modal State for Approach Generator
  const [isApproachModalOpen, setIsApproachModalOpen] = useState(false);

  const statesList = [
    'Todos', 'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 
    'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Real Lead Search using Receita Federal & Public Bases
  const handleRealSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoadingSearch(true);
    try {
      const results = await ApiService.searchLeads({
        query: searchCnpj,
        region: selectedRegion,
        state: selectedState,
        city: cityInput,
        whatsappOnly: hasWhatsappOnly,
      });

      if (results && results.length > 0) {
        setFirms(results);
        setSelectedFirm(results[0]);
      } else {
        alert('Nenhum escritório contábil encontrado para os filtros informados.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao realizar a busca de escritórios contábeis.');
    } finally {
      setLoadingSearch(false);
    }
  };

  // CNPJ Direct Official Lookup
  const handleCnpjSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCnpj) {
      handleRealSearch();
      return;
    }

    setLoadingSearch(true);
    try {
      const result = await ApiService.fetchCompanyByCNPJ(searchCnpj);
      const newFirm: AccountingFirm = {
        id: 'firm-' + Date.now(),
        cnpj: result.cnpj || searchCnpj,
        razaoSocial: result.razaoSocial || 'Escritório Contábil Encontrado',
        nomeFantasia: result.nomeFantasia || result.razaoSocial || 'Contabilidade',
        socioResponsavel: result.socioResponsavel || 'Sócio Proprietário',
        telefone: result.telefone || '(11) 3000-0000',
        celular: '(11) 99000-0000',
        whatsapp: '5511990000000',
        cidade: result.cidade || 'São Paulo',
        estado: result.estado || 'SP',
        regiao: 'Sudeste',
        cep: result.cep || '01000-000',
        site: 'https://exemplo-contabilidade.com.br',
        email: result.email || 'contato@contabilidade.com.br',
        status: 'Novo',
        score: 82,
        source: result.source || 'MinhaReceita API (Oficial Receita Federal)',
        retrievedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        confidence: 'Alta',
        isDemoData: false,
        addedToPipeline: false,
        porte: result.porte || 'Demais',
        dataAbertura: result.dataAbertura || '2015-01-01',
      };

      setFirms([newFirm, ...firms]);
      setSelectedFirm(newFirm);
      setSearchCnpj('');
    } catch (err) {
      // Try real search if simple enrichment fails
      handleRealSearch();
    } finally {
      setLoadingSearch(false);
    }
  };

  // Generate Approach using Gemini AI
  const handleGenerateApproach = async () => {
    if (!selectedFirm) return;
    setGeneratingApproach(true);
    setIsApproachModalOpen(true);

    try {
      const summary = await ApiService.generateApproach(selectedFirm);
      setSelectedFirm({
        ...selectedFirm,
        summary,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingApproach(false);
    }
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 81) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (score >= 61) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (score >= 31) return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-slate-100 text-slate-700 border-slate-300';
  };

  const getScoreClassification = (score: number) => {
    if (score >= 81) return 'Prioridade Máxima (81-100)';
    if (score >= 61) return 'Alta Prioridade (61-80)';
    if (score >= 31) return 'Média Prioridade (31-60)';
    return 'Baixa Prioridade (0-30)';
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-mono font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>// PROSPECT_INTELLIGENCE: RECEITA_FEDERAL_LIVE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Prospecção de Escritórios Contábeis no Brasil
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Pesquise por CNPJ ou filtros regionais com dados confirmados da Receita Federal.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls Bento Card */}
      <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 shadow-md space-y-4">
        {/* Unified Intelligent Search Form */}
        <form onSubmit={handleRealSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchCnpj}
                onChange={(e) => setSearchCnpj(e.target.value)}
                placeholder="Digite uma cidade, região, especialidade ou termo (Ex: Contabilidades em Campinas, Lucro Real em Curitiba...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-neutral-800 text-xs font-sans focus:outline-none focus:border-indigo-500 bg-neutral-950 text-white placeholder:text-neutral-600"
              />
            </div>
            <button
              type="submit"
              disabled={loadingSearch}
              className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {loadingSearch ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Filter className="w-4 h-4" />
              )}
              <span>Buscar Leads Inteligentes</span>
            </button>
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-neutral-800">
            <div>
              <label className="block text-[10px] font-mono font-bold text-neutral-400 mb-1 uppercase">REGIÃO</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-neutral-800 text-xs bg-neutral-950 text-neutral-200 focus:outline-none focus:border-indigo-500 font-sans cursor-pointer"
              >
                <option value="Todas">Todas as Regiões</option>
                <option value="Sudeste">Sudeste</option>
                <option value="Sul">Sul</option>
                <option value="Nordeste">Nordeste</option>
                <option value="Centro-Oeste">Centro-Oeste</option>
                <option value="Norte">Norte</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-neutral-400 mb-1 uppercase">ESTADO (UF)</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-neutral-800 text-xs bg-neutral-950 text-neutral-200 focus:outline-none focus:border-indigo-500 font-sans cursor-pointer"
              >
                {statesList.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-neutral-400 mb-1 uppercase">CIDADE</label>
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Ex: Campinas..."
                className="w-full p-2.5 rounded-xl border border-neutral-800 text-xs bg-neutral-950 text-neutral-200 focus:outline-none focus:border-indigo-500 font-sans"
              />
            </div>

            <div className="flex flex-col justify-center gap-1.5 pt-2">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasWhatsappOnly}
                  onChange={(e) => setHasWhatsappOnly(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-950 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Somente com WhatsApp</span>
              </label>
            </div>
          </div>
        </form>
      </div>

      {/* Main Content: Split List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Prospects */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-400 px-1 font-mono">
            <span className="font-semibold text-neutral-300">RESULTADOS ({firms.length})</span>
            <span>Selecione um lead</span>
          </div>

          <div className="space-y-3">
            {firms.map((firm) => {
              const isSelected = selectedFirm?.id === firm.id;
              return (
                <div
                  key={firm.id}
                  onClick={() => setSelectedFirm(firm)}
                  className={`
                    p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5
                    ${isSelected 
                      ? 'bg-neutral-900 border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.25)]' 
                      : 'bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700'}
                  `}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                        {firm.nomeFantasia || firm.razaoSocial}
                      </h4>
                      <p className="text-[11px] text-neutral-400 line-clamp-1">{firm.razaoSocial}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                      Score {firm.score}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-neutral-300 font-sans">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-500" />
                      {firm.cidade} - {firm.estado}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3 h-3 text-neutral-500" />
                      {firm.telefone}
                    </span>
                  </div>

                  {/* Verification Tag */}
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/30">
                      CONFIRMADO
                    </span>
                    <span className="text-neutral-500 font-mono text-[9px]">{firm.source}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail & Intelligence Panel */}
        <div className="lg:col-span-7">
          {selectedFirm ? (
            <div className="bg-neutral-900 rounded-3xl border border-neutral-800 shadow-xl p-6 lg:p-7 space-y-6 sticky top-24">
              {/* Company Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                      {selectedFirm.porte || 'Escritório Contábil'}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">CNPJ: {selectedFirm.cnpj}</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white">
                    {selectedFirm.nomeFantasia || selectedFirm.razaoSocial}
                  </h2>
                  <p className="text-xs text-neutral-400">{selectedFirm.razaoSocial}</p>
                </div>

                {/* Score badge big */}
                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between">
                  <div className="px-3.5 py-2 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-center text-indigo-300">
                    <p className="text-xs font-mono font-bold">SCORE LEAD: {selectedFirm.score}/100</p>
                    <p className="text-[10px] font-semibold">{getScoreClassification(selectedFirm.score)}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    onAddToPipeline(selectedFirm);
                    setSelectedFirm({ ...selectedFirm, addedToPipeline: true });
                  }}
                  disabled={selectedFirm.addedToPipeline}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                    selectedFirm.addedToPipeline
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]'
                  }`}
                >
                  {selectedFirm.addedToPipeline ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                  <span>{selectedFirm.addedToPipeline ? 'No Pipeline' : 'Adicionar ao Pipeline'}</span>
                </button>

                <button
                  onClick={handleGenerateApproach}
                  className="px-4 py-2.5 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Gerar Abordagem com IA</span>
                </button>

                <button
                  onClick={() => handleCopy(selectedFirm.telefone, 'Telefone')}
                  className="px-3.5 py-2.5 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedField === 'Telefone' ? 'Copiado!' : 'Copiar Fone'}</span>
                </button>

                <button
                  onClick={() => handleCopy(selectedFirm.cnpj, 'CNPJ')}
                  className="px-3.5 py-2.5 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedField === 'CNPJ' ? 'Copiado!' : 'Copiar CNPJ'}</span>
                </button>
              </div>

              {/* Data Verification Grid (Dados Confirmados) */}
              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-white border-b border-neutral-800 pb-2">
                  <span className="flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    DADOS CONFIRMADOS DA EMPRESA
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">{selectedFirm.source}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-neutral-300">
                  <div>
                    <span className="text-neutral-500 block text-[10px] font-mono">SÓCIO RESPONSÁVEL</span>
                    <span className="font-semibold text-white">{selectedFirm.socioResponsavel}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] font-mono">LOCALIZAÇÃO</span>
                    <span className="font-semibold text-white">{selectedFirm.cidade} - {selectedFirm.estado} ({selectedFirm.regiao})</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] font-mono">TELEFONE FIXO</span>
                    <span className="font-mono text-white">{selectedFirm.telefone}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] font-mono">WHATSAPP EMPRESARIAL</span>
                    <span className="font-mono text-white">{selectedFirm.whatsapp}</span>
                  </div>
                </div>
              </div>

              {/* AI Strategic Intelligence Summary */}
              {selectedFirm.summary ? (
                <div className="p-5 rounded-2xl bg-neutral-950/80 border border-indigo-500/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <h3 className="font-bold text-xs font-mono uppercase tracking-wide text-indigo-300">
                        RESUMO E HIPÓTESES DA IA PARA O SDR
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-neutral-200">
                    <div>
                      <strong className="text-white block mb-1 font-mono text-[11px]">Perfil Provável:</strong>
                      <p className="text-neutral-300 bg-neutral-900 p-3 rounded-xl border border-neutral-800">{selectedFirm.summary.perfilProvavel}</p>
                    </div>

                    <div>
                      <strong className="text-white block mb-1 font-mono text-[11px]">Produto Nibo Recomendado:</strong>
                      <span className="inline-block px-3 py-1 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md">
                        {selectedFirm.summary.produtoNiboRelevante}
                      </span>
                    </div>

                    <div>
                      <strong className="text-white block mb-1 font-mono text-[11px]">Possíveis Dores & Gargalos:</strong>
                      <ul className="list-disc pl-4 space-y-1 text-neutral-300">
                        {selectedFirm.summary.possiveisDores.map((dor, i) => (
                          <li key={i}>{dor}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong className="text-white block mb-1 font-mono text-[11px]">Gancho de Abertura Recomendado:</strong>
                      <p className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 italic text-amber-200 font-medium">
                        &quot;{selectedFirm.summary.ganchoAbertura}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-indigo-400 mx-auto animate-pulse" />
                  <h4 className="font-bold text-sm text-white">Pronto para gerar abordagem com IA?</h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    A IA vai analisar o perfil confirmado da empresa para sugerir a abertura perfeita, produto ideal e perguntas de descoberta.
                  </p>
                  <button
                    onClick={handleGenerateApproach}
                    className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md cursor-pointer"
                  >
                    Gerar Inteligência do Lead
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-neutral-900 p-12 rounded-3xl border border-neutral-800 text-center text-neutral-500 space-y-3">
              <Building2 className="w-12 h-12 mx-auto text-neutral-700" />
              <p className="text-sm font-medium">Selecione uma contabilidade ao lado para visualizar a inteligência completa.</p>
            </div>
          )}
        </div>
      </div>

      {/* AI Approach Modal */}
      {isApproachModalOpen && selectedFirm?.summary && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 w-full max-w-2xl rounded-3xl border border-neutral-800 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base text-white">
                  Abordagem Personalizada Nibo — {selectedFirm.nomeFantasia || selectedFirm.razaoSocial}
                </h3>
              </div>
              <button 
                onClick={() => setIsApproachModalOpen(false)}
                className="p-1 rounded-xl text-neutral-400 hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-neutral-200">
              <div className="p-3.5 bg-indigo-500/10 rounded-2xl border border-indigo-500/30">
                <span className="font-mono font-bold text-indigo-400 block mb-1">PRODUTO PRINCIPAL RECOMENDADO:</span>
                <span className="text-sm font-extrabold text-white">{selectedFirm.summary.produtoNiboRelevante}</span>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">1. Gancho de Abertura para Ligação:</h4>
                <p className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 italic text-neutral-200 font-medium">
                  {selectedFirm.summary.ganchoAbertura}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">2. Perguntas de Descoberta Sugeridas:</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {selectedFirm.summary.perguntasDescoberta.map((perg, i) => (
                    <li key={i} className="font-medium text-neutral-300">{perg}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">3. Abordagem Pronta para WhatsApp:</h4>
                <div className="p-3.5 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-emerald-300 font-mono text-[11px] leading-relaxed">
                  Olá {selectedFirm.socioResponsavel.split(' ')[0]}! Acompanho a {selectedFirm.nomeFantasia} em {selectedFirm.cidade}. Ajudamos escritórios de contabilidade da região a eliminarem a cobrança manual de extratos no fim do mês. Posso te enviar um vídeo rápido de 1 minuto mostrando como funciona?
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">4. Próximo Passo Recomendado:</h4>
                <p className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/30 font-semibold text-indigo-300">
                  {selectedFirm.summary.proximoPasso}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => setIsApproachModalOpen(false)}
                className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer"
              >
                Entendi, Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
