# Manvi – Prompt Engineering Testing Report
## NoteGenius: Exam Notes and Simple Explanation

---

## 1. Testing Objectives

The primary objective of this testing process is to evaluate the quality, accuracy, completeness, reliability and usability of the Exam Notes Generation and Simple Explanation modules.

The testing process focuses on:

- Accuracy of generated academic content.
- Preservation of important source information.
- Quality of explanations across different learning levels.
- Language consistency.
- Mathematical and formula preservation.
- Proper organization and formatting of generated content.
- Handling of incomplete, short and complex inputs.
- Reliability of AI-generated responses.
- Comparison of different prompt engineering approaches.

## 2. Modules Under Testing

### Module A: Exam Notes Generation

**API Endpoint:** POST `/generate-exam-notes`

**Purpose:**

To generate structured, comprehensive and examination-oriented notes from supplied academic material.

The generated notes are expected to contain relevant definitions, theoretical explanations, formulas, numerical examples, important concepts and revision points.

### Module B: Simple Explanation Generation

**API Endpoint:** POST `/explain`

**Purpose:**

To explain supplied study material in an understandable manner according to the selected learning level and language.

The module aims to make complex academic concepts easier to understand through simplified explanations and relevant examples.

## 3. Testing Environment

| Component | Technology |
|---|---|
| Backend Framework | FastAPI |
| AI Provider | Google Gemini API |
| API Testing Tool | Swagger UI |
| Programming Language | Python |
| Development Environment | Visual Studio Code |
| Operating System | Windows |

## 4. Testing Methodology

The testing process follows these steps:

1. Prepare academic source material.
2. Select the appropriate API endpoint.
3. Provide the required input parameters.
4. Execute the API request through Swagger UI.
5. Examine the generated response.
6. Evaluate technical accuracy and completeness.
7. Check formatting, language and source adherence.
8. Record observations and identify improvement opportunities.

For Exam Notes prompt comparison, the same Newton's Second Law input was used with V1, V2 and V3 to maintain consistency.

## 5. Exam Notes Prompt Version Testing

Three prompt versions were developed to evaluate different approaches to generating examination-oriented academic notes.

### 5.1 Version 1 (V1)

**Approach:** Baseline academic exam preparation prompt.

Main characteristics:

- Focus on source accuracy.
- Important definitions and concepts.
- Preservation of formulas and numerical examples.
- Examination-oriented content.
- Revision-friendly organization.

**Observed Output:**

The generated response contained:

- Important Definitions.
- Important Concepts.
- Formulas and Numericals.
- Exam-Oriented Content.
- Revision Section.

The output preserved the important Newton's Second Law formula and numerical calculation.

**Observation:**

The output was relevant and useful for examination preparation. However, some additional terminology and contextual information appeared beyond the supplied source.

### 5.2 Version 2 (V2)

**Approach:** Improved academic organization and examination-focused structure.

Main characteristics:

- Main topics and subtopics.
- Important definitions.
- Detailed concept explanations.
- Mathematical formulas.
- Numerical examples.
- Comparisons.
- Applications.
- Quick revision summary.

**Observed Output:**

The generated response contained nine major sections.

It included the mathematical expression F = ma and correctly calculated acceleration as 5 m/s².

It also provided a comparison between Newton's First Law and Second Law.

**Observation:**

V2 provided a detailed and organized response. However, the comparison with Newton's First Law introduced additional material that was not explicitly included in the supplied source.

This indicates an opportunity to improve source-content adherence.

### 5.3 Version 3 (V3)

**Approach:** Structured academic teaching and examination preparation.

Main characteristics:

- Topic overview.
- Important definitions.
- Detailed theory.
- Important formulas.
- Numerical examples.
- Important comparisons.
- Algorithms and procedures.
- Examination focus.
- Quick revision.
- Important terminology.

**Observed Output:**

The generated response contained ten structured sections.

It included:

