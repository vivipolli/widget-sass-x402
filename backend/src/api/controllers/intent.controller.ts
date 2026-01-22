import { Request, Response } from 'express';
import { IntentService } from '../../services/intent.service.js';
import { ExecutionService } from '../../services/execution.service.js';
import { IntentStatus } from '../../types/intent.types.js';

export class IntentController {
  private intentService: IntentService;
  private executionService: ExecutionService;

  constructor(intentService: IntentService, executionService: ExecutionService) {
    this.intentService = intentService;
    this.executionService = executionService;
  }

  createIntent = async (req: Request, res: Response) => {
    try {
      const { 
        token, 
        amount, 
        recipient, 
        type, 
        deadline, 
        paymentHeader
      } = req.body;
      const owner = req.body.owner || req.query.owner as string;

      if (!token || !amount || !recipient || !type || !deadline || !owner) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const intent = await this.intentService.createIntent(
        {
          token,
          amount,
          recipient,
          type,
          deadline,
          paymentHeader,
        },
        owner
      );

      return res.status(201).json(intent);
    } catch (error: any) {
      console.error('Error creating intent:', error);
      return res.status(500).json({ error: error.message });
    }
  };

  getIntents = async (req: Request, res: Response) => {
    try {
      const owner = req.query.owner as string;
      
      if (owner) {
        const intents = this.intentService.getUserIntents(owner);
        return res.json(intents);
      }

      const intents = this.intentService.getAllIntents();
      return res.json(intents);
    } catch (error: any) {
      console.error('Error getting intents:', error);
      return res.status(500).json({ error: error.message });
    }
  };

  getIntent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const intent = this.intentService.getIntent(id);

      if (!intent) {
        return res.status(404).json({ error: 'Intent not found' });
      }

      return res.json(intent);
    } catch (error: any) {
      console.error('Error getting intent:', error);
      return res.status(500).json({ error: error.message });
    }
  };

  getIntentStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const intent = this.intentService.getIntent(id);

      if (!intent) {
        return res.status(404).json({ error: 'Intent not found' });
      }

      const logs = this.intentService.getLogs(id);

      return res.json({
        intent,
        logs,
      });
    } catch (error: any) {
      console.error('Error getting intent status:', error);
      return res.status(500).json({ error: error.message });
    }
  };

  cancelIntent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.intentService.cancelIntent(id);
      return res.json({ success: true });
    } catch (error: any) {
      console.error('Error cancelling intent:', error);
      return res.status(500).json({ error: error.message });
    }
  };

  executeNow = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
      const intent = this.intentService.getIntent(id);

      if (!intent) {
        return res.status(404).json({ error: 'Intent not found' });
      }

      if (intent.status !== IntentStatus.Monitoring) {
        return res.status(400).json({ error: 'Intent is not in Monitoring state' });
      }

      this.intentService.addLog(id, 'info', 'Manual execution requested by user');
      this.intentService.updateIntentStatus(id, IntentStatus.Executing);
      
      const txHash = await this.executionService.executeIntent(intent);
      
      this.intentService.markIntentExecuted(id, txHash);

      return res.json({ success: true, message: 'Intent execution started', txHash });
    } catch (error: any) {
      console.error('Error executing intent:', error);
      this.intentService.updateIntentStatus(id, IntentStatus.Failed);
      this.intentService.addLog(id, 'error', `Manual execution failed: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
  };

}
