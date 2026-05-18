from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class FileAnalysisResponse(BaseModel):
    filename: str
    file_size: int
    mime_type: str
    watermark_detected: bool
    watermark_confidence: float
    c2pa_detected: bool
    c2pa_manifest: Optional[Dict[str, Any]] = None
    confidence_score: float
    authenticity_indicator: str  # "verified", "questionable", "untrusted"
    warnings: list[str]
    analysis_timestamp: datetime

class HealthResponse(BaseModel):
    status: str
