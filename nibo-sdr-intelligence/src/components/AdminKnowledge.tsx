import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  Cpu, 
  Activity, 
  Layers, 
  Plus, 
  CheckCircle2,
  Lock,
  RefreshCw
} from 'lucide-react';
import { NIBO_PRODUCTS } from '../data/niboKnowledge';
import { OBJECTIONS_LIBRARY } from '../data/objectionsAndScripts';
import { ApiService } from '../services/apiService';

export const AdminKnowledge: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'objections' | 'settings'>('products');
  const [usageData, setUsageData] = useState({ totalCalls: 142, estimatedTokens: 384000, estimatedCostUsd: 0.12 });
  const [geminiStatus, setGeminiStatus] = useState({ configured: true, model: 'gemini-3.6-flash' });

  // Interactive Objections and Products State
  const [objectionsList, setObjectionsList] = useState(OBJECTIONS_LIBRARY);
  const [productsList, setProductsList] = useState(NIBO_PRODUCTS);

  // Modal State
  const [showObjModal, setShowObjModal] = useState(false);
  const [newObjText, setNewObjText] = useState('');
  const [newObjCategory, setNewObjCategory] = useState('Preço / Custo');
  const [newObjResponse, setNewObjResponse] = useState('');

  const [showProdModal, setShowProdModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Automação Fiscal');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPain, setNewProdPain] = useState('');

  useEffect(() => {
    ApiService.getUsageEstimate().then(setUsageData);
    ApiService.getGeminiStatus().then(setGeminiStatus);
  }, []);

  const handleAddObjection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObjText.trim() || !newObjResponse.trim()) return;

    const newObj = {
      id: 'obj-' + Date.now(),
      objectionText: newObjText,
      category: newObjCategory,
      prospectMindset: 'Cadastrado via painel administrativo.',
      sampleResponse: newObjResponse,
      followUpQuestion: 'Faz sentido avaliarmos isso em uma conversa de 10 minutos?',
      difficultyLevel: 'Média' as const,
    };

    setObjectionsList([newObj, ...objectionsList]);
    setShowObjModal(false);
    setNewObjText('');
    setNewObjResponse('');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdDesc.trim()) return;

    const newProd = {
      id: 'prod-' + Date.now(),
      name: newProdName,
      category: newProdCategory,
      shortDescription: newProdDesc,
      targetPain: newProdPain || 'Processos manuais e lentos no escritório contábil.',
      keyBenefits: ['Maior produtividade', 'Redução de erros manuais', 'Automação inteligente'],
    };

    setProductsList([newProd, ...productsList]);
    setShowProdModal(false);
    setNewProdName('');
    setNewProdDesc('');
    setNewProdPain('');
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 text-xs font-mono font-semibold mb-2">
            <Settings className="w-3.5 h-3.5 text-indigo-400" />
            <span>// ADMIN_KNOWLEDGE_PANEL</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Gestão de Conhecimento, Produtos & Configurações de IA
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Gerencie o portfólio de produtos Nibo, matriz de objeções e monitore chamadas da API Gemini.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'products' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Produtos Nibo ({productsList.length})
          </button>
          <button
            onClick={() => setActiveTab('objections')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'objections' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Objeções ({objectionsList.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Configurações & Token USD
          </button>
        </div>
      </div>

      {/* Tab 1: Products */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowProdModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Novo Produto</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productsList.map((p) => (
              <div key={p.id} className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 uppercase">
                    {p.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-500">Ecossistema Nibo</span>
                </div>

                <h3 className="font-extrabold text-base text-white">{p.name}</h3>
                <p className="text-xs text-neutral-300">{p.shortDescription}</p>

                <div className="space-y-1 text-xs">
                  <strong className="text-neutral-400 font-mono text-[10px] block uppercase">DOR QUE RESOLVE:</strong>
                  <p className="text-neutral-300 bg-neutral-950 p-3 rounded-2xl border border-neutral-800">{p.targetPain}</p>
                </div>

                <div className="space-y-1 text-xs">
                  <strong className="text-neutral-400 font-mono text-[10px] block uppercase">BENEFÍCIOS CHAVE:</strong>
                  <div className="flex flex-wrap gap-1.5">
                    {p.keyBenefits.map((b, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-xl bg-neutral-950 text-neutral-300 border border-neutral-800 text-[10px] font-mono">
                        • {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Objections Management */}
      {activeTab === 'objections' && (
        <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="font-bold text-sm text-white">
              Matriz de Objeções Ativas na Plataforma
            </h3>
            <button
              onClick={() => setShowObjModal(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Nova Objeção</span>
            </button>
          </div>

          <div className="space-y-3">
            {objectionsList.map((obj) => (
              <div key={obj.id} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>&quot;{obj.objectionText}&quot;</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase">
                    {obj.category}
                  </span>
                </div>
                <p className="text-neutral-400 italic font-sans">&quot;{obj.sampleResponse}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Add Objection */}
      {showObjModal && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-base text-white border-b border-neutral-800 pb-3">
              Cadastrar Nova Objeção Comercial
            </h3>
            <form onSubmit={handleAddObjection} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 font-mono mb-1 uppercase">Texto da Objeção</label>
                <input
                  type="text"
                  value={newObjText}
                  onChange={(e) => setNewObjText(e.target.value)}
                  placeholder="Ex: Não tenho tempo para aprender um sistema novo agora"
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1 uppercase">Categoria</label>
                <select
                  value={newObjCategory}
                  onChange={(e) => setNewObjCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Preço / Custo">Preço / Custo</option>
                  <option value="Tempo / Fechamento">Tempo / Fechamento</option>
                  <option value="Concorrente / Sistema">Concorrente / Sistema</option>
                  <option value="Sem Interesse">Sem Interesse</option>
                  <option value="Decisão / Sócio">Decisão / Sócio</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1 uppercase">Resposta Sugerida para o SDR</label>
                <textarea
                  rows={3}
                  value={newObjResponse}
                  onChange={(e) => setNewObjResponse(e.target.value)}
                  placeholder="Ex: Entendo perfeitamente, Dr. Roberto! É exatamente por isso que nossa implantação dura apenas 15 minutos..."
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowObjModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 font-bold hover:bg-neutral-700 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer"
                >
                  Salvar Objeção
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Product */}
      {showProdModal && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-base text-white border-b border-neutral-800 pb-3">
              Cadastrar Novo Produto Nibo
            </h3>
            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 font-mono mb-1 uppercase">Nome do Produto</label>
                <input
                  type="text"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Ex: Nibo AI Payroll Sync"
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1 uppercase">Categoria</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Automação Fiscal">Automação Fiscal</option>
                  <option value="Gestão Financeira B2B">Gestão Financeira B2B</option>
                  <option value="Open Finance Contábil">Open Finance Contábil</option>
                  <option value="Compliance">Compliance</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1 uppercase">Descrição Curta</label>
                <input
                  type="text"
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Ex: Módulo inteligente para sincronização de folhas de pagamento"
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1 uppercase">Dor Principal que Resolve</label>
                <textarea
                  rows={2}
                  value={newProdPain}
                  onChange={(e) => setNewProdPain(e.target.value)}
                  placeholder="Ex: Demora e erros na digitação manual dos holerites do cliente..."
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProdModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 font-bold hover:bg-neutral-700 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer"
                >
                  Salvar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 3: API Settings & Usage Tokens */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gemini API Status Card */}
          <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 shadow-xl space-y-4">
            <h3 className="font-bold text-sm text-white border-b border-neutral-800 pb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Status do Motor Gemini AI
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-300">Chave GEMINI_API_KEY:</span>
                <span className="px-2.5 py-0.5 rounded-full font-mono font-bold text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {geminiStatus.configured ? 'Configurada no Servidor' : 'Ausente'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-300">Modelo Gemini Ativo:</span>
                <span className="font-mono font-bold text-indigo-400">{geminiStatus.model}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-300">API Receita Federal CNPJ:</span>
                <span className="font-bold text-emerald-400">MinhaReceita API (Operacional)</span>
              </div>
            </div>
          </div>

          {/* Usage & Estimator Card */}
          <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 shadow-xl space-y-4">
            <h3 className="font-bold text-sm text-white border-b border-neutral-800 pb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Consumo de Tokens & Estimativa de Custos
            </h3>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800">
                <span className="text-[10px] text-neutral-500 font-mono font-bold block uppercase">CHAMADAS IA</span>
                <span className="text-lg font-black text-white">{usageData.totalCalls}</span>
              </div>

              <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800">
                <span className="text-[10px] text-neutral-500 font-mono font-bold block uppercase">TOKENS</span>
                <span className="text-lg font-black text-indigo-400">{(usageData.estimatedTokens / 1000).toFixed(0)}k</span>
              </div>

              <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800">
                <span className="text-[10px] text-neutral-500 font-mono font-bold block uppercase">ESTIMATIVA USD</span>
                <span className="text-lg font-black text-emerald-400">${usageData.estimatedCostUsd}</span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-300 bg-emerald-500/10 p-3.5 rounded-2xl border border-emerald-500/20">
              💡 O modelo <strong>Gemini 2.5 Flash</strong> oferece altíssima velocidade para simulações interativas com custo extremamente reduzido.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
