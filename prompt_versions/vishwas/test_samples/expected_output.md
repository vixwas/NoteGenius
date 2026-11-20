# Expected Output Structures

These are structural examples for validating generated responses.
They are not actual Gemini API responses.

## 1. Quiz Expected Structure

{
  "title": "Operating System Quiz",
  "questions": [
    {
      "id": 1,
      "question": "What is an operating system?",
      "options": {
        "A": "System software",
        "B": "Hardware device",
        "C": "Programming language",
        "D": "Web browser"
      },
      "correct_answer": "A",
      "explanation": "An operating system manages computer hardware and software resources."
    }
  ]
}

## 2. Flashcards Expected Structure

{
  "title": "Operating System Flashcards",
  "flashcards": [
    {
      "id": 1,
      "question": "What is an operating system?",
      "answer": "System software that manages computer hardware and software resources."
    }
  ]
}

## Validation Requirements

- Quiz response must contain a title and questions array.
- Each quiz question must have four options.
- Each quiz question must have one correct answer and an explanation.
- Flashcards response must contain a title and flashcards array.
- Each flashcard must have a non-empty question and answer.
- Generated item count must match the requested count.