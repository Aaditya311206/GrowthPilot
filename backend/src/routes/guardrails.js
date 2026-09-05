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
  const merchantId = req.user.merchantId;

  try {
    const items = [];
    if (Array.isArray(guardrails)) {
      for (const g of guardrails) {
        items.push({
          merchantId,
          ruleType: g.ruleType || 'custom',
          valueJson: g.valueJson ?? g.value ?? {}
        });
      }
    } else if (typeof guardrails === 'object' && guardrails !== null) {
      for (const [ruleType, val] of Object.entries(guardrails)) {
        items.push({
          merchantId,
          ruleType,
          valueJson: typeof val === 'object' && val !== null ? val : { value: val }
        });
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.guardrail.deleteMany({ where: { merchantId } });
      if (items.length > 0) {
        await tx.guardrail.createMany({ data: items });
      }
    });

    const updated = await prisma.guardrail.findMany({ where: { merchantId } });
    res.json({ success: true, message: 'Guardrails updated', data: updated });
  } catch (error) {
    console.error('Error updating guardrails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
