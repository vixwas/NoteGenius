from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import upload, generate

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
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routes
app.include_router(upload.router, tags=["Upload"])
app.include_router(generate.router, tags=["AI Generation"])


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