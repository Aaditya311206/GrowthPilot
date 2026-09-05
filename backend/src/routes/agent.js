import { Router } from 'express';
import { prisma } from '../utils/prisma.js';

const router = Router();

router.post('/run', async (req, res) => {
  const { goal } = req.body;
  if (!goal) return res.status(400).json({ error: 'Goal is required' });

  try {
    const response = await fetch('http://127.0.0.1:8000/agent/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Secret': process.env.AI_ENGINE_SECRET || ''
      },
      body: JSON.stringify({
        merchant_id: req.user.merchantId,
        goal: goal
      })
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to contact AI Engine' });
  }
});

router.get('/activity', async (req, res) => {
  try {
    const runs = await prisma.agentRun.findMany({
      where: { merchantId: req.user.merchantId },
      include: {
        actions: {
          orderBy: { timestamp: 'asc' }
        }
      },
      orderBy: { startedAt: 'desc' },
      take: 10
    });
    res.json(runs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
