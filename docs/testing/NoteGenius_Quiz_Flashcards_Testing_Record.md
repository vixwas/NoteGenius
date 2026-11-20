# NoteGenius – Quiz & Flashcards Testing Record

**Owner:** Vishwas
**Scope:** Quiz / MCQ prompt, Flashcards prompt, frontend integration, output validation, prompt iteration
**Date of recorded tests:** 20 November 2026

> PASS means observed in an actual run. NOT RUN means planned but not yet executed. Do not mark a test as passed without running it.

## 1. Actual Integration Test Results

| ID | Feature | Prompt | Successful model | Input size | Requested/generated | Time | Result |
|---|---|---|---|---:|---:|---:|---|
| Q-01 | Quiz | V1 | Model not recorded | Not recorded | 5 / 5 | Not recorded | PASS |
| Q-02 | Quiz | V1 | Gemini 3.5 Flash-Lite fallback | 23,362 chars | 5 / 5 | 35.60 sec | PASS |
| Q-03 | Quiz | V1 | Gemini 3.5 Flash-Lite fallback | Not recorded | 5 / 5 | 20.43 sec | PASS |
| F-01 | Flashcards | V1 | Model not recorded | 5,842 chars | 5 / 5 | 421.23 sec | PASS |
| F-02 | Flashcards | V2 | Model not recorded | Not recorded | 5 / 5 | 285.57 sec | PASS |
| F-03 | Flashcards | V2 | Gemini 3.8 Flash | 5,842 chars | 5 / 5 | 359.31 sec | PASS |
| F-04 | Flashcards | V3 | Gemini 3.5 Flash-Lite fallback | 5,607 chars | 5 / 5 | 16.58 sec | PASS |

**Interpretation:** These are individual observed runs, not a controlled benchmark. Model, input length, quota state and service load differed. The V3 run does not prove that prompt wording alone caused the speed difference.

## 2. Error and Fallback Evidence

| ID | Scenario | Observed behaviour | Result |
|---|---|---|---|
| E-01 | Gemini 3.8 Flash returned repeated HTTP 503 for Quiz | Primary attempts exhausted; fallback generated 5 questions; endpoint returned HTTP 200 | PASS |
| E-02 | Gemini 3.8 Flash returned quota error 429 and then 503 for Flashcards | Service switched to Gemini 3.5 Flash-Lite; generated 5 cards; endpoint returned HTTP 200 | PASS |
| E-03 | Frontend/backend connectivity | Successful `/generate-quiz` and `/generate-flashcards` requests returned HTTP 200 | PASS |

## 3. Frontend Verification

| ID | Check | Observed result | Status |
|---|---|---|---|
| UI-01 | Quiz questions and options display | Options displayed in separate readable rows | PASS |
| UI-02 | MCQ selection | Radio selection worked | PASS |
| UI-03 | Submit feedback | Correct option green; wrong selected option red | PASS |
| UI-04 | Explanation display | Correct answer and explanation displayed after submission | PASS |
| UI-05 | Final score and percentage | Capture/record final score evidence | NOT RUN |
| UI-06 | Retake resets quiz | User reported retake completed | PASS – user verified |
| UI-07 | Flashcard question display | Five cards displayed in a responsive grid | PASS |
| UI-08 | Flashcard flip interaction | User manually verified click-to-flip interaction | PASS – user verified |
| UI-09 | Flashcard answer accuracy | Manually compare answers against source material | NOT RUN |

## 4. Additional Test Matrix

| Test ID | Feature | Test input / condition | Expected result | Status |
|---|---|---|---|---|
| T-01 | Quiz | Standard study material; request 5 questions | Exactly 5 MCQs, four options each, correct answer and explanation | PASS – actual runs |
| T-02 | Quiz | Beginner level, English | Accessible, source-grounded questions | NOT RUN |
| T-03 | Quiz | Advanced level, English | Higher-level questions, still source-grounded | NOT RUN |
| T-04 | Quiz | Hindi | Questions and explanations in Hindi | PASS – 5 generated; HTTP 200 |
| T-05 | Quiz | Hinglish | Questions and explanations in Hinglish | PASS – 5 generated; HTTP 200; language consistency review pending |
| T-06 | Quiz | Minimum count: 1 | Exactly one valid MCQ | NOT RUN |
| T-07 | Quiz | Maximum count: 30 | Exactly 30 valid MCQs, subject to model/context limits | NOT RUN |
| T-08 | Flashcards | Standard material; request 5 cards | Exactly 5 non-empty question/answer cards | PASS – actual runs |
| T-09 | Flashcards | Beginner level, English | Clear beginner-level cards | NOT RUN |
| T-10 | Flashcards | Hindi | Questions and answers in Hindi | PASS – 5 generated; HTTP 200 |
| T-11 | Flashcards | Hinglish | Questions and answers in Hinglish | PASS – 5 generated; HTTP 200; language consistency review pending |
| T-12 | Flashcards | Minimum count: 1 | Exactly one valid card | NOT RUN |
| T-13 | Flashcards | Maximum count: 50 | Exactly 50 valid cards, subject to model/context limits | NOT RUN |
| T-14 | Quiz | Empty source text | HTTP 422 validation error | PASS |
| T-15 | Flashcards | Empty source text | HTTP 422 validation error | PASS |
| T-16 | Both | Count = 0 | HTTP 422 validation error | PASS |
| T-17 | Quiz | Count = 31 | HTTP 422; maximum is 30 | PASS |
| T-18 | Flashcards | Count = 51 | HTTP 422; maximum is 50 | PASS |
| T-19 | Both | Primary model returns 503/429 | Retry and fallback observed | PASS |
| T-20 | Flashcards UI | Click card twice | Answer appears, then question returns | PASS – user verified |

