import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import HUD from './components/HUD';
import GroundPipes from './components/GroundPipes';
import Header from './components/Header';
import GuestbookForm from './components/GuestbookForm';
import EntriesList from './components/EntriesList';
import Toast from './components/Toast';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('mario_coins');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching entries:', error);
    } else {
      setEntries(data);
    }
  };

  const handleEntryAdded = async (newEntry) => {
    const { error } = await supabase.from('guestbook').insert([
      {
        name: newEntry.name,
        character: newEntry.character,
        country: newEntry.country,
        message: newEntry.message,
      },
    ]);
    if (error) {
      console.error('Error inserting entry:', error);
      return;
    }
    await fetchEntries();
    setToastMessage('⭐ 1UP! ENTRY SAVED!');
    setShowToast(true);
  };

  const handleCoinCollected = () => {
    setCoins((prev) => {
      const newCoins = prev + 1;
      localStorage.setItem('mario_coins', newCoins);
      return newCoins;
    });
  };

  const hideToast = () => setShowToast(false);

  return (
    <>
      <HUD coins={coins} />
      <GroundPipes />
      <Toast message={toastMessage} show={showToast} onHide={hideToast} />
      <div className="container">
        <Header onCoinCollected={handleCoinCollected} />
        <GuestbookForm
          onEntryAdded={handleEntryAdded}
          coins={coins}
          onCoinCollected={handleCoinCollected}
          entryCount={entries.length}
        />
        <div>
          <div className="entries-header">
            <div className="entries-title">📜 ADVENTURER LOG</div>
          </div>
          <EntriesList entries={entries} />
        </div>
      </div>
    </>
  );
}

export default App;