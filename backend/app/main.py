from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import (
    upload,
    generate,
    quiz,
    flashcards,
    exam_notes,
    explain
)


# =====================================================
# FASTAPI APPLICATION
# =====================================================

app = FastAPI(
    title="NoteGenius API",
    description="AI-powered study material generator",
    version="1.0.0"
)


# =====================================================
# CORS CONFIGURATION
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
        "http://127.0.0.1:5176",
        "http://localhost:5177",
        "http://127.0.0.1:5177",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# REGISTER API ROUTES
# =====================================================

app.include_router(upload.router, tags=["Upload"])

app.include_router(generate.router, tags=["AI Generation"])

app.include_router(quiz.router, tags=["Quiz Generation"])

app.include_router(flashcards.router, tags=["Flashcards Generation"])

app.include_router(exam_notes.router, tags=["Exam Notes Generation"])

app.include_router(explain.router, tags=["Simple Explanation"])


# =====================================================
# HOME ENDPOINT
# =====================================================

@app.get("/")
def home():

    return {
        "message": "NoteGenius Backend is running!"
    }


# =====================================================
# HEALTH CHECK
# =====================================================

@app.get("/health")
def health_check():

    return {
        "status": "healthy"
    }