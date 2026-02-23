import { FaSnapchat, FaTiktok, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-porcelain py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl mb-4">
              Nailedby<span className="text-dustyrose">Sema</span>
            </h3>
            <p className="font-body text-porcelain/70 mb-6">
              Premium nail services and brow artistry in Koforidua, Eastern Region, Ghana.
            </p>
            <div className="flex gap-4">
              <a
                href="https://snapchat.com/t/sYn4ueqU"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-porcelain/10 rounded-full flex items-center justify-center
                           hover:bg-dustyrose transition-colors"
              >
                <FaSnapchat size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@nailtechinkoforidua"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-porcelain/10 rounded-full flex items-center justify-center
                           hover:bg-dustyrose transition-colors"
              >
                <FaTiktok size={18} />
              </a>
              <a
                href="https://wa.me/+233539649949"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-porcelain/10 rounded-full flex items-center justify-center
                           hover:bg-dustyrose transition-colors"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="font-body text-porcelain/70 hover:text-dustyrose transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="font-body text-porcelain/70 hover:text-dustyrose transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="font-body text-porcelain/70 hover:text-dustyrose transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#about" className="font-body text-porcelain/70 hover:text-dustyrose transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#booking" className="font-body text-porcelain/70 hover:text-dustyrose transition-colors">
                  Book Now
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaPhone className="text-dustyrose mt-1" />
                <a href="tel:+233539649949" className="font-body text-porcelain/70 hover:text-dustyrose">
                  +233 53 964 9949
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-dustyrose mt-1" />
                <a href="mailto:emmanuellaasonkey9@gmail.com" className="font-body text-porcelain/70 hover:text-dustyrose">
                  emmanuellaasonkey9@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-dustyrose mt-1" />
                <span className="font-body text-porcelain/70">
                  Sarah's Corner, EN-113-2066<br />
                  Koforidua, Eastern Region<br />
                  Ghana
                </span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-display text-lg mb-4">Location</h4>
            <div className="bg-porcelain/10 rounded-lg overflow-hidden h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.5!2d-0.2591!3d6.0941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDYnMDAuMCJOIC0wLjI1OTExMDAwMDAwMDA!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Studio Location - Sarah's Corner EN-113-2066, Koforidua"
              />
            </div>
            <p className="font-body text-xs text-porcelain/50 mt-2">
              GPS: 6.0941° N, 0.2591° W
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-porcelain/10 mt-12 pt-8 text-center">
          <p className="font-body text-porcelain/50">
            &copy; {currentYear} NailedbySema. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
