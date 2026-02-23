import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${(scrolled || isOpen) ? 'bg-porcelain/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`font-display text-2xl font-semibold transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-porcelain'
              }`}
          >
            Nailedby<span className="text-dustyrose">Sema</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-body transition-colors duration-300 ${scrolled
                  ? 'text-charcoal hover:text-dustyrose'
                  : 'text-porcelain hover:text-dustyrose'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-porcelain'
              }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden mt-4 pb-4 animate-fade-in`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block py-2 font-body transition-colors ${scrolled ? 'text-charcoal' : 'text-porcelain'
                  } hover:text-dustyrose`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
