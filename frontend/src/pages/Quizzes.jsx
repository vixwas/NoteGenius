
import { useState } from "react";

function Quizzes({
  quizData = null,
  loading = false,
  error = "",
  onCreateQuiz,
}) {
  const questions = Array.isArray(quizData?.questions)
    ? quizData.questions
    : [];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const normalizeAnswer = (answer, options = []) => {
    if (typeof answer !== "string") return answer;

    const letter = answer.trim().toUpperCase();

    if (/^[A-Z]$/.test(letter)) {
      const index = letter.charCodeAt(0) - 65;
      if (options[index] !== undefined) return options[index];
    }

    return answer.trim();
  };

  const handleAnswer = (questionIndex, option) => {
    if (submitted) return;

    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: option,
    }));
  };

  const getCorrectAnswer = (question) =>
    normalizeAnswer(question.correct_answer, question.options || []);

  const score = questions.reduce((total, question, index) => {
    return total +
      (answers[index] === getCorrectAnswer(question) ? 1 : 0);
  }, 0);

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) return;
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentQuestion(0);
  };

  const cardStyle = {
    background: "rgba(19, 23, 39, 0.75)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "24px",
    marginBottom: "20px",
  };

  const buttonStyle = {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#7857ff",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: 600,
  };

  return (
    <main className="page-content">
      <div className="page-header">
        <span className="page-eyebrow">
          TEST YOUR KNOWLEDGE
        </span>

        <h1>Quizzes 🎯</h1>

        <p>
          Challenge yourself and measure your understanding.
        </p>
      </div>

      {loading && (
        <div className="empty-state">
          <h2>Generating your quiz...</h2>
          <p>Please wait while your study material is processed.</p>
        </div>
      )}

      {!loading && error && (
        <div className="empty-state">
          <h2>Unable to load quiz</h2>
          <p>{error}</p>
          <button
            style={buttonStyle}
            onClick={onCreateQuiz}
            disabled={!onCreateQuiz}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && questions.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>

          <h2>No quizzes available yet</h2>

          <p>
            Upload your study material and generate an AI-powered
            quiz to test your knowledge.
          </p>

          <button
            className="generate-button"
            onClick={onCreateQuiz}
            disabled={!onCreateQuiz}
          >
            Create Quiz ✨
          </button>
        </div>
      )}

      {!loading && !error && questions.length > 0 && (
        <section>
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <span style={{ color: "#a695ff" }}>
                PRACTICE QUIZ
              </span>

              <span style={{ color: "#9299b4" }}>
                {questions.length} Questions
              </span>
            </div>

            {submitted && (
              <div style={{ marginTop: "20px" }}>
                <h2>Quiz Completed! 🎉</h2>
                <h3>
                  Your Score: {score} / {questions.length}
                </h3>
                <p style={{ color: "#9299b4" }}>
                  {Math.round((score / questions.length) * 100)}%
                  correct answers
                </p>
              </div>
            )}
          </div>

          {questions.map((question, index) => (
            <div key={index} style={cardStyle}>
              <p style={{ color: "#a695ff", fontSize: "13px" }}>
                QUESTION {index + 1}
              </p>

              <h3 style={{ color: "#f1f1ff", lineHeight: 1.6 }}>
                {question.question}
              </h3>

              <div
                style={{
                  display: "grid",
                  gap: "12px",
                  marginTop: "20px",
                }}
              >
                {(question.options || []).map((option, optionIndex) => {
                  const selected = answers[index] === option;
                  const correct =
                    option === getCorrectAnswer(question);

                  let background = "rgba(255,255,255,0.04)";
                  let border = "1px solid rgba(255,255,255,0.1)";

                  if (submitted && correct) {
                    background = "rgba(34,197,94,0.12)";
                    border = "1px solid #22c55e";
                  } else if (submitted && selected && !correct) {
                    background = "rgba(239,68,68,0.12)";
                    border = "1px solid #ef4444";
                  } else if (selected) {
                    background = "rgba(120,87,255,0.15)";
                    border = "1px solid #7857ff";
                  }

                  return (
                    <button
                      key={optionIndex}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleAnswer(index, option)}
                      style={{
                        padding: "15px",
                        textAlign: "left",
                        borderRadius: "10px",
                        background,
                        border,
                        color: "#e8e9f3",
                        cursor: submitted ? "default" : "pointer",
                      }}
                    >
                      {String.fromCharCode(65 + optionIndex)}. {option}
                      {submitted && correct && " ✓"}
                      {submitted && selected && !correct && " ✗"}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "15px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <strong style={{ color: "#a695ff" }}>
                    Explanation
                  </strong>

                  <p style={{ color: "#c4c8d8", lineHeight: 1.7 }}>
                    {question.explanation ||
                      "No explanation was provided."}
                  </p>
                </div>
              )}
            </div>
          ))}

          {!submitted ? (
            <button
              style={buttonStyle}
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== questions.length}
            >
              Submit Quiz
            </button>
          ) : (
            <button style={buttonStyle} onClick={handleRetry}>
              Retry Quiz ↻
            </button>
          )}
        </section>
      )}
    </main>
  );
}

export default Quizzes;
