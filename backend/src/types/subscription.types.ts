export interface RecurringSchedule {
  type: 'monthly';
  startDate: number;
  nextExecution: number;
  executionCount: number;
  maxExecutions?: number;
}

export interface Subscription {
  id: string;
  merchantId: string;
  customerAddress: string;
  recipient: string;
  amount: string;
  token: string;
  paymentHeader: string;
  schedule: RecurringSchedule;
  status: 'active' | 'cancelled';
  createdAt: number;
}

export interface CreateSubscriptionRequest {
  merchantId: string;
  customerAddress: string;
  recipient: string;
  amount: string;
  token: string;
  paymentHeader: string;
  startDate?: number;
  maxExecutions?: number;
}
