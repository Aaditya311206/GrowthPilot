from fastapi import FastAPI
from app.routers import ml, experiments, agent
from app.database import engine, Base

# Create tables if they don't exist (for local dev safety, Prisma handles real migrations)
# Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="GrowthPilot AI Engine",
    description="Database-Backed A/B Experiment and Causal Inference Engine",
    version="2.0"
)

app.include_router(ml.router)
app.include_router(experiments.router)
app.include_router(agent.router)

@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": "GrowthPilot A/B & Profit Engine",
    }