import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import HUD from './components/HUD';
import GroundPipes from './components/GroundPipes';
import Header from './components/Header';
import GuestbookForm from './components/GuestbookForm';
import EntriesList from './components/EntriesList';
import ProfileView from './components/ProfileView';
import ProfileEdit from './components/ProfileEdit';
import Toast from './components/Toast';
import './App.css';

function GuestbookPage({ coins, onCoinCollected, entries, fetchEntries, handleEntryAdded, showToast }) {
  const navigate = useNavigate();

  return (
    <>
      <Header onCoinCollected={onCoinCollected} />
      <GuestbookForm
        onEntryAdded={handleEntryAdded}
        coins={coins}
        onCoinCollected={onCoinCollected}
        entryCount={entries.length}
      />
      <div>
        <div className="entries-header">
          <div className="entries-title">📜 ADVENTURER LOG</div>
          <button className="btn" style={{ width: 'auto', padding: '8px 16px' }} onClick={() => navigate('/profile')}>
            🌍 GO TO WORLD 1-2
          </button>
        </div>
        <EntriesList entries={entries} />
      </div>
    </>
  );
}

function ProfilePage({ coins, onCoinCollected }) {
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button className="btn" style={{ width: 'auto', padding: '8px 16px' }} onClick={() => navigate('/')}>
          ← BACK TO GUESTBOOK
        </button>
        <span style={{ color: 'white', textShadow: '2px 2px 0 #000' }}>WORLD 1-2</span>
      </div>

      {!editing ? (
        <ProfileView onEdit={() => setEditing(true)} />
      ) : (
        <ProfileEdit
          onSave={(updated) => {
            setEditing(false);
            // Optionally trigger a re-fetch or show toast
          }}
          onCancel={() => setEditing(false)}
        />
      )}
    </>
  );
}

function AppContent() {
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
    if (error) console.error('Error fetching entries:', error);
    else setEntries(data);
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
      <HUD coins={coins} title={window.location.pathname === '/profile' ? "MARIO'S PROFILE" : "MARIO GUESTBOOK"} />
      <GroundPipes />
      <Toast message={toastMessage} show={showToast} onHide={hideToast} />
      <div className="container">
        <Routes>
          <Route path="/" element={
            <GuestbookPage
              coins={coins}
              onCoinCollected={handleCoinCollected}
              entries={entries}
              fetchEntries={fetchEntries}
              handleEntryAdded={handleEntryAdded}
              showToast={setShowToast}
            />
          } />
          <Route path="/profile" element={
            <ProfilePage coins={coins} onCoinCollected={handleCoinCollected} />
          } />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;