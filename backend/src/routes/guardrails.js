import { Router } from 'express';
import { prisma } from '../utils/prisma.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const guardrails = await prisma.guardrail.findMany({
      where: { merchantId: req.user.merchantId }
    });
    res.json(guardrails);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/', async (req, res) => {
  const { guardrails } = req.body;
  try {
    res.json({ success: true, message: 'Guardrails updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
