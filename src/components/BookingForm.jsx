import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitBooking, sendWhatsAppNotification } from '../lib/supabase'
import { X, Calendar, Clock, MapPin, User, Phone, Mail, MessageSquare, Check } from 'lucide-react'

export default function BookingForm({ isOpen, onClose, services }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    service: '',
    isHomeService: false,
    clientAddress: '',
    bookingDate: '',
    bookingTime: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // Validation
    if (!formData.clientName || !formData.clientPhone || !formData.service ||
      !formData.bookingDate || !formData.bookingTime) {
      setMessage({ type: 'error', text: 'Please fill in all required fields!' })
      setLoading(false)
      return
    }

    if (formData.isHomeService && !formData.clientAddress) {
      setMessage({ type: 'error', text: 'Please enter your address for home service!' })
      setLoading(false)
      return
    }

    try {
      const { data, error } = await submitBooking(formData)

      if (error) {
        console.warn('Supabase booking save failed, but continuing to WhatsApp notification...', error)
      }

      // Send WhatsApp notification and redirect cleanly
      const waResult = await sendWhatsAppNotification(formData)

      setMessage({
        type: 'success',
        text: 'Booking submitted! Redirecting to WhatsApp to confirm...'
      })

      if (waResult.success && waResult.url) {
        // We use window.location.href instead of window.open to avoid popup blockers
        window.location.href = waResult.url
      }

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          service: '',
          isHomeService: false,
          clientAddress: '',
          bookingDate: '',
          bookingTime: '',
          notes: ''
        })
        onClose()
      }, 3000)

    } catch (error) {
      console.error('Booking error:', error)
      setMessage({ type: 'error', text: 'Something went wrong. Please try again or WhatsApp Sema directly!' })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Elegant Blur Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative w-full max-w-lg bg-porcelain rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Subtle Pattern Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none rounded-3xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-dustyrose rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-champagne rounded-full blur-3xl" />
        </div>

        {/* Gradient Header */}
        <div className="relative bg-gradient-to-r from-dustyrose via-dustyrose to-champagne p-6 sm:p-8 rounded-t-3xl">
          <div className="flex justify-between items-center relative z-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display text-charcoal">Book Appointment</h2>
              <p className="text-charcoal/70 mt-1 font-body">Fill in your details and we'll confirm your booking!</p>
            </div>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-charcoal" />
            </motion.button>
          </div>
          {/* Decorative wave */}
          <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FDF8F4" opacity=".1"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#FDF8F4" opacity=".2"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#FDF8F4" opacity=".3"></path>
          </svg>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative p-6 sm:p-8 space-y-5">
          {/* Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-4 rounded-xl flex items-center gap-3 ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}
              >
                {message.type === 'success' && <Check className="w-5 h-5 flex-shrink-0" />}
                <span className="font-body text-sm">{message.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-charcoal/80">
              <User className="w-4 h-4 text-dustyrose" /> Your Name *
            </label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3.5 bg-white border-2 border-charcoal/10 rounded-xl 
                         focus:ring-2 focus:ring-dustyrose focus:border-dustyrose transition-all
                         placeholder:text-charcoal/40 font-body"
              required
            />
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-charcoal/80">
                <Phone className="w-4 h-4 text-dustyrose" /> Phone Number *
              </label>
              <input
                type="tel"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleChange}
                placeholder="0241234567"
                className="w-full px-4 py-3.5 bg-white border-2 border-charcoal/10 rounded-xl 
                           focus:ring-2 focus:ring-dustyrose focus:border-dustyrose transition-all
                           placeholder:text-charcoal/40 font-body"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-charcoal/80">
                <Mail className="w-4 h-4 text-dustyrose" /> Email (optional)
              </label>
              <input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3.5 bg-white border-2 border-charcoal/10 rounded-xl 
                           focus:ring-2 focus:ring-dustyrose focus:border-dustyrose transition-all
                           placeholder:text-charcoal/40 font-body"
              />
            </div>
          </div>

          {/* Service */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal/80 block">Select Service *</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-white border-2 border-charcoal/10 rounded-xl 
                         focus:ring-2 focus:ring-dustyrose focus:border-dustyrose transition-all
                         font-body text-charcoal"
              required
            >
              <option value="">Choose a service...</option>
              <optgroup label="Manicure & Pedicure">
                <option value="Manicure">Manicure - GHS 60</option>
                <option value="Classic Pedicure">Classic Pedicure - GHS 130</option>
                <option value="Jelly Pedicure">Jelly Pedicure - GHS 170</option>
                <option value="Milky Pedicure">Milky Pedicure - GHS 200</option>
              </optgroup>
              <optgroup label="Stick-On Nails">
                <option value="Stick-On Short">Stick-On Short - GHS 100</option>
                <option value="Stick-On Medium">Stick-On Medium - GHS 120</option>
                <option value="Stick-On Long">Stick-On Long - GHS 150</option>
              </optgroup>
              <optgroup label="Acrylic Nails">
                <option value="Acrylic Short">Acrylic Short - GHS 150</option>
                <option value="Acrylic Medium">Acrylic Medium - GHS 180</option>
                <option value="Acrylic Long">Acrylic Long - GHS 220</option>
              </optgroup>
              <optgroup label="Builder Gel">
                <option value="Builder Gel Short">Builder Gel Short - GHS 80</option>
                <option value="Builder Gel Medium">Builder Gel Medium - GHS 120</option>
                <option value="Builder Gel Long">Builder Gel Long - GHS 150</option>
              </optgroup>
              <optgroup label="Poly Gel">
                <option value="Poly Gel Short">Poly Gel Short - GHS 130</option>
                <option value="Poly Gel Medium">Poly Gel Medium - GHS 160</option>
                <option value="Poly Gel Long">Poly Gel Long - GHS 200</option>
              </optgroup>
              <optgroup label="Nail Art">
                <option value="Nail Art Design">Nail Art Design - GHS 30 – 100</option>
              </optgroup>
              <optgroup label="Lashes">
                <option value="Classic Set">Classic Set - GHS 150</option>
                <option value="Classic Cateye">Classic Cateye - GHS 180</option>
                <option value="Hybrid Set">Hybrid Set - GHS 170</option>
                <option value="Hybrid Cateye">Hybrid Cateye - GHS 200</option>
                <option value="Volume Set">Volume Set - GHS 200</option>
                <option value="Volume Cateye">Volume Cateye - GHS 250</option>
                <option value="Cluster Lashes">Cluster Lashes - GHS 60 – 120</option>
                <option value="Refill">Refill - Half Price</option>
                <option value="Removal">Removal - GHS 50</option>
              </optgroup>
              <optgroup label="Brows">
                <option value="Ombré Brows">Ombré Brows - GHS 500</option>
              </optgroup>
              <optgroup label="Nails Training">
                <option value="1 Month Course">1 Month Course - GHS 1,500</option>
                <option value="3 Months Course">3 Months Course - GHS 3,500</option>
                <option value="1 Year Apprenticeship">1 Year Apprenticeship - GHS 2,000</option>
              </optgroup>
            </select>
          </div>

          {/* Home Service Toggle */}
          <motion.div 
            className="flex items-center gap-3 p-4 bg-dustyrose/10 rounded-xl border border-dustyrose/20"
            whileHover={{ scale: 1.01 }}
          >
            <input
              type="checkbox"
              name="isHomeService"
              id="isHomeService"
              checked={formData.isHomeService}
              onChange={handleChange}
              className="w-5 h-5 text-dustyrose rounded focus:ring-dustyrose"
            />
            <label htmlFor="isHomeService" className="text-charcoal font-medium cursor-pointer">
              I want home service (+GHS 40)
            </label>
          </motion.div>

          {/* Address (if home service) */}
          <AnimatePresence>
            {formData.isHomeService && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="flex items-center gap-2 text-sm font-medium text-charcoal/80">
                  <MapPin className="w-4 h-4 text-dustyrose" /> Your Address *
                </label>
                <input
                  type="text"
                  name="clientAddress"
                  value={formData.clientAddress}
                  onChange={handleChange}
                  placeholder="Full address for home service"
                  className="w-full px-4 py-3.5 bg-white border-2 border-charcoal/10 rounded-xl 
                             focus:ring-2 focus:ring-dustyrose focus:border-dustyrose transition-all
                             placeholder:text-charcoal/40 font-body"
                  required={formData.isHomeService}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-charcoal/80">
                <Calendar className="w-4 h-4 text-dustyrose" /> Preferred Date *
              </label>
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3.5 bg-white border-2 border-charcoal/10 rounded-xl 
                           focus:ring-2 focus:ring-dustyrose focus:border-dustyrose transition-all
                           font-body text-charcoal"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-charcoal/80">
                <Clock className="w-4 h-4 text-dustyrose" /> Preferred Time *
              </label>
              <select
                name="bookingTime"
                value={formData.bookingTime}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-white border-2 border-charcoal/10 rounded-xl 
                           focus:ring-2 focus:ring-dustyrose focus:border-dustyrose transition-all
                           font-body text-charcoal"
                required
              >
                <option value="">Select time...</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-charcoal/80">
              <MessageSquare className="w-4 h-4 text-dustyrose" /> Special Requests (optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special requests or notes..."
              rows={3}
              className="w-full px-4 py-3.5 bg-white border-2 border-charcoal/10 rounded-xl 
                         focus:ring-2 focus:ring-dustyrose focus:border-dustyrose transition-all
                         resize-none placeholder:text-charcoal/40 font-body"
            />
          </div>

          {/* Submit Button - Premium with loading spinner */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-dustyrose to-champagne text-charcoal font-body font-bold 
                       rounded-xl hover:from-dustyrose/90 hover:to-champagne/90 transition-all 
                       shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="spinner" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Confirm Booking
              </span>
            )}
          </motion.button>

          <p className="text-center text-sm text-charcoal/50 font-body">
            After booking, you'll receive a WhatsApp confirmation. Sema will contact you to confirm!
          </p>
        </form>
      </motion.div>
    </div>
  )
}
