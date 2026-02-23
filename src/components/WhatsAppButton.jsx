import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

const WhatsAppButton = () => {
  const phoneNumber = '233539649949'
  const message = 'Hi Sema! I would like to book an appointment.'
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-green-500 text-white rounded-full
                 flex items-center justify-center shadow-lg hover:bg-green-600
                 transition-colors duration-300 hover:scale-110"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8 md:w-10 md:h-10 text-white" />
    </motion.a>
  )
}

export default WhatsAppButton
