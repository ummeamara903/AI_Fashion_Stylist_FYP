from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.dependencies import get_db, get_current_user
from models.saved import SavedImage
from schemas.saved import SavedImageSchema

router = APIRouter()


# =========================
# TOGGLE SAVE / UNSAVE IMAGE
# =========================
@router.post("/toggle-save")
def toggle_save(
    data: SavedImageSchema,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    # ✅ FIX: correct key
    username = current_user.get("username")

    if not username:
        return {
            "saved": False,
            "message": "Unauthorized user"
        }

    # 🔍 check if already saved by THIS user
    existing = db.query(SavedImage).filter(
        SavedImage.image_id == data.id,
        SavedImage.user == username
    ).first()

    # 🔴 UNSAVE
    if existing:
        db.delete(existing)
        db.commit()

        return {
            "saved": False,
            "message": "Removed successfully",
            "user": username
        }

    # 🟢 SAVE
    new_image = SavedImage(
        user=username,
        image_id=data.id,
        image_url=data.image_url,
        category=data.category or "All"
    )

    db.add(new_image)

    try:
        db.commit()
        db.refresh(new_image)

    except Exception as e:
        db.rollback()

        return {
            "saved": False,
            "error": str(e)
        }

    return {
        "saved": True,
        "message": "Saved successfully",
        "user": username
    }


# =========================
# GET SAVED IMAGES (USER ONLY)
# =========================
@router.get("/saved")
def get_saved_images(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    # ✅ FIX
    username = current_user.get("username")

    if not username:
        return {
            "user": None,
            "saved_images": []
        }

    images = db.query(SavedImage).filter(
        SavedImage.user == username
    ).all()

    return {
        "user": username,
        "saved_images": [
            {
                "id": img.image_id,
                "url": img.image_url,
                "category": img.category
            }
            for img in images
        ]
    }