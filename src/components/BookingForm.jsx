import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitBooking, sendWhatsAppNotification } from '../lib/supabase'
import { X, Calendar, Clock, MapPin, User, Phone, Mail, MessageSquare, Check } from 'lucide-react'

export default function BookingForm({ isOpen, onClose, services }) {
  const [formData, setFormData] = useState({
    clientName: '', clientEmail: '', clientPhone: '', service: '',
    isHomeService: false, clientAddress: '', bookingDate: '', bookingTime: '', notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

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
      const { error } = await submitBooking(formData)
      if (error) console.warn('Supabase save failed, continuing to WhatsApp...', error)

      const waResult = await sendWhatsAppNotification(formData)
      setMessage({ type: 'success', text: 'Booking submitted! Redirecting to WhatsApp to confirm...' })

      if (waResult.success && waResult.url) {
        window.location.href = waResult.url
      }

      setTimeout(() => {
        setFormData({ clientName: '', clientEmail: '', clientPhone: '', service: '', isHomeService: false, clientAddress: '', bookingDate: '', bookingTime: '', notes: '' })
        onClose()
      }, 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again or WhatsApp Sema directly!' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-charcoal/50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-lg bg-porcelain rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-charcoal p-6 rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-display text-porcelain">Book Appointment</h2>
                <p className="text-porcelain/60 mt-1 font-body text-sm">Fill in your details and we'll confirm your booking</p>
              </div>
              <button onClick={onClose} className="p-2 text-porcelain/80 hover:text-dustyrose transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {message && (
                <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {message.type === 'success' && <Check className="w-4 h-4 inline mr-2" />}
                  {message.text}
                </div>
              )}

              <div>
                <label className="flex items-center gap-2 text-sm font-body text-charcoal/80 mb-2">
                  <User className="w-4 h-4 text-dustyrose" /> Your Name *
                </label>
                <input type="text" name="clientName" value={formData.clientName} onChange={handleChange}
                  placeholder="Enter your full name" required
                  className="w-full px-4 py-3 bg-white border border-charcoal/10 rounded-xl focus:outline-none focus:border-dustyrose transition-colors font-body" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-body text-charcoal/80 mb-2">
                    <Phone className="w-4 h-4 text-dustyrose" /> Phone *
                  </label>
                  <input type="tel" name="clientPhone" value={formData.clientPhone} onChange={handleChange}
                    placeholder="0241234567" required
                    className="w-full px-4 py-3 bg-white border border-charcoal/10 rounded-xl focus:outline-none focus:border-dustyrose transition-colors font-body" />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-body text-charcoal/80 mb-2">
                    <Mail className="w-4 h-4 text-dustyrose" /> Email (optional)
                  </label>
                  <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-white border border-charcoal/10 rounded-xl focus:outline-none focus:border-dustyrose transition-colors font-body" />
                </div>
              </div>

              <div>
                <label className="text-sm font-body text-charcoal/80 mb-2 block">Select Service *</label>
                <select name="service" value={formData.service} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-white border border-charcoal/10 rounded-xl focus:outline-none focus:border-dustyrose transition-colors font-body text-charcoal">
                  <option value="">Choose a service...</option>
                  <optgroup label="Manicure & Pedicure">
                    <option value="Manicure">Manicure — GHS 60</option>
                    <option value="Classic Pedicure">Classic Pedicure — GHS 130</option>
                    <option value="Jelly Pedicure">Jelly Pedicure — GHS 170</option>
                    <option value="Milky Pedicure">Milky Pedicure — GHS 200</option>
                  </optgroup>
                  <optgroup label="Stick-On Nails">
                    <option value="Stick-On Short">Stick-On Short — GHS 100</option>
                    <option value="Stick-On Medium">Stick-On Medium — GHS 120</option>
                    <option value="Stick-On Long">Stick-On Long — GHS 150</option>
                  </optgroup>
                  <optgroup label="Acrylic Nails">
                    <option value="Acrylic Short">Acrylic Short — GHS 150</option>
                    <option value="Acrylic Medium">Acrylic Medium — GHS 180</option>
                    <option value="Acrylic Long">Acrylic Long — GHS 220</option>
                  </optgroup>
                  <optgroup label="Builder Gel">
                    <option value="Builder Gel Short">Builder Gel Short — GHS 80</option>
                    <option value="Builder Gel Medium">Builder Gel Medium — GHS 120</option>
                    <option value="Builder Gel Long">Builder Gel Long — GHS 150</option>
                  </optgroup>
                  <optgroup label="Poly Gel">
                    <option value="Poly Gel Short">Poly Gel Short — GHS 130</option>
                    <option value="Poly Gel Medium">Poly Gel Medium — GHS 160</option>
                    <option value="Poly Gel Long">Poly Gel Long — GHS 200</option>
                  </optgroup>
                  <optgroup label="Nail Art">
                    <option value="Nail Art Design">Nail Art Design — GHS 30–100</option>
                  </optgroup>
                  <optgroup label="Lashes">
                    <option value="Classic Set">Classic Set — GHS 150</option>
                    <option value="Classic Cateye">Classic Cateye — GHS 180</option>
                    <option value="Hybrid Set">Hybrid Set — GHS 170</option>
                    <option value="Hybrid Cateye">Hybrid Cateye — GHS 200</option>
                    <option value="Volume Set">Volume Set — GHS 200</option>
                    <option value="Volume Cateye">Volume Cateye — GHS 250</option>
                    <option value="Cluster Lashes">Cluster Lashes — GHS 60–120</option>
                    <option value="Refill">Refill — Half Price</option>
                    <option value="Removal">Removal — GHS 50</option>
                  </optgroup>
                  <optgroup label="Brows">
                    <option value="Ombré Brows">Ombré Brows — GHS 500</option>
                  </optgroup>
                  <optgroup label="Nails Training">
                    <option value="1 Month Course">1 Month Course — GHS 1,500</option>
                    <option value="3 Months Course">3 Months Course — GHS 3,500</option>
                    <option value="1 Year Apprenticeship">1 Year Apprenticeship — GHS 2,000</option>
                  </optgroup>
                </select>
              </div>

              <div className="flex items-center gap-3 p-3 bg-dustyrose/10 rounded-xl border border-dustyrose/20">
                <input type="checkbox" name="isHomeService" id="isHomeService" checked={formData.isHomeService} onChange={handleChange}
                  className="w-5 h-5 text-dustyrose rounded focus:ring-dustyrose" />
                <label htmlFor="isHomeService" className="text-charcoal font-body font-medium text-sm cursor-pointer">
                  I want home service (+GHS 40)
                </label>
              </div>

              <AnimatePresence>
                {formData.isHomeService && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="flex items-center gap-2 text-sm font-body text-charcoal/80 mb-2">
                      <MapPin className="w-4 h-4 text-dustyrose" /> Your Address *
                    </label>
                    <input type="text" name="clientAddress" value={formData.clientAddress} onChange={handleChange}
                      placeholder="Full address for home service" required={formData.isHomeService}
                      className="w-full px-4 py-3 bg-white border border-charcoal/10 rounded-xl focus:outline-none focus:border-dustyrose transition-colors font-body" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-body text-charcoal/80 mb-2">
                    <Calendar className="w-4 h-4 text-dustyrose" /> Date *
                  </label>
                  <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]} required
                    className="w-full px-4 py-3 bg-white border border-charcoal/10 rounded-xl focus:outline-none focus:border-dustyrose transition-colors font-body text-charcoal" />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-body text-charcoal/80 mb-2">
                    <Clock className="w-4 h-4 text-dustyrose" /> Time *
                  </label>
                  <select name="bookingTime" value={formData.bookingTime} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-white border border-charcoal/10 rounded-xl focus:outline-none focus:border-dustyrose transition-colors font-body text-charcoal">
                    <option value="">Select time...</option>
                    {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-body text-charcoal/80 mb-2">
                  <MessageSquare className="w-4 h-4 text-dustyrose" /> Special Requests (optional)
                </label>
                <textarea name="notes" value={formData.notes} onChange={handleChange}
                  placeholder="Any special requests or notes..." rows={3}
                  className="w-full px-4 py-3 bg-white border border-charcoal/10 rounded-xl focus:outline-none focus:border-dustyrose transition-colors resize-none font-body" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 bg-dustyrose text-charcoal font-body font-semibold rounded-xl hover:bg-champagne transition-colors disabled:opacity-70">
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="spinner" /> Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" /> Confirm Booking
                  </span>
                )}
              </button>

              <p className="text-center text-xs text-charcoal/50 font-body">
                After booking, you'll receive a WhatsApp confirmation. Sema will contact you to confirm.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}