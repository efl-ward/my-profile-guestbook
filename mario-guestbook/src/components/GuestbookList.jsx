import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function GuestbookList({ refreshTrigger }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger]);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });a

    if (error) console.error('Error fetching posts:', error);
    else setPosts(data);
    setLoading(false);
  }

  if (loading) return <div className="loading">LOADING ADVENTURER LOG...</div>;

  return (
    <div className="guestbook-list">
      <h2>ADVENTURER LOG</h2>
      {posts.length === 0 ? (
        <p>No entries yet. Be the first to sign!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <strong>{post.name}</strong> 
              {post.character && <span className="character-badge">{post.character}</span>}
              {post.country && <span className="country">from {post.country}</span>}
            </div>
            <p className="message">{post.message}</p>
            <small>{new Date(post.created_at).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}