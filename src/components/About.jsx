import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSnapchat, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { fetchAboutData } from '../lib/supabase'

const About = () => {
  const [aboutData, setAboutData] = useState({
    name: 'Sema',
    title: 'Nail Technician & Brow Artist',
    image_url: '/uploads/WhatsApp Image 2026-02-21 at 2.35.54 AM.jpeg',
    bio_p1: 'Based opposite Vineyard Hostel in Koforidua, I specialize in creating stunning nail art designs that make you feel confident and beautiful. From classic gel manicures to intricate nail art, every service is tailored to your unique style.',
    bio_p2: 'I also offer premium ombre brow services for a polished, natural look. Whether you prefer visiting my studio or would like me to come to your location, I bring the salon experience to you.'
  })

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAboutData()
      if (data) {
        setAboutData(data)
      }
    }
    loadData()
  }, [])

  return (
    <section id="about" className="py-20 bg-porcelain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={aboutData.image_url}
                alt={`${aboutData.name} — ${aboutData.title}`}
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                <p className="font-display text-2xl text-porcelain">{aboutData.name}</p>
                <p className="font-body text-porcelain/80 text-sm">{aboutData.title}</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-dustyrose text-xs font-body tracking-[0.2em] uppercase mb-4">About</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
              Meet <span className="italic text-dustyrose">{aboutData.name}</span>
            </h2>
            <div className="section-divider mb-8" style={{ marginLeft: '0' }} />

            <p className="font-body text-lg text-charcoal/80 mb-4 leading-relaxed">
              {aboutData.bio_p1}
            </p>
            <p className="font-body text-lg text-charcoal/80 mb-8 leading-relaxed">
              {aboutData.bio_p2}
            </p>

            {/* Home service badge */}
            <div className="inline-flex items-center bg-dustyrose/10 text-dustyrose px-5 py-2.5 rounded-full mb-8 border border-dustyrose/20">
              <span className="w-2 h-2 bg-dustyrose rounded-full mr-3" />
              <span className="font-body font-medium text-sm">Home Service Available</span>
            </div>

            {/* Social links */}
            <div>
              <p className="font-body text-xs text-charcoal/50 mb-3 tracking-wider uppercase">Connect With Me</p>
              <div className="flex gap-3">
                <a
                  href="https://snapchat.com/t/sYn4ueqU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-charcoal text-porcelain rounded-xl flex items-center justify-center hover:bg-dustyrose hover:text-charcoal transition-colors duration-300"
                >
                  <FaSnapchat size={20} />
                </a>
                <a
                  href="https://www.tiktok.com/@nailtechinkoforidua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-charcoal text-porcelain rounded-xl flex items-center justify-center hover:bg-dustyrose hover:text-charcoal transition-colors duration-300"
                >
                  <FaTiktok size={20} />
                </a>
                <a
                  href="https://wa.me/233539649949"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-charcoal text-porcelain rounded-xl flex items-center justify-center hover:bg-dustyrose hover:text-charcoal transition-colors duration-300"
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About