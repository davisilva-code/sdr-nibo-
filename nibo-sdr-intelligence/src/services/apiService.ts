import { AccountingFirm, LeadSummary, SimulationDifficulty, Persona, CallAnalysis, SDRMetrics } from '../types';

export const ApiService = {
  // Admin & Gemini status
  async getGeminiStatus() {
    try {
      const res = await fetch('/api/admin/gemini-status');
      return await res.json();
    } catch {
      return { configured: false, model: 'gemini-3.6-flash' };
    }
  },

  async getUsageEstimate() {
    try {
      const res = await fetch('/api/admin/usage-estimate');
      return await res.json();
    } catch {
      return { totalCalls: 0, estimatedTokens: 0, estimatedCostUsd: 0 };
    }
  },

  // Company Data API (CNPJ Official Search)
  async fetchCompanyByCNPJ(cnpj: string): Promise<Partial<AccountingFirm>> {
    const res = await fetch(`/api/prospects/enrich/${encodeURIComponent(cnpj)}`);
    if (!res.ok) {
      throw new Error('Não foi possível consultar este CNPJ nas fontes públicas.');
    }
    return await res.json();
  },

  // Real Lead Search API
  async searchLeads(params: { query?: string; region?: string; state?: string; city?: string; whatsappOnly?: boolean }): Promise<AccountingFirm[]> {
    const queryParams = new URLSearchParams();
    if (params.query) queryParams.set('q', params.query);
    if (params.region) queryParams.set('region', params.region);
    if (params.state) queryParams.set('state', params.state);
    if (params.city) queryParams.set('city', params.city);
    if (params.whatsappOnly) queryParams.set('whatsappOnly', 'true');

    const res = await fetch(`/api/prospects/search?${queryParams.toString()}`);
    if (!res.ok) {
      throw new Error('Falha ao buscar escritórios contábeis.');
    }
    return await res.json();
  },

  // AI Approach Generator
  async generateApproach(company: Partial<AccountingFirm>): Promise<LeadSummary> {
    const res = await fetch('/api/prospects/generate-approach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company }),
    });
    if (!res.ok) {
      throw new Error('Falha ao gerar abordagem com IA.');
    }
    return await res.json();
  },

  // Nibo Coach
  async askCoach(question: string, context?: string) {
    const res = await fetch('/api/ai/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, context }),
    });
    if (!res.ok) {
      throw new Error('Erro ao consultar o Nibo Coach.');
    }
    return await res.json();
  },

  // Call Simulator
  async simulateCallTurn(payload: {
    product: string;
    persona: Persona;
    difficulty: SimulationDifficulty;
    history: { sender: string; content: string }[];
    userMessage: string;
  }) {
    const res = await fetch('/api/ai/simulate-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error('Erro no turno da simulação.');
    }
    return await res.json();
  },

  // Score Simulation
  async scoreSimulation(payload: {
    history: { sender: string; content: string }[];
    product: string;
    difficulty: SimulationDifficulty;
  }) {
    const res = await fetch('/api/ai/score-simulation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error('Erro ao gerar relatório de nota da simulação.');
    }
    return await res.json();
  },

  // Call Analyzer (Audio or Transcript)
  async analyzeCall(payload: { audioBase64?: string; mimeType?: string; sampleTranscript?: any }) {
    const res = await fetch('/api/ai/analyze-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error('Erro ao analisar a ligação.');
    }
    return await res.json();
  },

  // Chat Conversation Analyzer
  async analyzeChat(chatText: string) {
    const res = await fetch('/api/ai/analyze-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatText }),
    });
    if (!res.ok) {
      throw new Error('Erro ao analisar texto do chat.');
    }
    return await res.json();
  },

  // AI vs AI Sales Duel
  async nextAiVsAiTurn(payload: {
    product: string;
    persona?: Persona;
    difficulty: SimulationDifficulty;
    currentTurn: number;
    previousMessages: { speaker: string; text: string }[];
    userTakeoverMessage?: string;
  }) {
    const res = await fetch('/api/ai/ai-vs-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error('Erro ao gerar próximo turno do duelo.');
    }
    return await res.json();
  }
};
