from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
import uuid

from app.services.pdf_service import (
    extract_text_from_pdf,
    extract_text_from_docx,
    extract_text_from_pptx,
    extract_text_from_txt
)

router = APIRouter()

# Upload directory
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# Extracted text directory
EXTRACTED_TEXT_DIR = Path("extracted_text")
EXTRACTED_TEXT_DIR.mkdir(exist_ok=True)

# Allowed file types
ALLOWED_EXTENSIONS = {".pdf", ".docx", ".pptx", ".txt"}

# Maximum file size: 10 MB
MAX_FILE_SIZE = 10 * 1024 * 1024


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    # Check filename
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Filename is missing."
        )

    # Extract extension
    file_extension = Path(file.filename).suffix.lower()

    # Validate file type
    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Upload PDF, DOCX, PPTX, or TXT."
        )

    # Read file
    file_content = await file.read()

    # Validate size
    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File size exceeds 10 MB limit."
        )

    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}{file_extension}"

    # Save uploaded file
    file_path = UPLOAD_DIR / unique_filename

    try:
        with open(file_path, "wb") as buffer:
            buffer.write(file_content)

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Error saving file: {str(error)}"
        )

    # Extract text
    extracted_text = None
    extracted_text_filename = None

    try:

        if file_extension == ".pdf":
            extracted_text = extract_text_from_pdf(str(file_path))

        elif file_extension == ".docx":
            extracted_text = extract_text_from_docx(str(file_path))

        elif file_extension == ".pptx":
            extracted_text = extract_text_from_pptx(str(file_path))

        elif file_extension == ".txt":
            extracted_text = extract_text_from_txt(str(file_path))

        # Save extracted text
        if extracted_text is not None:

            extracted_text_filename = (
                f"{Path(unique_filename).stem}.txt"
            )

            extracted_text_path = (
                EXTRACTED_TEXT_DIR / extracted_text_filename
            )

            with open(
                extracted_text_path,
                "w",
                encoding="utf-8"
            ) as text_file:

                text_file.write(extracted_text)

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Text extraction failed: {str(error)}"
        )

    # Return response
    return {
        "message": "File uploaded successfully!",
        "original_filename": file.filename,
        "saved_filename": unique_filename,
        "file_size": len(file_content),
        "file_type": file_extension,
        "extracted_text_filename": extracted_text_filename,
        "extracted_text": extracted_text,
        "status": "success"
    }