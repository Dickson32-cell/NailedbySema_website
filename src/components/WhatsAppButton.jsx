import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

const WhatsAppButton = () => {
  const phoneNumber = '233539649949'
  const message = 'Hi Sema! I would like to book an appointment.'
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
      {/* Pulse Ring */}
      <div className="absolute inset-0 w-16 h-16 md:w-18 md:h-18 bg-green-400/30 rounded-full pulse-ring" />

      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="relative magnetic glass-card w-16 h-16 md:w-18 md:h-18 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full
                   flex items-center justify-center depth-shadow-lg hover:depth-shadow-xl
                   transition-all duration-500 cursor-pointer
                   before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/30 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
        title="Chat on WhatsApp"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <FaWhatsapp className="w-9 h-9 md:w-10 md:h-10 text-white relative z-10" />
        </motion.div>
      </motion.a>
    </div>
  )
}

export default WhatsAppButton
