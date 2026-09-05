import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Copy, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Filter,
  Layers,
  HelpCircle,
  PhoneCall,
  MessageSquare
} from 'lucide-react';
import { OBJECTIONS_LIBRARY, SALES_SCRIPTS } from '../data/objectionsAndScripts';
import { NIBO_PRODUCTS, PAIN_MATRIX } from '../data/niboKnowledge';

export const ScriptsAndObjections: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'objections' | 'scripts' | 'matrix'>('objections');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'Todas',
    'Preço / Custo',
    'Tempo / Fechamento',
    'Concorrente / Sistema',
    'Sem Interesse',
    'Decisão / Sócio',
    'Estrutura / Porte'
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredObjections = OBJECTIONS_LIBRARY.filter(o => {
    const matchesCategory = selectedCategory === 'Todas' || o.category === selectedCategory;
    const matchesSearch = o.objectionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.sampleResponse.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Biblioteca Oficial de Argumentação Comercial Nibo</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Scripts de Abordagem & Contorno de Objeções
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Playbook completo de vendas para SDRs contornarem qualquer barreira do contador com facilidade.
          </p>
        </div>

        {/* Subtabs Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('objections')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeSubTab === 'objections' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Matriz de Objeções ({OBJECTIONS_LIBRARY.length})
          </button>
          <button
            onClick={() => setActiveSubTab('scripts')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeSubTab === 'scripts' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Scripts de Prospecção ({SALES_SCRIPTS.length})
          </button>
          <button
            onClick={() => setActiveSubTab('matrix')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeSubTab === 'matrix' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Matriz Dor → Produto
          </button>
        </div>
      </div>

      {/* Subtab 1: Objections Library */}
      {activeSubTab === 'objections' && (
        <div className="space-y-4">
          {/* Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por objeção (ex: 'já tenho sistema', 'manda no WhatsApp', 'tá caro')..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedCategory === cat 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Objections List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredObjections.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900 mt-1">
                      &quot;{item.objectionText}&quot;
                    </h3>
                  </div>

                  <button
                    onClick={() => handleCopy(item.sampleResponse, item.id)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Copiar resposta"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 text-xs text-slate-800">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">LOGICA DE DESTRAPAGEM:</span>
                    <p className="text-slate-700">{item.prospectMindset}</p>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">RESPOSTA PRONTA RECOMENDADA:</span>
                    <p className="text-emerald-950 font-medium italic">&quot;{item.sampleResponse}&quot;</p>
                  </div>

                  <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 space-y-1">
                    <span className="text-[10px] font-bold text-indigo-800 uppercase block">PERGUNTA RECOMENDADA EM SEQUÊNCIA:</span>
                    <p className="text-indigo-950 font-bold">{item.followUpQuestion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 2: Sales Scripts */}
      {activeSubTab === 'scripts' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SALES_SCRIPTS.map((script) => (
              <div key={script.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                      {script.category} • {script.targetProduct}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900 mt-1">
                      {script.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleCopy(script.pitch, script.id)}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedId === script.id ? 'Copiado!' : 'Copiar Pitch'}</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed rounded-xl border border-slate-800 whitespace-pre-line">
                  {script.openingLine}
                  {"\n\n"}
                  {script.pitch}
                </div>

                <div className="text-[11px] text-slate-500 font-medium">
                  🎯 <strong>Objetivo principal:</strong> {script.objective}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 3: Pain Matrix */}
      {activeSubTab === 'matrix' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
            Matriz Dor → Produto Nibo → Argumento de Impacto
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Dor / Sintoma do Contador</th>
                  <th className="p-3">Produto Nibo Ideal</th>
                  <th className="p-3">Gatilho / Argumento de Venda</th>
                  <th className="p-3">Pergunta de Descoberta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PAIN_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-semibold text-rose-800 bg-rose-50/30">{row.dor}</td>
                    <td className="p-3 font-bold text-blue-700">{row.produto}</td>
                    <td className="p-3 font-medium text-slate-800">{row.argumentoValor}</td>
                    <td className="p-3 font-semibold text-indigo-900 italic">&quot;{row.perguntaDescoberta}&quot;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
