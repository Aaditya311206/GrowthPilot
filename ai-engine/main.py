from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from app.routers import ml, experiments, agent
from app.database import engine, Base
from app.config import settings

# Create tables if they don't exist (for local dev safety, Prisma handles real migrations)
# Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="GrowthPilot AI Engine",
    description="Database-Backed A/B Experiment and Causal Inference Engine",
    version="2.0"
)

@app.middleware("http")
async def verify_internal_secret(request: Request, call_next):
    # Public routes for health check and API docs
    if request.url.path in ["/", "/docs", "/openapi.json", "/redoc"]:
        return await call_next(request)
        
    secret = request.headers.get("X-Internal-Secret")
    expected_secret = getattr(settings, "ai_engine_secret", None)
    
    if expected_secret and secret != expected_secret:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Unauthorized: Invalid or missing X-Internal-Secret header"}
        )
        
    return await call_next(request)

app.include_router(ml.router)
app.include_router(experiments.router)
app.include_router(agent.router)

@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": "GrowthPilot A/B & Profit Engine",
    }