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
  executedAt?: number;
  txHash?: string;
  onChainId?: number;
  paymentHeader?: string;
  subscriptionId?: string;
  executionCount?: number;
  maxExecutions?: number;
}

export interface CreateIntentRequest {
  token: string;
  amount: string;
  recipient: string;
  type: IntentType;
  deadline: number;
  paymentHeader?: string;
  subscriptionId?: string;
  maxExecutions?: number;
}

export interface ExecutionLog {
  intentId: string;
  timestamp: number;
  type: 'info' | 'warning' | 'success' | 'error';
  message: string;
  data?: any;
}
