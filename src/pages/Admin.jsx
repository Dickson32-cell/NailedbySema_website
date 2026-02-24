import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase, generateHandoutCode } from '../lib/supabase'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [generatedCode, setGeneratedCode] = useState(null)

  const handleGenerateCode = async () => {
    setLoading(true)
    const result = await generateHandoutCode()
    if (result.success) {
      setGeneratedCode(result.code)
    } else {
      alert('Error generating code: ' + result.error)
    }
    setLoading(false)
  }

  // Simple password check (in production, use proper auth)
  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'sema123') {
      setIsAuthenticated(true)
      fetchBookings()
    } else {
      alert('Invalid password')
    }
  }

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: true })

      if (error) throw error
      setBookings(data || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
      // Use mock data if Supabase is not configured
      setBookings([
        { id: 1, client_name: 'Demo Client', client_phone: '+233123456789', service: 'Gel Extensions', booking_date: '2024-01-15', booking_time: '10:00', status: 'pending' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      fetchBookings()
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Status updated (demo mode)')
    }
  }

  const blockDate = async () => {
    const date = prompt('Enter date to block (YYYY-MM-DD):')
    if (date) {
      try {
        const { error } = await supabase
          .from('blocked_dates')
          .insert({ blocked_date: date, reason: 'Blocked by admin' })

        if (error) throw error
        alert('Date blocked successfully')
      } catch (error) {
        console.error('Error blocking date:', error)
        alert('Date blocked (demo mode)')
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-porcelain flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full"
        >
          <h1 className="font-display text-3xl text-charcoal mb-6 text-center">
            Admin <span className="text-dustyrose">Login</span>
          </h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 mb-4
                         focus:border-dustyrose focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-dustyrose text-charcoal font-semibold py-3 rounded-lg
                         hover:bg-champagne transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-center text-charcoal/50 text-sm mt-4">
            Default password: sema123
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-porcelain py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-4xl text-charcoal">
            Admin <span className="text-dustyrose">Dashboard</span>
          </h1>
          <button
            onClick={blockDate}
            className="bg-charcoal text-porcelain px-6 py-2 rounded-lg
                       hover:bg-dustyrose transition-colors"
          >
            Block Date
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-body text-charcoal/60 text-sm">Total Bookings</h3>
            <p className="font-display text-3xl text-charcoal">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-body text-charcoal/60 text-sm">Pending</h3>
            <p className="font-display text-3xl text-dustyrose">
              {bookings.filter(b => b.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-body text-charcoal/60 text-sm">Confirmed</h3>
            <p className="font-display text-3xl text-champagne">
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
          </div>
        </div>

        {/* Handout Code Generator */}
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-dustyrose mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-charcoal mb-1">Handout Codes</h2>
            <p className="font-body text-charcoal/60 text-sm">Generate 1-time codes for clients who paid 200 GHS for the Training Handout.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {generatedCode && (
              <div className="bg-green-50 px-6 py-2 rounded-lg border border-green-200 text-center w-full sm:w-auto">
                <p className="text-xs text-green-800 uppercase tracking-widest mb-1">New Code</p>
                <p className="font-display text-xl text-green-900">{generatedCode}</p>
              </div>
            )}
            <button
              onClick={handleGenerateCode}
              disabled={loading}
              className="w-full sm:w-auto bg-dustyrose text-charcoal font-semibold px-6 py-3 rounded-lg hover:bg-champagne transition-colors whitespace-nowrap"
            >
              Generate 1-Time Code
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-charcoal/10">
            <h2 className="font-display text-2xl text-charcoal">Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-porcelain">
                <tr>
                  <th className="px-6 py-4 text-left font-body text-sm font-semibold text-charcoal">Client</th>
                  <th className="px-6 py-4 text-left font-body text-sm font-semibold text-charcoal">Service</th>
                  <th className="px-6 py-4 text-left font-body text-sm font-semibold text-charcoal">Date</th>
                  <th className="px-6 py-4 text-left font-body text-sm font-semibold text-charcoal">Time</th>
                  <th className="px-6 py-4 text-left font-body text-sm font-semibold text-charcoal">Status</th>
                  <th className="px-6 py-4 text-left font-body text-sm font-semibold text-charcoal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-charcoal/50">
                      Loading...
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-charcoal/50">
                      No bookings yet
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-porcelain/50">
                      <td className="px-6 py-4">
                        <p className="font-body text-charcoal">{booking.client_name || booking.clientName}</p>
                        <p className="font-body text-sm text-charcoal/60">{booking.client_phone || booking.clientPhone}</p>
                      </td>
                      <td className="px-6 py-4 font-body text-charcoal">{booking.service}</td>
                      <td className="px-6 py-4 font-body text-charcoal">{booking.booking_date || booking.bookingDate}</td>
                      <td className="px-6 py-4 font-body text-charcoal">{booking.booking_time || booking.bookingTime}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-body ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                          {booking.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(booking.id, 'confirmed')}
                            className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm
                                       hover:bg-green-600 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(booking.id, 'cancelled')}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm
                                       hover:bg-red-600 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
