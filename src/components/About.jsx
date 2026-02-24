import { motion } from 'framer-motion'
import { FaSnapchat, FaTiktok, FaWhatsapp } from 'react-icons/fa'

const About = () => {
  return (
    <section id="about" className="py-20 bg-porcelain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/uploads/WhatsApp Image 2026-02-21 at 2.35.54 AM.jpeg"
                alt="Sema - Nail Technician"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                <p className="font-display text-2xl text-porcelain">Sema</p>
                <p className="font-body text-porcelain/80">Nail Technician & Brow Artist</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-dustyrose/30 rounded-full -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-champagne/30 rounded-full -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-6">
              Meet <span className="text-dustyrose italic">Sema</span>
            </h2>

            <p className="font-body text-lg text-charcoal/80 mb-6 leading-relaxed">
              Based opposite Vineyard Hostel in Koforidua, I specialize in creating stunning nail art
              designs that make you feel confident and beautiful. From classic gel manicures
              to intricate nail art, every service is tailored to your unique style.
            </p>

            <p className="font-body text-lg text-charcoal/80 mb-8 leading-relaxed">
              I also offer premium ombre brow services for a polished, natural look.
              Whether you prefer visiting my studio or would like me to come to your
              location, I bring the salon experience to you.
            </p>

            {/* Home Service Badge */}
            <div className="inline-flex items-center bg-dustyrose/20 text-dustyrose px-6 py-3 rounded-full mb-8">
              <span className="w-3 h-3 bg-dustyrose rounded-full mr-3 animate-pulse" />
              <span className="font-body font-semibold">Home Service Available</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://snapchat.com/t/sYn4ueqU"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-charcoal text-porcelain rounded-full flex items-center justify-center
                           hover:bg-dustyrose transition-colors duration-300"
              >
                <FaSnapchat size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@nailtechinkoforidua"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-charcoal text-porcelain rounded-full flex items-center justify-center
                           hover:bg-dustyrose transition-colors duration-300"
              >
                <FaTiktok size={20} />
              </a>
              <a
                href="https://wa.me/+233539649949"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-charcoal text-porcelain rounded-full flex items-center justify-center
                           hover:bg-dustyrose transition-colors duration-300"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
