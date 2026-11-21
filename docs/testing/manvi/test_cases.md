# NoteGenius – Manvi Test Cases Documentation

**Developer:** Manvi
**Modules:** Exam Notes Generation and Simple Explanation
**AI Provider:** Google Gemini API
**Backend Framework:** FastAPI
**Testing Tool:** Swagger UI

---

## 1. Testing Overview

This document describes the functional test cases designed for the Exam Notes Generation and Simple Explanation modules of NoteGenius.

The purpose is to verify:

- API functionality.
- Academic content accuracy.
- Output completeness.
- Learning-level adaptation.
- Language consistency.
- Mathematical correctness.
- Input validation.
- Error handling and API reliability.

## 2. Testing Environment

| Component | Details |
|---|---|
| Backend | FastAPI |
| AI Provider | Google Gemini API |
| Programming Language | Python |
| Testing Interface | Swagger UI |
| Development Tool | Visual Studio Code |
| Operating System | Windows |

## 3. Simple Explanation Test Cases

| Test ID | Input Topic | Learning Level | Language | Expected Result | Status |
|---|---|---|---|---|---|
| EX-01 | Photosynthesis | Beginner | Hinglish | Simple explanation with analogy | Executed |
| EX-02 | Newton's Laws | University Student | English | Detailed technical explanation | Pending |
| EX-03 | Binary Search | Beginner | Hindi | Step-by-step explanation | Pending |
| EX-04 | Database Normalization | Intermediate | English | Conceptual explanation | Pending |
| EX-05 | Operating System | University Student | Hinglish | Technical explanation | Pending |
| EX-06 | Empty Input | Beginner | English | Appropriate validation error | Pending |

### EX-01: Photosynthesis

**Objective:** Verify beginner-level explanation generation in Hinglish.

**Input:** Photosynthesis explanation in Hinglish for a beginner.

**Observed Result:**

- API returned HTTP 200.
- Gemini fallback model generated an explanation.
- A Solar Kitchen analogy was included.
- Step-by-step explanation was generated.
- Some scientific oversimplifications were observed.
- One malformed phrase appeared in the output.

**Status:** PASS – API functionality.

**Observation:** Content accuracy and proofreading require improvement.

## 4. Exam Notes Test Cases

| Test ID | Input Topic | Learning Level | Language | Expected Result | Status |
|---|---|---|---|---|---|
| EN-01 | Newton's Second Law | University Student | English | Examination-oriented notes | Executed |
| EN-02 | Photosynthesis | Beginner | Hindi | Structured notes | Pending |
| EN-03 | Binary Search | University Student | English | Algorithmic notes | Pending |
| EN-04 | Database Normalization | Intermediate | Hinglish | Organized notes | Pending |
| EN-05 | Operating System | University Student | English | Detailed notes | Pending |
| EN-06 | Empty Input | University Student | English | Appropriate validation error | Pending |

### EN-01: Newton's Second Law

**Objective:** Evaluate examination-oriented note generation and compare three prompt versions.

**Input:** Newton's Second Law of Motion, including its mathematical expression, SI unit and numerical example.

**Prompt Versions Tested:**

- V1
- V2
- V3

**Observed Results:**

- All three versions generated structured examination notes.
- The formula F = ma was preserved.
- The numerical calculation produced an acceleration of 5 m/s².
- V1 generated a baseline academic structure.
- V2 introduced additional topic organization and comparisons.
- V3 provided dedicated theory, examination focus and terminology sections.

**Status:** Executed.

**Observation:** V3 is the strongest preliminary candidate based on the tested example.

## 5. Edge Case Test Cases

| Test ID | Edge Case | Expected Behaviour | Status |
|---|---|---|---|
| EDGE-01 | Empty source text | Appropriate validation error | Pending |
| EDGE-02 | Whitespace-only source text | Appropriate validation error | Pending |
| EDGE-03 | Very short source text | Relevant information without fabrication | Pending |
| EDGE-04 | Unsupported language request | Clear response or validation | Pending |
| EDGE-05 | Gemini API unavailable | Controlled error handling | Pending |

## 6. Additional Functional Test Scenarios

| Test ID | Scenario | Expected Result | Status |
|---|---|---|---|
| FUNC-01 | Valid source text | Successful generation | Executed |
| FUNC-02 | Numerical content | Correct formula and calculation | Executed |
| FUNC-03 | Beginner learning level | Simplified explanation | Executed |
| FUNC-04 | Hinglish language | Hinglish response | Executed |
| FUNC-05 | AI provider timeout | Appropriate fallback or controlled error | Executed |
| FUNC-06 | Long academic input | Structured response | Pending |
| FUNC-07 | Incomplete mathematical expression | Ambiguity handled appropriately | Pending |

**Note:** FUNC-01 to FUNC-05 represent behaviours observed in the documented tests. They do not establish that every individual scenario has been independently tested for both modules.

## 7. Test Execution Summary

| Category | Total Test Cases | Executed | Pending |
|---|---:|---:|---:|
| Simple Explanation | 6 | 1 | 5 |
| Exam Notes | 6 | 1 | 5 |
| Edge Cases | 5 | 0 | 5 |
| Additional Functional Scenarios | 7 | 5 | 2 |
| **Total** | **24** | **7** | **17** |

## 8. API Reliability Testing

A temporary timeout was observed while using the primary Gemini model.

| Parameter | Observed Result |
|---|---|
| Primary Model | gemini-3.8-flash |
| Error | 504 DEADLINE_EXCEEDED |
| Fallback Model | gemini-3.5-flash-lite |
| Generation Time | 35.78 seconds |
| Final HTTP Status | 200 OK |

The fallback model successfully generated the explanation after the primary model encountered a timeout.

## 9. Test Evidence Directory

Testing evidence is maintained in the following locations:

### Exam Notes

`docs/testing/manvi/exam_notes/`

### Simple Explanation

`docs/testing/manvi/explanation/`

### Prompt Comparison

`docs/testing/manvi/prompt_comparison/`

### General Testing Evidence

`docs/testing/evidence/`

Evidence includes API requests, successful responses, terminal output and generated content screenshots.

## 10. Known Limitations

The following areas require additional testing:

1. Empty and whitespace-only inputs.
2. Long academic source material.
3. Incomplete mathematical expressions.
4. Hindi and Hinglish consistency across different topics.
5. Advanced-level technical explanations.
6. Unsupported language handling.
7. API timeout and fallback behaviour under repeated requests.
8. Source-content preservation across different subjects.

## 11. Final Conclusion

The documented tests demonstrate successful initial functionality of both the Exam Notes Generation and Simple Explanation modules.

The Exam Notes module generated outputs for Newton's Second Law using three different prompt versions.

The Simple Explanation module successfully generated a beginner-level Hinglish explanation for photosynthesis.

The testing process also identified opportunities to improve scientific accuracy, source adherence, proofreading and API reliability.

Further execution of pending test cases is required before declaring the complete testing suite successful.

---

**Prepared By:** Manvi
**Project:** NoteGenius
**Documentation Type:** Functional and Prompt Engineering Testing