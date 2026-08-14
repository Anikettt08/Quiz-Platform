from pydantic import BaseModel, EmailStr, Field


# ============================================================
# REGISTER
# ============================================================

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


# ============================================================
# LOGIN
# ============================================================

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ============================================================
# RESET PASSWORD
# ============================================================

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: str = Field(min_length=6, max_length=6)
    new_password: str = Field(min_length=8)