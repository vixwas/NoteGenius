
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.flashcards_service import generate_flashcards


router = APIRouter()


class FlashcardsRequest(BaseModel):
    source_text: str = Field(min_length=1)
    flashcard_count: int = Field(default=10, ge=1, le=50)
    difficulty: str = "Medium"
    learning_level: str = "University Student"
    language: str = "English"


@router.post("/generate-flashcards")
def create_flashcards(request: FlashcardsRequest):

    if not request.source_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Study material cannot be empty."
        )

    try:
        flashcard_data = generate_flashcards(
            source_text=request.source_text,
            flashcard_count=request.flashcard_count,
            difficulty=request.difficulty,
            learning_level=request.learning_level,
            language=request.language
        )

        return {
            "status": "success",
            "message": "Flashcards generated successfully!",
            "flashcards": flashcard_data
        }

    except Exception as error:
        print(f"FLASHCARD ROUTE ERROR: {error}")

        raise HTTPException(
            status_code=503,
            detail=str(error)
        )
