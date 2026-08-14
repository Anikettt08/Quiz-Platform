from fastapi import FastAPI

from app.routes.auth import router as auth_router
from app.api.routes.password_reset import router as password_reset_router

app = FastAPI(
    title="Quiz Platform API"
)


app.include_router(auth_router)
app.include_router(password_reset_router)


@app.get("/")
def root():
    return {
        "message": "Quiz Platform API is running"
    }