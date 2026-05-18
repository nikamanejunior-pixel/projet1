from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    API_TITLE: str = "Audit API"
    API_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # File upload
    MAX_FILE_SIZE: int = 50 * 1024 * 1024  # 50 MB
    UPLOAD_DIR: str = "/tmp/audit_uploads"
    
    # Allowed MIME types
    ALLOWED_MIMETYPES: List[str] = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf"
    ]
    
    class Config:
        env_file = ".env"

settings = Settings()
