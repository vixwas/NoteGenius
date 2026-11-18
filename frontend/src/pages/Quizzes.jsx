function Quizzes() {
  return (
    <main className="page-content">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">TEST YOUR KNOWLEDGE</span>
          <h1>Quizzes 🎯</h1>
          <p>Challenge yourself and measure your understanding.</p>
        </div>
      </div>

      <div className="quiz-options-grid">
        <div className="quiz-feature-card">
          <div className="quiz-feature-icon">📝</div>

          <h2>Practice Quiz</h2>

          <p>
            Generate MCQs from your notes and test your understanding.
          </p>

          <span className="feature-status">Coming with AI generation</span>
        </div>

        <div className="quiz-feature-card">
          <div className="quiz-feature-icon">⚡</div>

          <h2>Quick Revision</h2>

          <p>
            Quickly revise concepts through short knowledge tests.
          </p>

          <span className="feature-status">Coming with AI generation</span>
        </div>

        <div className="quiz-feature-card">
          <div className="quiz-feature-icon">📊</div>

          <h2>Your Performance</h2>

          <p>
            Track your scores and identify topics that need improvement.
          </p>

          <span className="feature-status">No attempts yet</span>
        </div>
      </div>
    </main>
  );
}

export default Quizzes;