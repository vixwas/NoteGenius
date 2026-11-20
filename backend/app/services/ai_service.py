
import time

from google import genai
from app.config.settings import GEMINI_API_KEY, GEMINI_MODEL
from app.prompts.notes_prompt import NOTES_GENERATION_PROMPT


# Initialize Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)


# =====================================================
# NORMAL AI NOTES GENERATION
# =====================================================

def generate_notes(source_text: str) -> str:
    try:
        print("\n========== AI GENERATION STARTED ==========")
        print(f"Input characters: {len(source_text)}")

        start_time = time.perf_counter()

        final_prompt = NOTES_GENERATION_PROMPT.format(
            source_text=source_text
        )

        print("Sending request to Gemini...")

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=final_prompt,
            config={
                "thinking_config": {
                    "thinking_level": "LOW"
                }
            }
        )

        elapsed_time = time.perf_counter() - start_time

        print("\n========== GEMINI RESPONSE DETAILS ==========")
        print(f"Gemini response time: {elapsed_time:.2f} seconds")
        print(f"Output characters: {len(response.text or '')}")
        print(f"Usage metadata: {response.usage_metadata}")
        print("========== RESPONSE DETAILS COMPLETED ==========\n")

        if not response.text:
            raise Exception("Gemini returned an empty response.")

        print("========== AI GENERATION COMPLETED ==========\n")

        return response.text

    except Exception as error:
        print(f"AI GENERATION ERROR: {error}")
        raise Exception(f"Notes generation failed: {str(error)}")


# =====================================================
# STREAMING AI NOTES GENERATION WITH AUTOMATIC RETRY
# =====================================================

def generate_notes_stream(source_text: str):

    max_attempts = 3

    print("\n========== AI STREAM STARTED ==========")
    print(f"Input characters: {len(source_text)}")

    final_prompt = NOTES_GENERATION_PROMPT.format(
        source_text=source_text
    )

    for attempt in range(1, max_attempts + 1):

        received_text = False

        try:
            print(
                f"\nConnecting to Gemini... "
                f"Attempt {attempt}/{max_attempts}"
            )

            start_time = time.perf_counter()

            response_stream = client.models.generate_content_stream(
                model=GEMINI_MODEL,
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

                    # Send generated text immediately
                    yield chunk.text

            elapsed_time = time.perf_counter() - start_time

            if not received_text:
                raise Exception("Gemini returned an empty response.")

            print(
                f"\nGemini streaming completed in "
                f"{elapsed_time:.2f} seconds"
            )

            print("========== AI STREAM COMPLETED ==========\n")

            return

        except Exception as error:

            error_message = str(error).upper()

            print(f"\nAI STREAM ERROR: {error}")

            # Identify temporary Gemini errors
            temporary_error = any(
                code in error_message
                for code in [
                    "503",
                    "UNAVAILABLE",
                    "429",
                    "RESOURCE_EXHAUSTED",
                    "500",
                    "502",
                    "504",
                    "INTERNAL",
                    "DEADLINE_EXCEEDED"
                ]
            )

            # Never restart generation after sending partial text
            if received_text:
                print(
                    "Partial response already sent. "
                    "Stopping retry to prevent duplicate notes."
                )
                raise

            # Stop for non-temporary errors
            if not temporary_error:
                raise

            # Stop after maximum attempts
            if attempt == max_attempts:
                print("Maximum retry attempts reached.")
                raise

            # Exponential backoff
            wait_time = 2 ** attempt

            print(
                f"Gemini temporarily unavailable. "
                f"Retrying in {wait_time} seconds..."
            )

            time.sleep(wait_time)
