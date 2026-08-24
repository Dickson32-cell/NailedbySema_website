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
    <footer className="bg-charcoal text-porcelain py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-display text-2xl mb-4">
              Nailedby<span className="text-dustyrose">Sema</span>
            </h3>
            <p className="font-body text-porcelain/60 mb-6 leading-relaxed text-sm">
              Premium nail services and brow artistry in Koforidua, Eastern Region, Ghana.
            </p>
            <div className="bg-porcelain/5 rounded-xl p-4">
              <h4 className="font-display text-base mb-2">Stay Updated</h4>
              <p className="font-body text-porcelain/50 text-xs mb-3">Get the latest offers and styles</p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-3 py-2.5 bg-porcelain/10 border border-porcelain/20 rounded-lg text-porcelain placeholder-porcelain/40 font-body text-sm focus:outline-none focus:border-dustyrose transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-dustyrose text-charcoal font-body font-medium py-2.5 rounded-lg hover:bg-champagne transition-colors text-sm"
                >
                  {subscribed ? '✓ Subscribed!' : 'Subscribe'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h4 className="font-display text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Services', href: '#services' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'About', href: '#about' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-porcelain/60 hover:text-dustyrose transition-colors text-sm"
                  >
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
                  className="font-body text-porcelain/60 hover:text-dustyrose transition-colors text-sm"
                >
                  Book Now
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h4 className="font-display text-lg mb-4">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaPhone className="text-dustyrose mt-1 flex-shrink-0" />
                <a href="tel:+233539649949" className="font-body text-porcelain/80 hover:text-dustyrose transition-colors">
                  +233 53 964 9949
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-dustyrose mt-1 flex-shrink-0" />
                <a href="mailto:emmanuellaasonkey9@gmail.com" className="font-body text-porcelain/80 hover:text-dustyrose transition-colors break-all">
                  emmanuellaasonkey9@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-dustyrose mt-1 flex-shrink-0" />
                <span className="font-body text-porcelain/80">
                  Opposite Vineyard Hostel<br />
                  Koforidua, Eastern Region<br />
                  Ghana
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h4 className="font-display text-lg mb-4">Location</h4>
            <div className="bg-porcelain/10 rounded-xl overflow-hidden h-44">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.5!2d-0.2591!3d6.0941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDYnMDAuMCJOIC0wLjI1OTExMDAwMDAwMDA!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Studio Location — Koforidua"
              />
            </div>
            <p className="font-body text-xs text-porcelain/40 mt-2">GPS: 6.0941° N, 0.2591° W</p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-porcelain/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-3">
            <a href="https://snapchat.com/t/sYn4ueqU" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-porcelain/10 rounded-xl flex items-center justify-center hover:bg-dustyrose hover:text-charcoal transition-colors">
              <FaSnapchat size={18} />
            </a>
            <a href="https://www.tiktok.com/@nailtechinkoforidua" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-porcelain/10 rounded-xl flex items-center justify-center hover:bg-dustyrose hover:text-charcoal transition-colors">
              <FaTiktok size={18} />
            </a>
            <a href="https://wa.me/233539649949" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-porcelain/10 rounded-xl flex items-center justify-center hover:bg-dustyrose hover:text-charcoal transition-colors">
              <FaWhatsapp size={18} />
            </a>
            <a href="https://www.instagram.com/nailedbysema" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-porcelain/10 rounded-xl flex items-center justify-center hover:bg-dustyrose hover:text-charcoal transition-colors">
              <FaInstagram size={18} />
            </a>
          </div>
          <p className="font-body text-porcelain/40 text-sm">
            © {currentYear} NailedbySema. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer