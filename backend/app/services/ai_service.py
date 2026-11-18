from google import genai

from app.config.settings import GEMINI_API_KEY, GEMINI_MODEL
from app.prompts.notes_prompt import NOTES_GENERATION_PROMPT


# Initialize Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)


def generate_notes(source_text: str) -> str:
    """
    Generates study notes from extracted document text.
    """

    try:

        # Insert extracted text into the prompt
        final_prompt = NOTES_GENERATION_PROMPT.format(
            source_text=source_text
        )

        # Send prompt to Gemini
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=final_prompt
        )

        # Return generated notes
        return response.text

    except Exception as error:
        raise Exception(f"Notes generation failed: {str(error)}")