import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/index.js';
import { prisma } from '../src/utils/prisma.js';

describe('Multi-Tenant Isolation Tests', () => {
  const JWT_SECRET = process.env.JWT_SECRET || '5MkMDt27P7YdGXoz/4q1ozd44owQ5TzeOzFRe6LStzo=';
  let merchantA, merchantB;
  let tokenA, tokenB;
  let opportunityB, hypothesisB, experimentB, memoryB;

  beforeAll(async () => {
    // 1. Create or get two distinct merchants
    merchantA = await prisma.merchant.upsert({
      where: { id: 'test-merchant-iso-a' },
      update: {},
      create: {
        id: 'test-merchant-iso-a',
        name: 'Isolation Merchant A',
        contribution_margin_rate: 0.35
      }
    });

    merchantB = await prisma.merchant.upsert({
      where: { id: 'test-merchant-iso-b' },
      update: {},
      create: {
        id: 'test-merchant-iso-b',
        name: 'Isolation Merchant B',
        contribution_margin_rate: 0.40
      }
    });

    tokenA = jwt.sign(
      { userId: 'user-iso-a', merchantId: merchantA.id, role: 'admin', email: 'merchantA@test.com' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    tokenB = jwt.sign(
      { userId: 'user-iso-b', merchantId: merchantB.id, role: 'admin', email: 'merchantB@test.com' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 2. Create Opportunity, Hypothesis, Experiment, Memory for Merchant B
    opportunityB = await prisma.opportunity.create({
      data: {
        merchantId: merchantB.id,
        type: 'repeat_purchase_drop',
        evidenceJson: { rate: 0.15, segment: 'Student' },
        expectedImpactScore: 85.0,
        status: 'active'
      }
    });

    hypothesisB = await prisma.hypothesis.create({
      data: {
        opportunityId: opportunityB.id,
        text: 'Offer 10% Cashback to increase repeat rate for students',
        evidenceJson: { historical_conversion: 0.15 }
      }
    });

    experimentB = await prisma.experiment.create({
      data: {
        hypothesisId: hypothesisB.id,
        status: 'draft',
        designJson: { sample: 100 },
        guardrailCheckJson: { ok: true }
      }
    });

    memoryB = await prisma.experimentMemory.create({
      data: {
        experimentId: experimentB.id,
        segment: 'Student',
        lever: '10% Cashback',
        outcomeLabel: 'success',
        incrementalProfit: 500.0
      }
    });
  });

  afterAll(async () => {
    try {
      await prisma.auditLog.deleteMany({
        where: { merchantId: { in: ['test-merchant-iso-a', 'test-merchant-iso-b'] } }
      });
      if (memoryB) await prisma.experimentMemory.deleteMany({ where: { experimentId: experimentB.id } });
      if (experimentB) await prisma.experiment.deleteMany({ where: { id: experimentB.id } });
      if (hypothesisB) await prisma.hypothesis.deleteMany({ where: { id: hypothesisB.id } });
      await prisma.opportunity.deleteMany({
        where: { merchantId: { in: ['test-merchant-iso-a', 'test-merchant-iso-b'] } }
      });
      await prisma.merchant.deleteMany({
        where: { id: { in: ['test-merchant-iso-a', 'test-merchant-iso-b'] } }
      });
    } catch (err) {
      console.warn('Cleanup error:', err);
    }
    await prisma.$disconnect();
  });

  test('Merchant A cannot see Merchant B experiments in list GET /api/experiments', async () => {
    const res = await request(app)
      .get('/api/experiments')
      .set('Authorization', `Bearer ${tokenA}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.find((e) => e.id === experimentB.id);
    expect(found).toBeUndefined();
  });

  test('Merchant A cannot access Merchant B experiment by ID GET /api/experiments/:id', async () => {
    const res = await request(app)
      .get(`/api/experiments/${experimentB.id}`)
      .set('Authorization', `Bearer ${tokenA}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/unauthorized|not found/i);
  });

  test('Merchant A cannot approve Merchant B experiment PATCH /api/experiments/:id/approve', async () => {
    const res = await request(app)
      .patch(`/api/experiments/${experimentB.id}/approve`)
      .set('Authorization', `Bearer ${tokenA}`);

    expect(res.status).toBe(404);
  });

  test('Merchant A cannot reject Merchant B experiment PATCH /api/experiments/:id/reject', async () => {
    const res = await request(app)
      .patch(`/api/experiments/${experimentB.id}/reject`)
      .set('Authorization', `Bearer ${tokenA}`);

    expect(res.status).toBe(404);
  });

  test('Merchant A cannot create experiment on Merchant B hypothesis POST /api/experiments', async () => {
    const res = await request(app)
      .post('/api/experiments')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ hypothesisId: hypothesisB.id });

    expect(res.status).toBe(403);
    expect(res.body.error).toMatch(/access denied/i);
  });

  test('Merchant A cannot see Merchant B experiment memory GET /api/memory', async () => {
    const res = await request(app)
      .get('/api/memory')
      .set('Authorization', `Bearer ${tokenA}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.find((m) => m.id === memoryB.id);
    expect(found).toBeUndefined();
  });

  test('Merchant B CAN access its own experiment GET /api/experiments/:id', async () => {
    const res = await request(app)
      .get(`/api/experiments/${experimentB.id}`)
      .set('Authorization', `Bearer ${tokenB}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(experimentB.id);
  });
});
