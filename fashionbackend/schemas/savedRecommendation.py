from pydantic import BaseModel
from typing import List, Optional


# =========================
# REQUEST / SAVE SCHEMA
# =========================
class SavedRecommendationSchema(BaseModel):
    gender: str
    season: str
    occasion: str
    dress_type: str
    budget: int   # ✅ FIX: match DB + recommendation schema

    product: List[str] = []
    shoes: List[str] = []
    accessory: List[str] = []
    color: List[str] = []


# =========================
# RESPONSE SCHEMA (IMPORTANT)
# =========================
class SavedRecommendationResponse(BaseModel):
    id: int

    gender: str
    season: str
    occasion: str
    dress_type: str
    budget: int

    product: List[str] = []
    shoes: List[str] = []
    accessory: List[str] = []
    color: List[str] = []