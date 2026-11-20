
import { useState } from "react";

export default function FlashcardResults({ flashcards = [], title }) {
  const [flippedCards, setFlippedCards] = useState({});

  if (!flashcards.length) {
    return (
      <p style={{ color: "#cbd5e1", textAlign: "center" }}>
        No flashcards available.
      </p>
    );
  }

  const toggleCard = (index) => {
    setFlippedCards((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
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
          fontSize: "24px",
          fontWeight: "700",
          color: "#f8fafc",
          marginBottom: "6px",
        }}
      >
        {title || "Generated Flashcards"}
      </h2>

      <p
        style={{
          color: "#a5b4fc",
          fontSize: "14px",
          marginBottom: "20px",
        }}
      >
        {flashcards.length} Flashcards · Click any card to reveal its answer
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "20px",
          width: "100%",
        }}
      >
        {flashcards.map((card, index) => {
          const isFlipped = Boolean(flippedCards[index]);

          return (
            <button
              type="button"
              key={index}
              onClick={() => toggleCard(index)}
              aria-label={`Card ${index + 1}: ${
                isFlipped ? "Answer" : "Question"
              }. Click to ${isFlipped ? "see question" : "reveal answer"}.`}
              style={{
                width: "100%",
                minHeight: "260px",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                textAlign: "center",
                borderRadius: "22px",
                border: isFlipped
                  ? "1px solid #34d399"
                  : "1px solid #8b5cf6",
                background: isFlipped
                  ? "linear-gradient(145deg, #102d2a, #172033)"
                  : "linear-gradient(145deg, #211b45, #111827)",
                color: "#f8fafc",
                cursor: "pointer",
                boxShadow: "0 8px 28px rgba(0,0,0,0.22)",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#c4b5fd",
                  letterSpacing: "0.5px",
                }}
              >
                CARD {index + 1} OF {flashcards.length}
              </span>

              <strong
                style={{
                  fontSize: "17px",
                  fontWeight: "700",
                  color: isFlipped ? "#6ee7b7" : "#c4b5fd",
                }}
              >
                {isFlipped ? "ANSWER" : "QUESTION"}
              </strong>

              <span
                style={{
                  fontSize: "16px",
                  lineHeight: "1.7",
                  fontWeight: "500",
                  color: "#f8fafc",
                  overflowWrap: "anywhere",
                }}
              >
                {isFlipped ? card.answer : card.question}
              </span>

              <span
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  marginTop: "8px",
                }}
              >
                {isFlipped
                  ? "↩ Click to see question"
                  : "✦ Click to reveal answer"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
