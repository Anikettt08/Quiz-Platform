from app.core.email import send_otp_email


result = send_otp_email(
    "shubhojeetghosh60@gmail.com",
    "482913"
)

print("Email result:", result)