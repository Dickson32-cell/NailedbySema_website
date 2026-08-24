import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppButton = () => {
  const phoneNumber = '233539649949'
  const message = 'Hi Sema! I would like to book an appointment.'
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 hover:bg-[#1ebd5a] transition-all duration-300"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={26} />
    </a>
  )
}

export default WhatsAppButton