from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.dependencies import get_db, get_current_user
from models.savedRecommendation import SavedRecommendation
from schemas.savedRecommendation import SavedRecommendationSchema

router = APIRouter()


# =========================
# SAVE RECOMMENDATION
# =========================
@router.post("/save-recommendation")
def save_recommendation(
    data: SavedRecommendationSchema,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    # ✅ FIX: correct key
    username = current_user.get("username")

    if not username:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized user"
        )

    recommendation = SavedRecommendation(
        user=username,

        gender=data.gender,
        season=data.season,
        occasion=data.occasion,
        dress_type=data.dress_type,
        budget=data.budget,

        product=",".join(data.product),
        shoes=",".join(data.shoes),
        accessory=",".join(data.accessory),
        color=",".join(data.color)
    )

    db.add(recommendation)
    db.commit()
    db.refresh(recommendation)

    return {
        "message": "Recommendation saved successfully",
        "user": username
    }


# =========================
# GET SAVED RECOMMENDATIONS (USER ONLY)
# =========================
@router.get("/saved-recommendations")
def get_saved_recommendations(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    # ✅ FIX
    username = current_user.get("username")

    if not username:
        return {
            "user": None,
            "saved_recommendations": []
        }

    recommendations = db.query(SavedRecommendation).filter(
        SavedRecommendation.user == username
    ).all()

    return {
        "user": username,
        "saved_recommendations": [
            {
                "id": item.id,

                "gender": item.gender,
                "season": item.season,
                "occasion": item.occasion,
                "dress_type": item.dress_type,
                "budget": item.budget,

                "product": item.product.split(",") if item.product else [],
                "shoes": item.shoes.split(",") if item.shoes else [],
                "accessory": item.accessory.split(",") if item.accessory else [],
                "color": item.color.split(",") if item.color else []
            }
            for item in recommendations
        ]
    }


# =========================
# DELETE SAVED RECOMMENDATION (USER ONLY)
# =========================
@router.delete("/delete-saved-recommendation/{id}")
def delete_saved_recommendation(
    id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    # ✅ FIX
    username = current_user.get("username")

    if not username:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized user"
        )

    recommendation = db.query(SavedRecommendation).filter(
        SavedRecommendation.id == id,
        SavedRecommendation.user == username
    ).first()

    if not recommendation:
        raise HTTPException(
            status_code=404,
            detail="Recommendation not found or not authorized"
        )

    db.delete(recommendation)
    db.commit()

    return {
        "message": "Recommendation deleted successfully",
        "user": username
    }