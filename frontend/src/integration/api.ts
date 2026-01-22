import { Intent, IntentType, ExecutionLog, Metrics } from '../types/intent.types';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

export interface CreateIntentRequest {
  token: string;
  amount: string;
  recipient: string;
  type: IntentType;
  deadline: number;
  maxGasPrice: string;
  minTokenPrice?: string;
  owner: string;
  paymentHeader?: string;
}

export const api = {
  async createIntent(request: CreateIntentRequest): Promise<Intent> {
    const response = await fetch(`${API_BASE}/api/intents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create intent');
    }

    return response.json();
  },

  async getIntents(owner?: string): Promise<Intent[]> {
    const url = owner
      ? `${API_BASE}/api/intents?owner=${owner}`
      : `${API_BASE}/api/intents`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch intents');
    }

    return response.json();
  },

  async getIntent(id: string): Promise<Intent> {
    const response = await fetch(`${API_BASE}/api/intents/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch intent');
    }

    return response.json();
  },

  async getIntentStatus(id: string): Promise<{ intent: Intent; logs: ExecutionLog[] }> {
    const response = await fetch(`${API_BASE}/api/intents/${id}/status`);

    if (!response.ok) {
      throw new Error('Failed to fetch intent status');
    }

    return response.json();
  },

  async cancelIntent(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/api/intents/${id}/cancel`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to cancel intent');
    }
  },

  async executeNow(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/api/intents/${id}/execute`, {
      method: 'POST',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to execute intent');
    }
  },

  async getMetrics(): Promise<Metrics> {
    const response = await fetch(`${API_BASE}/api/metrics`);

    if (!response.ok) {
      throw new Error('Failed to fetch metrics');
    }

    return response.json();
  },
};
