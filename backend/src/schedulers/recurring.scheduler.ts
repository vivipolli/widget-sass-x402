import { SubscriptionService } from '../services/subscription.service.js';
import { IntentService } from '../services/intent.service.js';
import { IntentType, IntentStatus } from '../types/intent.types.js';

export class RecurringScheduler {
  private subscriptionService: SubscriptionService;
  private intentService: IntentService;
  private isRunning: boolean = false;
  private intervalId?: NodeJS.Timeout;

  constructor(
    subscriptionService: SubscriptionService,
    intentService: IntentService
  ) {
    this.subscriptionService = subscriptionService;
    this.intentService = intentService;
  }

  start(intervalMs: number = 60000): void {
    if (this.isRunning) {
      console.log('📅 Recurring scheduler already running');
      return;
    }

    this.isRunning = true;
    console.log('📅 Starting Recurring Scheduler (checking every minute)...');
    
    this.checkSubscriptions();
    this.intervalId = setInterval(() => this.checkSubscriptions(), intervalMs);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
    this.isRunning = false;
    console.log('📅 Recurring Scheduler stopped');
  }

  private async checkSubscriptions(): Promise<void> {
    const activeSubscriptions = this.subscriptionService.getActiveSubscriptions();
    const now = Date.now();

    for (const subscription of activeSubscriptions) {
      if (subscription.schedule.nextExecution <= now) {
        try {
          await this.executeSubscription(subscription.id);
        } catch (error: any) {
          console.error(`Error executing subscription ${subscription.id}:`, error);
        }
      }
    }
  }

  private async executeSubscription(subscriptionId: string): Promise<void> {
    const subscription = this.subscriptionService.getSubscription(subscriptionId);
    if (!subscription) {
      console.error(`Subscription ${subscriptionId} not found`);
      return;
    }

    console.log(`🔄 Creating recurring intent for subscription ${subscriptionId}`);
    console.log(`   Execution #${subscription.schedule.executionCount + 1}`);

    const deadline = Date.now() + (48 * 60 * 60 * 1000);

    const intent = await this.intentService.createIntent(
      {
        token: subscription.token,
        amount: subscription.amount,
        recipient: subscription.recipient,
        type: IntentType.Payment,
        deadline,
        paymentHeader: subscription.paymentHeader,
      },
      subscription.customerAddress
    );

    (intent as any).subscriptionId = subscriptionId;
    (intent as any).isRecurring = true;

    this.intentService.addLog(
      intent.id,
      'info',
      `🔄 Recurring payment #${subscription.schedule.executionCount + 1} for subscription ${subscriptionId}`
    );

    this.subscriptionService.updateNextExecution(subscriptionId);

    console.log(`✅ Recurring intent created: ${intent.id}`);
    console.log(`   Status: ${intent.status}`);
  }
}
