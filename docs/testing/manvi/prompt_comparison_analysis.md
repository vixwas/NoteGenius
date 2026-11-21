# NoteGenius – Prompt Comparison and Analysis Report

**Developer:** Manvi
**Project:** NoteGenius
**Module:** Exam Notes Generation and Simple Explanation
**Testing Type:** Prompt Engineering and Output Quality Evaluation

---

## 1. Introduction

Prompt engineering plays an important role in determining the quality, structure and relevance of AI-generated academic content.

As part of the NoteGenius project, three prompt versions (V1, V2 and V3) were developed for the Exam Notes Generation module.

The objective of this comparison is to evaluate the generated outputs and identify the prompt version that provides the most suitable academic and examination-oriented response.

The comparison focuses on:

- Content accuracy.
- Completeness.
- Organization and formatting.
- Explanation quality.
- Mathematical correctness.
- Examination relevance.
- Source-content preservation.

## 2. Testing Methodology

The three Exam Notes prompt versions were tested using the same academic input.

**Test Topic:** Newton's Second Law of Motion

**Learning Level:** University Student

**Language:** English

### Common Input

Newton's Second Law of Motion states that the rate of change of momentum of an object is directly proportional to the applied force and takes place in the direction of the force.

For constant mass, the mathematical expression is F = ma, where F is force, m is mass, and a is acceleration.

The SI unit of force is Newton (N).

One Newton is the force required to accelerate a mass of one kilogram at one metre per second squared.

Example: If a force of 10 N acts on an object of mass 2 kg, its acceleration is a = F/m = 10/2 = 5 m/s².

### Testing Procedure

1. Activate Exam Notes Prompt V1.
2. Generate notes using the common input.
3. Save the generated output.
4. Repeat the procedure using V2.
5. Repeat the procedure using V3.
6. Compare the generated outputs using predefined evaluation criteria.

Using the same input helps maintain consistency during prompt comparison.

## 3. Prompt Version Analysis

### 3.1 V1 – Baseline Prompt

**Approach:** Academic examination preparation.

**Output Structure:**

1. Important Definitions
2. Important Concepts
3. Formulas and Numericals
4. Exam-Oriented Content
5. Revision Section

**Strengths:**

- Preserves the main Newton's Second Law formula.
- Includes important definitions.
- Provides numerical calculations.
- Organizes content into examination-oriented sections.
- Includes revision points.

**Limitations:**

- Some additional terminology and contextual information appear beyond the supplied source.
- The output structure is less comprehensive than the later versions.

**Overall Observation:**

V1 provides a useful baseline for generating structured examination notes.

### 3.2 V2 – Improved Structured Prompt

**Approach:** More detailed academic organization.

**Output Structure:**

1. Main Topics
2. Subtopics
3. Important Definitions
4. Concept Explanations
5. Formulas
6. Examples
7. Comparisons
8. Applications
9. Quick-Revision Summary

**Strengths:**

- Clear separation of topics and subtopics.
- Detailed concept explanations.
- Proper mathematical representation.
- Step-by-step numerical calculation.
- Includes applications and revision material.

**Limitations:**

- Introduces a comparison between Newton's First Law and Second Law, although the supplied source focuses on Newton's Second Law.
- Includes additional contextual material that is not directly required by the source.

**Overall Observation:**

V2 improves organization and provides more extensive examination-oriented material. However, its tendency to introduce additional information may reduce strict source adherence.

### 3.3 V3 – Comprehensive Academic Prompt

**Approach:** Structured academic teaching and examination preparation.

**Output Structure:**

1. Topic Overview
2. Important Definitions
3. Detailed Theory
4. Important Formulas
5. Important Comparisons
6. Algorithms and Procedures
7. Examples and Applications
8. Examination Focus
9. Quick Revision
10. Important Terminology

**Strengths:**

- Provides a clear topic overview.
- Includes a dedicated detailed theory section.
- Preserves the important formula F = ma.
- Correctly calculates acceleration as 5 m/s².
- Includes examination-focused preparation points.
- Provides a dedicated terminology section.
- Clearly marks algorithms and procedures as not applicable to the supplied material.

**Limitations:**

- Some explanatory statements extend beyond the exact source wording.
- The comparison section provides limited additional value for this particular topic.
- The comprehensive structure may be unnecessary for very short source material.

