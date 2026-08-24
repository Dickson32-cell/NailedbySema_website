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
    { name: 'Reviews', href: '#reviews' },
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
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-porcelain shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className={`font-display text-2xl font-semibold transition-colors duration-300 ${
                scrolled ? 'text-charcoal' : 'text-porcelain'
              }`}
            >
              Nailedby<span className="text-dustyrose">Sema</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`nav-link font-body font-medium text-sm transition-colors duration-300 ${
                    scrolled
                      ? 'text-charcoal hover:text-dustyrose'
                      : 'text-porcelain hover:text-dustyrose'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile button */}
            <button
              className={`md:hidden p-2 transition-colors ${
                scrolled ? 'text-charcoal' : 'text-porcelain'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-charcoal/40 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-porcelain shadow-xl z-50 md:hidden"
            >
              <div className="p-6">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-charcoal hover:bg-dustyrose/10 rounded-lg"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <div className="mb-8">
                  <span className="font-display text-2xl text-charcoal">
                    Nailedby<span className="text-dustyrose">Sema</span>
                  </span>
                </div>
                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="block py-3 px-4 font-body text-base text-charcoal rounded-lg hover:bg-dustyrose/10 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar