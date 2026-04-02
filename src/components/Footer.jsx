import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSnapchat, FaTiktok, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhone, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-charcoal text-porcelain py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-dustyrose rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-champagne rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-2xl mb-6">
              Nailedby<span className="text-dustyrose">Sema</span>
            </h3>
            <p className="font-body text-porcelain/70 mb-8 leading-relaxed">
              Premium nail services and brow artistry in Koforidua, Eastern Region, Ghana.
            </p>
            
            {/* Newsletter Signup */}
            <div className="bg-porcelain/5 rounded-2xl p-6">
              <h4 className="font-display text-lg mb-3">Stay Updated</h4>
              <p className="font-body text-porcelain/60 text-sm mb-4">
                Get the latest offers and styles
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-porcelain/10 border border-porcelain/20 rounded-xl
                             text-porcelain placeholder-porcelain/40 font-body text-sm
                             focus:outline-none focus:border-dustyrose transition-colors"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-dustyrose text-charcoal font-body font-semibold py-3 rounded-xl
                             hover:bg-champagne transition-colors duration-300"
                >
                  {subscribed ? '✓ Subscribed!' : 'Subscribe'}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-display text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Services', href: '#services' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'About', href: '#about' },
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="font-body text-porcelain/70 hover:text-dustyrose transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-dustyrose rounded-full" />
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#booking"
                  onClick={(e) => {
                    e.preventDefault()
                    window.dispatchEvent(new Event('openBookingModal'))
                  }}
                  className="font-body text-porcelain/70 hover:text-dustyrose transition-colors duration-300 inline-flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-dustyrose rounded-full" />
                  Book Now
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-display text-lg mb-6">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-porcelain/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaPhone className="text-dustyrose text-sm" />
                </div>
                <div>
                  <p className="font-body text-porcelain/50 text-sm mb-1">Phone</p>
                  <a href="tel:+233539649949" className="font-body text-porcelain/90 hover:text-dustyrose transition-colors">
                    +233 53 964 9949
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-porcelain/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaEnvelope className="text-dustyrose text-sm" />
                </div>
                <div>
                  <p className="font-body text-porcelain/50 text-sm mb-1">Email</p>
                  <a href="mailto:emmanuellaasonkey9@gmail.com" className="font-body text-porcelain/90 hover:text-dustyrose transition-colors break-all">
                    emmanuellaasonkey9@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-porcelain/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-dustyrose text-sm" />
                </div>
                <div>
                  <p className="font-body text-porcelain/50 text-sm mb-1">Location</p>
                  <span className="font-body text-porcelain/90">
                    Opposite Vineyard Hostel<br />
                    Koforidua, Eastern Region<br />
                    Ghana
                  </span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-display text-lg mb-6">Location</h4>
            <div className="bg-porcelain/10 rounded-2xl overflow-hidden h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.5!2d-0.2591!3d6.0941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDYnMDAuMCJOIC0wLjI1OTExMDAwMDAwMDA!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Studio Location - Opposite Vineyard Hostel, Koforidua"
              />
            </div>
            <p className="font-body text-xs text-porcelain/40 mt-3">
              GPS: 6.0941° N, 0.2591° W
            </p>
          </motion.div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-porcelain/10 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                href="https://snapchat.com/t/sYn4ueqU"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="liquid-metal mirror-reflect w-12 h-12 bg-porcelain/10 rounded-2xl flex items-center justify-center
                           hover:bg-gradient-to-br hover:from-dustyrose hover:to-champagne
                           transition-all duration-500 shadow-md hover:shadow-lg border border-porcelain/5"
              >
                <FaSnapchat size={20} />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@nailtechinkoforidua"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="liquid-metal mirror-reflect w-12 h-12 bg-porcelain/10 rounded-2xl flex items-center justify-center
                           hover:bg-gradient-to-br hover:from-dustyrose hover:to-champagne
                           transition-all duration-500 shadow-md hover:shadow-lg border border-porcelain/5"
              >
                <FaTiktok size={20} />
              </motion.a>
              <motion.a
                href="https://wa.me/+233539649949"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="liquid-metal mirror-reflect w-12 h-12 bg-porcelain/10 rounded-2xl flex items-center justify-center
                           hover:bg-gradient-to-br hover:from-dustyrose hover:to-champagne
                           transition-all duration-500 shadow-md hover:shadow-lg border border-porcelain/5"
              >
                <FaWhatsapp size={20} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/nailedbysema"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="liquid-metal mirror-reflect w-12 h-12 bg-porcelain/10 rounded-2xl flex items-center justify-center
                           hover:bg-gradient-to-br hover:from-dustyrose hover:to-champagne
                           transition-all duration-500 shadow-md hover:shadow-lg border border-porcelain/5"
              >
                <FaInstagram size={20} />
              </motion.a>
            </div>

            {/* Copyright */}
            <p className="font-body text-porcelain/50 text-center md:text-right">
              © {currentYear} NailedbySema. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
