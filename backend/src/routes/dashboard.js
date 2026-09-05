import { Router } from 'express';
import { prisma } from '../utils/prisma.js';

const router = Router();

router.get('/summary', async (req, res) => {
  const merchantId = req.user.merchantId;

  try {
    const VALID_STATUSES = ['completed', 'captured', 'success'];

    const orders = await prisma.order.findMany({
      where: {
        merchantId,
        status: { in: VALID_STATUSES, mode: 'insensitive' }
      },
      select: {
        amount: true,
        customerId: true
      }
    });

    const gmv = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const totalOrders = orders.length;

    const customerOrderCounts = {};
    orders.forEach(o => {
      customerOrderCounts[o.customerId] = (customerOrderCounts[o.customerId] || 0) + 1;
    });

    const uniqueCustomersWithOrders = Object.keys(customerOrderCounts).length;
    const repeatCustomers = Object.values(customerOrderCounts).filter(cnt => cnt >= 2).length;
    const repeatRate = uniqueCustomersWithOrders > 0 ? repeatCustomers / uniqueCustomersWithOrders : 0;

    const activeExperiments = await prisma.experiment.count({
      where: {
        hypothesis: {
          opportunity: {
            merchantId
          }
        },
        status: 'active'
      }
    });

    const aiFoundOpportunities = await prisma.opportunity.count({
      where: {
        merchantId,
        status: 'active'
      }
    });

    res.json({
      gmv: Math.round(gmv * 100) / 100,
      orders: totalOrders,
      repeatRate: Math.round(repeatRate * 10000) / 10000,
      activeExperiments,
      aiFoundOpportunities
    });
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
