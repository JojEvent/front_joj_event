import React from 'react'
import Header from './composants/header'
import Footer from './composants/footer'
import { useAuth } from './context/authContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const { isAuthenticated, user, logout } = useAuth()

useEffect(() => {
console.log(user?.last_name)
}, [user])

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <Header />
      <p>{user?.first_name}</p> 
      <Footer />
    </div>
  )
}

export default App