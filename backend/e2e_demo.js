import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const prisma = new PrismaClient();

async function runDemo() {
    console.log("🚀 Starting Razorpay GrowthPilot E2E Demo...");
    
    // 1. Get the first user and merchant
    const user = await prisma.user.findFirst();
    if (!user) {
        console.error("❌ No user found. Run seeding first.");
        process.exit(1);
    }
    
    // 2. Generate a valid JWT
    const token = jwt.sign(
        { userId: user.id, merchantId: user.merchantId, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    console.log(`✅ Authenticated as ${user.email} (Merchant ID: ${user.merchantId})`);
    
    // 3. Trigger Agent Run via Node API Gateway
    const PORT = process.env.PORT || 3000;
    const url = `http://localhost:${PORT}/api/agent/run`;
    
    console.log(`\n🤖 Triggering GrowthAgent Orchestrator via POST ${url}...`);
    console.log(`Goal: "Increase repeat customer behavior."\n`);
    
    try {
        // We will call the backend API which proxies to FastAPI
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ goal: "Increase repeat customer behavior. budget: 50" })
        });
        
        const data = await response.json();
        
        if (response.ok && data.status !== "failed") {
            console.log("✅ Agent Run Completed Successfully!\n");
            
            // Pretty print the trace
            if (data.trace && Array.isArray(data.trace)) {
                for (const step of data.trace) {
                    console.log(`\n[STATE: ${step.state}]`);
                    
                    if (step.state === 'OBSERVE') {
                        console.log(`   Customers: ${step.output.total_customers}`);
                        console.log(`   Orders: ${step.output.total_orders}`);
                        console.log(`   Revenue: $${step.output.total_revenue}`);
                        console.log(`   Repeat Rate: ${(step.output.repeat_rate * 100).toFixed(2)}%`);
                    } else if (step.state === 'DISCOVER') {
                        console.log(`   Target Segment: ${step.output.target_segment}`);
                        console.log(`   Observed Problem: ${step.output.observed_problem}`);
                    } else if (step.state === 'HYPOTHESIZE') {
                        console.log(`   Proposed Intervention: ${step.output.proposed_intervention}`);
                    } else if (step.state === 'PREDICT') {
                        console.log(`   Predicted Uplift for ${step.output.customers_predicted} sample customers.`);
                    } else if (step.state === 'VALIDATE') {
                        console.log(`   Validated ${step.output.validated_customers} statistical bounds.`);
                    } else if (step.state === 'OPTIMIZE') {
                        console.log(`   Evaluated possible interventions for ${step.output.evaluated_customers} target customers.`);
                    } else if (step.state === 'RECOMMEND') {
                        console.log(`   Global Ranking Applied. Budget constraint enforced: ${step.output.budget}`);
                        console.log(`   Top recommendations filtered: ${step.output.recommendations_count}`);
                    } else if (step.state === 'OUTPUT') {
                        console.log(`   === FINAL RECOMMENDATIONS ===`);
                        console.log(`   Total Expected Incremental Profit: $${step.output.total_profit.toFixed(2)}`);
                    }
                }
            } else {
                console.log("Trace output missing or invalid.", data);
            }
        } else {
            console.error("❌ Agent Run Failed:");
            console.error(data);
        }
    } catch (error) {
        console.error("❌ Demo execution failed:", error.message);
    }
}

runDemo().finally(() => prisma.$disconnect());
