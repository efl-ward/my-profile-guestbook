import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function GuestbookForm({ onPostAdded }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setLoading(true)
    const { error } = await supabase
      .from('guestbook')
      .insert([{ name, message }])

    if (error) console.error('Error inserting post:', error)
    else {
      setName('')
      setMessage('')
      onPostAdded() // refresh list
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="guestbook-form">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Posting...' : 'Post Message'}
      </button>
    </form>
  )
}