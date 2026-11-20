
import json
import time
import random

from google import genai

from app.config.settings import GEMINI_API_KEY, GEMINI_MODEL
from app.prompts.quiz_prompt import QUIZ_GENERATION_PROMPT_V1


client = genai.Client(api_key=GEMINI_API_KEY)

FALLBACK_MODEL = "gemini-3.5-flash-lite"

MAX_RETRIES = 2
RETRY_DELAYS = [5]


def is_temporary_error(error: Exception) -> bool:
    """Identify temporary Gemini API errors."""

    error_code = getattr(error, "code", None)

    if error_code is None:
        error_code = getattr(error, "status_code", None)

    try:
        error_code = int(error_code)
    except (TypeError, ValueError):
        error_code = None

    if error_code in (429, 500, 502, 503, 504):
        return True

    message = str(error).lower()

    temporary_keywords = [
        "503", "429", "500", "502", "504",
        "unavailable", "high demand", "overloaded",
        "resource exhausted", "rate limit",
        "deadline exceeded", "temporarily unavailable"
    ]

    return any(keyword in message for keyword in temporary_keywords)


def generate_quiz(
    source_text: str,
    question_count: int = 5,
    difficulty: str = "Medium",
    learning_level: str = "University Student",
    language: str = "English"
) -> dict:

    if not source_text or not source_text.strip():
        raise ValueError("Study material cannot be empty.")

    if not 1 <= question_count <= 30:
        raise ValueError("Question count must be between 1 and 30.")

    start_time = time.perf_counter()

    print("\n========== QUIZ GENERATION STARTED ==========")
    print(f"Input characters: {len(source_text)}")
    print(f"Question count: {question_count}")
    print(f"Difficulty: {difficulty}")
    print(f"Learning Level: {learning_level}")
    print(f"Language: {language}")

    final_prompt = QUIZ_GENERATION_PROMPT_V1.format(
        source_text=source_text,
        question_count=question_count,
        difficulty=difficulty,
        learning_level=learning_level,
        language=language
    )

    models_to_try = list(dict.fromkeys([
        GEMINI_MODEL,
        FALLBACK_MODEL
    ]))

    last_error = None

    for model in models_to_try:

        print(f"\nTrying Gemini model: {model}")

        for attempt in range(1, MAX_RETRIES + 1):

            try:
                print(
                    f"Quiz generation attempt "
                    f"{attempt}/{MAX_RETRIES} using {model}"
                )

                response = client.models.generate_content(
                    model=model,
                    contents=final_prompt,
                    config={
                        "thinking_config": {
                            "thinking_level": "LOW"
                        },
                        "response_mime_type": "application/json"
                    }
                )

                if not response.text:
                    raise ValueError(
                        "Gemini returned an empty quiz."
                    )

                quiz_data = json.loads(response.text)

                if not isinstance(quiz_data, dict):
                    raise ValueError(
                        "Gemini returned an invalid quiz structure."
                    )

                questions = quiz_data.get("questions")

                if not isinstance(questions, list):
                    raise ValueError(
                        "Quiz response does not contain a valid questions list."
                    )

                if len(questions) != question_count:
                    raise ValueError(
                        f"Expected {question_count} questions, "
                        f"but Gemini generated {len(questions)}."
                    )

                elapsed = time.perf_counter() - start_time

                print(f"Successful model: {model}")
                print(f"Quiz generation time: {elapsed:.2f} seconds")
                print(f"Generated questions: {len(questions)}")
                print("========== QUIZ GENERATION COMPLETED ==========\n")

                return quiz_data

            except Exception as error:

                print(f"QUIZ GENERATION ERROR: {error}")

                if not is_temporary_error(error):
                    raise Exception(
                        f"Quiz generation failed: {str(error)}"
                    ) from error

                last_error = error

                if attempt < MAX_RETRIES:

                    delay = (
                        RETRY_DELAYS[attempt - 1]
                        + random.uniform(0, 2)
                    )

                    print(
                        f"Temporary error. Retrying in "
                        f"{delay:.2f} seconds..."
                    )

                    time.sleep(delay)

                else:
                    print(
                        f"All attempts failed for {model}."
                    )

        print(
            f"Switching to next available model..."
        )

    raise Exception(
        f"Quiz generation failed on all configured models. "
        f"Last error: {last_error}"
    ) from last_error
