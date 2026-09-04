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

## 7. ML APPROACH

- **Input Features**: Recency, Frequency, Monetary value (RFM) calculated over historic data windows.
- **Feature Extraction**: Calculated dynamically from PostgreSQL Order and Customer tables at inference time.
- **Model Purpose**: Predict uplift (causal impact) rather than standard binary classification.
- **Prediction Output**: A decimal representation of behavioral lift (e.g., +5% purchase probability).
- **Usage**: The predictions bypass standard targeting (which targets highest spenders) and instead target the "persuadables"—those whose behavior is most likely to change *because* of the intervention.

> The goal is not simply to predict which customers are likely to purchase, but to estimate which customers are likely to change behavior because of an intervention.

---

## 8. STATISTICAL APPROACH

Statistical validation acts as the safety layer between the ML predictions and business decisions.
- **Purpose**: Prevents the optimization engine from scaling interventions based on statistically noisy ML predictions.
- **Metrics**: Absolute lift, conversion rates, and exact P-Values.
- **Mechanism**: The engine evaluates expected treatment and control group divergences and rejects implementations where the confidence interval crosses zero.

---

## 9. DECISION AGENT

The AI Orchestrator strictly follows a deterministic state sequence:
`	ext
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
`

- **Why deterministic**: LLMs are creative but mathematically unreliable. By enforcing strict state transitions, the orchestrator guarantees that the statistical engine, not the LLM, makes the final financial decision.
- **Validation**: Interactions with the LLM use strict Pydantic schemas (e.g., DiscoveryOutput, HypothesisOutput) to reject hallucinations and ensure required operational fields are correctly supplied.

---

## 10. OPTIMIZATION

High predicted uplift does **not** always equal high expected profit. GrowthPilot evaluates interventions mathematically:
- **Expected Incremental Value**: Predicted Uplift * Expected Order Value.
- **Intervention Cost**: Absolute cost of providing the treatment.
- **Expected Incremental Profit**: Expected Incremental Value - Intervention Cost.

The engine evaluates these equations for every targeted customer, selecting the most profitable intervention (or a no-intervention decision if costs outweigh lift) and ranks them to respect global budget constraints.

---

## 11. TECH STACK

| Layer          | Technology             |
| -------------- | ---------------------- |
| Frontend       | React, Vite, Tailwind CSS, Recharts |
| Backend        | Node.js, Express       |
| Database       | PostgreSQL / Neon      |
| ML             | Python, Scikit-Learn   |
| AI Engine      | FastAPI                |
| Validation     | Pydantic, Statsmodels  |
| Testing        | Pytest                 |
| Authentication | JWT (JSON Web Tokens)  |

---

## 12. DATABASE

- **Technology**: Neon (Serverless PostgreSQL)
- **Major Tables**:
  - User: Handles dashboard access and merchant association.
  - Customer: End-users tracked by the merchant.
  - Order: Transactional history used for RFM extraction.
  - AgentRun / AgentAction: Audit logs for the deterministic state machine.
- **Security**: The database acts as the single source of truth. Passwords and credentials are fully isolated in environment variables.

---

## 13. API DOCUMENTATION

### Trigger Agent Pipeline
- **Method**: POST
- **Route**: /api/agent/run
- **Purpose**: Initiates the full GrowthPilot decision workflow for the authenticated merchant.
- **Authentication**: Bearer Token (JWT) required.
- **Request Body**:
  `json
  {
    "goal": "Increase repeat customer behavior. budget: 50"
  }
  `
- **Example Response**:
  `json
  {
    "run_id": "d9ebcadf-2c2e-4c03-acee-75db9a00e54a",
    "status": "success",
    "trace": [
      {"state": "OBSERVE", "output": {...}},
      {"state": "DISCOVER", "output": {...}}
    ]
  }
  `

---

## 14. SETUP

### Prerequisites
- Node.js (v22+)
- Python (3.12+)
- A Neon PostgreSQL Database Instance

### Clone
`ash
git clone https://github.com/example/growthpilot.git
cd growthpilot
`

### Backend Setup
`ash
cd backend
npm install
# Sync Prisma schema to Neon DB
npx prisma db pull
npx prisma generate
`

### AI Engine Setup
`ash
cd ai-engine
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
`

### Database Setup
Ensure your Neon PostgreSQL connection string is placed inside ackend/.env.

---

## 15. ENVIRONMENT VARIABLES

Create a .env file in the ackend/ directory:

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
`ash
cd ai-engine
uvicorn main:app --reload --port 8000
`

**2. Start the Node API Gateway**
`ash
cd backend
npm run dev
`

### End-to-End Demo
To verify the complete mathematical and decision pipeline end-to-end:
`ash
# From the project root
node backend/e2e_demo.js
`
This script authenticates a demo user, issues a goal to the API Gateway, triggers the state machine, and outputs the deterministic execution trace.

---

## 17. TESTING

The project utilizes automated test suites to verify math and pipeline stability.

`ash
cd ai-engine
pytest tests/
`
**Latest Verified Result**: 15 passed (Unit & Integration).
Tests cover feature extraction, mathematical bounds, optimization calculations, and state-machine transitions.

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

- **ML Logic**: Modifications to uplift models should be performed within i-engine/app/routers/ml.py.
- **State Machine**: Orchestrator flow is strictly defined in i-engine/app/agent/state_machine.py.
- **Optimization Algorithms**: Mathematical formulas for profit and lift reside in i-engine/app/services/.
