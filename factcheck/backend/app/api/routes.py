from fastapi import APIRouter, Depends, HTTPException
from app.services.fact_checking.checker import check_claim
from app.models.schemas import FactCheckRequest, FactCheckResponse

api_router = APIRouter()

@api_router.post("/factcheck", response_model=FactCheckResponse)
async def fact_check(request: FactCheckRequest):
    """
    Check a claim for factual accuracy
    """
    try:
        result = await check_claim(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy"}
