import React from 'react'
import Header from './composants/header'
import Footer from './composants/footer'
import EvenementsPage from './pages/Evenementspage'
import EventDetailPage from './pages/EventDetailPage'


const App = () => {
  return (
    <div>
      <Header />
      <EvenementsPage />
     {/* <EventDetailPage/> */}
      <Footer />
    </div>
  )
}

export default App