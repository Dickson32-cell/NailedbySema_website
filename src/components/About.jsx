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
    <section id="about" className="py-20 bg-porcelain section-pattern relative overflow-hidden">
      {/* Decorative floating shapes in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-dustyrose/10 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 bg-champagne/10 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-dustyrose/5 rounded-full blur-2xl"
          animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Floating decorative elements around profile */}
            <motion.div
              className="absolute -top-6 -left-6 w-20 h-20 border-2 border-dustyrose/30 rounded-full"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -bottom-8 -right-8 w-28 h-28 border-2 border-champagne/30 rounded-full"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Small floating shapes */}
            <motion.div
              className="absolute top-0 right-8 w-4 h-4 bg-champagne/50 rounded-full"
              animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-12 -left-4 w-3 h-3 bg-dustyrose/50 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="absolute top-1/3 -right-4 w-5 h-5 border-2 border-dustyrose/40"
              animate={{ rotate: [0, 180, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Profile Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={aboutData.image_url}
                alt={`${aboutData.name} - ${aboutData.title}`}
                className="w-full h-[500px] object-cover"
              />
              {/* Gradient overlay on image */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent p-6">
                <p className="font-display text-2xl text-porcelain">{aboutData.name}</p>
                <p className="font-body text-porcelain/80">{aboutData.title}</p>
              </div>
            </div>

            {/* Decorative circles behind image */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-dustyrose/20 rounded-full -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-champagne/20 rounded-full -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4 px-4 py-1.5 rounded-full border border-dustyrose/30 bg-white/50 backdrop-blur-sm"
              >
                <span className="text-dustyrose text-xs font-body tracking-[0.2em] uppercase">About</span>
              </motion.div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4 leading-tight">
                Meet <span className="holo-text italic">{aboutData.name}</span>
              </h2>
              <div className="nail-drip w-20 h-1 bg-gradient-to-r from-transparent via-dustyrose to-transparent rounded-full" />
            </div>

            <p className="font-body text-lg text-charcoal/80 mb-6 leading-relaxed whitespace-pre-wrap">
              {aboutData.bio_p1}
            </p>

            <p className="font-body text-lg text-charcoal/80 mb-8 leading-relaxed whitespace-pre-wrap">
              {aboutData.bio_p2}
            </p>

            {/* Home Service Badge */}
            <motion.div 
              className="inline-flex items-center bg-dustyrose/15 text-dustyrose px-6 py-3 rounded-full mb-10 border border-dustyrose/20"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-3 h-3 bg-dustyrose rounded-full mr-3 animate-pulse" />
              <span className="font-body font-semibold">Home Service Available</span>
            </motion.div>

            {/* Social Links - Luxury Style */}
            <div>
              <p className="font-body text-sm text-charcoal/60 mb-4 tracking-wide uppercase">Connect With Me</p>
              <div className="flex gap-4">
                <motion.a
                  href="https://snapchat.com/t/sYn4ueqU"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="liquid-metal mirror-reflect w-16 h-16 bg-gradient-to-br from-charcoal to-charcoal/80 text-porcelain rounded-2xl flex items-center justify-center
                             hover:from-dustyrose hover:to-champagne hover:text-charcoal
                             transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-dustyrose/40
                             border border-white/10 hover:border-white/30"
                >
                  <FaSnapchat size={24} />
                </motion.a>
                <motion.a
                  href="https://www.tiktok.com/@nailtechinkoforidua"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="liquid-metal mirror-reflect w-16 h-16 bg-gradient-to-br from-charcoal to-charcoal/80 text-porcelain rounded-2xl flex items-center justify-center
                             hover:from-dustyrose hover:to-champagne hover:text-charcoal
                             transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-dustyrose/40
                             border border-white/10 hover:border-white/30"
                >
                  <FaTiktok size={24} />
                </motion.a>
                <motion.a
                  href="https://wa.me/+233539649949"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="liquid-metal mirror-reflect w-16 h-16 bg-gradient-to-br from-charcoal to-charcoal/80 text-porcelain rounded-2xl flex items-center justify-center
                             hover:from-dustyrose hover:to-champagne hover:text-charcoal
                             transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-dustyrose/40
                             border border-white/10 hover:border-white/30"
                >
                  <FaWhatsapp size={24} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
