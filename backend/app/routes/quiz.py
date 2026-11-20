
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.quiz_service import generate_quiz


router = APIRouter()


class QuizRequest(BaseModel):
    source_text: str = Field(min_length=1)
    question_count: int = Field(default=5, ge=1, le=30)
    difficulty: str = "Medium"
    learning_level: str = "University Student"
    language: str = "English"


@router.post("/generate-quiz")
async def create_quiz(request: QuizRequest):

    if not request.source_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Study material cannot be empty."
        )

    try:
        quiz = generate_quiz(
            source_text=request.source_text,
            question_count=request.question_count,
            difficulty=request.difficulty,
            learning_level=request.learning_level,
            language=request.language
        )

        questions = quiz.get("questions", [])

        if len(questions) != request.question_count:
            raise ValueError(
                f"Expected {request.question_count} questions, "
                f"but received {len(questions)}."
            )

        for question in questions:
            options = question.get("options", {})
            correct_answer = question.get("correct_answer")

            if (
                not isinstance(options, dict)
                or set(options.keys()) != {"A", "B", "C", "D"}
                or correct_answer not in {"A", "B", "C", "D"}
            ):
                raise ValueError("Invalid MCQ structure returned by AI.")

        return {
            "status": "success",
            "message": "Quiz generated successfully!",
            "quiz": quiz
        }

    except Exception as error:
        print(f"Quiz route error: {error}")

        raise HTTPException(
            status_code=503,
            detail=str(error)
        )
