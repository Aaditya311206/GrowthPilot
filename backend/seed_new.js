import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function parseCSV(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.trim().split('\n');
    const headers = lines[0].trim().split(',');
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const currentline = lines[i].trim().split(',');
        if (currentline.length !== headers.length) continue;
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        data.push(obj);
    }
    return data;
}

async function main() {
    console.log("Starting Database Seed for test123@gmail.com...");

    const user = await prisma.user.findUnique({ where: { email: 'test123@gmail.com' } });
    if (!user) {
        console.error("User not found!");
        process.exit(1);
    }

    const merchantId = user.merchantId;
    console.log(`Using Merchant ID: ${merchantId}`);
    
    // Suffix to make IDs unique across merchants
    const suffix = "-user2";

    const dataDir = path.resolve('../ai-engine/data');
    
    // 2. Parse Customers
    const rawCustomers = parseCSV(path.join(dataDir, 'customers.csv'));
    const customersToSeed = rawCustomers.slice(0, 5000);
    const customerIds = new Set(customersToSeed.map(c => c.customer_id));

    const customerData = customersToSeed.map(c => ({
        id: c.customer_id + suffix,
        merchantId: merchantId,
        segment: c.segment,
        createdAt: new Date(c.signup_date)
    }));

    await prisma.customer.createMany({
        data: customerData,
        skipDuplicates: true
    });

    // 3. Parse Orders
    const rawOrders = parseCSV(path.join(dataDir, 'orders.csv'));
    const validOrders = rawOrders.filter(o => customerIds.has(o.customer_id));
    const orderIds = new Set(validOrders.map(o => o.order_id));

    const orderData = validOrders.map(o => ({
        id: o.order_id + suffix,
        customerId: o.customer_id + suffix,
        merchantId: merchantId,
        amount: parseFloat(o.amount),
        status: o.status,
        createdAt: new Date(o.created_at)
    }));

    const chunkSize = 5000;
    for (let i = 0; i < orderData.length; i += chunkSize) {
        await prisma.order.createMany({
            data: orderData.slice(i, i + chunkSize),
            skipDuplicates: true
        });
    }

    // 4. Parse Payments
    const rawPayments = parseCSV(path.join(dataDir, 'payments.csv'));
    const validPayments = rawPayments.filter(p => orderIds.has(p.order_id));

    const paymentData = validPayments.map(p => ({
        id: p.payment_id + suffix,
        orderId: p.order_id + suffix,
        method: p.method,
        status: p.status,
        failureReason: p.failure_reason === 'None' ? null : p.failure_reason
    }));

    for (let i = 0; i < paymentData.length; i += chunkSize) {
        await prisma.payment.createMany({
            data: paymentData.slice(i, i + chunkSize),
            skipDuplicates: true
        });
    }

    console.log("Seeding complete for new user.");
}

main().finally(async () => await prisma.$disconnect());