- An introduction to Newton's Second Law.
- Definitions of force and Newton.
- Explanation of force, momentum and constant mass.
- Formula F = ma.
- Numerical calculation of acceleration.
- Examination-oriented points.
- Quick revision notes.
- Important terminology.

**Observation:**

V3 produced a clearly structured academic response with a dedicated theory section, examination focus and terminology section.

The comparison section avoided introducing a detailed comparison with Newton's First Law.

The algorithm and procedure section was marked as not applicable to the supplied study material.

## 6. Exam Notes Prompt Comparison

| Evaluation Criteria | V1 | V2 | V3 |
|---|---|---|---|
| Content Organization | Structured | Highly structured | Highly structured |
| Definitions | Included | Included | Included |
| Formula Preservation | Included | Included | Included |
| Numerical Example | Included | Included | Included |
| Concept Explanation | Included | Detailed | Detailed |
| Revision Section | Included | Included | Included |
| Examination Focus | Included | Explicit labels | Dedicated section |
| Terminology Section | Not separately structured | Not separately structured | Included |
| Source Adherence | Some additional context | Additional comparison | More restrained comparison |
| Overall Structure | Basic academic structure | Expanded structure | Comprehensive academic structure |

### Comparative Findings

**V1:**

Provides a useful baseline structure for generating examination-oriented notes.

**V2:**

Improves topic organization and provides more detailed academic sections. However, it may introduce additional comparisons beyond the supplied material.

**V3:**

Provides a more comprehensive structure with dedicated theory, examination focus and terminology sections.

### Preliminary Conclusion

Based on the tested Newton's Second Law example, V3 is the strongest candidate for the Exam Notes module because of its comprehensive academic organization and dedicated examination-oriented sections.

This is a qualitative observation from the tested example, not a statistically validated result across all academic topics.

## 7. Simple Explanation Prompt Testing

Three prompt versions were developed for the Simple Explanation module.

### 7.1 Version 1 (V1)

Represents the baseline explanation approach.

The objective is to simplify supplied academic material while maintaining its essential meaning.

### 7.2 Version 2 (V2)

Represents an improved explanation approach with a more organized conceptual breakdown.

The objective is to improve readability and understanding.

### 7.3 Version 3 (V3)

Represents the enhanced teaching-oriented explanation approach.

The objective is to adapt explanations according to the selected learning level and language.

**Note:** A complete comparative evaluation of Explanation V1, V2 and V3 requires corresponding generated outputs from the same test input. These results are not yet documented.

## 8. Simple Explanation Testing Observations

### Test: EX-01 – Photosynthesis

**Learning Level:** Beginner

**Language:** Hinglish

**Input Topic:** Photosynthesis

**Observed Results:**

- API returned HTTP 200.
- Gemini fallback model generated an explanation.
- A real-world Solar Kitchen analogy was included.
- Step-by-step explanation was generated.
- Some scientific oversimplifications were observed.
- One malformed phrase appeared in the generated output.

**Result:**

- API Functionality: PASS
- Content Accuracy and Readability: NEEDS IMPROVEMENT

### API Reliability Observation

| Parameter | Observation |
|---|---|
| Primary Model | gemini-3.8-flash |
| Observed Error | 504 DEADLINE_EXCEEDED |
| Fallback Model | gemini-3.5-flash-lite |
| Generation Time | 35.78 seconds |
| Final HTTP Status | 200 OK |

The primary model encountered a timeout. The fallback model subsequently generated a successful response.

This demonstrates the observed fallback behaviour during the documented test.

## 9. Evaluation Criteria

Generated responses are evaluated using the following criteria:

1. **Accuracy:** Correctness of academic and technical information.
2. **Completeness:** Coverage of important source concepts.
3. **Clarity:** Ease of understanding.
4. **Formatting:** Proper headings, lists, formulas and organization.
5. **Technical Correctness:** Correct terminology, mathematical expressions and units.
6. **Language Consistency:** Appropriate use of the requested language.
7. **Source Adherence:** Avoidance of unsupported additions.
8. **Reliability:** Successful generation and appropriate error handling.

