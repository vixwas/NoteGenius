import { useState } from "react";

import UploadBox from "./components/UploadBox.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import MyNotes from "./pages/MyNotes.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedMode, setSelectedMode] = useState("");

  const [learningLevel, setLearningLevel] = useState("beginner");
  const [language, setLanguage] = useState("english");
  const [detailLevel, setDetailLevel] = useState("medium");

  const [statusMessage, setStatusMessage] = useState("");

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
      description: "Create comprehensive notes covering the important topics.",
    },
    {
      id: "exam",
      icon: "🎯",
      title: "Exam Notes",
      description: "Focus on definitions, important concepts and exam-worthy points.",
    },
    {
      id: "simple",
      icon: "💡",
      title: "Simple Explanation",
      description: "Understand complex topics in easy language with examples.",
    },
    {
      id: "quiz",
      icon: "❓",
      title: "Quiz / MCQs",
      description: "Test your understanding with questions based on your material.",
    },
    {
      id: "flashcards",
      icon: "🃏",
      title: "Flashcards",
      description: "Create question-answer cards for quick revision.",
    },
  ];

  // FILE SELECTION

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
    setSelectedMode("");
    setStatusMessage("");
  };

  // MODE SELECTION

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setStatusMessage("");
  };

  // GENERATE AND SAVE NOTE

  const handleGenerate = () => {
    if (selectedFiles.length === 0) {
      setStatusMessage("❌ Please upload at least one file.");
      return;
    }

    if (!selectedMode) {
      setStatusMessage("❌ Please select what you want to generate.");
      return;
    }

    const selectedOption = generationOptions.find(
      (option) => option.id === selectedMode
    );

    if (!selectedOption) {
      setStatusMessage("❌ Invalid generation option.");
      return;
    }

    let existingNotes = [];

    try {
      existingNotes = JSON.parse(
        localStorage.getItem("notegenius_notes") || "[]"
      );
    } catch (error) {
      console.error("Error reading notes:", error);
      existingNotes = [];
    }

    const firstFileName =
      selectedFiles[0]?.name || "Untitled Study Material";

    const newNote = {
      id: Date.now(),

      title: firstFileName.replace(/\.[^/.]+$/, ""),

      type: selectedMode,

      description: `${selectedOption.title} created from ${
        selectedFiles.length
      } uploaded file${selectedFiles.length > 1 ? "s" : ""}.`,

      files: selectedFiles.map((file) => file.name),

      learningLevel,
      language,
      detailLevel,

      date: new Date().toLocaleDateString(),

      content: `Demo ${selectedOption.title}.

Your uploaded material: ${selectedFiles
        .map((file) => file.name)
        .join(", ")}

Actual AI-generated content will be available after connecting the backend.`,
    };

    const updatedNotes = [newNote, ...existingNotes];

    try {
      localStorage.setItem(
        "notegenius_notes",
        JSON.stringify(updatedNotes)
      );

      setStatusMessage(
        `✅ ${selectedOption.title} saved successfully! Go to My Notes to view it.`
      );

      console.log("Saved Note:", newNote);
    } catch (error) {
      console.error("Error saving note:", error);

      setStatusMessage("❌ Unable to save note.");
    }
  };

  // PAGE ROUTING

  const renderPage = () => {
    switch (currentPage) {

      // DASHBOARD

      case "dashboard":
        return (
          <>
            <section className="hero">
              <div className="hero-badge">
                ✨ AI POWERED LEARNING
              </div>

              <h2>
                Turn your notes into
                <span className="hero-highlight"> knowledge.</span>
              </h2>

              <p>
                Upload your study materials and let AI help you understand,
                summarize, and learn smarter.
              </p>
            </section>

            {/* UPLOAD SECTION */}

            <section className="upload-section">
              <UploadBox
                selectedFiles={selectedFiles}
                onFilesSelected={handleFilesSelected}
              />
            </section>

            {/* GENERATION OPTIONS */}

            {selectedFiles.length > 0 && (
              <section className="generation-section">

                <div className="generation-heading">
                  <h2>What would you like to create?</h2>

                  <p>
                    Select an option based on your learning goal.
                  </p>
                </div>

                <div className="generation-grid">
                  {generationOptions.map((option) => (
                    <button
                      key={option.id}
                      className={`generation-card ${
                        selectedMode === option.id ? "selected" : ""
                      }`}
                      onClick={() => handleModeSelect(option.id)}
                    >
                      <span className="generation-icon">
                        {option.icon}
                      </span>

                      <span className="generation-title">
                        {option.title}
                      </span>

                      <span className="generation-description">
                        {option.description}
                      </span>

                      {selectedMode === option.id && (
                        <span className="selected-indicator">
                          ✓ Selected
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* PREFERENCES */}

                <div className="preferences-section">
                  <h3>Customize Your Learning Experience</h3>

                  <p>
                    Choose how you want your study material to be explained.
                  </p>

                  <div className="preferences-grid">

                    {/* LEARNING LEVEL */}

                    <div className="preference-item">
                      <label htmlFor="learning-level">
                        Learning Level
                      </label>

                      <select
                        id="learning-level"
                        value={learningLevel}
                        onChange={(event) =>
                          setLearningLevel(event.target.value)
                        }
                      >
                        <option value="beginner">Beginner</option>
                        <option value="student">University Student</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>

                    {/* LANGUAGE */}

                    <div className="preference-item">
                      <label htmlFor="language">
                        Language
                      </label>

                      <select
                        id="language"
                        value={language}
                        onChange={(event) =>
                          setLanguage(event.target.value)
                        }
                      >
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="hinglish">Hinglish</option>
                      </select>
                    </div>

                    {/* DETAIL LEVEL */}

                    <div className="preference-item">
                      <label htmlFor="detail-level">
                        Explanation Detail
                      </label>

                      <select
                        id="detail-level"
                        value={detailLevel}
                        onChange={(event) =>
                          setDetailLevel(event.target.value)
                        }
                      >
                        <option value="short">Short</option>
                        <option value="medium">Medium</option>
                        <option value="detailed">Detailed</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* GENERATE BUTTON */}

                <button
                  className="generate-button"
                  onClick={handleGenerate}
                  disabled={!selectedMode}
                >
                  ✨ Generate{" "}
                  {selectedMode
                    ? generationOptions.find(
                        (option) => option.id === selectedMode
                      )?.title
                    : "Learning Material"}
                </button>

                {/* STATUS */}

                {statusMessage && (
                  <div className="status-message">
                    {statusMessage}
                  </div>
                )}

              </section>
            )}
          </>
        );

      // MY NOTES

      case "notes":
        return <MyNotes />;

      // HISTORY

      case "history":
        return (
          <div className="page-content">
            <div className="page-header">
              <span className="page-eyebrow">ACTIVITY</span>

              <h1>History 🕘</h1>

              <p>Track your previous learning sessions.</p>
            </div>

            <div className="empty-state">
              <div className="empty-state-icon">🕘</div>

              <h2>No history yet</h2>

              <p>
                Your generated materials will appear here.
              </p>
            </div>
          </div>
        );

      // FLASHCARDS

      case "flashcards":
        return (
          <div className="page-content">
            <div className="page-header">
              <span className="page-eyebrow">ACTIVE LEARNING</span>

              <h1>Flashcards 🧠</h1>

              <p>Practice and revise concepts.</p>
            </div>

            <div className="empty-state">
              <div className="empty-state-icon">🃏</div>

              <h2>No flashcards yet</h2>

              <p>
                Create flashcards from your study materials.
              </p>

              <button
                className="generate-button"
                onClick={() => setCurrentPage("dashboard")}
              >
                Create Flashcards ✨
              </button>
            </div>
          </div>
        );

      // QUIZZES

      case "quizzes":
        return (
          <div className="page-content">
            <div className="page-header">
              <span className="page-eyebrow">TEST YOUR KNOWLEDGE</span>

              <h1>Quizzes ❓</h1>

              <p>
                Test your understanding of what you've studied.
              </p>
            </div>

            <div className="empty-state">
              <div className="empty-state-icon">🎯</div>

              <h2>No quizzes yet</h2>

              <p>Create quizzes from your documents.</p>

              <button
                className="generate-button"
                onClick={() => setCurrentPage("dashboard")}
              >
                Create Quiz ✨
              </button>
            </div>
          </div>
        );

      // SETTINGS

      case "settings":
        return (
          <div className="page-content">
            <div className="page-header">
              <span className="page-eyebrow">PERSONALIZATION</span>

              <h1>Settings ⚙️</h1>

              <p>Customize your learning preferences.</p>
            </div>

            <div className="settings-container">
              <div className="settings-card">
                <h3>Learning Preferences</h3>

                <div className="preference-item">
                  <label>Learning Level</label>

                  <select
                    value={learningLevel}
                    onChange={(event) =>
                      setLearningLevel(event.target.value)
                    }
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
                    onChange={(event) =>
                      setLanguage(event.target.value)
                    }
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
                    onChange={(event) =>
                      setDetailLevel(event.target.value)
                    }
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="detailed">Detailed</option>
                  </select>
                </div>

              </div>
            </div>
          </div>
        );

      // FALLBACK

      default:
        return (
          <>
            <section className="hero">
              <div className="hero-badge">
                ✨ AI POWERED LEARNING
              </div>

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
              <UploadBox
                selectedFiles={selectedFiles}
                onFilesSelected={handleFilesSelected}
              />
            </section>
          </>
        );
    }
  };

  // APP LAYOUT

  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="dashboard-main">

        <Navbar currentPage={currentPage} />

        <main className="main-content">
          {renderPage()}
        </main>

      </div>

    </div>
  );
}

export default App;