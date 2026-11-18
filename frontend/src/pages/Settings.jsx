function Settings() {
  return (
    <main className="page-content">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">PERSONALIZATION</span>
          <h1>Settings ⚙️</h1>
          <p>Customize your NoteGenius experience.</p>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-row">
          <div>
            <h3>Learning preferences</h3>
            <p>These preferences can be customized while generating notes.</p>
          </div>

          <span className="settings-badge">Available on Dashboard</span>
        </div>

        <div className="settings-row">
          <div>
            <h3>Language</h3>
            <p>English, Hindi and Hinglish supported.</p>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <h3>Learning level</h3>
            <p>Beginner, University Student or Advanced.</p>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <h3>Explanation detail</h3>
            <p>Short, Medium or Detailed explanations.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Settings;