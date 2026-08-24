import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Gallery from '../components/Gallery'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import BookingForm from '../components/BookingForm'
import HandoutModal from '../components/HandoutModal'

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [handoutOpen, setHandoutOpen] = useState(false)

  useEffect(() => {
    const handleOpenBooking = () => setBookingOpen(true)
    window.addEventListener('openBookingModal', handleOpenBooking)
    return () => window.removeEventListener('openBookingModal', handleOpenBooking)
  }, [])

  return (
    <div className="bg-porcelain">
      <Hero />
      <Services onBook={() => setBookingOpen(true)} onDownloadHandout={() => setHandoutOpen(true)} />
      <Gallery />
      <About />
      <Testimonials />

      <BookingForm
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        services={[]}
      />
      <HandoutModal
        isOpen={handoutOpen}
        onClose={() => setHandoutOpen(false)}
      />
    </div>
  )
}