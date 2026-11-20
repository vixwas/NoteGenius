
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import upload, generate, quiz, flashcards

app = FastAPI(
    title="NoteGenius API",
    description="AI-powered study material generator",
    version="1.0.0"
)

# CORS Configuration
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

# Register API Routes
app.include_router(upload.router, tags=["Upload"])
app.include_router(generate.router, tags=["AI Generation"])
app.include_router(quiz.router, tags=["Quiz Generation"])
app.include_router(flashcards.router, tags=["Flashcards Generation"])


@app.get("/")
def home():
    return {
        "message": "NoteGenius Backend is running!"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