## 5. Edge Cases

| Edge ID | Edge case | Expected behaviour | Status |
|---|---|---|---|
| EC-01 | Empty Quiz study material | Reject input with HTTP 422 validation error before Gemini API call | PASS |
| EC-02 | Empty Flashcards study material | Reject input with HTTP 422 validation error before Gemini API call | PASS |
| EC-03 | Quiz question count is 0 | Reject input; minimum allowed count is 1 | PASS |
| EC-04 | Flashcard count is 0 | Reject input; minimum allowed count is 1 | PASS |
| EC-05 | Quiz question count exceeds 30 | Reject input; maximum allowed count is 30 | PASS |
| EC-06 | Flashcard count exceeds 50 | Reject input; maximum allowed count is 50 | PASS |
| EC-07 | Malformed JSON returned by Gemini | Reject invalid JSON response instead of returning invalid quiz/flashcards | NOT RUN |
| EC-08 | Missing questions/flashcards list or incorrect generated count | Reject incomplete or invalid model output | NOT RUN |
| EC-09 | Empty question or answer field in generated flashcards | Reject flashcard output containing empty fields | NOT RUN |
| EC-10 | Primary Gemini model returns HTTP 429 or 503 | Retry the request and attempt the configured fallback model | PASS – observed |
| EC-11 | Both primary and fallback models fail | Return a clear error response to the frontend without showing false success | NOT RUN |

## 6. Prompt Iteration Summary

| Feature | Version | Main characteristics | Evidence / decision |
|---|---|---|---|
| Quiz | V1 | Source-grounded MCQs, exact count, four options, one correct answer, explanation, difficulty/level/language | Integrated; 5-question quizzes generated |
| Flashcards | V1 | Initial structured question/answer prompt | 5 cards generated; one recorded run took 421.23 sec |
| Flashcards | V2 | More compact prompt; exact count and concise answers | Multiple successful 5-card runs; times varied |
| Flashcards | V3 | Removes repetitive wording while retaining core constraints and JSON structure | 5 cards generated in 16.58 sec using fallback; quality review pending |

### Prompt Improvement Rationale

- Preserve exact output count and JSON schema because frontend rendering depends on predictable fields.
- Keep source-grounding and duplicate avoidance to reduce unsupported or repetitive material.
- Keep answers concise for revision.
- Remove repeated instructions without deleting important constraints.
- Retain service-layer validation; prompt instructions alone cannot guarantee valid output.

**Limitation:** V2 and V3 timing observations used different successful models and slightly different input sizes. They are operational observations, not an isolated prompt-speed experiment. A controlled comparison requires identical source text, card count, model and settings, with multiple runs per version.

## 7. Screenshot Evidence

Actual screenshots saved under `docs/testing/evidence/`:

| Screenshot | Status |
|---|---|
| `quiz_hindi_success.png` | Saved – non-empty file |
| `flashcards_hindi_success.png` | Saved – non-empty file |
| `quiz_hinglish_success.png` | Saved – non-empty file |
| `flashcards_hinglish_final_retest.png` | Saved – non-empty file |

The following files exist but are empty (0 bytes), so they are not considered valid evidence:

- `flashcards_ui.png`
- `flashcards_v3.png`
- `quiz_feedback.png`
- `quiz_generation.png`

Additional screenshots for fallback, quiz score/retake and validation tests remain pending.

## 8. Current Completion Assessment

- Quiz generation and frontend evaluation: implemented and integration-tested.
- Flashcard generation and frontend display: implemented and integration-tested.
- Automatic fallback: observed working for Quiz and Flashcards.
- Six input/count validation tests: passed through Swagger UI.
- Hindi and Hinglish generation tests: four successful HTTP 200 runs with exactly five generated items each.
- Flashcard flip interaction: manually verified by user.
- Hinglish language consistency: further quality review pending.
- Prompt iteration: V1/V2/V3 records exist; final quality review and controlled comparison remain.
- Four non-empty screenshot files saved in the evidence folder.
- Full milestone testing: incomplete until the remaining NOT RUN tests are actually executed and evidenced.

**Do not present NOT RUN cases as passed.**