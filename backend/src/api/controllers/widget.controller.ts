import { Request, Response } from 'express';
import { SubscriptionService } from '../../services/subscription.service.js';

export class WidgetController {
  private subscriptionService: SubscriptionService;

  constructor(subscriptionService: SubscriptionService) {
    this.subscriptionService = subscriptionService;
    
    this.init = this.init.bind(this);
    this.createSubscription = this.createSubscription.bind(this);
    this.getSubscriptions = this.getSubscriptions.bind(this);
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
}
