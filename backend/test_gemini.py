from app.services.ai_service import generate_notes


sample_text = """
Artificial Intelligence is a branch of computer science.

Machine Learning is a subset of Artificial Intelligence
that allows computers to learn from data.

Deep Learning uses neural networks with multiple layers
to learn complex patterns.
"""


try:
    notes = generate_notes(sample_text)

    print("\n========== GENERATED NOTES ==========\n")
    print(notes)
    print("\n===================================\n")

except Exception as error:
    print("\nError:")
    print(error)