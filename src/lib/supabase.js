import { createClient } from '@supabase/supabase-js'

// Replace with your actual Supabase credentials
const supabaseUrl = 'https://yawljamtbdxqmkstmljl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhd2xqYW10YmR4cW1rc3RtbGpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxMTc2MDAsImV4cCI6MjA1MTY5MzYwMH0.q5RMF5F8iFBjJ8K6GvL5M9L8K6GvL5M9L8K6GvL5M9L8K6GvL5M9'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Submit booking to Supabase
export async function submitBooking(bookingData) {
  const booking = {
    client_name: bookingData.clientName,
    client_email: bookingData.clientEmail || null,
    client_phone: bookingData.clientPhone,
    service: bookingData.service,
    is_home_service: bookingData.isHomeService,
    client_address: bookingData.isHomeService ? bookingData.clientAddress : null,
    booking_date: bookingData.bookingDate,
    booking_time: bookingData.bookingTime,
    notes: bookingData.notes || null,
    status: 'pending',
    created_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select()

  if (error) {
    console.error('Supabase error:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

// Fetch all bookings (for admin)
export async function fetchBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching bookings:', error)
    return []
  }

  return data || []
}

// Update booking status
export async function updateBookingStatus(bookingId, status) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', bookingId)
    .select()

  if (error) {
    console.error('Error updating booking:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

// Send WhatsApp notification
export async function sendWhatsAppNotification(bookingData) {
  const message = `*New Booking from Nailed by Sema*\n\n` +
    `*Client:* ${bookingData.clientName}\n` +
    `*Phone:* ${bookingData.clientPhone}\n` +
    `*Service:* ${bookingData.service}\n` +
    `*Date:* ${bookingData.bookingDate}\n` +
    `*Time:* ${bookingData.bookingTime}\n` +
    `${bookingData.isHomeService ? `*Home Service:* Yes (+GHC40)\n` : ''}` +
    `${bookingData.clientAddress ? `*Address:* ${bookingData.clientAddress}\n` : ''}` +
    `${bookingData.notes ? `*Notes:* ${bookingData.notes}\n` : ''}`

  console.log('Opening WhatsApp...')

  // Format the phone number (assuming Sema's number is 0557252250, using a placeholder if needed,
  // but let's use +233 standard Ghana code format. Let's redirect to her actual WA link if she has one.
  // Actually, we can use a generic api.whatsapp.com link with her number.
  // We'll use a placeholder number '233557252250' which should be replaced by her actual number
  const semaPhoneNumber = '233557252250' // Update this with her actual number

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${semaPhoneNumber}&text=${encodeURIComponent(message)}`

  // Open in new tab
  window.open(whatsappUrl, '_blank')

  return { success: true }
}

// Submit a review
export async function submitReview(reviewData) {
  const review = {
    name: reviewData.name,
    service: reviewData.service,
    rating: reviewData.rating,
    text: reviewData.text,
    created_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert([review])
    .select()

  if (error) {
    console.error('Supabase review error:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

// Fetch all reviews
export async function fetchReviews() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }

  return data || []
}

// Fetch services
export async function fetchServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('category', { ascending: true })

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }

  return data || []
}
