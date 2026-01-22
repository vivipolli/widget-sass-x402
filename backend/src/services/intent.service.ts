import { Intent, IntentStatus, CreateIntentRequest, ExecutionLog } from '../types/intent.types.js';
import { ContractService } from './contract.service.js';
import crypto from 'crypto';

export class IntentService {
  private intents: Map<string, Intent> = new Map();
  private logs: Map<string, ExecutionLog[]> = new Map();
  private contractService: ContractService;

  constructor() {
    this.contractService = new ContractService();
  }

  async createIntent(request: CreateIntentRequest, owner: string): Promise<Intent> {
    const intentId = crypto.randomUUID();
    
    const intent: Intent = {
      id: intentId,
      owner,
      token: request.token,
      amount: request.amount,
      recipient: request.recipient,
      type: request.type,
      status: IntentStatus.Pending,
      createdAt: Date.now(),
      deadline: request.deadline,
      paymentHeader: request.paymentHeader,
      subscriptionId: request.subscriptionId,
      executionCount: 0,
      maxExecutions: request.maxExecutions,
    };

    if (intent.paymentHeader) {
      this.addLog(intentId, 'info', '🔐 Intent created with x402 payment header (decentralized)');
    } else {
      this.addLog(intentId, 'warning', '⚠️ Intent created without payment header (centralized fallback)');
    }

    try {
      const onChainId = await this.contractService.registerIntent(intent);
      intent.onChainId = onChainId;
      intent.status = IntentStatus.Monitoring;
      
      this.intents.set(intentId, intent);
      this.addLog(intentId, 'success', 'Intent registered on-chain', { onChainId });
      
      return intent;
    } catch (error: any) {
      this.addLog(intentId, 'error', 'Failed to register intent on-chain', { error: error.message });
      throw error;
    }
  }

  async registerIntent(intent: Intent): Promise<number> {
    return await this.contractService.registerIntent(intent);
  }

  getIntent(intentId: string): Intent | undefined {
    return this.intents.get(intentId);
  }

  getAllIntents(): Intent[] {
    return Array.from(this.intents.values());
  }

  getUserIntents(owner: string): Intent[] {
    return Array.from(this.intents.values()).filter(
      (intent) => intent.owner.toLowerCase() === owner.toLowerCase()
    );
  }

  updateIntentStatus(intentId: string, status: IntentStatus): void {
    const intent = this.intents.get(intentId);
    if (intent) {
      intent.status = status;
      this.intents.set(intentId, intent);
    }
  }

  markIntentExecuted(intentId: string, txHash: string): void {
    const intent = this.intents.get(intentId);
    if (intent) {
      intent.status = IntentStatus.Executed;
      intent.executedAt = Date.now();
      intent.txHash = txHash;
      this.intents.set(intentId, intent);
      this.addLog(intentId, 'success', 'Intent executed successfully', { txHash });
    }
  }

  markIntentFailed(intentId: string, reason: string): void {
    const intent = this.intents.get(intentId);
    if (intent) {
      intent.status = IntentStatus.Failed;
      this.intents.set(intentId, intent);
      this.addLog(intentId, 'error', `Intent execution failed: ${reason}`);
    }
  }

  markIntentExpired(intentId: string): void {
    const intent = this.intents.get(intentId);
    if (intent) {
      intent.status = IntentStatus.Expired;
      this.intents.set(intentId, intent);
      this.addLog(intentId, 'warning', 'Intent expired - deadline passed');
    }
  }

  addLog(intentId: string, type: ExecutionLog['type'], message: string, data?: any): void {
    const log: ExecutionLog = {
      intentId,
      timestamp: Date.now(),
      type,
      message,
      data,
    };

    const logs = this.logs.get(intentId) || [];
    logs.push(log);
    this.logs.set(intentId, logs);
  }

  getLogs(intentId: string): ExecutionLog[] {
    return this.logs.get(intentId) || [];
  }

  async cancelIntent(intentId: string): Promise<void> {
    const intent = this.intents.get(intentId);
    if (!intent) {
      throw new Error('Intent not found');
    }

    if (intent.status !== IntentStatus.Pending && intent.status !== IntentStatus.Monitoring) {
      throw new Error('Intent cannot be cancelled');
    }

    if (intent.onChainId) {
      await this.contractService.cancelIntent(intent.onChainId);
    }

    intent.status = IntentStatus.Cancelled;
    this.intents.set(intentId, intent);
    this.addLog(intentId, 'info', 'Intent cancelled by user');
  }

  getRecurringIntents(): Intent[] {
    return Array.from(this.intents.values()).filter(
      (intent) => intent.subscriptionId !== undefined && 
      (intent.maxExecutions === undefined || (intent.executionCount || 0) < intent.maxExecutions)
    );
  }

  updateRecurringIntent(intentId: string, nextExecution: number, executionCount: number): void {
    const intent = this.intents.get(intentId);
    if (intent && intent.subscriptionId) {
      intent.executionCount = executionCount;
      this.intents.set(intentId, intent);
    }
  }
}
