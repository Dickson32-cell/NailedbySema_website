import { motion, useScroll, useTransform } from 'framer-motion'

const Hero = () => {
  const scrollToBooking = () => {
    window.dispatchEvent(new Event('openBookingModal'))
  }

  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with subtle parallax */}
      <motion.div
        style={{
          y: backgroundY,
          backgroundImage: `url('/uploads/WhatsApp Image 2026-02-21 at 2.35.54 AM.jpeg')`,
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-charcoal/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-champagne text-sm md:text-base font-body font-medium tracking-[0.3em] uppercase mb-6"
        >
          Nail Technician & Brow Artist
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-porcelain mb-6 leading-[1.05]"
        >
          Nailedby<span className="italic text-dustyrose">Sema</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-body text-lg md:text-xl text-porcelain/90 mb-2"
        >
          Gel nails · Nail art · Luxury pedicures · Ombre brows
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-body text-sm md:text-base text-porcelain/70 mb-10"
        >
          Opposite Vineyard Hostel, Koforidua
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          onClick={scrollToBooking}
          className="bg-dustyrose text-charcoal font-body font-semibold text-lg px-10 py-4 rounded-full hover:bg-champagne transition-colors duration-300 cursor-pointer"
        >
          Book Your Appointment
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-porcelain/40 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-porcelain/60 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-porcelain to-transparent" />
    </section>
  )
}

export default Hero