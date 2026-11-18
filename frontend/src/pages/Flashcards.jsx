import { useState } from "react";

function Flashcards() {
  const [flipped, setFlipped] = useState(false);

  return (
    <main className="page-content">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">ACTIVE RECALL</span>
          <h1>Flashcards 🧠</h1>
          <p>Learn faster through active recall and spaced repetition.</p>
        </div>
      </div>

      <div className="flashcard-container">
        <div
          className={`flashcard ${flipped ? "flipped" : ""}`}
          onClick={() => setFlipped(!flipped)}
        >
          <div className="flashcard-content">
            <span className="flashcard-label">
              {flipped ? "ANSWER" : "QUESTION"}
            </span>

            <h2>
              {flipped
                ? "Flashcard answers will be generated from your study material."
                : "Your flashcards will appear here."}
            </h2>

            <p>Click to flip ↻</p>
          </div>
        </div>

        <div className="flashcard-controls">
          <button className="secondary-button" disabled>
            ← Previous
          </button>

          <span>0 / 0 Cards</span>

          <button className="secondary-button" disabled>
            Next →
          </button>
        </div>
      </div>
    </main>
  );
}

export default Flashcards;