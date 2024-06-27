import './App.css'
import Chat from './components/Chat/Chat'
import Login from './components/Login'
import { useState } from 'react'
function App() {
  const [userData, setUserData] = useState(null)
  if (userData === null) {
    return (
      <Login setUserData={setUserData} />
    )
  }
  else {
    return (
      <Chat userData={userData} />
    )
  }

}

export default App
