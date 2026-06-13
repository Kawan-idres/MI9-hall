import React, { useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import VenueMap from './components/VenueMap.jsx'
import Payment from './components/Payment.jsx'
import Confirmation from './components/Confirmation.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  const [page, setPage] = useState('home') // home | map | payment | confirm | contact
  const [reservation, setReservation] = useState(null)

  const goTo = (p, data) => {
    if (data) setReservation(data)
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <Nav onHome={() => goTo('home')} onContact={() => goTo('contact')} onReserve={() => goTo('map')} />
      {page === 'home' && <Hero onReserve={() => goTo('map')} />}
      {page === 'map' && <VenueMap onBook={(data) => goTo('payment', data)} />}
      {page === 'payment' && <Payment reservation={reservation} onConfirm={(data) => goTo('confirm', data)} onBack={() => goTo('map')} />}
      {page === 'confirm' && <Confirmation reservation={reservation} onHome={() => goTo('home')} />}
      {page === 'contact' && <Contact />}
    </div>
  )
}
