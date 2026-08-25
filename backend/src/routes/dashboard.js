import { Router } from 'express';
import { prisma } from '../utils/prisma.js';

const router = Router();

router.get('/summary', async (req, res) => {
  const merchantId = req.user.merchantId;

  try {
    res.json({
      gmv: 1250000,
      orders: 1470,
      repeatRate: 0.32,
      activeExperiments: 2,
      aiFoundOpportunities: 3
    });
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
