
import { useState, useEffect } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";

function MyNotes() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("notegenius_notes") || "[]"
      );

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [openedNote, setOpenedNote] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "notegenius_notes",
      JSON.stringify(notes)
    );
  }, [notes]);

  useEffect(() => {
    if (!openedNote) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenedNote(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener("keydown", handleEscape);
  }, [openedNote]);

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = String(note.title || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      note.type === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this note?"
      )
    ) {
      return;
    }

    setNotes((previous) =>
      previous.filter((note) => note.id !== id)
    );

    if (openedNote?.id === id) {
      setOpenedNote(null);
    }
  };

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

  const getTypeName = (type) => {
    const names = {
      summary: "Smart Summary",
      detailed: "Detailed Notes",
      exam: "Exam Notes",
      simple: "Simple Explanation",
      quiz: "Quiz",
      flashcards: "Flashcards",
    };

    return names[type] || type || "Material";
  };

  const getDisplayContent = (content) => {
    if (typeof content === "string") {
      return content;
    }

    if (content == null) {
      return "No content available.";
    }

    return JSON.stringify(content, null, 2);
  };

  return (
    <div className="page-content">

      {/* HEADER */}

      <div className="page-header">
        <span className="page-eyebrow">
          YOUR LIBRARY
        </span>

        <h1>My Notes 📚</h1>

        <p>
          Organize, search and revisit your AI-generated
          learning materials.
        </p>
      </div>

      {/* STAT */}

      <div className="notes-stat">
        <div className="notes-stat-icon">
          📚
        </div>

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
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
          />
        </div>

        <select
          className="notes-filter"
          value={selectedFilter}
          onChange={(event) =>
            setSelectedFilter(event.target.value)
          }
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
            <div
              className="note-card"
              key={note.id}
            >
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
                {note.description ||
                  "Your learning material is ready for revision."}
              </p>

              <div className="note-card-footer">
                <span className="note-date">
                  📅 {note.date || "Recently created"}
                </span>

                <button
                  className="note-open-button"
                  onClick={() => setOpenedNote(note)}
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

      {/* NOTE VIEWER */}

      {openedNote && (
        <div
          role="presentation"
          onClick={() => setOpenedNote(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={openedNote.title || "Note viewer"}
            onClick={(event) => event.stopPropagation()}
            style={{
              background: "var(--bg-primary, #171923)",
              color: "var(--text-primary, #ffffff)",
              border: "1px solid rgba(150,150,150,0.3)",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "900px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "28px",
              boxShadow: "0 20px 70px rgba(0,0,0,0.4)",
            }}
          >

            {/* NOTE HEADER */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <div>
                <span className="note-type-badge">
                  {getTypeName(openedNote.type)}
                </span>

                <h2 style={{ marginTop: "14px" }}>
                  {getIcon(openedNote.type)}{" "}
                  {openedNote.title}
                </h2>

                <p style={{ opacity: 0.7 }}>
                  📅 {openedNote.date || "Recently created"}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close note"
                onClick={() => setOpenedNote(null)}
                style={{
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: "18px",
                  background: "rgba(150,150,150,0.15)",
                  color: "inherit",
                }}
              >
                ✕
              </button>
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid rgba(150,150,150,0.3)",
                margin: "22px 0",
              }}
            />

            {/* MARKDOWN CONTENT */}

            <article
              className="markdown-content"
              style={{
                lineHeight: 1.85,
                fontSize: "15px",
                overflowWrap: "anywhere",
              }}
            >
              <ReactMarkdown
                remarkPlugins={[
                  remarkGfm,
                  remarkMath,
                ]}
                rehypePlugins={[
                  rehypeKatex,
                ]}
                components={{
                  h1: ({ children }) => (
                    <h1 style={{
                      fontSize: "28px",
                      marginTop: "28px",
                      marginBottom: "16px",
                      lineHeight: 1.3,
                    }}>
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 style={{
                      fontSize: "23px",
                      marginTop: "26px",
                      marginBottom: "14px",
                      lineHeight: 1.4,
                    }}>
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 style={{
                      fontSize: "19px",
                      marginTop: "22px",
                      marginBottom: "12px",
                    }}>
                      {children}
                    </h3>
                  ),

                  p: ({ children }) => (
                    <p style={{
                      marginBottom: "16px",
                    }}>
                      {children}
                    </p>
                  ),

                  ul: ({ children }) => (
                    <ul style={{
                      paddingLeft: "26px",
                      marginBottom: "18px",
                    }}>
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol style={{
                      paddingLeft: "26px",
                      marginBottom: "18px",
                    }}>
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li style={{
                      marginBottom: "8px",
                    }}>
                      {children}
                    </li>
                  ),

                  table: ({ children }) => (
                    <div style={{
                      overflowX: "auto",
                      margin: "20px 0",
                    }}>
                      <table style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        minWidth: "500px",
                      }}>
                        {children}
                      </table>
                    </div>
                  ),

                  th: ({ children }) => (
                    <th style={{
                      border: "1px solid rgba(150,150,150,0.35)",
                      padding: "12px",
                      textAlign: "left",
                      background: "rgba(130,100,255,0.15)",
                    }}>
                      {children}
                    </th>
                  ),

                  td: ({ children }) => (
                    <td style={{
                      border: "1px solid rgba(150,150,150,0.35)",
                      padding: "12px",
                      textAlign: "left",
                    }}>
                      {children}
                    </td>
                  ),

                  blockquote: ({ children }) => (
                    <blockquote style={{
                      borderLeft: "4px solid #8b5cf6",
                      paddingLeft: "16px",
                      margin: "20px 0",
                      opacity: 0.9,
                    }}>
                      {children}
                    </blockquote>
                  ),

                  code: ({ children }) => (
                    <code style={{
                      background: "rgba(150,150,150,0.15)",
                      padding: "3px 6px",
                      borderRadius: "5px",
                      fontSize: "0.9em",
                    }}>
                      {children}
                    </code>
                  ),

                  pre: ({ children }) => (
                    <pre style={{
                      background: "rgba(0,0,0,0.25)",
                      padding: "16px",
                      borderRadius: "10px",
                      overflowX: "auto",
                      margin: "18px 0",
                    }}>
                      {children}
                    </pre>
                  ),

                  hr: () => (
                    <hr style={{
                      border: "none",
                      borderTop: "1px solid rgba(150,150,150,0.3)",
                      margin: "26px 0",
                    }} />
                  ),

                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#a78bfa",
                        textDecoration: "underline",
                      }}
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {getDisplayContent(openedNote.content)}
              </ReactMarkdown>
            </article>

          </div>
        </div>
      )}
    </div>
  );
}

export default MyNotes;
