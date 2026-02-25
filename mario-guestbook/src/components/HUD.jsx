export default function HUD({ coins, title = "WARD'S GUESTBOOK" }) {
  return (
    <div className="hud">
      <span>🍄 {title}</span>
      <span>
        <span className="coin-icon"></span> <span id="hud-coins">{coins}</span>×
      </span>
      <span>WORLD {title.includes('GUESTBOOK') ? '1-1' : '1-2'}</span>
    </div>
  );
}