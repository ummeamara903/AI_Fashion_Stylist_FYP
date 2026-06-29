from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import HTTPException
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# =========================
# CONFIG
# =========================
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30)
)


# =========================
# CREATE ACCESS TOKEN
# =========================
def create_access_token(data: dict) -> str:
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# =========================
# VERIFY TOKEN
# =========================
def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )