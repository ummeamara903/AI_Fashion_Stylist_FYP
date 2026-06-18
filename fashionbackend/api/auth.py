from fastapi import HTTPException, APIRouter, Depends
from sqlalchemy.orm import Session

from models.auth import UserDB

from schemas.auth import (
    UserCreate,
    UserLogin,
    UserResponse
)

from core.hash import (
    hash_password,
    verify_password
)

from core.dependencies import get_db

from core.Jwt import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


# =========================
# REGISTER
# =========================
@router.post(
    "/register",
    response_model=UserResponse
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    # CHECK USERNAME
    existing_user = db.query(UserDB).filter(
        UserDB.username == user.username
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )


    # CHECK EMAIL
    existing_email = db.query(UserDB).filter(
        UserDB.email == user.email
    ).first()

    if existing_email:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )


    # HASH PASSWORD
    hashed_pwd = hash_password(
        user.password
    )


    # CREATE USER
    new_user = UserDB(
        username=user.username,
        email=user.email,
        password=hashed_pwd
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return new_user


# =========================
# LOGIN
# =========================
@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = db.query(UserDB).filter(
        UserDB.email == user.email
    ).first()

    if not db_user:

        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )


    if not verify_password(
        user.password,
        db_user.password
    ):

        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )


    token = create_access_token({
        "sub": db_user.username
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# =========================
# LOGOUT
# =========================
@router.post("/logout")
def logout():

    return {
        "message": "Logout successful"
    }


# =========================
# GET ALL USERS
# =========================
@router.get(
    "/users",
    response_model=list[UserResponse]
)
def get_all_users(
    db: Session = Depends(get_db)
):

    users = db.query(UserDB).all()

    return users