
# Detailed Notes – Prompt Testing Results

## 1. Objective

The objective of this testing is to compare different prompt versions for the NoteGenius Detailed Notes feature and identify the prompt that generates the most accurate, comprehensive, structured, and student-friendly academic notes.

## 2. Prompt Versions

| Version | Description |
|---|---|
| V1 | Original Detailed Notes prompt used in NoteGenius |
| V2 | Improved prompt with refinements to note organization and explanation |
| V3 | Further refined prompt focusing on completeness, clarity, and preservation of technical information |
| Final | Selected prompt after testing and evaluation |

## 3. Testing Methodology

- The same study material should be provided to all prompt versions.
- Each prompt generates notes using the Gemini API.
- Generated outputs are saved separately for comparison.
- The outputs are evaluated using common quality criteria.
- The best-performing prompt is selected for the Detailed Notes feature.

## 4. Evaluation Criteria

Each prompt is evaluated on a scale of 1 to 5.

| Criterion | Description |
|---|---|
| Accuracy | Correctness of information and preservation of source meaning |
| Completeness | Coverage of important concepts and technical details |
| Clarity | Ease of understanding and quality of explanations |
| Organization | Proper headings, subheadings, bullets, and logical flow |
| Formatting | Correct presentation of formulas, code, tables, and numerical information |

## 5. Comparative Evaluation

| Prompt | Accuracy | Completeness | Clarity | Organization | Formatting | Total |
|---|---:|---:|---:|---:|---:|---:|
| V1 | 4 | 5 | 5 | 5 | 5 | 24/25 |
| V2 | 4 | 4 | 5 | 5 | 5 | 23/25 |
| V3 | 3 | 3 | 4 | 4 | 4 | 18/25 |
| Final | 4 | 4 | 5 | 5 | 4 | 22/25 |

## 6. Observations

The generated outputs will be compared to identify improvements in:

- Preservation of important concepts and technical terminology.
- Quality and clarity of explanations.
- Retention of formulas, numerical examples, and algorithms.
- Organization of notes into meaningful sections.
- Mathematical and code formatting.
- Avoidance of unnecessary repetition and missing information.

## 7. Final Prompt Selection

The final prompt will be selected based on its overall performance across the evaluation criteria. Priority will be given to source accuracy, completeness, clear explanations, and correct technical formatting.

## 8. Conclusion

Prompt testing provides a systematic way to improve the Detailed Notes feature of NoteGenius. The selected prompt will be integrated into the backend after evaluation to improve the quality and consistency of generated academic notes.


## 7. Automated Testing Results

All four prompts were tested using the same study material.

| Version | Status | Model | Time (seconds) | Output Characters |
|---|---|---|---:|---:|
| v1 | SUCCESS | gemini-3.5-flash-lite | 2.93 | 3720 |
| v2 | SUCCESS | gemini-3.5-flash-lite | 2.37 | 2559 |
| v3 | SUCCESS | gemini-3.5-flash-lite | 2.0 | 1604 |
| final | SUCCESS | gemini-3.5-flash-lite | 2.11 | 2093 |
