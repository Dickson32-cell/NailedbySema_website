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
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Small editorial badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-porcelain/30 backdrop-blur-sm"
        >
          <div className="w-2 h-2 rounded-full bg-dustyrose animate-pulse" />
          <span className="text-porcelain/90 text-sm font-body tracking-widest uppercase">Professional Nail Artistry</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-porcelain mb-6 leading-[1.1] tracking-tight"
        >
          Your nails.{' '}
          <span className="holo-text italic block md:inline">Your story.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10 max-w-3xl mx-auto"
        >
          <p className="font-body text-lg md:text-xl text-porcelain/95 mb-3 leading-relaxed">
            Sema — Where artistry meets elegance
          </p>
          <p className="font-body text-base md:text-lg text-porcelain/80 leading-relaxed">
            Gel nails · Nail art · Luxury pedicures · Ombre brows
          </p>
          <p className="font-body text-sm md:text-base text-champagne/90 mt-2 tracking-wide">
            Opposite Vineyard Hostel, Koforidua
          </p>
        </motion.div>

        {/* Premium CTA Button with Liquid Metal Effect */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={scrollToBooking}
          className="btn-premium liquid-metal mirror-reflect relative bg-dustyrose text-charcoal font-body font-semibold px-12 py-5 rounded-full
                     hover:bg-champagne transition-all duration-500
                     shadow-lg hover:shadow-2xl hover:shadow-champagne/40
                     transform hover:scale-105 luxury-pulse"
          whileHover={{
            boxShadow: '0 0 30px rgba(201, 169, 110, 0.7), 0 0 60px rgba(201, 169, 110, 0.4), 0 10px 40px rgba(0, 0, 0, 0.3)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="tracking-wide">Book Your Appointment</span>
          </span>
        </motion.button>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-porcelain/70 text-sm"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-champagne" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-body">5-Star Rated</span>
          </div>
          <div className="h-4 w-px bg-porcelain/30" />
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-body">Same Day Available</span>
          </div>
          <div className="h-4 w-px bg-porcelain/30" />
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-body">Home Service Available</span>
          </div>
        </motion.div>
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
