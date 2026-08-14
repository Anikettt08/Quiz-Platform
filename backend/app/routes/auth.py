from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    verify_otp,
)

from app.models.user import User
from app.models.password_reset_otp import PasswordResetOTP

from app.schemas.auth import (
    RegisterRequest,
    ResetPasswordRequest,
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ============================================================
# REGISTER
# ============================================================

@router.post("/register")
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):
    # Check if user already exists
    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Hash password
    hashed_password = hash_password(data.password)

    # Create user
    new_user = User(
        email=data.email,
        password_hash=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id,
        "email": new_user.email
    }


# ============================================================
# LOGIN
# ============================================================

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Find user by email
    user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Verify password
    if not verify_password(
        form_data.password,
        user.password_hash
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Create JWT
    access_token = create_access_token(
        data={
            "sub": str(user.id),
            "email": user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# ============================================================
# FORGOT PASSWORD
# ============================================================

@router.post("/forgot-password")
def forgot_password(
    email: str,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # --------------------------------------------------------
    # IMPORTANT
    # Keep your existing OTP generation/email code here.
    #
    # Your previous Step 11 should already generate the OTP,
    # hash it, save it using user_id, and send it by email.
    # --------------------------------------------------------

    return {
        "message": "OTP sent successfully"
    }


# ============================================================
# VERIFY OTP
# ============================================================

@router.post("/verify-otp")
def verify_otp_endpoint(
    email: str,
    otp: str,
    db: Session = Depends(get_db)
):
    # --------------------------------------------------------
    # 1. Find user
    # --------------------------------------------------------

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # --------------------------------------------------------
    # 2. Find OTP using user_id
    # --------------------------------------------------------

    otp_record = db.query(PasswordResetOTP).filter(
        PasswordResetOTP.user_id == user.id,
        PasswordResetOTP.used == False
    ).order_by(
        PasswordResetOTP.created_at.desc()
    ).first()

    if not otp_record:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP not found or already used"
        )

    # --------------------------------------------------------
    # 3. Verify OTP
    # --------------------------------------------------------

    if not verify_otp(
        otp,
        otp_record.otp_hash
    ):
        otp_record.attempts += 1
        db.commit()

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP"
        )

    # --------------------------------------------------------
    # 4. Check expiration
    # --------------------------------------------------------

    if otp_record.expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP has expired"
        )

    return {
        "message": "OTP verified successfully"
    }


# ============================================================
# RESET PASSWORD
# ============================================================

@router.post("/reset-password")
def reset_password(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    # --------------------------------------------------------
    # 1. Find user by email
    # --------------------------------------------------------

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # --------------------------------------------------------
    # 2. Find OTP using user_id
    #
    # IMPORTANT:
    # PasswordResetOTP does NOT have an email column.
    # It has user_id.
    # --------------------------------------------------------

    otp_record = db.query(PasswordResetOTP).filter(
        PasswordResetOTP.user_id == user.id,
        PasswordResetOTP.used == False
    ).order_by(
        PasswordResetOTP.created_at.desc()
    ).first()

    if not otp_record:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP not found or already used"
        )

    # --------------------------------------------------------
    # 3. Verify OTP
    # --------------------------------------------------------

    if not verify_otp(
        data.otp,
        otp_record.otp_hash
    ):
        otp_record.attempts += 1
        db.commit()

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP"
        )

    # --------------------------------------------------------
    # 4. Check OTP expiration
    # --------------------------------------------------------

    if otp_record.expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP has expired"
        )

    # --------------------------------------------------------
    # 5. Hash new password
    # --------------------------------------------------------

    new_password_hash = hash_password(
        data.new_password
    )

    # --------------------------------------------------------
    # 6. Update password
    # --------------------------------------------------------

    user.password_hash = new_password_hash

    # --------------------------------------------------------
    # 7. Mark OTP as used
    # --------------------------------------------------------

    otp_record.used = True

    # --------------------------------------------------------
    # 8. Save everything
    # --------------------------------------------------------

    db.commit()

    return {
        "message": "Password reset successfully"
    }