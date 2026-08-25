import { Router } from 'express';
import { prisma } from '../utils/prisma.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const memory = await prisma.experimentMemory.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(memory);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
