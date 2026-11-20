
import json
import time
import random

from google import genai

from app.config.settings import GEMINI_API_KEY, GEMINI_MODEL
from app.prompts.flashcards_prompt import FLASHCARDS_GENERATION_PROMPT_V3


client = genai.Client(api_key=GEMINI_API_KEY)

FALLBACK_MODEL = "gemini-3.5-flash-lite"

MAX_RETRIES = 2
RETRY_DELAYS = [5]


def is_temporary_error(error: Exception) -> bool:
    """Identify temporary API errors and response-format errors."""

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
        "deadline exceeded", "temporarily unavailable",
        "invalid flashcard response",
        "flashcards list is missing",
        "invalid json",
        "empty response",
        "invalid flashcard"
    ]

    return any(keyword in message for keyword in temporary_keywords)


def parse_flashcard_response(
    response_text: str,
    flashcard_count: int
) -> dict:
    """Parse, normalize and validate Gemini flashcard responses."""

    if not response_text or not response_text.strip():
        raise ValueError("Gemini returned an empty response.")

    cleaned_text = response_text.strip()

    # Remove Markdown code fences.
    if cleaned_text.startswith("```"):
        cleaned_text = cleaned_text.replace("```json", "", 1)
        cleaned_text = cleaned_text.replace("```", "").strip()

    # Parse JSON.
    data = json.loads(cleaned_text)

    # Handle double-encoded JSON strings.
    if isinstance(data, str):
        data = json.loads(data)

    # Handle direct list response.
    if isinstance(data, list):
        cards = data
        result = {"title": "Generated Flashcards"}

    elif isinstance(data, dict):
        result = data

        cards = (
            data.get("flashcards")
            or data.get("cards")
        )

        # Handle nested objects.
        if isinstance(cards, dict):
            cards = (
                cards.get("flashcards")
                or cards.get("cards")
            )

        # Handle JSON encoded inside the flashcards field.
        if isinstance(cards, str):
            cards = json.loads(cards)

    else:
        raise ValueError(
            f"Invalid flashcard response structure. "
            f"Received type: {type(data).__name__}"
        )

    if not isinstance(cards, list):
        raise ValueError("Flashcards list is missing or invalid.")

    if len(cards) != flashcard_count:
        raise ValueError(
            f"Expected {flashcard_count} cards, "
            f"but Gemini generated {len(cards)}."
        )

    validated_cards = []

    for index, card in enumerate(cards, start=1):

        if not isinstance(card, dict):
            raise ValueError(
                f"Flashcard {index} has an invalid structure."
            )

        question = str(card.get("question", "")).strip()
        answer = str(card.get("answer", "")).strip()

        if not question:
            raise ValueError(
                f"Flashcard {index} has an empty question."
            )

        if not answer:
            raise ValueError(
                f"Flashcard {index} has an empty answer."
            )

        validated_cards.append({
            "id": card.get("id", index),
            "question": question,
            "answer": answer
        })

    result["flashcards"] = validated_cards

    if not result.get("title"):
        result["title"] = "Generated Flashcards"

    return result


def generate_flashcards(
    source_text: str,
    flashcard_count: int = 10,
    difficulty: str = "Medium",
    learning_level: str = "University Student",
    language: str = "English"
) -> dict:

    if not source_text or not source_text.strip():
        raise ValueError("Study material cannot be empty.")

    if not 1 <= flashcard_count <= 50:
        raise ValueError("Flashcard count must be between 1 and 50.")

    start_time = time.perf_counter()

    print("\n========== FLASHCARD GENERATION STARTED ==========")
    print(f"Input characters: {len(source_text)}")
    print(f"Flashcard count: {flashcard_count}")
    print(f"Difficulty: {difficulty}")
    print(f"Learning Level: {learning_level}")
    print(f"Language: {language}")
    print("Prompt version: V3")

    final_prompt = FLASHCARDS_GENERATION_PROMPT_V3.format(
        source_text=source_text,
        flashcard_count=flashcard_count,
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
                    f"Flashcard generation attempt "
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
                        "Gemini returned an empty response."
                    )

                # Print actual Gemini response for debugging.
                print(
                    "\n========== RAW GEMINI RESPONSE =========="
                )
                print(repr(response.text[:5000]))
                print(
                    "========== END RAW RESPONSE ==========\n"
                )

                data = parse_flashcard_response(
                    response.text,
                    flashcard_count
                )

                elapsed = time.perf_counter() - start_time

                print(f"Successful model: {model}")
                print(f"Generation time: {elapsed:.2f} seconds")
                print(
                    f"Generated flashcards: "
                    f"{len(data['flashcards'])}"
                )

                print(
                    "========== FLASHCARD GENERATION COMPLETED ==========\n"
                )

                return data

            except Exception as error:

                print(f"FLASHCARD GENERATION ERROR: {error}")
                last_error = error

                if not is_temporary_error(error):
                    break

                if attempt < MAX_RETRIES:

                    delay = (
                        RETRY_DELAYS[attempt - 1]
                        + random.uniform(0, 2)
                    )

                    print(
                        f"Temporary error. "
                        f"Retrying in {delay:.2f} seconds..."
                    )

                    time.sleep(delay)

                else:
                    print(f"All attempts failed for {model}.")

        print("Switching to next available model...")

    raise Exception(
        f"Flashcard generation failed on all configured models. "
        f"Last error: {last_error}"
    ) from last_error
