from app.core.otp import generate_otp
from app.core.security import hash_otp, verify_otp


otp = generate_otp()

print("Original OTP:", otp)

hashed_otp = hash_otp(otp)

print("Hashed OTP:", hashed_otp)

print("Correct OTP:", verify_otp(otp, hashed_otp))

print("Wrong OTP:", verify_otp("123456", hashed_otp))