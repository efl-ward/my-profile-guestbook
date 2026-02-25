import { useState } from 'react';

export default function Header({ onCoinCollected }) {
  const [blockStates, setBlockStates] = useState(Array(4).fill('?'));

  const handleHitBlock = (index, e) => {
    if (blockStates[index] !== '?') return; // already hit

    // Spawn star animation
    const rect = e.currentTarget.getBoundingClientRect();
    spawnStarAt(rect.left + rect.width / 2, rect.top);

    // Update block to empty (★) temporarily
    setBlockStates(prev => {
      const newState = [...prev];
      newState[index] = '★';
      setTimeout(() => {
        setBlockStates(cur => {
          const reset = [...cur];
          reset[index] = '?';
          return reset;
        });
      }, 1500);
      return newState;
    });

    // Increment coins
    onCoinCollected();
  };

  const spawnStarAt = (x, y) => {
    const star = document.createElement('div');
    star.className = 'star';
    star.textContent = '⭐';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 1000);
  };

  return (
    <header>
      <div className="logo-row">
        <span style={{ fontSize: '40px' }}>🍄</span>
        <div>
          <h1>WARD'S<br />GUESTBOOK</h1>
          <div className="subtitle">▶ SIGN IN &amp; JOIN THE ADVENTURE! ◀</div>
        </div>
        <span style={{ fontSize: '40px' }}>⭐</span>
      </div>
      <div className="brick-row" aria-hidden="true">
        <div
          className="question-block"
          onClick={(e) => handleHitBlock(0, e)}
        >
          {blockStates[0]}
        </div>
        <div className="brick"></div>
        <div className="brick"></div>
        <div
          className="question-block"
          onClick={(e) => handleHitBlock(1, e)}
        >
          {blockStates[1]}
        </div>
        <div className="brick"></div>
        <div
          className="question-block"
          onClick={(e) => handleHitBlock(2, e)}
        >
          {blockStates[2]}
        </div>
        <div className="brick"></div>
        <div className="brick"></div>
        <div
          className="question-block"
          onClick={(e) => handleHitBlock(3, e)}
        >
          {blockStates[3]}
        </div>
      </div>
    </header>
  );
}