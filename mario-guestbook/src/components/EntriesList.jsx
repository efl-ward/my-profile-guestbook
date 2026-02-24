export default function EntriesList({ entries }) {
  if (entries.length === 0) {
    return (
      <div className="empty-state">
        NO ENTRIES YET...<br />BE THE FIRST HERO! 🍄
      </div>
    );
  }

  return (
    <div id="entries-list">
      {entries.map((entry, index) => (
        <div
          key={entry.id}
          className="entry-card"
          data-character={entry.character}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="entry-name">{escapeHtml(entry.name)}</div>
          <div className="entry-msg">"{escapeHtml(entry.message)}"</div>
          <div className="entry-meta">
            <span className="entry-character">
              {entry.character} {entry.character === '🍄' ? 'MARIO' : entry.character === '👾' ? 'LUIGI' : 'HERO'}
            </span>
            <span>🌍 {escapeHtml(entry.country)}</span>
            <span>📅 {new Date(entry.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper to escape HTML
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}