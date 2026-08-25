import { Router } from 'express';
import { prisma } from '../utils/prisma.js';

const router = Router();

router.get('/', async (req, res) => {
  const merchantId = req.user.merchantId;

  try {
    const opportunities = await prisma.opportunity.findMany({
      where: { merchantId },
      orderBy: { expectedImpactScore: 'desc' },
      include: { hypotheses: true }
    });
    res.json(opportunities);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const merchantId = req.user.merchantId;

  try {
    const opportunity = await prisma.opportunity.findFirst({
      where: { id, merchantId },
      include: {
        hypotheses: {
          include: { experiments: true }
        }
      }
    });

    if (!opportunity) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    res.json(opportunity);
  } catch (error) {
    console.error('Error fetching opportunity detail:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
