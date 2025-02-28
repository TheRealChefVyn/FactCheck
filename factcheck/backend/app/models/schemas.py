from pydantic import BaseModel, Field
from typing import Optional, List

class FactCheckRequest(BaseModel):
    """
    Request model for fact checking
    """
    text: str = Field(..., description="The text to fact check")
    
class FactCheckSource(BaseModel):
    """
    Information about a fact checking source
    """
    name: str = Field(..., description="Name of the fact checking source")
    url: Optional[str] = Field(None, description="URL to the fact check")
    
class FactCheckResponse(BaseModel):
    """
    Response model for fact checking results
    """
    claim_hash: str = Field(..., description="Hash of the claim (for privacy)")
    reliability_score: float = Field(..., description="Reliability score (0-100)")
    sources: List[FactCheckSource] = Field(default_factory=list, description="Fact checking sources")
    summary: Optional[str] = Field(None, description="Summary of the fact check")
    timestamp: str = Field(..., description="Timestamp of the fact check")
