
import { useState } from "react";

export default function QuizResults({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz?.questions?.length) {
    return (
      <p style={{ color: "#cbd5e1", textAlign: "center" }}>
        No quiz questions available.
      </p>
    );
  }

  const questions = quiz.questions;

  const getCorrectAnswer = (question) => {
    return String(question.correct_answer || "").trim().toUpperCase();
  };

  const score = questions.reduce((total, question) => {
    const questionId = question.id ?? questions.indexOf(question);

    return total + (
      String(answers[questionId] || "").toUpperCase() ===
      getCorrectAnswer(question) ? 1 : 0
    );
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  const handleAnswer = (questionId, optionKey) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: optionKey,
    }));
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <section
      style={{
        width: "100%",
        marginTop: "32px",
        color: "#f8fafc",
      }}
    >
      <h2
        style={{
          fontSize: "25px",
          fontWeight: "700",
          marginBottom: "6px",
          color: "#f8fafc",
        }}
      >
        {quiz.title || "Generated Quiz"}
      </h2>

      <p style={{ color: "#a5b4fc", marginBottom: "24px" }}>
        {questions.length} Questions
        {" · "}
        {Object.keys(answers).length}/{questions.length} Answered
      </p>

      {questions.map((question, index) => {
        const questionId = question.id ?? index;
        const selectedAnswer = answers[questionId];
        const correctAnswer = getCorrectAnswer(question);
        const options = question.options || {};

        return (
          <article
            key={questionId}
            style={{
              background: "#111827",
              border: "1px solid #30364a",
              borderRadius: "18px",
              padding: "22px",
              marginBottom: "22px",
            }}
          >
            <h3
              style={{
                fontSize: "17px",
                fontWeight: "700",
                lineHeight: "1.6",
                color: "#f8fafc",
                marginBottom: "18px",
              }}
            >
              {index + 1}. {question.question}
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {Object.entries(options).map(([key, value]) => {
                const isSelected = selectedAnswer === key;
                const isCorrect = correctAnswer === key;

                let background = "#1a2030";
                let border = "1px solid #374151";

                if (!submitted && isSelected) {
                  background = "#29204d";
                  border = "1px solid #8b5cf6";
                }

                if (submitted && isCorrect) {
                  background = "#12372c";
                  border = "1px solid #34d399";
                } else if (submitted && isSelected && !isCorrect) {
                  background = "#451f2a";
                  border = "1px solid #fb7185";
                }

                return (
                  <label
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      padding: "15px",
                      borderRadius: "12px",
                      background,
                      border,
                      cursor: submitted ? "default" : "pointer",
                      color: "#f1f5f9",
                      lineHeight: "1.6",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <input
                      type="radio"
                      name={`question-${questionId}`}
                      value={key}
                      checked={isSelected}
                      disabled={submitted}
                      onChange={() => handleAnswer(questionId, key)}
                      style={{
                        marginTop: "5px",
                        accentColor: "#a78bfa",
                        flexShrink: 0,
                      }}
                    />

                    <span style={{ flex: 1 }}>
                      <strong style={{ color: "#c4b5fd" }}>
                        {key}.
                      </strong>{" "}
                      {value}
                    </span>

                    {submitted && isCorrect && (
                      <span
                        style={{
                          color: "#6ee7b7",
                          fontWeight: "700",
                          whiteSpace: "nowrap",
                        }}
                      >
                        ✓ Correct
                      </span>
                    )}

                    {submitted && isSelected && !isCorrect && (
                      <span
                        style={{
                          color: "#fda4af",
                          fontWeight: "700",
                          whiteSpace: "nowrap",
                        }}
                      >
                        ✕ Wrong
                      </span>
                    )}
                  </label>
                );
              })}
            </div>

            {submitted && (
              <div
                style={{
                  marginTop: "18px",
                  padding: "16px",
                  background: "#1b2636",
                  borderLeft: "4px solid #8b5cf6",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    color: "#6ee7b7",
                    fontWeight: "700",
                    marginBottom: "8px",
                  }}
                >
                  Correct Answer: {correctAnswer}
                </p>

                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "14px",
                    lineHeight: "1.7",
                    margin: 0,
                  }}
                >
                  <strong>Explanation: </strong>
                  {question.explanation || "No explanation provided."}
                </p>
              </div>
            )}
          </article>
        );
      })}

      {!submitted ? (
        <button
          type="button"
          disabled={Object.keys(answers).length !== questions.length}
          onClick={() => setSubmitted(true)}
          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "12px",
            background:
              Object.keys(answers).length === questions.length
                ? "linear-gradient(90deg, #7c3aed, #a78bfa)"
                : "#373151",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: "700",
            cursor:
              Object.keys(answers).length === questions.length
                ? "pointer"
                : "not-allowed",
            opacity:
              Object.keys(answers).length === questions.length ? 1 : 0.6,
          }}
        >
          Submit Quiz
        </button>
      ) : (
        <div
          style={{
            padding: "24px",
            borderRadius: "16px",
            background: "#171b2c",
            border: "1px solid #8b5cf6",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#c4b5fd", marginBottom: "10px" }}>
            Quiz Completed!
          </h2>

          <p
            style={{
              fontSize: "30px",
              fontWeight: "800",
              color: "#ffffff",
              margin: "10px 0",
            }}
          >
            {score}/{questions.length}
          </p>

          <p style={{ color: "#a5b4fc", marginBottom: "20px" }}>
            Your Score: {percentage}%
          </p>

          <button
            type="button"
            onClick={handleRetake}
            style={{
              padding: "13px 28px",
              border: "none",
              borderRadius: "10px",
              background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
              color: "#ffffff",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Retake Quiz
          </button>
        </div>
      )}
    </section>
  );
}
