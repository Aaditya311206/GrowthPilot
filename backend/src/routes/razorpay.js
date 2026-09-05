import express, { Router } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { prisma } from '../utils/prisma.js';

const router = Router();

// Instantiate Razorpay instance lazily if keys are available
function getRazorpayInstance() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret || key_id === 'test_key_id') {
    return null;
  }
  return new Razorpay({ key_id, key_secret });
}

/**
 * POST /api/razorpay/create-payment-link
 * Creates an authentic Razorpay Payment Link for a recommended customer intervention.
 */
router.post('/create-payment-link', async (req, res) => {
  const merchantId = req.user.merchantId;
  const { customerId, interventionId, amount, description } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Valid amount is required' });
  }

  const razorpay = getRazorpayInstance();

  // If Razorpay test credentials are not configured in environment, return clear structured fallback
  if (!razorpay) {
    return res.status(200).json({
      status: 'simulated',
      message: 'Razorpay keys not configured in .env (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET). Payment link simulated for test mode.',
      payment_link: {
        id: `plink_sim_${Date.now()}`,
        short_url: `https://rzp.io/i/simulated_${customerId}`,
        amount: Math.round(amount * 100),
        currency: 'INR',
        status: 'created'
      }
    });
  }

  try {
    const linkOptions = {
      amount: Math.round(amount * 100), // in paise
      currency: 'INR',
      accept_partial: false,
      description: description || `GrowthPilot Recommended Intervention (${interventionId})`,
      customer: {
        name: `Customer ${customerId.slice(0, 8)}`,
        email: `customer_${customerId.slice(0, 6)}@example.com`
      },
      notify: {
        sms: false,
        email: true
      },
      reminder_enable: true,
      notes: {
        merchantId,
        customerId,
        interventionId,
        source: 'GrowthPilot Causal Engine'
      }
    };

    const paymentLink = await razorpay.paymentLink.create(linkOptions);

    // Record audit log
    await prisma.auditLog.create({
      data: {
        merchantId,
        action: 'RAZORPAY_PAYMENT_LINK_CREATED',
        details: {
          paymentLinkId: paymentLink.id,
          customerId,
          interventionId,
          amount,
          shortUrl: paymentLink.short_url
        }
      }
    });

    res.json({
      status: 'live_test_mode',
      payment_link: paymentLink
    });
  } catch (error) {
    console.error('Razorpay Payment Link Error:', error);
    res.status(500).json({
      error: 'Razorpay API call failed',
      details: error.message || error
    });
  }
});

/**
 * POST /api/razorpay/webhook
 * Receives authentic Razorpay Webhook events (e.g., payment_link.paid, payment.captured)
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'growthpilot-webhook-secret';
  const signature = req.headers['x-razorpay-signature'];

  if (!signature) {
    return res.status(400).json({ error: 'Missing Razorpay signature header' });
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(req.body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const event = JSON.parse(req.body.toString());
    const eventType = event.event;
    const payload = event.payload;

    console.log(`Razorpay Webhook Received: ${eventType}`);

    if (eventType === 'payment_link.paid' || eventType === 'payment.captured') {
      const paymentEntity = payload.payment?.entity || payload.payment_link?.entity;
      const notes = paymentEntity?.notes || {};

      if (notes.merchantId && notes.customerId) {
        // Record completed order in DB
        await prisma.order.create({
          data: {
            merchantId: notes.merchantId,
            customerId: notes.customerId,
            amount: (paymentEntity.amount || 0) / 100,
            status: 'Completed'
          }
        });

        // Add audit log
        await prisma.auditLog.create({
          data: {
            merchantId: notes.merchantId,
            action: 'RAZORPAY_WEBHOOK_PAYMENT_CAPTURED',
            details: {
              paymentId: paymentEntity.id,
              amount: (paymentEntity.amount || 0) / 100,
              customerId: notes.customerId
            }
          }
        });
      }
    }

    res.json({ status: 'ok', received: true });
  } catch (error) {
    console.error('Razorpay Webhook Error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
