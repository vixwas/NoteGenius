import { useState, useEffect } from "react";

function MyNotes() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notegenius_notes");

    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Save notes whenever notes state changes
  useEffect(() => {
    localStorage.setItem("notegenius_notes", JSON.stringify(notes));
  }, [notes]);

  // Search and filter
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" || note.type === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  // Delete note
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    setNotes(notes.filter((note) => note.id !== id));
  };

  // Open note
  const handleOpenNote = (note) => {
    alert(`Opening: ${note.title}\n\nNote viewer will be implemented next.`);
  };

  // Note type icons
  const getIcon = (type) => {
    const icons = {
      summary: "📝",
      detailed: "📚",
      exam: "🎯",
      simple: "💡",
      quiz: "❓",
      flashcards: "🃏",
    };

    return icons[type] || "📄";
  };

  // Human-readable note types
  const getTypeName = (type) => {
    const names = {
      summary: "Smart Summary",
      detailed: "Detailed Notes",
      exam: "Exam Notes",
      simple: "Simple Explanation",
      quiz: "Quiz",
      flashcards: "Flashcards",
    };

    return names[type] || type;
  };

  return (
    <div className="page-content">

      {/* HEADER */}
      <div className="page-header">
        <span className="page-eyebrow">YOUR LIBRARY</span>

        <h1>My Notes 📚</h1>

        <p>
          Organize, search and revisit your AI-generated learning materials.
        </p>
      </div>

      {/* STAT */}
      <div className="notes-stat">
        <div className="notes-stat-icon">📚</div>

        <div>
          <h3>{notes.length}</h3>
          <p>Saved Learning Materials</p>
        </div>
      </div>

      {/* SEARCH AND FILTER */}
      <div className="notes-toolbar">

        <div className="notes-search">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search your notes..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <select
          className="notes-filter"
          value={selectedFilter}
          onChange={(event) => setSelectedFilter(event.target.value)}
        >
          <option value="all">All Materials</option>
          <option value="summary">Smart Summary</option>
          <option value="detailed">Detailed Notes</option>
          <option value="exam">Exam Notes</option>
          <option value="simple">Simple Explanation</option>
          <option value="quiz">Quizzes</option>
          <option value="flashcards">Flashcards</option>
        </select>

      </div>

      {/* NOTES GRID */}
      {filteredNotes.length > 0 ? (

        <div className="notes-grid">

          {filteredNotes.map((note) => (

            <div className="note-card" key={note.id}>

              <div className="note-card-top">

                <div className="note-card-icon">
                  {getIcon(note.type)}
                </div>

                <button
                  className="note-delete-button"
                  onClick={() => handleDelete(note.id)}
                  title="Delete note"
                >
                  🗑️
                </button>

              </div>

              <h3 className="note-card-title">
                {note.title}
              </h3>

              <span className="note-type-badge">
                {getTypeName(note.type)}
              </span>

              <p className="note-card-description">
                {note.description || "Your learning material is ready for revision."}
              </p>

              <div className="note-card-footer">

                <span className="note-date">
                  📅 {note.date || "Recently created"}
                </span>

                <button
                  className="note-open-button"
                  onClick={() => handleOpenNote(note)}
                >
                  Open →
                </button>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="empty-state">

          <div className="empty-state-icon">
            {searchQuery ? "🔍" : "📂"}
          </div>

          <h2>
            {searchQuery
              ? "No matching notes"
              : notes.length === 0
              ? "No notes yet"
              : "No materials in this category"}
          </h2>

          <p>
            {searchQuery
              ? "Try searching with a different keyword."
              : "Generate learning materials from your documents and they'll appear here."}
          </p>

          {!searchQuery && notes.length === 0 && (
            <div className="empty-state-tag">
              Your learning library awaits ✨
            </div>
          )}

        </div>

      )}

    </div>
  );
}

export default MyNotes;