export default function CharacterGrid({ selectedChar, onSelectChar }) {
  const characters = [
    { emoji: '🍄', label: 'MARIO' },
    { emoji: '👾', label: 'LUIGI' },
    { emoji: '👸', label: 'PEACH' },
    { emoji: '🐢', label: 'KOOPA' },
    { emoji: '⭐', label: 'STAR' },
    { emoji: '🌸', label: 'DAISY' },
    { emoji: '🦖', label: 'BOWSER' },
    { emoji: '👻', label: 'BOO' },
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