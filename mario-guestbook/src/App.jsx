import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import 'nes.css/css/nes.min.css'; // Import the 8-bit style

function App() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from('guestbook').select('*').order('created_at', { ascending: false });
    setPosts(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !message) return;
    
    await supabase.from('guestbook').insert([{ name, message }]);
    setName('');
    setMessage('');
    fetchPosts(); // Refresh the list
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="nes-text is-primary">Mario's Guestbook</h1>
        <p>Leave a message for the Princess!</p>
      </header>

      {/* Input Section */}
      <section className="nes-container with-title is-centered">
        <p className="title">New Message</p>
        <form onSubmit={handleSubmit}>
          <div className="nes-field" style={{ marginBottom: '15px' }}>
            <label>Character Name</label>
            <input type="text" className="nes-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Mario" />
          </div>
          <div className="nes-field" style={{ marginBottom: '15px' }}>
            <label>Message</label>
            <textarea className="nes-textarea" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="It's-a me!"></textarea>
          </div>
          <button type="submit" className="nes-btn is-success">Submit Post</button>
        </form>
      </section>

      <hr />

      {/* Display Section */}
      <section className="nes-container with-title">
        <p className="title">Recent Warp Zone Messages</p>
        <div className="nes-balloon-list">
          {posts.map(post => (
            <div key={post.id} className="nes-balloon from-left" style={{ marginBottom: '20px', display: 'block' }}>
              <p><strong>{post.name}:</strong> {post.message}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;