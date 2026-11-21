
import { useState } from "react";

import {
  generateStudyMaterial,
  generateSummaryMaterial,
  generateQuizMaterial,
  generateFlashcardMaterial,
} from "./services/aiService";

import UploadBox from "./components/UploadBox.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import MyNotes from "./pages/MyNotes.jsx";
import QuizResults from "./components/QuizResults.jsx";
import FlashcardResults from "./components/FlashcardResults.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedMode, setSelectedMode] = useState("");

  const [learningLevel, setLearningLevel] = useState("beginner");
  const [language, setLanguage] = useState("english");
  const [detailLevel, setDetailLevel] = useState("medium");

  const [statusMessage, setStatusMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [streamingContent, setStreamingContent] = useState("");

  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [generatedFlashcards, setGeneratedFlashcards] = useState(null);

  // GENERATION OPTIONS

  const generationOptions = [
    {
      id: "summary",
      icon: "📝",
      title: "Smart Summary",
      description:
        "Get the key points and important ideas in a concise format.",
    },
    {
      id: "detailed",
      icon: "📚",
      title: "Detailed Notes",
      description:
        "Create comprehensive notes covering the important topics.",
    },
    {
      id: "exam",
      icon: "🎯",
      title: "Exam Notes",
      description:
        "Focus on definitions, important concepts and exam-worthy points.",
    },
    {
      id: "simple",
      icon: "💡",
      title: "Simple Explanation",
      description:
        "Understand complex topics in easy language with examples.",
    },
    {
      id: "quiz",
      icon: "❓",
      title: "Quiz / MCQs",
      description:
        "Test your understanding with questions based on your material.",
    },
    {
      id: "flashcards",
      icon: "🃏",
      title: "Flashcards",
      description:
        "Create question-answer cards for quick revision.",
    },
  ];

  // FILE SELECTION

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
    setSelectedMode("");
    setStatusMessage("");
    setStreamingContent("");
    setGeneratedQuiz(null);
    setGeneratedFlashcards(null);
  };

  // MODE SELECTION

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setStatusMessage("");
    setStreamingContent("");
  };

  // GENERATE STUDY MATERIAL

  const handleGenerate = async () => {
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

    // These modes are connected to the backend.
if (!["summary", "detailed", "quiz", "flashcards"].includes(selectedMode)) {
  setStatusMessage(
    "⚠️ This generation mode is not connected yet."
  );
  return;
}

    const learningLevelMap = {
      beginner: "Beginner",
      student: "University Student",
      advanced: "Advanced",
    };

    const selectedLearningLevel =
      learningLevelMap[learningLevel] || "University Student";

    const selectedLanguage =
      language.charAt(0).toUpperCase() + language.slice(1);

    try {
      setIsGenerating(true);
      setStreamingContent("");
      setGeneratedQuiz(null);
      setGeneratedFlashcards(null);

      setStatusMessage(
        "⏳ Uploading document and connecting to AI..."
      );

      const selectedFile = selectedFiles[0];


      // SMART SUMMARY GENERATION

      if (selectedMode === "summary") {
        setStatusMessage("⏳ AI is generating your Smart Summary...");

        const result = await generateSummaryMaterial(selectedFile);

        if (!result?.content?.trim()) {
          throw new Error("AI did not return a valid summary.");
        }

        let existingNotes = [];

        try {
          const savedNotes = JSON.parse(
            localStorage.getItem("notegenius_notes") || "[]"
          );
          existingNotes = Array.isArray(savedNotes) ? savedNotes : [];
        } catch (error) {
          console.error("Error reading saved notes:", error);
        }

        const newSummary = {
          id: Date.now(),
          title: result.title || selectedFile.name.replace(/\.[^/.]+$/, ""),
          type: "summary",
          description: "AI-generated smart summary from your uploaded document.",
          files: [result.originalFilename || selectedFile.name],
          learningLevel,
          language,
          detailLevel,
          date: new Date().toLocaleDateString(),
          content: result.content,
        };

        localStorage.setItem(
          "notegenius_notes",
          JSON.stringify([newSummary, ...existingNotes])
        );

        setStreamingContent(result.content);
        setStatusMessage(
          "✅ Smart Summary generated successfully! Open My Notes to view it."
        );

        console.log("AI-generated summary saved:", newSummary);
      }

      // DETAILED NOTES GENERATION

      if (selectedMode === "detailed") {
        const result = await generateStudyMaterial(
          selectedFile,
          (chunk, completeText) => {
            setStreamingContent(completeText);
            setStatusMessage("✨ AI is generating your notes...");
          }
        );

        if (!result || !result.content || !result.content.trim()) {
          throw new Error("AI did not return any notes.");
        }

        let existingNotes = [];

        try {
          const savedNotes = JSON.parse(
            localStorage.getItem("notegenius_notes") || "[]"
          );

          existingNotes = Array.isArray(savedNotes)
            ? savedNotes
            : [];
        } catch (error) {
          console.error("Error reading saved notes:", error);
          existingNotes = [];
        }

        const firstFileName = selectedFile.name;

        const newNote = {
          id: Date.now(),

          title:
            result.title ||
            firstFileName.replace(/\.[^/.]+$/, ""),

          type: "detailed",

          description:
            "AI-generated detailed notes from your uploaded document.",

          files: [
            result.originalFilename || firstFileName,
          ],

          learningLevel,
          language,
          detailLevel,

          date: new Date().toLocaleDateString(),

          content: result.content,
        };

        const updatedNotes = [
          newNote,
          ...existingNotes,
        ];

        localStorage.setItem(
          "notegenius_notes",
          JSON.stringify(updatedNotes)
        );

        setStreamingContent(result.content);

        setStatusMessage(
          "✅ AI Notes generated successfully! Open My Notes to view them."
        );

        console.log("AI-generated note saved:", newNote);
      }

      // QUIZ GENERATION

      if (selectedMode === "quiz") {
        setStatusMessage(
          "⏳ AI is preparing your Quiz. Please wait..."
        );

        const result = await generateQuizMaterial(
          selectedFile,
          5,
          "Medium",
          selectedLearningLevel,
          selectedLanguage
        );

        if (!result?.quiz?.questions?.length) {
          throw new Error("No quiz questions were returned.");
        }

        setGeneratedQuiz(result.quiz);

        localStorage.setItem(
          "notegenius_quiz",
          JSON.stringify(result.quiz)
        );

        setStatusMessage(
          "✅ Quiz generated successfully!"
        );

        console.log("Generated Quiz:", result.quiz);
      }

      // FLASHCARDS GENERATION

      if (selectedMode === "flashcards") {
        setStatusMessage(
          "⏳ AI is creating your Flashcards. Please wait..."
        );

        const result = await generateFlashcardMaterial(
          selectedFile,
          5,
          "Medium",
          selectedLearningLevel,
          selectedLanguage
        );

        if (!result?.flashcards?.length) {
          throw new Error("No flashcards were returned.");
        }

        const flashcardData = {
          title: result.title,
          flashcards: result.flashcards,
        };

        setGeneratedFlashcards(flashcardData);

        localStorage.setItem(
          "notegenius_flashcards",
          JSON.stringify(flashcardData)
        );

        setStatusMessage(
          "✅ Flashcards generated successfully!"
        );

        console.log("Generated Flashcards:", flashcardData);
      }
    } catch (error) {
      console.error("AI generation error:", error);

      setStatusMessage(
        `❌ ${error.message || "Unable to generate study material."}`
      );
    } finally {
      setIsGenerating(false);
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
                <span className="hero-highlight">
                  {" "}knowledge.
                </span>
              </h2>

              <p>
                Upload your study materials and let AI help you
                understand, summarize, and learn smarter.
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
                  <h2>
                    What would you like to create?
                  </h2>

                  <p>
                    Select an option based on your learning goal.
                  </p>
                </div>

                <div className="generation-grid">
                  {generationOptions.map((option) => (
                    <button
                      key={option.id}
                      className={`generation-card ${
                        selectedMode === option.id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleModeSelect(option.id)
                      }
                      disabled={isGenerating}
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
                  <h3>
                    Customize Your Learning Experience
                  </h3>

                  <p>
                    Choose how you want your study material
                    to be explained.
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
                        <option value="beginner">
                          Beginner
                        </option>

                        <option value="student">
                          University Student
                        </option>

                        <option value="advanced">
                          Advanced
                        </option>
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
                        <option value="english">
                          English
                        </option>

                        <option value="hindi">
                          Hindi
                        </option>

                        <option value="hinglish">
                          Hinglish
                        </option>
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
                        <option value="short">
                          Short
                        </option>

                        <option value="medium">
                          Medium
                        </option>

                        <option value="detailed">
                          Detailed
                        </option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* GENERATE BUTTON */}

                <button
                  className="generate-button"
                  onClick={handleGenerate}
                  disabled={!selectedMode || isGenerating}
                >
                  {isGenerating
                    ? "⏳ Generating..."
                    : `✨ Generate ${
                        selectedOptionTitle(
                          generationOptions,
                          selectedMode
                        )
                      }`}
                </button>

                {/* STATUS MESSAGE */}

                {statusMessage && (
                  <div className="status-message">
                    {statusMessage}
                  </div>
                )}

                {/* LIVE STREAMING PREVIEW */}

                {isGenerating && streamingContent && (
                  <div className="streaming-preview">
                    <h3>
                      ✨ Generating Your Notes...
                    </h3>

                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {streamingContent}
                    </pre>
                  </div>
                )}

              </section>
            )}

            {/* GENERATED QUIZ */}

            {generatedQuiz && (
              <QuizResults quiz={generatedQuiz} />
            )}

            {/* GENERATED FLASHCARDS */}

            {generatedFlashcards && (
              <FlashcardResults
                title={generatedFlashcards.title}
                flashcards={generatedFlashcards.flashcards}
              />
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
              <span className="page-eyebrow">
                ACTIVITY
              </span>

              <h1>History 🕘</h1>

              <p>
                Track your previous learning sessions.
              </p>
            </div>

            <div className="empty-state">
              <div className="empty-state-icon">
                🕘
              </div>

              <h2>No history yet</h2>

              <p>
                Your generated materials will appear here.
              </p>
            </div>
          </div>
        );

      // FLASHCARDS

      case "flashcards": {
        let savedFlashcards = generatedFlashcards;

        if (!savedFlashcards) {
          try {
            savedFlashcards = JSON.parse(
              localStorage.getItem("notegenius_flashcards") || "null"
            );
          } catch (error) {
            savedFlashcards = null;
          }
        }

        return (
          <div className="page-content">
            <div className="page-header">
              <span className="page-eyebrow">
                ACTIVE LEARNING
              </span>

              <h1>Flashcards 🧠</h1>

              <p>
                Practice and revise concepts.
              </p>
            </div>

            {savedFlashcards?.flashcards?.length ? (
              <FlashcardResults
                title={savedFlashcards.title}
                flashcards={savedFlashcards.flashcards}
              />
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  🃏
                </div>

                <h2>No flashcards yet</h2>

                <p>
                  Create flashcards from your study materials.
                </p>

                <button
                  className="generate-button"
                  onClick={() =>
                    setCurrentPage("dashboard")
                  }
                >
                  Create Flashcards ✨
                </button>
              </div>
            )}
          </div>
        );
      }

      // QUIZZES

      case "quizzes": {
        let savedQuiz = generatedQuiz;

        if (!savedQuiz) {
          try {
            savedQuiz = JSON.parse(
              localStorage.getItem("notegenius_quiz") || "null"
            );
          } catch (error) {
            savedQuiz = null;
          }
        }

        return (
          <div className="page-content">
            <div className="page-header">
              <span className="page-eyebrow">
                TEST YOUR KNOWLEDGE
              </span>

              <h1>Quizzes ❓</h1>

              <p>
                Test your understanding of what you've studied.
              </p>
            </div>

            {savedQuiz?.questions?.length ? (
              <QuizResults quiz={savedQuiz} />
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  🎯
                </div>

                <h2>No quizzes yet</h2>

                <p>
                  Create quizzes from your documents.
                </p>

                <button
                  className="generate-button"
                  onClick={() =>
                    setCurrentPage("dashboard")
                  }
                >
                  Create Quiz ✨
                </button>
              </div>
            )}
          </div>
        );
      }

      // SETTINGS

      case "settings":
        return (
          <div className="page-content">
            <div className="page-header">
              <span className="page-eyebrow">
                PERSONALIZATION
              </span>

              <h1>Settings ⚙️</h1>

              <p>
                Customize your learning preferences.
              </p>
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
                    <option value="beginner">
                      Beginner
                    </option>

                    <option value="student">
                      University Student
                    </option>

                    <option value="advanced">
                      Advanced
                    </option>
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
                    <option value="english">
                      English
                    </option>

                    <option value="hindi">
                      Hindi
                    </option>

                    <option value="hinglish">
                      Hinglish
                    </option>
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
                    <option value="short">
                      Short
                    </option>

                    <option value="medium">
                      Medium
                    </option>

                    <option value="detailed">
                      Detailed
                    </option>
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
                <span className="hero-highlight">
                  {" "}knowledge.
                </span>
              </h2>

              <p>
                Upload your study materials and let AI help you
                understand, summarize, and learn smarter.
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

// HELPER FUNCTION

function selectedOptionTitle(options, selectedMode) {
  return (
    options.find((option) => option.id === selectedMode)
      ?.title || "Learning Material"
  );
}

export default App;
