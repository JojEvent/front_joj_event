import React from 'react'
import Header from './composants/header'
import Footer from './composants/footer'

const App = () => {
  // const { isAuthenticated, user, logout } = useAuth()

// useEffect(() => {
// console.log(user?.last_name)
// }, [user])

  return (
    <div>
      <Header />
      <Footer />
    </div>
  )
}

export default App