import time

from google import genai
from google.genai import types

from app.config.settings import GEMINI_API_KEY, GEMINI_MODEL
from app.prompts.exam_prompts import EXAM_NOTES_PROMPT


# ============================================================
# GEMINI CLIENT CONFIGURATION
# ============================================================

# settings.py currently sets gemini-3.5-flash-lite as primary.
# Use Gemini 3.8 Flash as the fallback model.
FALLBACK_MODEL = "gemini-3.8-flash"

MAX_ATTEMPTS_PER_MODEL = 2
RETRY_DELAY_SECONDS = 3

REQUEST_TIMEOUT = 30000  # milliseconds

client = genai.Client(
    api_key=GEMINI_API_KEY,
    http_options=types.HttpOptions(
        timeout=REQUEST_TIMEOUT,
        # Retries are managed explicitly below.
        retry_options=types.HttpRetryOptions(attempts=1)
    )
)


# ============================================================
# TEMPORARY ERROR DETECTION
# ============================================================

def is_temporary_error(error: Exception) -> bool:
    """Identify errors that may succeed if retried later."""

    error_code = getattr(error, "code", None)

    if error_code is None:
        error_code = getattr(error, "status_code", None)

    try:
        error_code = int(error_code)
    except (TypeError, ValueError):
        error_code = None

    if error_code in (408, 429, 500, 502, 503, 504):
        return True

    message = str(error).lower()

    temporary_keywords = [
        "408",
        "429",
        "500",
        "502",
        "503",
        "504",
        "timeout",
        "timed out",
        "unavailable",
        "overloaded",
        "resource exhausted",
        "rate limit",
        "deadline exceeded",
        "temporarily unavailable",
        "high demand"
    ]

    return any(keyword in message for keyword in temporary_keywords)


# ============================================================
# EXAM NOTES GENERATION
# ============================================================

def generate_exam_notes(
    source_text: str,
    learning_level: str = "University Student",
    language: str = "English"
) -> str:
    """Generate exam-oriented notes using primary and fallback Gemini models."""

    if not source_text or not source_text.strip():
        raise ValueError("Study material cannot be empty.")

    if not learning_level or not learning_level.strip():
        raise ValueError("Learning level cannot be empty.")

    if not language or not language.strip():
        raise ValueError("Language cannot be empty.")

    start_time = time.perf_counter()

    print("\n========== EXAM NOTES GENERATION STARTED ==========")
    print(f"Input characters: {len(source_text)}")
    print(f"Learning level: {learning_level}")
    print(f"Language: {language}")

    final_prompt = EXAM_NOTES_PROMPT.format(
        source_text=source_text
    )

    final_prompt += f"""

ADDITIONAL GENERATION INSTRUCTIONS:

Target learning level: {learning_level}

Required output language: {language}

Adapt explanation depth and vocabulary to the specified
learning level.

Write the examination notes in the requested language.

Preserve technical terminology, mathematical expressions,
formulas and numerical accuracy.

Do not omit important information from the study material.
Use the supplied study material as the primary source.
Do not introduce unsupported facts or unrelated topics.
"""

    # Primary model comes from settings.py; duplicate names are removed.
    models_to_try = list(dict.fromkeys(
        model for model in (GEMINI_MODEL, FALLBACK_MODEL) if model
    ))

    if not models_to_try:
        raise RuntimeError("No Gemini model is configured.")

    last_error = None

    for model_index, model in enumerate(models_to_try):

        print(f"\nTrying Gemini model: {model}")

        for attempt in range(1, MAX_ATTEMPTS_PER_MODEL + 1):

            try:
                print(
                    f"Generation attempt {attempt}/"
                    f"{MAX_ATTEMPTS_PER_MODEL}"
                )

                response = client.models.generate_content(
                    model=model,
                    contents=final_prompt,
                    config={
                        "thinking_config": {
                            "thinking_level": "LOW"
                        }
                    }
                )

                generated_notes = (
                    response.text.strip() if response.text else ""
                )

                if not generated_notes:
                    raise ValueError(
                        "Gemini returned an empty response."
                    )

                elapsed = time.perf_counter() - start_time

                print(f"Successful model: {model}")
                print(f"Generation time: {elapsed:.2f} seconds")
                print(f"Output characters: {len(generated_notes)}")
                print(
                    "========== EXAM NOTES GENERATION COMPLETED ==========\n"
                )

                return generated_notes

            except Exception as error:
                last_error = error
                print(f"EXAM NOTES GENERATION ERROR: {error}")

                # Permanent errors (for example, invalid credentials or
                # malformed requests) should not be retried.
                if not is_temporary_error(error):
                    raise RuntimeError(
                        f"Exam notes generation failed with {model}: "
                        f"{error}"
                    ) from error

                # Retry the same model once after a short backoff.
                if attempt < MAX_ATTEMPTS_PER_MODEL:
                    delay = RETRY_DELAY_SECONDS * (2 ** (attempt - 1))

                    print(
                        f"Temporary error with {model}. "
                        f"Retrying same model in {delay} seconds..."
                    )
                    time.sleep(delay)
                    continue

                print(
                    f"All {MAX_ATTEMPTS_PER_MODEL} attempts failed "
                    f"for {model}."
                )

        # Try the fallback only after primary model retries are exhausted.
        if model_index < len(models_to_try) - 1:
            next_model = models_to_try[model_index + 1]
            print(f"Switching from {model} to fallback model {next_model}...")

    elapsed = time.perf_counter() - start_time

    print(
        f"All configured models failed after {elapsed:.2f} seconds."
    )
    print("========== EXAM NOTES GENERATION FAILED ==========\n")

    raise RuntimeError(
        "Exam notes generation is temporarily unavailable. "
        "All configured Gemini models failed after retry attempts. "
        f"Last error: {last_error}"
    ) from last_error
