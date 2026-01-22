import { Router } from 'express';
import { IntentController } from '../controllers/intent.controller.js';
import { IntentService } from '../../services/intent.service.js';
import { ExecutionService } from '../../services/execution.service.js';

const router = Router();
const intentService = new IntentService();
const executionService = new ExecutionService();
const intentController = new IntentController(intentService, executionService);

router.post('/intents', intentController.createIntent);
router.get('/intents', intentController.getIntents);
router.get('/intents/:id', intentController.getIntent);
router.get('/intents/:id/status', intentController.getIntentStatus);
router.post('/intents/:id/cancel', intentController.cancelIntent);
router.post('/intents/:id/execute', intentController.executeNow);

export { router as intentRouter, intentService, executionService };
