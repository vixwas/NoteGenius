
import time
from google import genai

from app.config.settings import GEMINI_API_KEY, GEMINI_MODEL
from app.prompts.notes_prompt import NOTES_GENERATION_PROMPT
from app.prompts.summary_prompts import SMART_SUMMARY_PROMPT


client = genai.Client(api_key=GEMINI_API_KEY)

FALLBACK_MODEL = "gemini-3.5-flash-lite"
MAX_RETRIES = 2
RETRY_DELAYS = [5]


def is_quota_error(error: Exception) -> bool:
    message = str(error).lower()

    return any(keyword in message for keyword in [
        "resource_exhausted",
        "quota exceeded",
        "per day limit",
        "daily limit",
    ])


def is_temporary_error(error: Exception) -> bool:
    code = getattr(error, "code", None)

    if code is None:
        code = getattr(error, "status_code", None)

    try:
        code = int(code)
    except (TypeError, ValueError):
        code = None

    if code in (429, 500, 502, 503, 504):
        return True

    message = str(error).lower()

    return any(keyword in message for keyword in [
        "429", "500", "502", "503", "504",
        "unavailable", "overloaded",
        "rate limit", "deadline exceeded",
        "temporarily unavailable",
    ])


def get_models_to_try():
    return list(dict.fromkeys([
        GEMINI_MODEL,
        FALLBACK_MODEL,
    ]))


# =====================================================
# NORMAL AI NOTES GENERATION
# =====================================================

def generate_notes(source_text: str) -> str:

    if not source_text or not source_text.strip():
        raise ValueError("Study material cannot be empty.")

    print("\n========== AI NOTES GENERATION STARTED ==========")
    print(f"Input characters: {len(source_text)}")

    final_prompt = NOTES_GENERATION_PROMPT.format(
        source_text=source_text
    )

    last_error = None
    start_time = time.perf_counter()

    for model in get_models_to_try():

        print(f"\nTrying Gemini model: {model}")

        for attempt in range(1, MAX_RETRIES + 1):

            try:
                print(f"Attempt {attempt}/{MAX_RETRIES}")

                response = client.models.generate_content(
                    model=model,
                    contents=final_prompt,
                    config={
                        "thinking_config": {
                            "thinking_level": "LOW"
                        }
                    }
                )

                if not response.text:
                    raise ValueError("Gemini returned an empty response.")

                elapsed = time.perf_counter() - start_time

                print(f"Successful model: {model}")
                print(f"Generation time: {elapsed:.2f} seconds")
                print(f"Output characters: {len(response.text)}")
                print("========== NOTES GENERATION COMPLETED ==========\n")

                return response.text

            except Exception as error:
                last_error = error

                print(f"NOTES GENERATION ERROR: {error}")

                if not is_temporary_error(error):
                    break

                if is_quota_error(error):
                    print("Quota error detected. Switching model.")
                    break

                if attempt < MAX_RETRIES:
                    delay = RETRY_DELAYS[min(attempt - 1, len(RETRY_DELAYS) - 1)]
                    print(f"Retrying in {delay} seconds...")
                    time.sleep(delay)

        print("Switching to next available model...")

    raise Exception(
        f"Notes generation failed on all configured models. "
        f"Last error: {last_error}"
    ) from last_error


# =====================================================
# STREAMING AI NOTES GENERATION
# =====================================================

def generate_notes_stream(source_text: str):

    if not source_text or not source_text.strip():
        raise ValueError("Study material cannot be empty.")

    print("\n========== AI STREAM STARTED ==========")
    print(f"Input characters: {len(source_text)}")

    final_prompt = NOTES_GENERATION_PROMPT.format(
        source_text=source_text
    )

    last_error = None

    for model in get_models_to_try():

        print(f"\nTrying Gemini model: {model}")

        for attempt in range(1, MAX_RETRIES + 1):

            received_text = False

            try:
                print(f"Streaming attempt {attempt}/{MAX_RETRIES}")

                start_time = time.perf_counter()

                response_stream = client.models.generate_content_stream(
                    model=model,
                    contents=final_prompt,
                    config={
                        "thinking_config": {
                            "thinking_level": "LOW"
                        }
                    }
                )

                for chunk in response_stream:

                    if chunk.text:
                        received_text = True
                        yield chunk.text

                if not received_text:
                    raise ValueError("Gemini returned an empty response.")

                elapsed = time.perf_counter() - start_time

                print(f"Successful model: {model}")
                print(f"Streaming completed in {elapsed:.2f} seconds")
                print("========== AI STREAM COMPLETED ==========\n")

                return

            except Exception as error:

                last_error = error

                print(f"AI STREAM ERROR: {error}")

                # Never restart after sending partial output.
                if received_text:
                    print("Partial output received. Stopping retries.")
                    raise

                if not is_temporary_error(error):
                    break

                if is_quota_error(error):
                    print("Quota error detected. Switching model.")
                    break

                if attempt < MAX_RETRIES:
                    delay = RETRY_DELAYS[min(attempt - 1, len(RETRY_DELAYS) - 1)]
                    print(f"Retrying in {delay} seconds...")
                    time.sleep(delay)

        print("Switching to next available model...")

    raise Exception(
        f"Notes generation failed on all configured models. "
        f"Last error: {last_error}"
    ) from last_error


# =====================================================
# SMART SUMMARY GENERATION
# =====================================================

def generate_summary(source_text: str) -> str:

    if not source_text or not source_text.strip():
        raise ValueError("Study material cannot be empty.")

    print("\n========== SMART SUMMARY GENERATION STARTED ==========")
    print(f"Input characters: {len(source_text)}")

    final_prompt = SMART_SUMMARY_PROMPT.format(
        source_text=source_text
    )

    last_error = None
    start_time = time.perf_counter()

    for model in get_models_to_try():

        print(f"\nTrying Gemini model: {model}")

        for attempt in range(1, MAX_RETRIES + 1):

            try:
                print(f"Attempt {attempt}/{MAX_RETRIES}")

                response = client.models.generate_content(
                    model=model,
                    contents=final_prompt,
                    config={
                        "thinking_config": {
                            "thinking_level": "LOW"
                        }
                    }
                )

                if not response.text:
                    raise ValueError("Gemini returned an empty summary.")

                elapsed = time.perf_counter() - start_time

                print(f"Successful model: {model}")
                print(f"Generation time: {elapsed:.2f} seconds")
                print(f"Output characters: {len(response.text)}")
                print("========== SMART SUMMARY COMPLETED ==========\n")

                return response.text

            except Exception as error:
                last_error = error

                print(f"SMART SUMMARY ERROR: {error}")

                if not is_temporary_error(error):
                    break

                if is_quota_error(error):
                    print("Quota error detected. Switching model.")
                    break

                if attempt < MAX_RETRIES:
                    delay = RETRY_DELAYS[
                        min(attempt - 1, len(RETRY_DELAYS) - 1)
                    ]
                    print(f"Retrying in {delay} seconds...")
                    time.sleep(delay)

        print("Switching to next available model...")

    raise Exception(
        f"Smart Summary generation failed on all configured models. "
        f"Last error: {last_error}"
    ) from last_error
