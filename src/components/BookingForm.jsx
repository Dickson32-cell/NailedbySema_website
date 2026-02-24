import { useState } from 'react'
import { submitBooking, sendWhatsAppNotification } from '../lib/supabase'
import { X, Calendar, Clock, MapPin, User, Phone, Mail, MessageSquare } from 'lucide-react'

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

      if (error) throw error

      // Send WhatsApp notification to Sema
      await sendWhatsAppNotification(formData)

      setMessage({
        type: 'success',
        text: 'Booking submitted! Check your phone for confirmation. Sema will contact you soon!'
      })

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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-pink-600 to-pink-800 p-4 sm:p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Book Appointment</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          <p className="text-pink-100 mt-1">Fill in your details and we'll confirm your booking!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg ${message.type === 'success'
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
              }`}>
              {message.text}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <User className="w-4 h-4" /> Your Name *
            </label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Phone className="w-4 h-4" /> Phone Number *
              </label>
              <input
                type="tel"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleChange}
                placeholder="0241234567"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Mail className="w-4 h-4" /> Email (optional)
              </label>
              <input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Select Service *</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
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
          <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg">
            <input
              type="checkbox"
              name="isHomeService"
              id="isHomeService"
              checked={formData.isHomeService}
              onChange={handleChange}
              className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
            />
            <label htmlFor="isHomeService" className="text-gray-700 font-medium">
              I want home service (+GHC20)
            </label>
          </div>

          {/* Address (if home service) */}
          {formData.isHomeService && (
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4" /> Your Address *
              </label>
              <input
                type="text"
                name="clientAddress"
                value={formData.clientAddress}
                onChange={handleChange}
                placeholder="Full address for home service"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required={formData.isHomeService}
              />
            </div>
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4" /> Preferred Date *
              </label>
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Clock className="w-4 h-4" /> Preferred Time *
              </label>
              <select
                name="bookingTime"
                value={formData.bookingTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
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
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <MessageSquare className="w-4 h-4" /> Special Requests (optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special requests or notes..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-800 text-white font-bold rounded-xl hover:from-pink-700 hover:to-pink-900 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : (
              'Confirm Booking'
            )}
          </button>

          <p className="text-center text-sm text-gray-500">
            After booking, you'll receive a WhatsApp confirmation. Sema will contact you to confirm!
          </p>
        </form>
      </div>
    </div>
  )
}
