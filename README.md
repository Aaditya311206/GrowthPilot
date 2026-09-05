# GrowthPilot

GrowthPilot is an AI-powered, deterministic decision engine that identifies changing customer behaviors and mathematically optimizes interventions to maximize incremental contribution profit.

---

## 1. Problem Statement

Modern e-commerce and SaaS platforms often struggle with changing customer behaviors (like churn or decreased purchase frequency). The primary challenge is not just identifying *who* is changing behavior, but understanding *who will respond positively* to an intervention. Traditional predictive modeling simply predicts behavior (e.g., probability of churn), which often leads to wasting marketing budget on "sure things" or "lost causes." GrowthPilot addresses this by shifting focus to **incremental impact**, optimizing interventions mathematically based on expected business value rather than raw prediction scores.

---

## 2. Solution

GrowthPilot addresses the problem by combining machine learning uplift models, rigorous statistical bounds, and a deterministic AI state machine. The complete pipeline is orchestrated as follows:

`	ext
Customer Data
↓
Feature Extraction
↓
ML / Uplift Prediction
↓
Statistical Validation
↓
Decision Agent
↓
Intervention Optimization
↓
Recommendation
`

The system automatically extracts behavioral features, predicts customer-specific uplift (causal impact), validates confidence intervals, and recommends budget-aware interventions that maximize net profit.

---

## 3. Key Features

- **Customer Behavioral Feature Extraction**: Real-time aggregation of Recency, Frequency, and Monetary (RFM) indicators.
- **Uplift Prediction**: Scikit-learn based machine learning models isolating causal treatment effects.
- **Statistical Validation**: Rigorous bound generation to prevent mathematically unsafe decision-making.
- **Deterministic AI Decision Agent**: State machine orchestrator driving the pipeline efficiently.
- **Intervention Optimization**: Profit-based assignment evaluating multiple treatments against actual costs.
- **Expected Incremental Profit Calculation**: Translates statistical lift directly to business ROI.
- **Budget-aware Targeting**: Global ranking to apply interventions only within the merchant's specified constraints.
- **REST APIs**: Node.js API Gateway enforcing multi-tenant security and JWT authentication.
- **PostgreSQL/Neon Integration**: Serverless database serving as the absolute single source of truth.

---

## 4. Architecture

`mermaid
flowchart TD
    A[Customer Data] -->|RFM Features| B[Feature Extraction]
    B --> C[ML / Uplift Model]
    C -->|Probabilistic Lift| D[Statistical Validation]
    D -->|Confidence Bounds| E[Decision Agent]
    E -->|State Orchestration| F[Optimization]
    F -->|Profit Ranking| G[Recommendation]
    G --> H[API / Frontend]
    
    db[(Neon PostgreSQL)] -.-> A
`

- **Neon PostgreSQL**: Single source of truth for customer and order data.
- **Node.js (API Gateway)**: Manages authentication, multi-tenant boundaries, and routing.
- **FastAPI (AI Engine)**: Powers all heavy computational logic (Feature Extraction, ML, Statistics, Optimization).
- **Decision Agent**: Acts as the central orchestrator controlling data flow and enforcing logical validations.

---

## 5. Project Structure

`	ext
GrowthPilot/
├── ai-engine/      # Python FastAPI (ML, Stats, Orchestration)
│   ├── app/
│   │   ├── agent/  # Decision Agent & LLM abstraction
│   │   ├── routers/# Endpoints for experiments and ml
│   │   └── services/# Stats, Profit, and Feature calculation
│   ├── data/       # Datasets for model training
│   ├── models/     # Serialized Scikit-Learn models (.pkl)
│   ├── tests/      # Python test suite
│   └── main.py     # FastAPI entrypoint
├── backend/        # Node.js API Gateway (Express, Prisma)
│   ├── prisma/     # ORM schema
│   ├── src/        # Node.js routes and controllers
│   └── e2e_demo.js # Automated pipeline verification script
├── frontend/       # Web interface assets
└── README.md
`

---

## 6. Phase-by-Phase Implementation

### Phase 1 — Database & Backend CRUD
Implemented the foundational Node.js API Gateway using Express and Prisma ORM, enforcing strict multi-tenant boundaries (merchant isolation).

### Phase 2 — Database Integration
Integrated Neon Serverless PostgreSQL for centralized, reliable, and scalable cloud data storage.

### Phase 3 — Analytics
Developed Python-based business logic to correctly calculate complex retention metrics, such as Repeat Purchase Rate and Average Order Value.

### Phase 4 — Machine Learning
Implemented a Scikit-Learn ML uplift model that accepts RFM features and predicts the conditional average treatment effect (incremental behavior change) of an intervention.

### Phase 5 — Statistical Analysis
Integrated statsmodels to evaluate predicted population impacts, bounding raw ML predictions within statistically significant confidence intervals.

