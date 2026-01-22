export enum IntentType {
  Payment = 'payment',
}

export enum IntentStatus {
  Pending = 'pending',
  Monitoring = 'monitoring',
  Executing = 'executing',
  Executed = 'executed',
  Expired = 'expired',
  Cancelled = 'cancelled',
  Failed = 'failed',
}

export interface Intent {
  id: string;
  owner: string;
  token: string;
  amount: string;
  recipient: string;
  type: IntentType;
  status: IntentStatus;
  createdAt: number;
  deadline: number;
  maxGasPrice: string;
  minTokenPrice?: string;
  executedAt?: number;
  txHash?: string;
  onChainId?: number;
  paymentHeader?: string;
}

export interface ExecutionLog {
  intentId: string;
  timestamp: number;
  type: 'info' | 'warning' | 'success' | 'error';
  message: string;
  data?: any;
}

export interface Metrics {
  currentGasPrice: string;
  currentTokenPrice: string;
  timestamp: number;
}
