from pydantic import BaseModel
from typing import List


# =========================
# REQUEST SCHEMA
# =========================
class RecommendRequest(BaseModel):
    gender: str
    season: str
    occasion: str
    dress_type: str
    budget: int   # ✅ FIX: match DB (safer)


# =========================
# RESPONSE SCHEMA
# =========================
class RecommendResponse(BaseModel):
    product: List[str] = []
    shoes: List[str] = []
    accessory: List[str] = []
    color: List[str] = []