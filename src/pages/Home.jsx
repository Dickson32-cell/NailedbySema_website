import { useState, useEffect } from 'react'
import BookingForm from '../components/BookingForm'
import { fetchServices } from '../lib/supabase'
import Gallery from '../components/Gallery'
import About from '../components/About'
import Services from '../components/Services'
import { Star, Clock, MapPin, Phone, MessageCircle, Instagram, Facebook, ChevronLeft, ChevronRight } from 'lucide-react'

// Default services in case Supabase fails
const defaultServices = [
  { name: 'Manicure', price: 50, duration: '45 mins', description: 'Shape, polish & nail art' },
  { name: 'Pedicure', price: 60, duration: '1 hour', description: 'Full foot spa & polish' },
  { name: 'Nail Extension', price: 120, duration: '1.5 hours', description: 'Acrylic or gel extensions' },
  { name: 'Nail Art', price: 30, duration: '30 mins', description: 'Custom designs per nail' },
  { name: 'Gel Polish', price: 80, duration: '1 hour', description: 'Long-lasting gel manicure' },
  { name: 'Foot Spa', price: 70, duration: '1 hour', description: 'Relaxing foot treatment' },
]

const testimonials = [
  { name: 'Sarah M.', rating: 5, text: 'Sema is amazing! My nails always look perfect. Best nail tech in Koforidua!', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { name: 'Amanda K.', rating: 5, text: 'Love the home service option. Very professional and clean!', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { name: 'Jessica A.', rating: 5, text: 'Great nail art designs! Always get compliments on my nails.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
]

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [services, setServices] = useState(defaultServices)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const data = await fetchServices()
      if (data && data.length > 0) {
        setServices(data)
      }
    } catch (error) {
      console.log('Using default services')
    }
  }

  useEffect(() => {
    const handleOpenBooking = () => setBookingOpen(true)
    window.addEventListener('openBookingModal', handleOpenBooking)
    return () => window.removeEventListener('openBookingModal', handleOpenBooking)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-700/90 to-pink-900/90 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&h=1080&fit=crop)' }}
        />

        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Nailed by Sema ✨
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-pink-100">
            Professional nail art & beauty services in Koforidua
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="bg-white text-pink-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-pink-50 transition transform hover:scale-105 shadow-xl"
          >
            Book Now 📱
          </button>
        </div>
      </section>

      {/* Services Section */}
      <Services onBook={() => setBookingOpen(true)} />

      {/* Gallery Section */}
      <Gallery />

      {/* About Section */}
      <About />

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What Clients Say</h2>

          <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <button
              onClick={prevTestimonial}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-pink-50 rounded-full transition"
            >
              <ChevronLeft className="w-6 h-6 text-pink-500" />
            </button>

            <div className="text-center px-10 md:px-16">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-xl text-gray-700 mb-4 italic">"{testimonials[currentTestimonial].text}"</p>
              <p className="font-bold text-pink-600">{testimonials[currentTestimonial].name}</p>
            </div>

            <button
              onClick={nextTestimonial}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-pink-50 rounded-full transition"
            >
              <ChevronRight className="w-6 h-6 text-pink-500" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-600 to-pink-800 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="opacity-80">We use only the best products for lasting results</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Hours</h3>
              <p className="opacity-80">Open daily with home service options</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Location</h3>
              <p className="opacity-80">Located opposite Vineyard Hostel, Koforidua</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingForm
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        services={services}
      />
    </div>
  )
}
