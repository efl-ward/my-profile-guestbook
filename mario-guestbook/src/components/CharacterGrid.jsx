export default function CharacterGrid({ selectedChar, onSelectChar }) {
  const characters = [
    { emoji: '🍄', label: 'KABUTE' },
    { emoji: '👾', label: 'SWIPER' },
    { emoji: '👸', label: 'REYNA' },
    { emoji: '🐢', label: 'TURTOL' },
    { emoji: '⭐', label: 'STAR' },
    { emoji: '🌸', label: 'BOLAKLAK' },
    { emoji: '🦖', label: 'T-REX' },
    { emoji: '👻', label: 'MOO-MOO' },
  ];

  return (
    <div className="char-grid" id="char-grid">
      {characters.map((char) => (
        <button
          key={char.emoji}
          type="button"
          className={`char-btn ${selectedChar === char.emoji ? 'selected' : ''}`}
          data-char={char.emoji}
          onClick={() => onSelectChar(char.emoji)}
        >
          {char.emoji}
          <span className="char-label">{char.label}</span>
        </button>
      ))}
    </div>
  );
}