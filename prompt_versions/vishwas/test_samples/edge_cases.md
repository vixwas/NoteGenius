# Quiz and Flashcards Edge Case Test Scenarios

## Test Case 1: Short Input
- Input: RAM is volatile memory. It loses stored data when power is turned off.
- Difficulty: Easy
- Learning Level: Beginner
- Language: Hindi
- Requested Questions/Cards: 3
- Purpose: Verify generation with very short study material.

## Test Case 2: Numerical Concept
- Input: Binary numbers use only two digits, 0 and 1. The decimal number 5 is represented as 101 in binary.
- Difficulty: Medium
- Learning Level: University Student
- Language: Hinglish
- Requested Questions/Cards: 3
- Purpose: Verify numerical accuracy and technical terminology.

## Test Case 3: Empty Input
- Input: Empty study material.
- Expected: Request validation error.

## Test Case 4: Invalid Count
- Input: Question/card count below minimum or above maximum.
- Expected: HTTP 422 validation error.

## Test Case 5: Model Failure
- Input: Valid study material.
- Expected: Fallback model should be attempted when the primary model fails.

## Test Case 6: Exact Count
- Input: Valid study material with a requested count.
- Expected: Generated questions/cards must match the requested count.