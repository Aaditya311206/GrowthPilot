import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
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
            body: JSON.stringify({ goal: "Increase repeat customer behavior." })
        });
        
        const data = await response.json();
        
        if (response.ok) {
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
                        console.log(`   Target Population Identified: ${step.output.targeted_customers.length} users selected by Phase 4 ML Model.`);
                    } else if (step.state === 'EXPERIMENT') {
                        console.log(`   Created Experiment ID: ${step.output.experiment_id}`);
                        console.log(`   Assigned users into Phase 5 Engine: Control / Treatment`);
                    } else if (step.state === 'ANALYZE') {
                        console.log(`   Absolute Lift: ${(step.output.absolute_lift * 100).toFixed(2)}%`);
                        console.log(`   p-Value: ${step.output.statistics.p_value}`);
                        console.log(`   Significant?: ${step.output.statistics.is_significant}`);
                        console.log(`   Incremental Profit: $${step.output.profitability.net_contribution_profit}`);
                        console.log(`   LLM Explanation: "${step.output.explanation.explanation}"`);
                    } else if (step.state === 'DECIDE') {
                        console.log(`   BUSINESS DECISION: === ${step.output.decision} ===`);
                    } else if (step.state === 'LEARN') {
                        console.log(`   Persisted to ExperimentMemory ID: ${step.output.memory_id}`);
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
