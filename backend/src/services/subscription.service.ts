import { Subscription, CreateSubscriptionRequest, RecurringSchedule } from '../types/subscription.types.js';
import crypto from 'crypto';

export class SubscriptionService {
  private subscriptions: Map<string, Subscription> = new Map();

  createSubscription(request: CreateSubscriptionRequest): Subscription {
    const subscriptionId = crypto.randomUUID();
    
    const startDate = request.startDate || Date.now();
    const nextExecution = this.calculateNextMonthlyExecution(startDate);
    
    const schedule: RecurringSchedule = {
      type: 'monthly',
      startDate,
      nextExecution,
      executionCount: 0,
      maxExecutions: request.maxExecutions,
    };

    const subscription: Subscription = {
      id: subscriptionId,
      merchantId: request.merchantId,
      customerAddress: request.customerAddress,
      recipient: request.recipient,
      amount: request.amount,
      token: request.token,
      paymentHeader: request.paymentHeader,
      schedule,
      status: 'active',
      createdAt: Date.now(),
    };

    this.subscriptions.set(subscriptionId, subscription);
    
    console.log(`✅ Subscription created: ${subscriptionId}`);
    console.log(`   Customer: ${request.customerAddress}`);
    console.log(`   Amount: ${request.amount}`);
    console.log(`   Next execution: ${new Date(nextExecution).toISOString()}`);
    
    return subscription;
  }

  getSubscription(subscriptionId: string): Subscription | undefined {
    return this.subscriptions.get(subscriptionId);
  }

  getAllSubscriptions(): Subscription[] {
    return Array.from(this.subscriptions.values());
  }

  getActiveSubscriptions(): Subscription[] {
    return Array.from(this.subscriptions.values()).filter(
      sub => sub.status === 'active'
    );
  }

  getSubscriptionsByCustomer(customerAddress: string): Subscription[] {
    return Array.from(this.subscriptions.values()).filter(
      sub => sub.customerAddress.toLowerCase() === customerAddress.toLowerCase()
    );
  }

  cancelSubscription(subscriptionId: string): void {
    const subscription = this.subscriptions.get(subscriptionId);
    if (subscription) {
      subscription.status = 'cancelled';
      console.log(`❌ Subscription cancelled: ${subscriptionId}`);
    }
  }

  updateNextExecution(subscriptionId: string): void {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription) return;

    subscription.schedule.executionCount++;
    subscription.schedule.nextExecution = this.calculateNextMonthlyExecution(
      subscription.schedule.nextExecution
    );

    if (
      subscription.schedule.maxExecutions &&
      subscription.schedule.executionCount >= subscription.schedule.maxExecutions
    ) {
      subscription.status = 'cancelled';
      console.log(`✅ Subscription completed all executions: ${subscriptionId}`);
    } else {
      console.log(`📅 Next execution scheduled: ${new Date(subscription.schedule.nextExecution).toISOString()}`);
    }
  }

  private calculateNextMonthlyExecution(fromDate: number): number {
    const date = new Date(fromDate);
    date.setMonth(date.getMonth() + 1);
    return date.getTime();
  }
}
