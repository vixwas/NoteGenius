
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from app.services.ai_service import (
    generate_notes,
    generate_notes_stream,
    generate_summary
)

router = APIRouter()


class NotesRequest(BaseModel):
    source_text: str


# =====================================================
# NORMAL NOTES GENERATION
# =====================================================

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
        print(f"Notes generation route error: {error}")

        raise HTTPException(
            status_code=503,
            detail=str(error)
        )


# =====================================================
# STREAMING NOTES GENERATION
# =====================================================

@router.post("/generate-notes-stream")
async def create_notes_stream(request: NotesRequest):

    if not request.source_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Source text cannot be empty."
        )

    def stream_content():

        try:
            for chunk in generate_notes_stream(
                request.source_text
            ):
                yield chunk

        except Exception as error:

            print(f"Streaming route error: {error}")

            # Send a recognizable error marker to frontend
            yield "\n\n[GENERATION_ERROR] Notes generation failed."

    return StreamingResponse(
        stream_content(),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "X-Accel-Buffering": "no"
        }
    )



@router.post("/generate-summary")
async def generate_summary_route(request: NotesRequest):
    try:
        summary = generate_summary(request.source_text)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
