import { Router } from 'express';
import { prisma } from '../utils/prisma.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const experiments = await prisma.experiment.findMany({
      include: { hypothesis: true }
    });
    res.json(experiments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { hypothesisId } = req.body;
  try {
    const experiment = await prisma.experiment.create({
      data: {
        hypothesisId,
        status: 'draft',
        designJson: {},
        guardrailCheckJson: { ok: true }
      }
    });
    res.json(experiment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const experiment = await prisma.experiment.findUnique({
      where: { id: req.params.id },
      include: { hypothesis: true, result: true }
    });
    if (!experiment) return res.status(404).json({ error: 'Not found' });
    res.json(experiment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:id/approve', async (req, res) => {
  try {
    const experiment = await prisma.experiment.update({
      where: { id: req.params.id },
      data: { status: 'approved', approvedAt: new Date() }
    });
    await prisma.auditLog.create({
      data: {
        merchantId: req.user.merchantId,
        actor: req.user.email,
        action: 'APPROVE_EXPERIMENT',
        entity: 'Experiment',
        entityId: experiment.id
      }
    });
    res.json(experiment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:id/reject', async (req, res) => {
  try {
    const experiment = await prisma.experiment.update({
      where: { id: req.params.id },
      data: { status: 'rejected' }
    });
    await prisma.auditLog.create({
      data: {
        merchantId: req.user.merchantId,
        actor: req.user.email,
        action: 'REJECT_EXPERIMENT',
        entity: 'Experiment',
        entityId: experiment.id
      }
    });
    res.json(experiment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id/results', async (req, res) => {
  try {
    const result = await prisma.experimentResult.findUnique({
      where: { experimentId: req.params.id }
    });
    if (!result) return res.status(404).json({ error: 'Result not found' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
