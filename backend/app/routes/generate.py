from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.ai_service import generate_notes

router = APIRouter()


class NotesRequest(BaseModel):
    source_text: str


@router.post("/generate-notes")
async def create_notes(request: NotesRequest):

    if not request.source_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Source text cannot be empty."
        )

    try:
        generated_notes = generate_notes(request.source_text)

        return {
            "status": "success",
            "message": "Notes generated successfully!",
            "generated_notes": generated_notes
        }

    except Exception as error:
        raise HTTPException(
            status_code=503,
            detail=str(error)
        )