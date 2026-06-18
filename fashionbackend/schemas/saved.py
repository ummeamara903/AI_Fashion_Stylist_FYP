from pydantic import BaseModel
from typing import Optional


# =========================
# REQUEST SCHEMA
# =========================
class SavedImageSchema(BaseModel):
    id: int
    image_url: str
    category: Optional[str] = None


# =========================
# RESPONSE SCHEMA (IMPORTANT)
# =========================
class SavedImageResponse(BaseModel):
    id: int
    image_url: str
    category: Optional[str] = None