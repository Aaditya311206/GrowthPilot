from fastapi import FastAPI

app = FastAPI(title="GrowthPilot AI Engine")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ai-engine"}
