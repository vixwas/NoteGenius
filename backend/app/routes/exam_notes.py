from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.exam_notes_service import generate_exam_notes


# ============================================================
# ROUTER CONFIGURATION
# ============================================================

router = APIRouter()


# ============================================================
# REQUEST MODEL
# ============================================================

class ExamNotesRequest(BaseModel):

    source_text: str = Field(min_length=1)

    learning_level: str = "University Student"

    language: str = "English"


# ============================================================
# EXAM NOTES GENERATION API
# ============================================================

@router.post("/generate-exam-notes")
async def create_exam_notes(request: ExamNotesRequest):

    if not request.source_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Study material cannot be empty."
        )

    try:

        generated_notes = generate_exam_notes(
            source_text=request.source_text,
            learning_level=request.learning_level,
            language=request.language
        )

        return {
            "status": "success",
            "message": "Exam notes generated successfully!",
            "generated_notes": generated_notes
        }

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except Exception as error:

        print(f"Exam notes route error: {error}")

        raise HTTPException(
            status_code=503,
            detail=str(error)
        )