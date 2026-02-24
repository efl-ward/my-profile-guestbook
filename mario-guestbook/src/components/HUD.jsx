export default function HUD({ coins }) {
  return (
    <div className="hud">
      <span>🍄 WARD GUESTBOOK</span>
      <span>
        <span className="coin-icon"></span> <span id="hud-coins">{coins}</span>×
      </span>
      <span>WORLD 1-1</span>
    </div>
  );
}

