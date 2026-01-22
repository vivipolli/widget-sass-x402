import { Intent, IntentStatus } from '../types/intent.types.js';
import { IntentService } from '../services/intent.service.js';
import { ExecutionService } from '../services/execution.service.js';

export class SimpleExecutor {
  private intentService: IntentService;
  private executionService: ExecutionService;
  private isRunning: boolean = false;

  constructor(intentService: IntentService, executionService: ExecutionService) {
    this.intentService = intentService;
    this.executionService = executionService;
  }

  async start(intervalMs: number = 30000): Promise<void> {
    if (this.isRunning) {
      console.log('Simple Executor already running');
      return;
    }

    this.isRunning = true;
    console.log('⚡ Simple Executor started - checking intents every 30s');

    await this.checkIntents();
    setInterval(() => this.checkIntents(), intervalMs);
  }

  stop(): void {
    this.isRunning = false;
    console.log('Simple Executor stopped');
  }

  private async checkIntents(): Promise<void> {
    const intents = this.intentService.getAllIntents();
    const monitoringIntents = intents.filter(
      (intent) => intent.status === IntentStatus.Monitoring
    );

    for (const intent of monitoringIntents) {
      try {
        const now = Date.now();

        if (now > intent.deadline) {
          this.intentService.addLog(intent.id, 'warning', '⏰ Intent expired - deadline passed');
          this.intentService.markIntentExpired(intent.id);
          continue;
        }

        this.intentService.addLog(intent.id, 'info', '✅ Executing intent (within deadline)');
        const txHash = await this.executionService.executeIntent(intent);
        this.intentService.markIntentExecuted(intent.id, txHash);
        this.intentService.addLog(intent.id, 'success', `🎉 Intent executed successfully! TxHash: ${txHash}`);
        
      } catch (error: any) {
        this.intentService.addLog(intent.id, 'error', `❌ Execution failed: ${error.message}`);
        console.error(`Failed to execute intent ${intent.id}:`, error);
      }
    }
  }
}
