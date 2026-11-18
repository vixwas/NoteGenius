function Navbar({ currentPage }) {
  const pageNames = {
    dashboard: "Dashboard",
    notes: "My Notes",
    history: "History",
    flashcards: "Flashcards",
    quizzes: "Quizzes",
    settings: "Settings",
  };

  return (
    <nav className="top-navbar">
      <div className="navbar-left">
        <span className="navbar-breadcrumb">Workspace</span>

        <span className="breadcrumb-divider">/</span>

        <span className="navbar-current">
          {pageNames[currentPage] || "Dashboard"}
        </span>
      </div>

      <div className="navbar-right">
        <button className="navbar-icon-button" title="Notifications">
          🔔
        </button>

        <button className="navbar-help-button">
          ✨ AI Assistant
        </button>
      </div>
    </nav>
  );
}

export default Navbar;