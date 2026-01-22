import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { intentRouter, intentService, executionService } from './api/routes/intent.routes.js';
import { widgetRouter, subscriptionService } from './api/routes/widget.routes.js';
import { SimpleExecutor } from './schedulers/simple-executor.js';
import { RecurringScheduler } from './schedulers/recurring.scheduler.js';

const app = express();
const port = process.env.PORT || 8787;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://widget-sass-x402.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

app.use('/api', intentRouter);
app.use('/api', widgetRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

const startServer = async () => {
  const simpleExecutor = new SimpleExecutor(intentService, executionService);
  const recurringScheduler = new RecurringScheduler(subscriptionService, intentService);

  console.log('Starting simple executor...');
  await simpleExecutor.start();

  console.log('Starting recurring scheduler...');
  await recurringScheduler.start();

  app.listen(port, () => {
    console.log(`✅ x402 Recurring Payment Backend running on port ${port}`);
    console.log(`   - API: http://localhost:${port}/api`);
    console.log(`   - Widget: http://localhost:${port}/api/widget`);
    console.log(`   - Health: http://localhost:${port}/health`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
