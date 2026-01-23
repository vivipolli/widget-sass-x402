import { Router } from 'express';
import { WidgetController } from '../controllers/widget.controller.js';
import { SubscriptionService } from '../../services/subscription.service.js';
import { intentService } from './intent.routes.js';

const router = Router();
const subscriptionService = new SubscriptionService();
const widgetController = new WidgetController(subscriptionService, intentService);

router.post('/widget/init', widgetController.init);
router.post('/subscriptions', widgetController.createSubscription);
router.get('/subscriptions', widgetController.getSubscriptions);
router.post('/subscriptions/:id/test-execution', widgetController.testExecution);
router.get('/subscriptions/:id/test-execution/:intentId', widgetController.getTestExecutionStatus);

export { router as widgetRouter, subscriptionService };