### Phase 6 — Decision Agent
Replaced simple sequential scripts with a strict deterministic state machine orchestrator that transitions sequentially:
OBSERVE → DISCOVER → PREDICT → VALIDATE → OPTIMIZE → RECOMMEND → OUTPUT.

### Phase 7 — Optimization
Added a mathematical optimization layer to calculate *Expected Incremental Contribution Profit*, evaluating intervention cost against uplift, and executing a global ranking to apply interventions under budget constraints.

---

## 7. ML APPROACH & TECHNICAL REMEDIATION

- **Canonical Feature Schema**: Strict 7-feature inference contract: `['total_orders', 'total_spent', 'avg_order_value', 'last_order_days_ago', 'pay_count_credit_card', 'pay_count_netbanking', 'pay_count_upi']`.
- **No Target Leakage**: Completely removed synthetic target leakage features (`baseline_purchase_prob`). Features are strictly derived from historical transactions.
- **RFM Recency Integration**: Recency (`last_order_days_ago`) is dynamically derived from real order timestamps (`created_at`) and passed to both training and serving models.
- **Normalized DB Vocabulary**: Database order and payment status strings (`Completed`, `Success`, `Credit Card`) are normalized to match feature extraction tokens cleanly.
- **Multi-Treatment Estimation**: Separate empirical estimators for each intervention (5% Discount, 10% Cashback, Free Shipping) avoiding arbitrary multipliers.

---

## 8. STATISTICAL VALIDATION & ECONOMICS

- **Statistical Bound Verification**: The `VALIDATE` phase computes two-sided Z-test 95% confidence intervals on treatment vs. control lift. Interventions with confidence intervals crossing zero (p > 0.05) are rejected.
- **Percentage Treatment Costs**: Intervention costs scale dynamically with Average Order Value (AOV):
  $$\text{Discount Cost} = \text{AOV} \times \text{Discount Percentage}$$
  $$\text{Gross Margin} = \text{AOV} \times \text{Contribution Margin Rate}$$
  $$\text{Expected Incremental Profit} = \text{Gross Margin} \times \text{Predicted Uplift} - \text{Intervention Cost}$$
- **Knapsack Budget Optimization**: Multi-option budget allocation ranks customer interventions by ROI/profitability and applies intelligent downgrades (e.g. falling back to 5% discount when 10% cashback exceeds remaining budget) rather than dropping customers completely.

---

## 9. DECISION AGENT

The AI Orchestrator strictly follows a deterministic state sequence across the full customer population without arbitrary 50-customer truncations:
```text
OBSERVE
↓
DISCOVER
↓
PREDICT
↓
VALIDATE
↓
OPTIMIZE
↓
RECOMMEND
↓
OUTPUT
```

- **Why deterministic**: LLMs are creative but mathematically unreliable. By enforcing strict state transitions, the orchestrator guarantees that the statistical engine, not the LLM, makes the final financial decision.
- **Validation**: Interactions with the LLM use strict Pydantic schemas (e.g., DiscoveryOutput, HypothesisOutput) to reject hallucinations and ensure required operational fields are correctly supplied.

---

## 10. OPTIMIZATION & VERIFIED E2E RESULTS

- **Persuadable Customer Prioritization**: Evaluated on live database with 5,000 customers. Persuadables (Students, ~+31.3% synthetic ground truth lift) account for **50.0%** of allocated budget, with Professionals taking 45.0% and Enterprise only 5.0%.
- **Budget Compliance**: Spent exactly ₹200.00 / ₹200.00 allocated budget across 20 active high-efficiency targeted interventions, yielding ₹24,877.23 in expected incremental contribution profit.

---

## 11. TECH STACK

| Layer          | Technology             |
| -------------- | ---------------------- |
| Frontend       | React, Vite, Vanilla CSS, Recharts |
| Backend        | Node.js, Express, Prisma ORM |
| Database       | PostgreSQL / Neon      |
| ML             | Python, Scikit-Learn   |
| AI Engine      | FastAPI, Pydantic      |
| Validation     | Statsmodels, Pytest    |
| Authentication | JWT, Server-to-Server Internal Secret |

---

## 12. DATABASE & MULTI-TENANT SECURITY

- **Technology**: Neon (Serverless PostgreSQL)
- **Multi-Tenant Isolation**: All queries (`ExperimentMemory`, `Customer`, `Order`, `Guardrail`) are strictly scoped by `req.user.merchantId`. Backend identity is passed securely via `X-Internal-Secret` header to the FastAPI engine.
- **Major Tables**:
  - User: Handles dashboard access and merchant association.
  - Customer: End-users tracked by the merchant.
  - Order: Transactional history used for RFM extraction.
  - AgentRun / AgentAction: Audit logs for the deterministic state machine.
  - ExperimentMemory: Long-term storage of experiment outcomes.
  - Guardrail: Threshold configuration per merchant.

---

## 13. API DOCUMENTATION

