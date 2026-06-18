from fastapi import APIRouter, Depends

from schemas.recommend import RecommendRequest
from services.recommendServices import recommend
from core.dependencies import get_current_user

router = APIRouter()


# =========================
# PROTECTED RECOMMEND ROUTE
# =========================
@router.post("/recommend")
def get_recommendation(
    data: RecommendRequest,
    current_user: dict = Depends(get_current_user)
):

    # ✅ FIX: correct key
    username = current_user.get("username")

    # optional safety check
    if not username:
        return {
            "message": "Unauthorized user"
        }

    result = recommend(data)

    return {
        "message": "Recommendation generated successfully",
        "user": username,
        "recommendation": result
    }