
import sys
import time
from pathlib import Path

# Locate the backend so we can reuse its existing Gemini client
PROJECT_DIR = Path(__file__).resolve().parent
BACKEND_DIR = PROJECT_DIR / "backend"
sys.path.insert(0, str(BACKEND_DIR))

from app.services.ai_service import client, get_models_to_try

# File locations
PROMPT_DIR = PROJECT_DIR / "prompt_versions" / "abhinav" / "smart_summary"
SOURCE_FILE = PROMPT_DIR / "test_data" / "sample.txt"
OUTPUT_DIR = PROMPT_DIR / "test_outputs"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Read sample document
if not SOURCE_FILE.exists():
    raise FileNotFoundError(f"Sample file not found: {SOURCE_FILE}")

source_text = SOURCE_FILE.read_text(encoding="utf-8")

if not source_text.strip():
    raise ValueError("Sample document is empty.")


def load_prompt(version):
    prompt_file = PROMPT_DIR / f"{version}.txt"

    if not prompt_file.exists():
        raise FileNotFoundError(f"Prompt file missing: {prompt_file}")

    prompt = prompt_file.read_text(encoding="utf-8").strip()

    # Handle V1 if it contains a Python variable wrapper
    if prompt.startswith("SMART_SUMMARY_PROMPT"):
        first_quote = prompt.find('"""')
        last_quote = prompt.rfind('"""')

        if first_quote != -1 and last_quote > first_quote:
            prompt = prompt[first_quote + 3:last_quote].strip()

    return prompt


def generate_summary(version):
    print(f"\n========== TESTING {version.upper()} ==========")

    prompt = load_prompt(version)

    # Insert source material without interpreting other braces
    if "{source_text}" in prompt:
        final_prompt = prompt.replace("{source_text}", source_text)
    else:
        final_prompt = (
            prompt
            + "\n\nSTUDY MATERIAL:\n"
            + source_text
        )

    last_error = None

    for model in get_models_to_try():
        try:
            print(f"Using model: {model}")

            start_time = time.perf_counter()

            response = client.models.generate_content(
                model=model,
                contents=final_prompt,
                config={
                    "thinking_config": {
                        "thinking_level": "LOW"
                    }
                }
            )

            elapsed = time.perf_counter() - start_time

            if not response.text:
                raise ValueError("Gemini returned an empty response.")

            output_file = OUTPUT_DIR / f"{version}_output.txt"
            output_file.write_text(
                response.text,
                encoding="utf-8"
            )

            print("Status: SUCCESS")
            print(f"Model: {model}")
            print(f"Generation time: {elapsed:.2f} seconds")
            print(f"Output characters: {len(response.text)}")
            print(f"Saved to: {output_file}")

            return {
                "version": version,
                "status": "SUCCESS",
                "model": model,
                "time": round(elapsed, 2),
                "characters": len(response.text)
            }

        except Exception as error:
            last_error = error
            print(f"Failed with {model}: {error}")

    print(f"{version} failed: {last_error}")

    return {
        "version": version,
        "status": "FAILED",
        "model": "-",
        "time": "-",
        "characters": "-"
    }


# Test all three prompt versions
results = []

for version in ["v1", "v2", "v3","final"]:
    results.append(generate_summary(version))

# Save test results
report_file = PROMPT_DIR / "test_results.md"

with report_file.open("w", encoding="utf-8") as file:
    file.write("# Smart Summary Prompt Testing Results\n\n")
    file.write("All prompts were tested using the same source document.\n\n")
    file.write("| Version | Status | Model | Time (seconds) | Output Characters |\n")
    file.write("|---|---|---|---:|---:|\n")

    for result in results:
        file.write(
            f"| {result['version']} | {result['status']} | "
            f"{result['model']} | {result['time']} | "
            f"{result['characters']} |\n"
        )

print("\n========== TESTING COMPLETED ==========")
print(f"Results saved in: {report_file}")
print(f"Generated summaries saved in: {OUTPUT_DIR}")
