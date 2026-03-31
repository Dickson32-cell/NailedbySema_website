// EmailJS Service for sending booking notifications
// To use: Replace USER_ID, SERVICE_ID, and TEMPLATE_ID with your EmailJS credentials

const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID || 'your-user-id'
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your-service-id'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your-template-id'

export const sendBookingConfirmation = async (bookingData) => {
  // This is a placeholder function
  console.log('Sending booking confirmation for:', bookingData)

  // Real EmailJS Integration
  if (USER_ID !== 'your-user-id' && SERVICE_ID !== 'your-service-id') {
    try {
      const emailjs = await import('emailjs-com')
      return await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_name: bookingData.clientName,
        to_email: bookingData.clientEmail,
        service: bookingData.service,
        date: bookingData.bookingDate,
        time: bookingData.bookingTime,
        message: bookingData.notes || 'No special requests',
      }, USER_ID)
    } catch (error) {
      console.error('EmailJS Error:', error)
      return { success: false, error }
    }
  }

  return { success: true, message: 'Simulated email sent (keys missing)' }
}

export const sendAdminNotification = async (bookingData) => {
  // Send notification to admin (Sema) via WhatsApp link
  const phoneNumber = '233539649949'
  const message = `New Booking Alert!\n\nName: ${bookingData.clientName}\nService: ${bookingData.service}\nDate: ${bookingData.bookingDate}\nTime: ${bookingData.bookingTime}\nPhone: ${bookingData.clientPhone}`

  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  // Open WhatsApp for admin (this would be triggered server-side in production)
  console.log('Admin would be notified via:', waLink)

  return { success: true, waLink }
}
