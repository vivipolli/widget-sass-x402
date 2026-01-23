import { Request, Response } from 'express';
import { SubscriptionService } from '../../services/subscription.service.js';
import { IntentService } from '../../services/intent.service.js';
import { IntentType } from '../../types/intent.types.js';

export class WidgetController {
  private subscriptionService: SubscriptionService;
  private intentService: IntentService;

  constructor(subscriptionService: SubscriptionService, intentService: IntentService) {
    this.subscriptionService = subscriptionService;
    this.intentService = intentService;
    
    this.init = this.init.bind(this);
    this.createSubscription = this.createSubscription.bind(this);
    this.getSubscriptions = this.getSubscriptions.bind(this);
    this.testExecution = this.testExecution.bind(this);
    this.getTestExecutionStatus = this.getTestExecutionStatus.bind(this);
  }

  async init(req: Request, res: Response): Promise<void> {
    try {
      const { merchantId } = req.body;

      if (!merchantId) {
        res.status(400).json({ error: 'merchantId is required' });
        return;
      }

      const config = {
        merchantId,
        network: 'cronos-testnet',
        supportedTokens: ['DevUSDCe'],
        validatedAt: Date.now(),
      };

      res.json(config);
    } catch (error: any) {
      console.error('Error in widget init:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async createSubscription(req: Request, res: Response): Promise<void> {
    try {
      const {
        merchantId,
        customerAddress,
        recipient,
        amount,
        token,
        paymentHeader,
        maxExecutions,
      } = req.body;

      if (!merchantId || !customerAddress || !recipient || !amount || !token || !paymentHeader) {
        res.status(400).json({ 
          error: 'Missing required fields: merchantId, customerAddress, recipient, amount, token, paymentHeader' 
        });
        return;
      }

      const subscription = this.subscriptionService.createSubscription({
        merchantId,
        customerAddress,
        recipient,
        amount,
        token,
        paymentHeader,
        maxExecutions,
      });

      res.json(subscription);
    } catch (error: any) {
      console.error('Error creating subscription:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getSubscriptions(req: Request, res: Response): Promise<void> {
    try {
      const { customerAddress } = req.query;

      if (customerAddress && typeof customerAddress === 'string') {
        const subscriptions = this.subscriptionService.getSubscriptionsByCustomer(customerAddress);
        res.json(subscriptions);
      } else {
        const subscriptions = this.subscriptionService.getAllSubscriptions();
        res.json(subscriptions);
      }
    } catch (error: any) {
      console.error('Error getting subscriptions:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async testExecution(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const subscription = this.subscriptionService.getSubscription(id);
      if (!subscription) {
        res.status(404).json({ error: 'Subscription not found' });
        return;
      }

      const deadline = Date.now() + (1 * 60 * 1000);

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

      console.log(`🧪 Test execution created for subscription ${id}`);
      console.log(`   Intent ID: ${intent.id}`);
      console.log(`   Deadline: ${new Date(deadline).toISOString()} (1 minute)`);

      res.json({
        intentId: intent.id,
        subscriptionId: id,
        deadline,
        status: intent.status,
      });
    } catch (error: any) {
      console.error('Error creating test execution:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getTestExecutionStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id, intentId } = req.params;

      const subscription = this.subscriptionService.getSubscription(id);
      if (!subscription) {
        res.status(404).json({ error: 'Subscription not found' });
        return;
      }

      const intent = this.intentService.getIntent(intentId);
      if (!intent) {
        res.status(404).json({ error: 'Intent not found' });
        return;
      }

      res.json({
        intentId: intent.id,
        subscriptionId: id,
        status: intent.status,
        txHash: intent.txHash,
        executedAt: intent.executedAt,
        deadline: intent.deadline,
      });
    } catch (error: any) {
      console.error('Error getting test execution status:', error);
      res.status(500).json({ error: error.message });
    }
  }
}
