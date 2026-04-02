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
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, type: 'spring' }}
          className="mb-8 inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card depth-shadow-sm"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-dustyrose to-champagne"
          />
          <span className="text-charcoal/80 text-sm md:text-base font-body font-medium tracking-wider uppercase">
            Award-Winning Nail Artistry
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl text-porcelain mb-8 leading-[0.95] tracking-tighter text-depth"
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Where{' '}
          </motion.span>
          <motion.span
            className="gradient-text italic inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            beauty
          </motion.span>
          <br />
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            meets{' '}
          </motion.span>
          <motion.span
            className="gradient-text italic inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            artistry
          </motion.span>
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

        {/* Stunning CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3, type: 'spring' }}
          onClick={scrollToBooking}
          whileHover={{ scale: 1.08, y: -4 }}
          whileTap={{ scale: 0.95 }}
          className="btn-luxury glass-card relative px-14 py-6 rounded-full text-charcoal font-body font-semibold text-lg
                     depth-shadow-lg hover:depth-shadow-xl
                     transition-all duration-500 cursor-pointer group overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-4">
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </motion.svg>
            <span className="tracking-wide">Book Your Experience</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </span>

          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-dustyrose via-champagne to-dustyrose opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ backgroundPosition: '0% 50%' }}
            whileHover={{ backgroundPosition: '100% 50%' }}
            style={{ backgroundSize: '200% 200%' }}
          />
        </motion.button>

        {/* Trust indicators - Glass Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          {[
            { icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ), text: '5-Star Rated', delay: 0 },
            { icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ), text: 'Same Day Booking', delay: 0.1 },
            { icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            ), text: 'Mobile Service', delay: 0.2 },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + item.delay, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="glass-card px-6 py-4 rounded-2xl flex items-center gap-3 hover:depth-shadow-md transition-all duration-300 cursor-default"
            >
              <div className="text-champagne">
                {item.icon}
              </div>
              <span className="font-body font-medium text-charcoal/90 text-sm md:text-base whitespace-nowrap">
                {item.text}
              </span>
            </motion.div>
          ))}
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
