import { Router } from 'express';
import { WidgetController } from '../controllers/widget.controller.js';
import { SubscriptionService } from '../../services/subscription.service.js';

const router = Router();
const subscriptionService = new SubscriptionService();
const widgetController = new WidgetController(subscriptionService);

router.post('/widget/init', widgetController.init);
router.post('/subscriptions', widgetController.createSubscription);
router.get('/subscriptions', widgetController.getSubscriptions);

export { router as widgetRouter, subscriptionService };
