function Sidebar({ currentPage, setCurrentPage }) {
  const menuItems = [
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "notes", icon: "📚", label: "My Notes" },
    { id: "history", icon: "🕘", label: "History" },
    { id: "flashcards", icon: "🧠", label: "Flashcards" },
    { id: "quizzes", icon: "❓", label: "Quizzes" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo">✦</span>
        <span>NoteGenius</span>
      </div>

      <div className="sidebar-section-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${
              currentPage === item.id ? "active" : ""
            }`}
            onClick={() => setCurrentPage(item.id)}
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button
          className={`sidebar-item ${
            currentPage === "settings" ? "active" : ""
          }`}
          onClick={() => setCurrentPage("settings")}
        >
          <span className="sidebar-item-icon">⚙️</span>
          <span>Settings</span>
        </button>

        <div className="sidebar-profile">
          <div className="profile-avatar">V</div>

          <div className="profile-info">
            <span className="profile-name">Student</span>
            <span className="profile-role">Personal Workspace</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;