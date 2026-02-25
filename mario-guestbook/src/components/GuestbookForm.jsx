import { useState } from 'react';
import CharacterGrid from './CharacterGrid';

export default function GuestbookForm({ onEntryAdded, coins, onCoinCollected }) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [selectedChar, setSelectedChar] = useState('🍄');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    // Simulate coin increment (like hitting a ? block)
    onCoinCollected();

    // In a real app you would insert into Supabase here.
    // For now we'll call the parent callback with the new entry.
    const newEntry = {
      id: Date.now(),
      name,
      message,
      country: country || 'Mushroom Kingdom',
      character: selectedChar,
      created_at: new Date().toISOString(),
    };
    onEntryAdded(newEntry);

    // Reset form
    setName('');
    setCountry('');
    setMessage('');
    setSelectedChar('🍄');
    setLoading(false);
  };

  return (
    <div className="panel">
      <div className="panel-title">✉ SIGN THE GUESTBOOK</div>
      <div className="coin-counter">
        <span className="coin-icon"></span>
        <span id="entry-count">{/* count will be updated from parent */}</span> ADVENTURERS SIGNED
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">YOUR NAME:</label>
        <input
          id="name"
          type="text"
          maxLength="40"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>CHOOSE YOUR CHARACTER:</label>
        <CharacterGrid selectedChar={selectedChar} onSelectChar={setSelectedChar} />

        <label htmlFor="country">WHERE U FROM</label>
        <input
          id="country"
          type="text"
          maxLength="40"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <label htmlFor="message">YOUR MESSAGE:</label>
        <textarea
          id="message"
          rows="4"
          placeholder="Leave a message for the next adventurer..."
          maxLength="300"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'POSTING...' : '▶ SUBMIT ENTRY ◀'}
        </button>
      </form>
    </div>
  );
}