import { motion, useScroll, useTransform } from 'framer-motion'

const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.5, 0.8])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ 
          y: backgroundY,
          backgroundImage: `url('/uploads/WhatsApp Image 2026-02-21 at 2.35.54 AM.jpeg')`,
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      />
      
      {/* Elegant Gradient Overlay - replaces blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/60 via-charcoal/40 to-dustyrose/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30" />
      
      {/* Floating Sparkles/Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-champagne rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
        {/* Larger decorative sparkles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`large-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-champagne/60">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-porcelain mb-6 leading-tight"
        >
          Your nails. <br />
          <span className="italic text-dustyrose">Your story.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-xl md:text-2xl text-porcelain/90 mb-10 max-w-2xl mx-auto"
        >
          Sema — Gel nails, nail art, luxury pedicures & ombre brows opposite Vineyard Hostel, Koforidua
        </motion.p>

        {/* Premium CTA Button with Shimmer/Glow */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={scrollToBooking}
          className="btn-premium relative bg-dustyrose text-charcoal font-body font-semibold px-12 py-5 rounded-full
                     hover:bg-champagne transition-all duration-500 
                     shadow-lg hover:shadow-2xl hover:shadow-champagne/30
                     transform hover:scale-105"
          whileHover={{ 
            boxShadow: '0 0 30px rgba(201, 169, 110, 0.6), 0 0 60px rgba(201, 169, 110, 0.3)' 
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book an Appointment
          </span>
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-8 h-12 border-2 border-porcelain/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-porcelain/70 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-porcelain to-transparent" />
    </section>
  )
}

export default Hero
