import { useState } from 'react'
import GuestbookForm from './components/GuestbookForm'
import GuestbookList from './components/GuestbookList'
import './App.css'

function App() {
  const [refreshList, setRefreshList] = useState(0)

  const handlePostAdded = () => {
    setRefreshList(prev => prev + 1) // trigger re-fetch
  }

  return (
    <div className="App">
      <header className="mario-header">
        <h1>Ward's Guestbook</h1>
        <img src="/icons8-mario-48.png" alt="Ward Logo" className="hat" />
      </header>
      <main>
        <GuestbookForm onPostAdded={handlePostAdded} />
        <GuestbookList refreshTrigger={refreshList} />
      </main>
    </div>
  )
}

export default App