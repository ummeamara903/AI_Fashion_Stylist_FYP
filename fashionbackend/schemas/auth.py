from pydantic import BaseModel, EmailStr


# =========================
# REGISTER SCHEMA
# =========================
class UserCreate(BaseModel):

    username: str

    email: EmailStr

    password: str


# =========================
# LOGIN SCHEMA
# =========================
class UserLogin(BaseModel):

    email: EmailStr

    password: str


# =========================
# RESPONSE SCHEMA
# =========================
class UserResponse(BaseModel):

    id: int

    username: str

    email: EmailStr

    class Config:
        from_attributes = True