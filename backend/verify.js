import { prisma } from './src/utils/prisma.js';

const API_URL = 'http://localhost:3000';

async function runVerification() {
  console.log('--- STARTING PHASE 1 VERIFICATION ---');

  // 1. Test Register
  console.log('\n[1] Testing /auth/register...');
  const registerRes = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@growthpilot.com',
      password: 'password123',
      merchantName: 'Test Merchant'
    })
  });
  const registerData = await registerRes.json();
  if (registerRes.ok && registerData.token) {
    console.log('✅ Register works! Token received.');
  } else if (registerData.error === 'User already exists') {
    console.log('✅ Register works! User already existed from previous test.');
  } else {
    console.log('❌ Register failed:', registerData);
  }

  // 2. Test Login
  console.log('\n[2] Testing /auth/login...');
  const loginRes = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@growthpilot.com',
      password: 'password123'
    })
  });
  const loginData = await loginRes.json();
  if (loginRes.ok && loginData.token) {
    console.log('✅ Login works! JWT Token returned:', loginData.token.substring(0, 20) + '...');
  } else {
    console.log('❌ Login failed:', loginData);
  }

  const token = loginData.token || registerData.token;

  // 3. Test Authenticated GET /experiments
  console.log('\n[3] Testing GET /experiments (Authenticated)...');
  const expRes = await fetch(`${API_URL}/experiments`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const expData = await expRes.json();
  if (expRes.ok && Array.isArray(expData)) {
    console.log(`✅ Authenticated GET experiments works! Returned array of length ${expData.length}.`);
  } else {
    console.log('❌ GET experiments failed:', expData);
  }

  // 4. Verify PostgreSQL contains the created user/merchant
  console.log('\n[4] Verifying PostgreSQL contains the user/merchant...');
  try {
    const userInDb = await prisma.user.findUnique({
      where: { email: 'test@growthpilot.com' },
      include: { merchant: true }
    });
    if (userInDb) {
      console.log(`✅ PostgreSQL verification successful! User ${userInDb.email} exists under merchant ${userInDb.merchant.name}.`);
    } else {
      console.log('❌ PostgreSQL verification failed: User not found in database.');
    }
  } catch (error) {
    console.log('❌ Database query failed. Is PostgreSQL running?', error.message);
  }

  console.log('\n--- VERIFICATION COMPLETE ---');
  process.exit(0);
}

runVerification();
