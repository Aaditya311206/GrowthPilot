import { Router } from 'express';
import { prisma } from '../utils/prisma.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const merchantId = req.user.merchantId;
    const memory = await prisma.experimentMemory.findMany({
      where: {
        experiment: {
          hypothesis: {
            opportunity: {
              merchantId: merchantId
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(memory);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
