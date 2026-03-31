import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Book Now', href: '#booking' },
  ]

  const handleNavClick = (e, link) => {
    if (link.href === '#booking') {
      e.preventDefault()
      window.dispatchEvent(new Event('openBookingModal'))
    }
    setIsOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-porcelain/90 backdrop-blur-xl shadow-lg py-3 border-b border-dustyrose/20' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo with animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Link
                to="/"
                className={`font-display text-2xl font-semibold transition-colors duration-300 cursor-pointer ${
                  scrolled ? 'text-charcoal' : 'text-porcelain'
                }`}
              >
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block"
                >
                  Nailedby
                </motion.span>
                <motion.span 
                  className="text-dustyrose"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Sema
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:flex items-center space-x-10"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`nav-link font-body font-medium transition-colors duration-300 ${
                    scrolled
                      ? 'text-charcoal hover:text-dustyrose'
                      : 'text-porcelain hover:text-dustyrose'
                  }`}
                  whileHover={{ y: -2 }}
                  custom={index}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                scrolled 
                  ? 'text-charcoal hover:bg-dustyrose/10' 
                  : 'text-porcelain hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-porcelain shadow-2xl z-50 md:hidden"
            >
              <div className="p-6">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-charcoal hover:bg-dustyrose/10 rounded-lg transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                {/* Logo */}
                <div className="mb-10">
                  <span className="font-display text-2xl text-charcoal">
                    Nailedby<span className="text-dustyrose">Sema</span>
                  </span>
                </div>

                {/* Nav Links */}
                <nav className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="block py-3 px-4 font-body text-lg text-charcoal rounded-lg hover:bg-dustyrose/10 transition-colors duration-300"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Decorative element */}
                <div className="absolute bottom-8 left-6 right-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-dustyrose/30 to-transparent" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
