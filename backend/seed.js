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
    console.log("🚀 Starting Database Seed...");

    // 1. Get a Merchant
    const merchant = await prisma.merchant.findFirst();
    if (!merchant) {
        console.error("❌ No Merchant found in the database. Please run Phase 1 Register endpoint first.");
        process.exit(1);
    }
    console.log(`✅ Using Merchant: ${merchant.name} (ID: ${merchant.id})`);

    const dataDir = path.resolve('../ai-engine/data');
    
    // 2. Parse Customers
    console.log("📖 Reading customers.csv...");
    const rawCustomers = parseCSV(path.join(dataDir, 'customers.csv'));
    
    // Limit to 5000 customers for seeding speed and requirement
    const customersToSeed = rawCustomers.slice(0, 5000);
    const customerIds = new Set(customersToSeed.map(c => c.customer_id));

    const customerData = customersToSeed.map(c => ({
        id: c.customer_id,
        merchantId: merchant.id,
        segment: c.segment,
        createdAt: new Date(c.signup_date)
    }));

    console.log(`🌱 Seeding ${customerData.length} Customers...`);
    await prisma.customer.createMany({
        data: customerData,
        skipDuplicates: true
    });

    // 3. Parse Orders
    console.log("📖 Reading orders.csv...");
    const rawOrders = parseCSV(path.join(dataDir, 'orders.csv'));
    
    // Only include orders for the seeded customers
    const validOrders = rawOrders.filter(o => customerIds.has(o.customer_id));
    const orderIds = new Set(validOrders.map(o => o.order_id));

    const orderData = validOrders.map(o => ({
        id: o.order_id,
        customerId: o.customer_id,
        merchantId: merchant.id,
        amount: parseFloat(o.amount),
        status: o.status,
        createdAt: new Date(o.created_at)
    }));

    console.log(`🌱 Seeding ${orderData.length} Orders...`);
    // Seed in chunks to avoid query size limits
    const chunkSize = 5000;
    for (let i = 0; i < orderData.length; i += chunkSize) {
        await prisma.order.createMany({
            data: orderData.slice(i, i + chunkSize),
            skipDuplicates: true
        });
    }

    // 4. Parse Payments
    console.log("📖 Reading payments.csv...");
    const rawPayments = parseCSV(path.join(dataDir, 'payments.csv'));
    
    // Only include payments for the seeded orders
    const validPayments = rawPayments.filter(p => orderIds.has(p.order_id));

    const paymentData = validPayments.map(p => ({
        id: p.payment_id,
        orderId: p.order_id,
        method: p.method,
        status: p.status,
        failureReason: p.failure_reason === 'None' ? null : p.failure_reason
    }));

    console.log(`🌱 Seeding ${paymentData.length} Payments...`);
    for (let i = 0; i < paymentData.length; i += chunkSize) {
        await prisma.payment.createMany({
            data: paymentData.slice(i, i + chunkSize),
            skipDuplicates: true
        });
    }

    // 5. Verifications & Realism Checks
    console.log("\n--- 🔍 VERIFICATION AND REALISM CHECKS ---");
    
    const customerCount = await prisma.customer.count();
    const orderCount = await prisma.order.count();
    const paymentCount = await prisma.payment.count();

    console.log(`📊 Total Customers: ${customerCount} (Expected >= 5000)`);
    console.log(`📊 Total Orders: ${orderCount}`);
    console.log(`📊 Total Payments: ${paymentCount}`);

    if (customerCount >= 5000) {
        console.log("✅ Customer count check passed.");
    } else {
        console.log("❌ Customer count check failed.");
    }

    // Payment method distribution
    const paymentDist = await prisma.payment.groupBy({
        by: ['method'],
        _count: { method: true }
    });
    console.log("\n💳 Payment Method Distribution:");
    paymentDist.forEach(p => console.log(`  - ${p.method}: ${p._count.method}`));

    // Success/Failure distribution
    const statusDist = await prisma.payment.groupBy({
        by: ['status'],
        _count: { status: true }
    });
    console.log("\n📈 Payment Status Distribution:");
    statusDist.forEach(p => console.log(`  - ${p.status}: ${p._count.status}`));

    // Customer segment distribution
    const segmentDist = await prisma.customer.groupBy({
        by: ['segment'],
        _count: { segment: true }
    });
    console.log("\n👥 Customer Segment Distribution:");
    segmentDist.forEach(s => console.log(`  - ${s.segment}: ${s._count.segment}`));
    
    console.log("\n✅ Database Seeding & Verification Completed Successfully!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
