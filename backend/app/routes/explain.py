from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.explanation_service import generate_explanation


# ============================================================
# ROUTER CONFIGURATION
# ============================================================

router = APIRouter()


# ============================================================
# REQUEST MODEL
# ============================================================

class ExplanationRequest(BaseModel):

    source_text: str = Field(min_length=1)

    learning_level: str = "University Student"

    language: str = "English"


# ============================================================
# SIMPLE EXPLANATION API
# ============================================================

@router.post("/explain")
async def create_explanation(request: ExplanationRequest):

    if not request.source_text.strip():

        raise HTTPException(
            status_code=400,
            detail="Study material cannot be empty."
        )

    try:

        explanation = generate_explanation(
            source_text=request.source_text,
            learning_level=request.learning_level,
            language=request.language
        )

        return {
            "status": "success",
            "message": "Explanation generated successfully!",
            "explanation": explanation
        }

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except Exception as error:

        print(f"Explanation route error: {error}")

        raise HTTPException(
            status_code=503,
            detail=str(error)
        )