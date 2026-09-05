import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/index.js';

describe('Razorpay Integration Route Tests', () => {
  const JWT_SECRET = process.env.JWT_SECRET || '5MkMDt27P7YdGXoz/4q1ozd44owQ5TzeOzFRe6LStzo=';
  const token = jwt.sign(
    { userId: 'test-user-id', merchantId: '241a1f0a-41c1-4baa-b9f6-10828c846896', role: 'admin' },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  test('POST /api/razorpay/create-payment-link handles link creation gracefully', async () => {
    const res = await request(app)
      .post('/api/razorpay/create-payment-link')
      .set('Authorization', `Bearer ${token}`)
      .send({
        customerId: 'cust-12345',
        interventionId: 'cashback_10',
        amount: 100,
        description: 'Test Cashback Link'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.payment_link).toBeDefined();
    expect(res.body.payment_link.short_url).toContain('http');
  });

  test('POST /api/razorpay/create-payment-link validates missing amount', async () => {
    const res = await request(app)
      .post('/api/razorpay/create-payment-link')
      .set('Authorization', `Bearer ${token}`)
      .send({
        customerId: 'cust-12345'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Valid amount is required');
  });
});
