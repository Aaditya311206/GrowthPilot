import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-demo-only';

router.post('/register', async (req, res) => {
  const { email, password, merchantName } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const merchant = await prisma.merchant.create({
      data: {
        name: merchantName || 'Default Merchant',
        contribution_margin_rate: 0.2,
      }
    });

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: 'admin',
        merchantId: merchant.id
      }
    });

    const token = jwt.sign({ userId: user.id, merchantId: merchant.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, email: user.email, merchantId: merchant.id } });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, merchantId: user.merchantId, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, email: user.email, merchantId: user.merchantId, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