### Rating Scale

| Score | Rating |
|---|---|
| 1 | Poor |
| 2 | Needs Improvement |
| 3 | Satisfactory |
| 4 | Good |
| 5 | Excellent |

Numerical scores will be assigned after systematic evaluation of the corresponding generated outputs.

## 10. Actual Testing Results

| Test Case | Module | Actual Result | Status |
|---|---|---|---|
| TC-01 | Exam Notes | Newton's Second Law notes generated | Executed |
| TC-02 | Exam Notes | Numerical test proposed | Pending |
| TC-03 | Exam Notes | Transformer test proposed | Pending |
| TC-04 | Simple Explanation | Photosynthesis explanation generated | Executed |
| TC-05 | Simple Explanation | Semiconductor diode test proposed | Pending |
| TC-06 | Simple Explanation | Binary search test proposed | Pending |
| TC-07 | Simple Explanation | Hindi explanation test proposed | Pending |
| TC-08 | Simple Explanation | Hinglish explanation test proposed | Pending |
| TC-09 | Exam Notes | Very short input test proposed | Pending |
| TC-10 | Simple Explanation | Ambiguous input test proposed | Pending |

## 11. Edge Case Analysis

The following edge cases have been identified for further testing:

| Test ID | Edge Case | Expected Behaviour | Status |
|---|---|---|---|
| EDGE-01 | Empty source text | Appropriate validation error | Pending |
| EDGE-02 | Whitespace-only source text | Appropriate validation error | Pending |
| EDGE-03 | Very short source text | Relevant information without fabrication | Pending |
| EDGE-04 | Unsupported language request | Clear response or validation | Pending |
| EDGE-05 | Gemini API unavailable | Controlled error handling | Pending |

Additional cases requiring attention:

- Incomplete mathematical expressions.
- Ambiguous technical terminology.
- Unexpected language combinations.
- Long source material.
- Temporary AI provider failures.

## 12. Improvement Opportunities

Based on the observed outputs and identified testing requirements, the following improvements are recommended:

1. Improve scientific and technical accuracy.
2. Strengthen source-content preservation.
3. Reduce unsupported additional information.
4. Improve mathematical formatting.
5. Add output proofreading instructions.
6. Improve Hindi and Hinglish consistency.
7. Adapt explanation depth according to learning level.
8. Reduce unnecessary repetition.
9. Improve handling of incomplete and ambiguous inputs.
10. Improve API reliability through appropriate timeout and fallback handling.

## 13. Testing Evidence

Testing evidence is maintained in the following directories:

**Exam Notes Evidence:**

`docs/testing/manvi/exam_notes/`

**Simple Explanation Evidence:**

`docs/testing/manvi/explanation/`

**Prompt Comparison Evidence:**

`docs/testing/manvi/prompt_comparison/`

The prompt comparison directory contains the generated outputs and screenshots for Exam Notes V1, V2 and V3.

The evidence is intended to support the documented API responses and prompt evaluation.

## 14. Final Conclusion

The testing process evaluates the Exam Notes Generation and Simple Explanation modules of NoteGenius.

Three Exam Notes prompt versions were developed and tested using the same Newton's Second Law input.

The comparison indicates that V3 provides a more comprehensive academic structure, while V1 and V2 provide useful baseline and expanded approaches.

The Simple Explanation module successfully generated a beginner-level Hinglish explanation for the documented photosynthesis test. The observed response also identified opportunities to improve scientific accuracy and proofreading.

Further testing is required to evaluate all proposed test cases, edge cases and Simple Explanation prompt versions.

The final performance assessment will be based on actual generated outputs, recorded observations and systematic evaluation.

---

**Prepared By:** Manvi

**Project:** NoteGenius

**Contribution:** Exam Notes Generation, Simple Explanation Generation and Prompt Engineering Testing