### Trigger Agent Pipeline
- **Method**: POST
- **Route**: /api/agent/run
- **Purpose**: Initiates the full GrowthPilot decision workflow for the authenticated merchant.
- **Authentication**: Bearer Token (JWT) required.
- **Request Body**:
  ```json
  {
    "goal": "Increase repeat customer behavior. budget: 200"
  }
  ```
- **Example Response**:
  ```json
  {
    "run_id": "d9ebcadf-2c2e-4c03-acee-75db9a00e54a",
    "status": "success",
    "trace": [
      {"state": "OBSERVE", "output": {...}},
      {"state": "DISCOVER", "output": {...}}
    ]
  }
  ```

---

## 14. SETUP & TESTING

### AI Engine Tests (Pytest)
```bash
cd ai-engine
pytest -v
```
**Result**: 26 passed across feature extraction, schema parity, statistical lift CIs, optimization downgrades, and internal auth.

### Backend Gateway Tests (Jest)
```bash
cd backend
npm test
```
**Result**: 9 passed (7 multi-tenant isolation tests, 2 guardrail persistence tests).

### Prerequisites
- Node.js (v22+)
- Python (3.12+)
- A Neon PostgreSQL Database Instance

### Clone
` ash
git clone https://github.com/example/growthpilot.git
cd growthpilot
`

### Backend Setup
` ash
cd backend
npm install
# Sync Prisma schema to Neon DB
npx prisma db pull
npx prisma generate
`

### AI Engine Setup
` ash
cd ai-engine
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
`

### Database Setup
Ensure your Neon PostgreSQL connection string is placed inside  ackend/.env.

---

## 15. ENVIRONMENT VARIABLES

Create a .env file in the  ackend/ directory:

`env
DATABASE_URL=
JWT_SECRET=
PORT=
MOCK_LLM_RESPONSE=
`

- DATABASE_URL: Connection string for the Neon database.
- JWT_SECRET: Secure cryptographic key used to sign authentication tokens.
- PORT: Execution port for the Node.js API Gateway (defaults to 3000).
- MOCK_LLM_RESPONSE: Test payload validating Pydantic schemas during E2E tests.

> **IMPORTANT**: Do not commit .env files or credentials to the repository.

---

## 16. RUNNING THE PROJECT

### Development

**1. Start the Python AI Engine**
` ash
cd ai-engine
uvicorn main:app --reload --port 8000
`

**2. Start the Node API Gateway**
` ash
cd backend
npm run dev
`

### End-to-End Demo
To verify the complete mathematical and decision pipeline end-to-end:
` ash
# From the project root
node backend/e2e_demo.js
`
This script authenticates a demo user, issues a goal to the API Gateway, triggers the state machine, and outputs the deterministic execution trace.

---

## 17. TESTING

The project utilizes automated test suites to verify math and pipeline stability.

---

## 18. SECURITY

- Secrets are strictly stored in environment variables.
- .env files and 
ode_modules are Git-ignored.
- Multi-tenant isolation is cryptographically verified via JWT authentication.
- API inputs are validated and sanitized via Express & Pydantic.
- Credentials are not committed.

---

## 19. LIMITATIONS

- **Mock LLM Usage**: The current demo leverages a static mock response for the LLM discovery phase to bypass API key requirements during evaluation.
- **Dataset Size**: Local E2E testing evaluates small-batch data slices. Performance tuning will be necessary for executing optimizations on datasets larger than 100k users.
- **Intervention Variables**: Currently scoped primarily to direct monetary incentives; extending to UI/UX variations requires additional frontend instrumentation.

---

## 20. FUTURE IMPROVEMENTS

- **More Advanced Uplift Models**: Exploring meta-learners (T-Learner, X-Learner) for non-linear behavioral relationships.
- **Automated Retraining**: Feedback loops persisting experiment outcomes into the ML training pipeline.
- **Production Deployment**: Containerizing services via Docker for Kubernetes deployment.

---

## 21. DEMO FLOW

1. Start Neon Database (Cloud)
2. Start Node.js Backend API (
pm run dev)
3. Start Python AI Engine (uvicorn main:app)
4. Start Frontend (
pm run dev in rontend/)
5. **Login** to the web application.
6. **Dashboard**: Navigate to the GrowthPilot agent interface.
7. **Set Goal + Budget**: Define your intervention constraints.
8. **Run GrowthPilot**: Execute the deterministic pipeline.
9. **View Execution Trace**: Expand states to view statistical bounds and optimizations.
10. **View Recommendations**: Inspect the resulting customer-level metrics and expected profit.

## 22. DEVELOPMENT NOTES

- **ML Logic**: Modifications to uplift models should be performed within  i-engine/app/routers/ml.py.
- **State Machine**: Orchestrator flow is strictly defined in  i-engine/app/agent/state_machine.py.
- **Optimization Algorithms**: Mathematical formulas for profit and lift reside in  i-engine/app/services/.
