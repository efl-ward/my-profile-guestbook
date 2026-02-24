import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function GuestbookList({ refreshTrigger }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [refreshTrigger])

  async function fetchPosts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error('Error fetching posts:', error)
    else setPosts(data)
    setLoading(false)
  }

  if (loading) return <div>Loading posts...</div>

  return (
    <div className="guestbook-list">
      {posts.length === 0 ? (
        <p>No posts yet. Be the first!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <strong>{post.name}</strong> <span>said:</span>
            <p>{post.message}</p>
            <small>{new Date(post.created_at).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  )
}