# Manvi – Final Project Contribution Report

## NoteGenius – AI-Powered Academic Learning Assistant

**Contributor:** Manvi
**Project:** NoteGenius
**Contribution Area:** Exam Notes Generation, Simple Explanation and Prompt Engineering

---

## 1. Introduction

This report summarizes the development, testing, prompt engineering and documentation contributions made by Manvi to the NoteGenius project.

The primary responsibility was to develop and improve two AI-powered academic learning modules:

1. Exam Notes Generation
2. Simple Explanation Generation

The work also included prompt engineering, API testing, output evaluation and preparation of testing documentation.

## 2. Exam Notes Generation Module

**API Endpoint:** POST `/generate-exam-notes`

The Exam Notes module generates structured academic notes from supplied study material.

### Key Contributions

- Developed three prompt versions: V1, V2 and V3.
- Designed examination-oriented output structures.
- Included important definitions and concepts.
- Incorporated mathematical formulas and numerical examples.
- Improved revision-oriented content organization.
- Evaluated generated outputs using a common academic input.

### Prompt Engineering

**V1:** Baseline academic examination preparation.

**V2:** Improved organization with main topics, subtopics, explanations, formulas, comparisons and applications.

**V3:** Comprehensive academic structure with detailed theory, examination focus, revision and terminology.

### Testing

Newton's Second Law of Motion was used as the common test topic.

The generated outputs were examined for:

- Formula preservation.
- Numerical correctness.
- Definition accuracy.
- Content organization.
- Examination relevance.
- Source adherence.

V3 was identified as the preferred candidate based on the tested example.

## 3. Simple Explanation Generation Module

**API Endpoint:** POST `/explain`

The Simple Explanation module converts supplied academic content into understandable explanations according to the selected learning level and language.

### Key Contributions

- Developed three explanation prompt versions.
- Worked on learning-level adaptation.
- Worked on language adaptation.
- Implemented and integrated explanation generation through the backend service.
- Worked with Gemini API integration.
- Evaluated generated explanations for clarity and technical correctness.

### Testing

Photosynthesis was used to evaluate beginner-level Hinglish explanation generation.

Observed results included:

- Successful API response.
- Step-by-step explanation.
- Real-world Solar Kitchen analogy.
- Identification of scientific oversimplifications.
- Identification of a malformed phrase requiring proofreading.

## 4. Prompt Engineering Contribution

Three versions of prompts were developed for the Exam Notes and Simple Explanation modules.

The purpose was to improve:

- Output quality.
- Academic structure.
- Content completeness.
- Explanation clarity.
- Learning-level adaptation.
- Language consistency.
- Examination preparation.

The Exam Notes versions were compared using the same Newton's Second Law input.

V3 was selected as the preferred candidate based on the documented comparison.

A complete comparative selection for Simple Explanation remains subject to further testing of all three generated outputs.

## 5. Backend and API Contribution

The work involved the following backend components:

| Component | Contribution |
|---|---|
| FastAPI | API integration and testing |
| Exam Notes Service | Notes generation workflow |
| Explanation Service | Explanation generation workflow |
| Gemini API | AI content generation |
| Prompt Files | Prompt version management |
| Swagger UI | API testing and response verification |

The explanation service was also evaluated for fallback behaviour during a primary model timeout.

A successful response was observed through the fallback model.

## 6. Testing and Quality Evaluation

Testing activities included:

- Exam Notes generation testing.
- Simple Explanation generation testing.
- Prompt version comparison.
- Formula and numerical verification.
- Learning-level testing.
- Language consistency evaluation.
- API response verification.
- Identification of content quality issues.
- Identification of edge cases.

The documented testing report distinguishes executed tests from pending tests.

## 7. Documentation Contribution

The following documentation files were prepared:

| File | Purpose |
|---|---|
| `manvi_prompt_testing.md` | Prompt engineering testing report |
| `test_cases.md` | Functional test case documentation |
| `prompt_comparison_analysis.md` | V1, V2 and V3 comparison |
| `manvi_contribution_report.md` | Final contribution summary |

Testing evidence was organized into:

- `docs/testing/manvi/exam_notes/`
- `docs/testing/manvi/explanation/`
- `docs/testing/manvi/prompt_comparison/`

## 8. Key Observations

The testing process identified the following findings:

1. Prompt structure influences the organization of generated academic notes.
2. V3 provided the most comprehensive Exam Notes structure in the tested example.
3. Mathematical formulas and the Newton's Second Law numerical example were correctly preserved across all three Exam Notes versions.
4. Additional content can sometimes appear beyond the supplied source.
5. Simple Explanation successfully generated a beginner-level Hinglish explanation.
6. AI-generated explanations require technical accuracy checks and proofreading.
7. Fallback model behaviour helped recover from an observed primary model timeout.

## 9. Limitations and Future Improvements

Further improvements include:

- Testing more academic subjects.
- Evaluating all Simple Explanation prompt versions using identical inputs.
- Improving source adherence.
- Reducing unnecessary repetition.
- Improving scientific and technical accuracy.
- Testing incomplete and ambiguous inputs.
- Testing empty and whitespace-only inputs.
- Improving language consistency.
- Evaluating long-input handling.
- Performing additional API reliability tests.

## 10. Final Conclusion

Manvi's contribution to NoteGenius focused on the development and improvement of the Exam Notes Generation and Simple Explanation modules.

The work included prompt engineering, backend integration, API testing, output evaluation, comparative analysis and technical documentation.

Three Exam Notes prompt versions were developed and evaluated using a common academic input. V3 was identified as the preferred candidate based on its comprehensive academic organization.

The Simple Explanation module successfully generated a beginner-level Hinglish explanation during the documented test, while also revealing opportunities for improving output accuracy and proofreading.

The completed work establishes a foundation for further improvements in AI-assisted academic learning.

---

**Prepared By:** Manvi
**Project:** NoteGenius
**Contribution:** Exam Notes Generation, Simple Explanation Generation, Prompt Engineering, Testing and Documentation