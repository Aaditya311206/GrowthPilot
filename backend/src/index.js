import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import opportunitiesRoutes from './routes/opportunities.js';
import experimentsRoutes from './routes/experiments.js';
import memoryRoutes from './routes/memory.js';
import guardrailsRoutes from './routes/guardrails.js';
import agentRoutes from './routes/agent.js';
import razorpayRoutes from './routes/razorpay.js';
import { authenticate } from './middleware/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend' });
});

// Protected routes
app.use('/api/dashboard', authenticate, dashboardRoutes);
app.use('/api/opportunities', authenticate, opportunitiesRoutes);
app.use('/api/experiments', authenticate, experimentsRoutes);
app.use('/api/memory', authenticate, memoryRoutes);
app.use('/api/guardrails', authenticate, guardrailsRoutes);
app.use('/api/agent', authenticate, agentRoutes);
app.use('/api/razorpay', authenticate, razorpayRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
  });
}

export default app;

