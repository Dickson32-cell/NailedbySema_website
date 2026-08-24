import { createClient } from '@supabase/supabase-js'

// Supabase credentials — env vars with fallback for Render static deployment
// Note: Supabase anon/publishable key is designed to be safe for client-side use
// It is restricted by Row Level Security policies in Supabase, not by secrecy
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://csopcqjsaoxvieepuaqk.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_SJswQdVGyufXNEXrettE8w_iRXUP9oE'

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

  const semaPhoneNumber = '233539649949'
  const whatsappUrl = `https://wa.me/${semaPhoneNumber}?text=${encodeURIComponent(message)}`

  return { success: true, url: whatsappUrl }
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

// Generate a new 1-time Handout Code
export async function generateHandoutCode() {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase()
  const { data, error } = await supabase
    .from('handout_codes')
    .insert([{ code, is_used: false }])
    .select()

  if (error) {
    console.error('Error generating handout code:', error)
    return { success: false, error: error.message }
  }
  return { success: true, code: data[0].code }
}

// Validate a Handout Code
export async function validateHandoutCode(code) {
  const { data, error } = await supabase
    .from('handout_codes')
    .select('*')
    .eq('code', code.trim().toUpperCase())
    .maybeSingle()

  if (error || !data) {
    return { valid: false, message: 'Invalid code.' }
  }

  if (data.is_used) {
    return { valid: false, message: 'This code has already been used.' }
  }

  await supabase
    .from('handout_codes')
    .update({ is_used: true })
    .eq('id', data.id)

  return { valid: true }
}

// ==========================================
// GALLERY FUNCTIONS
// ==========================================

export async function fetchGalleryMedia() {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching gallery items:', error)
    return []
  }

  return data || []
}

export async function uploadGalleryMedia(file, category = 'All') {
  try {
    const fileExt = file.name.split('.').pop()
    const type = file.type.startsWith('video/') ? 'video' : 'image'
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('gallery_media')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('gallery_media')
      .getPublicUrl(filePath)

    const { data: insertData, error: dbError } = await supabase
      .from('gallery_items')
      .insert([{ url: publicUrl, type: type, category: category }])
      .select()

    if (dbError) throw dbError

    return { success: true, item: insertData[0] }
  } catch (error) {
    console.error('Media upload failed:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteGalleryMedia(itemId, url) {
  try {
    const { error: dbError } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', itemId)

    if (dbError) throw dbError

    const fileName = url.split('/').pop()
    if (fileName) {
      const { error: storageError } = await supabase.storage
        .from('gallery_media')
        .remove([fileName])

      if (storageError) console.error('Failed to remove from storage', storageError)
    }
    return { success: true }
  } catch (error) {
    console.error('Error deleting media:', error)
    return { success: false, error: error.message }
  }
}

// ==========================================
// ABOUT SECTION FUNCTIONS
// ==========================================

export async function fetchAboutData() {
  const { data, error } = await supabase
    .from('about_section')
    .select('*')
    .eq('id', 1)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching about data:', error)
    return null
  }

  return data
}

export async function updateAboutData(updatePayload) {
  const payloadWithTimestamp = {
    ...updatePayload,
    updated_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('about_section')
    .upsert([{ id: 1, ...payloadWithTimestamp }])
    .select()

  if (error) {
    console.error('Error updating about data:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data[0] }
}