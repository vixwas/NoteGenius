import UploadBox from "../components/UploadBox";

function Dashboard({
  selectedFiles,
  selectedMode,
  setSelectedMode,
  learningLevel,
  setLearningLevel,
  language,
  setLanguage,
  detailLevel,
  setDetailLevel,
  statusMessage,
  handleFilesSelected,
  handleGenerate,
}) {
  const generationOptions = [
    {
      id: "summary",
      icon: "📝",
      title: "Smart Summary",
      description: "Get the key points and important ideas in a concise format.",
    },
    {
      id: "detailed",
      icon: "📚",
      title: "Detailed Notes",
      description: "Create comprehensive notes covering important topics.",
    },
    {
      id: "exam",
      icon: "🎯",
      title: "Exam Notes",
      description: "Focus on definitions and exam-worthy points.",
    },
    {
      id: "simple",
      icon: "💡",
      title: "Simple Explanation",
      description: "Understand complex topics with easy explanations.",
    },
    {
      id: "quiz",
      icon: "❓",
      title: "Quiz / MCQs",
      description: "Test your understanding with questions.",
    },
    {
      id: "flashcards",
      icon: "🃏",
      title: "Flashcards",
      description: "Create question-answer cards for revision.",
    },
  ];

  return (
    <main className="main-content">
      <section className="hero">
        <div className="hero-badge">✨ AI POWERED LEARNING</div>

        <h2>
          Turn your notes into
          <span className="hero-highlight"> knowledge.</span>
        </h2>

        <p>
          Upload your study materials and let AI help you understand,
          summarize, and learn smarter.
        </p>
      </section>

      <section className="upload-section">
        <UploadBox onFilesSelected={handleFilesSelected} />
      </section>

      {selectedFiles.length > 0 && (
        <section className="generation-section">
          <div className="generation-heading">
            <h2>What would you like to create?</h2>
            <p>Select an option based on your learning goal.</p>
          </div>

          <div className="generation-grid">
            {generationOptions.map((option) => (
              <button
                key={option.id}
                className={`generation-card ${
                  selectedMode === option.id ? "selected" : ""
                }`}
                onClick={() => setSelectedMode(option.id)}
              >
                <span className="generation-icon">{option.icon}</span>

                <span className="generation-title">{option.title}</span>

                <span className="generation-description">
                  {option.description}
                </span>

                {selectedMode === option.id && (
                  <span className="selected-indicator">✓ Selected</span>
                )}
              </button>
            ))}
          </div>

          <div className="preferences-section">
            <h3>Customize Your Learning Experience</h3>

            <p>Choose how you want your study material explained.</p>

            <div className="preferences-grid">
              <div className="preference-item">
                <label>Learning Level</label>

                <select
                  value={learningLevel}
                  onChange={(e) => setLearningLevel(e.target.value)}
                >
                  <option value="beginner">Beginner</option>
                  <option value="student">University Student</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="preference-item">
                <label>Language</label>

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="hinglish">Hinglish</option>
                </select>
              </div>

              <div className="preference-item">
                <label>Explanation Detail</label>

                <select
                  value={detailLevel}
                  onChange={(e) => setDetailLevel(e.target.value)}
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="detailed">Detailed</option>
                </select>
              </div>
            </div>
          </div>

          <button
            className="generate-button"
            onClick={handleGenerate}
            disabled={!selectedMode}
          >
            ✨ Generate{" "}
            {generationOptions.find((option) => option.id === selectedMode)
              ?.title || "Learning Material"}
          </button>

          {statusMessage && (
            <div className="status-message">{statusMessage}</div>
          )}
        </section>
      )}
    </main>
  );
}

export default Dashboard;