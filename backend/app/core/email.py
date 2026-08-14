import os
import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from dotenv import load_dotenv


# Load .env
load_dotenv()


# Gmail SMTP settings
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))

SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

MAIL_FROM = os.getenv("MAIL_FROM", SMTP_USERNAME)


def send_otp_email(to_email: str, otp: str):

    subject = "Quiz Platform - Password Reset OTP"

    body = f"""
Hello,

You requested to reset your password for the Quiz Platform.

Your OTP is:

{otp}

This OTP will expire in 10 minutes.

If you did not request a password reset, please ignore this email.

Regards,
Quiz Platform Team
"""

    message = MIMEMultipart()

    message["From"] = MAIL_FROM
    message["To"] = to_email
    message["Subject"] = subject

    message.attach(
        MIMEText(body, "plain")
    )

    try:

        with smtplib.SMTP(
            SMTP_HOST,
            SMTP_PORT
        ) as server:

            server.starttls()

            server.login(
                SMTP_USERNAME,
                SMTP_PASSWORD
            )

            server.sendmail(
                MAIL_FROM,
                to_email,
                message.as_string()
            )

        print(f"Email sent successfully to {to_email}")

        return True

    except Exception as e:

        print("Email sending failed:", e)

        return False