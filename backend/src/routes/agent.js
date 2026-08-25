import { Router } from 'express';
import { prisma } from '../utils/prisma.js';

const router = Router();

router.get('/activity', async (req, res) => {
  try {
    const runs = await prisma.agentRun.findMany({
      where: { merchantId: req.user.merchantId },
      include: {
        actions: {
          orderBy: { timestamp: 'desc' }
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