**Overall Observation:**

V3 provides the most comprehensive academic structure among the three tested versions. Its dedicated theory, examination focus and terminology sections make it a strong candidate for university-level examination preparation.

## 4. Comparative Evaluation

| Evaluation Criteria | V1 | V2 | V3 |
|---|---|---|---|
| Topic Organization | Good | Very Good | Very Good |
| Definition Coverage | Good | Good | Good |
| Theory Explanation | Basic | Detailed | Detailed |
| Formula Preservation | Good | Good | Good |
| Numerical Calculation | Correct | Correct | Correct |
| Revision Material | Included | Included | Included |
| Examination Focus | Included | Included | Dedicated Section |
| Terminology | Basic | Basic | Dedicated Section |
| Source Adherence | Some additional content | Additional comparisons | More restrained structure |
| Overall Structure | Basic | Expanded | Comprehensive |

**Note:** These are qualitative assessments based on the three generated Newton's Second Law outputs. They are not numerical benchmark scores.

## 5. Mathematical Accuracy Analysis

The common numerical example was:

Given:

- Force (F) = 10 N
- Mass (m) = 2 kg

Formula:

a = F/m

Calculation:

a = 10/2

a = 5 m/s²

### Observations

All three prompt versions preserved the important formula and produced the correct numerical result.

Therefore, all three demonstrated correct mathematical handling for this particular example.

This does not establish accuracy across all possible mathematical inputs.

## 6. Source Adherence Analysis

Source adherence measures how closely the generated response follows the supplied study material.

### V1

Introduced some additional terminology and contextual information.

### V2

Included an extended comparison with Newton's First Law and additional discussion about variable-mass systems.

### V3

Provided a structured response without introducing an extensive comparison with Newton's First Law.

### Finding

V3 demonstrated a more restrained approach to additional comparisons in this particular test.

However, all three outputs included some explanatory material beyond the exact source wording.

## 7. Final Prompt Selection

### Selected Candidate: V3

Based on the tested Newton's Second Law example, V3 is selected as the preferred candidate for the Exam Notes Generation module.

**Reasons for Selection:**

1. Comprehensive academic organization.
2. Dedicated detailed theory section.
3. Clear mathematical presentation.
4. Examination-focused preparation.
5. Dedicated important terminology section.
6. Better separation of major academic components.

V3 provides a suitable structure for university-level examination preparation.

**Selection Limitation:**

The selection is based on one common test input. Further testing across different subjects, numerical problems and short source texts is required before treating V3 as universally superior.

## 8. Simple Explanation Prompt Comparison

Three prompt versions were also developed for the Simple Explanation module.

### V1 – Baseline Explanation

Focuses on simplifying academic material while preserving its meaning.

### V2 – Improved Explanation

Focuses on better organization and conceptual breakdown.

### V3 – Enhanced Explanation

Focuses on a more structured teaching approach with learning-level and language adaptation.

### Current Evaluation Status

A complete comparative evaluation requires generated outputs from all three versions using the same input, learning level and language.

The documented photosynthesis test confirms successful API generation, but does not establish a comparative performance result for all three prompt versions.

Therefore, the final Simple Explanation prompt selection remains pending comparative testing.

## 9. Improvement Recommendations

Based on the comparison, the following improvements are recommended:

1. Improve source-content preservation.
2. Avoid unnecessary comparisons when they are not relevant.
3. Maintain mathematical accuracy.
4. Improve terminology explanations.
5. Reduce repetitive content.
6. Adapt output length to source complexity.
7. Improve handling of short and incomplete inputs.
8. Evaluate prompts across multiple academic subjects.

## 10. Conclusion

The comparison of Exam Notes prompt versions demonstrates the importance of prompt structure in generating academic content.

V1 provides a basic examination-oriented structure.

V2 improves organization and introduces more detailed academic sections.

V3 provides the most comprehensive structure among the tested versions, including detailed theory, examination focus and important terminology.

Based on the tested Newton's Second Law example, V3 is selected as the preferred Exam Notes prompt candidate.

Further testing is required to validate its performance across different academic subjects and input types.

The Simple Explanation prompt versions require additional comparative testing before a final selection can be made.

---

**Prepared By:** Manvi
**Project:** NoteGenius
**Contribution:** Prompt Engineering, Testing and Comparative Analysis