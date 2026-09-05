import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/index.js';
import { prisma } from '../src/utils/prisma.js';

describe('Guardrails Persistence & Scoping Tests', () => {
  const JWT_SECRET = process.env.JWT_SECRET || '5MkMDt27P7YdGXoz/4q1ozd44owQ5TzeOzFRe6LStzo=';
  let merchant;
  let token;

  beforeAll(async () => {
    merchant = await prisma.merchant.upsert({
      where: { id: 'test-merchant-guardrails' },
      update: {},
      create: {
        id: 'test-merchant-guardrails',
        name: 'Guardrails Test Merchant',
        contribution_margin_rate: 0.35
      }
    });

    token = jwt.sign(
      { userId: 'user-guardrails', merchantId: merchant.id, role: 'admin', email: 'guardrails@test.com' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  afterAll(async () => {
    try {
      await prisma.guardrail.deleteMany({ where: { merchantId: 'test-merchant-guardrails' } });
      await prisma.merchant.deleteMany({ where: { id: 'test-merchant-guardrails' } });
    } catch (err) {
      console.warn('Cleanup error:', err);
    }
    await prisma.$disconnect();
  });

  test('PUT /api/guardrails updates and genuinely persists guardrails in DB', async () => {
    const payload = {
      guardrails: [
        { ruleType: 'max_discount_pct', valueJson: { limit: 20 } },
        { ruleType: 'min_margin_pct', valueJson: { limit: 15 } }
      ]
    };

    const putRes = await request(app)
      .put('/api/guardrails')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    expect(putRes.status).toBe(200);
    expect(putRes.body.success).toBe(true);
    expect(putRes.body.data).toHaveLength(2);

    // Direct Database Query to ensure it was genuinely persisted
    const dbRecords = await prisma.guardrail.findMany({
      where: { merchantId: merchant.id }
    });
    expect(dbRecords).toHaveLength(2);
    const ruleTypes = dbRecords.map((r) => r.ruleType);
    expect(ruleTypes).toContain('max_discount_pct');
    expect(ruleTypes).toContain('min_margin_pct');

    // Verify GET /api/guardrails returns the newly persisted guardrails
    const getRes = await request(app)
      .get('/api/guardrails')
      .set('Authorization', `Bearer ${token}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body).toHaveLength(2);
    const discountRule = getRes.body.find((r) => r.ruleType === 'max_discount_pct');
    expect(discountRule.valueJson.limit).toBe(20);
  });

  test('PUT /api/guardrails with key-value map format persists correctly', async () => {
    const mapPayload = {
      guardrails: {
        budget_cap: 5000,
        enable_automatic_stops: true
      }
    };

    const putRes = await request(app)
      .put('/api/guardrails')
      .set('Authorization', `Bearer ${token}`)
      .send(mapPayload);

    expect(putRes.status).toBe(200);
    expect(putRes.body.success).toBe(true);

    const dbRecords = await prisma.guardrail.findMany({
      where: { merchantId: merchant.id }
    });
    expect(dbRecords).toHaveLength(2);
    const budgetRule = dbRecords.find((r) => r.ruleType === 'budget_cap');
    expect(budgetRule.valueJson.value).toBe(5000);
  });
});
