import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  supabase,
  generateHandoutCode,
  fetchGalleryMedia,
  uploadGalleryMedia,
  deleteGalleryMedia,
  fetchAboutData,
  updateAboutData
} from '../lib/supabase'
import {
  LayoutDashboard,
  CalendarCheck,
  Image as ImageIcon,
  CreditCard,
  LogOut,
  UploadCloud,
  Trash2,
  CheckCircle2,
  XCircle,
  Copy,
  FolderOpen
} from 'lucide-react'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('bookings') // bookings, handouts, gallery

  // Data states
  const [bookings, setBookings] = useState([])
  const [handoutCodes, setHandoutCodes] = useState([])
  const [galleryItems, setGalleryItems] = useState([])

  // Loading states
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [savingAbout, setSavingAbout] = useState(false)
  const [generatedCode, setGeneratedCode] = useState(null)

  // About Section Form State
  const [aboutData, setAboutData] = useState({
    name: 'Sema',
    title: 'Nail Technician & Brow Artist',
    image_url: '/uploads/WhatsApp Image 2026-02-21 at 2.35.54 AM.jpeg',
    bio_p1: '',
    bio_p2: ''
  })


  const fileInputRef = useRef(null)

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'sema123') {
      setIsAuthenticated(true)
      fetchAllData()
    } else {
      alert('Invalid password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
  }

  // Fetch all initial data
  const fetchAllData = async () => {
    setLoading(true)
    await Promise.all([
      fetchBookingsData(),
      fetchHandoutData(),
      fetchGalleryData(),
      loadAboutData()
    ])
    setLoading(false)
  }


  // ==========================================
  // BOOKINGS DATA
  // ==========================================
  const fetchBookingsData = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: false })
      if (!error && data) setBookings(data)
    } catch (e) {
      console.error(e)
    }
  }

  const updateBookingStatus = async (id, status) => {
    try {
      await supabase.from('bookings').update({ status }).eq('id', id)
      fetchBookingsData()
    } catch (e) {
      console.error(e)
    }
  }

  // ==========================================
  // HANDOUTS & PAYMENTS DATA
  // ==========================================
  const fetchHandoutData = async () => {
    try {
      const { data, error } = await supabase
        .from('handout_codes')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) setHandoutCodes(data)
    } catch (e) {
      console.error(e)
    }
  }

  const handleGenerateCode = async () => {
    const result = await generateHandoutCode()
    if (result.success) {
      setGeneratedCode(result.code)
      fetchHandoutData() // refresh list
    } else {
      alert('Error generating code: ' + result.error)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  // ==========================================
  // ABOUT SECTION DATA
  // ==========================================
  const loadAboutData = async () => {
    const data = await fetchAboutData()
    if (data) {
      setAboutData(data)
    }
  }

  const handleSaveAbout = async (e) => {
    e.preventDefault()
    setSavingAbout(true)
    const result = await updateAboutData(aboutData)

    if (result.success) {
      alert('About section updated successfully! Changes are now live.')
      // Update local state just in case
      if (result.data) setAboutData(result.data)
    } else {
      alert('Failed to update About section: ' + result.error)
    }
    setSavingAbout(false)
  }

  const handleAboutChange = (e) => {
    const { name, value } = e.target
    setAboutData(prev => ({ ...prev, [name]: value }))
  }

  // ==========================================
  // GALLERY DATA
  // ==========================================
  const fetchGalleryData = async () => {
    const items = await fetchGalleryMedia()
    setGalleryItems(items)
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Check file size (e.g., max 50MB for videos)
    if (file.size > 50 * 1024 * 1024) {
      alert('File is too large! Maximum allowed is 50MB.')
      return
    }

    setUploading(true)
    const categoryPrompt = prompt('Enter a category for this media (or leave empty for "All"):', 'All')
    const finalCategory = categoryPrompt ? categoryPrompt.trim() : 'All'

    const result = await uploadGalleryMedia(file, finalCategory)

    if (result.success) {
      alert('Media uploaded successfully!')
      fetchGalleryData()
    } else {
      alert('Upload failed: ' + result.error)
    }

    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDeleteMedia = async (id, url) => {
    if (!window.confirm('Are you sure you want to delete this media? It will be removed from the main gallery.')) return

    const result = await deleteGalleryMedia(id, url)
    if (result.success) {
      fetchGalleryData()
    } else {
      alert('Failed to delete: ' + result.error)
    }
  }

  // ==========================================
  // UI RENDERING
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-800 rounded-2xl p-8 shadow-2xl max-w-sm w-full border border-neutral-700"
        >
          <div className="flex justify-center mb-6">
            <LayoutDashboard className="w-12 h-12 text-dustyrose" />
          </div>
          <h1 className="font-display text-3xl text-white mb-6 text-center">
            Sema <span className="text-dustyrose">Admin</span>
          </h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white mb-4
                         focus:border-dustyrose focus:ring-1 focus:ring-dustyrose focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-dustyrose text-neutral-900 font-semibold py-3 rounded-lg
                         hover:bg-champagne transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row font-body">

      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-neutral-900 text-white flex flex-col shadow-xl z-10 hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-neutral-800">
          <LayoutDashboard className="w-8 h-8 text-dustyrose" />
          <h1 className="font-display text-2xl tracking-wide">Sema<span className="text-dustyrose">Admin</span></h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'bookings' ? 'bg-dustyrose text-neutral-900 font-semibold' : 'hover:bg-neutral-800 text-neutral-300'}`}
          >
            <CalendarCheck className="w-5 h-5" /> Appointments
          </button>
          <button
            onClick={() => setActiveTab('handouts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'handouts' ? 'bg-dustyrose text-neutral-900 font-semibold' : 'hover:bg-neutral-800 text-neutral-300'}`}
          >
            <CreditCard className="w-5 h-5" /> Payments & Codes
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'gallery' ? 'bg-dustyrose text-neutral-900 font-semibold' : 'hover:bg-neutral-800 text-neutral-300'}`}
          >
            <ImageIcon className="w-5 h-5" /> Gallery Manager
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'about' ? 'bg-dustyrose text-neutral-900 font-semibold' : 'hover:bg-neutral-800 text-neutral-300'}`}
          >
            <FolderOpen className="w-5 h-5" /> Edit About Page
          </button>
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-neutral-400 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* MOBILE NAV (Visible only on small screens) */}
      <div className="md:hidden bg-neutral-900 text-white flex overflow-x-auto">
        <button onClick={() => setActiveTab('bookings')} className={`flex-1 py-4 text-center text-sm font-semibold border-b-2 ${activeTab === 'bookings' ? 'border-dustyrose text-dustyrose' : 'border-transparent text-neutral-400'}`}>
          Bookings
        </button>
        <button onClick={() => setActiveTab('handouts')} className={`flex-1 py-4 text-center text-sm font-semibold border-b-2 ${activeTab === 'handouts' ? 'border-dustyrose text-dustyrose' : 'border-transparent text-neutral-400'}`}>
          Payments
        </button>
        <button onClick={() => setActiveTab('gallery')} className={`flex-1 min-w-[100px] py-4 text-center text-sm font-semibold border-b-2 ${activeTab === 'gallery' ? 'border-dustyrose text-dustyrose' : 'border-transparent text-neutral-400'}`}>
          Gallery
        </button>
        <button onClick={() => setActiveTab('about')} className={`flex-1 min-w-[100px] py-4 text-center text-sm font-semibold border-b-2 ${activeTab === 'about' ? 'border-dustyrose text-dustyrose' : 'border-transparent text-neutral-400'}`}>
          About Page
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen">

        {loading && <div className="text-center text-neutral-500 py-10">Syncing data with server...</div>}

        {!loading && (
          <AnimatePresence mode="wait">

            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <motion.div key="bookings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <header className="mb-8">
                  <h2 className="font-display text-3xl text-neutral-800">Appointment Requests</h2>
                  <p className="text-neutral-500">Manage all your incoming bookings here.</p>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-neutral-50 border-b border-neutral-200">
                          <th className="p-4 font-semibold text-neutral-600 text-sm">Client</th>
                          <th className="p-4 font-semibold text-neutral-600 text-sm">Service</th>
                          <th className="p-4 font-semibold text-neutral-600 text-sm">Date & Time</th>
                          <th className="p-4 font-semibold text-neutral-600 text-sm">Status</th>
                          <th className="p-4 font-semibold text-neutral-600 text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {bookings.length === 0 ? (
                          <tr><td colSpan="5" className="p-8 text-center text-neutral-400">No bookings found.</td></tr>
                        ) : (
                          bookings.map(b => (
                            <tr key={b.id} className="hover:bg-neutral-50 transition-colors">
                              <td className="p-4">
                                <div className="font-medium text-neutral-800">{b.client_name}</div>
                                <div className="text-sm text-neutral-500">{b.client_phone}</div>
                              </td>
                              <td className="p-4 text-neutral-700">{b.service} {b.is_home_service && <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Home Svc</span>}</td>
                              <td className="p-4 text-neutral-700">
                                <div>{b.booking_date}</div>
                                <div className="text-sm text-neutral-500">{b.booking_time}</div>
                              </td>
                              <td className="p-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                  b.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                  {b.status}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  {b.status !== 'confirmed' && (
                                    <button onClick={() => updateBookingStatus(b.id, 'confirmed')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Confirm">
                                      <CheckCircle2 className="w-5 h-5" />
                                    </button>
                                  )}
                                  {b.status !== 'cancelled' && (
                                    <button onClick={() => updateBookingStatus(b.id, 'cancelled')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Cancel">
                                      <XCircle className="w-5 h-5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* HANDOUTS & PAYMENTS TAB */}
            {activeTab === 'handouts' && (
              <motion.div key="handouts" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-3xl text-neutral-800">Handout Payments</h2>
                    <p className="text-neutral-500">Generate 1-time secure download codes for clients who paid 200 GHS.</p>
                  </div>
                  <button
                    onClick={handleGenerateCode}
                    className="flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-lg hover:bg-dustyrose transition-colors shadow-sm"
                  >
                    <CreditCard className="w-5 h-5" /> Generate 1-Time Code
                  </button>
                </header>

                {generatedCode && (
                  <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-green-800 font-semibold mb-1">Success! Share this code with the client:</p>
                      <p className="text-sm text-green-700">They will enter this on the website to instantly download the PDF.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-3xl text-green-900 tracking-widest bg-white px-4 py-2 rounded-lg border border-green-200 shadow-sm">{generatedCode}</span>
                      <button onClick={() => copyToClipboard(generatedCode)} className="p-3 bg-green-200 text-green-800 rounded-lg hover:bg-green-300 transition-colors">
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-200">
                        <th className="p-4 font-semibold text-neutral-600 text-sm">Download Code</th>
                        <th className="p-4 font-semibold text-neutral-600 text-sm">Generated On</th>
                        <th className="p-4 font-semibold text-neutral-600 text-sm">Status</th>
                        <th className="p-4 font-semibold text-neutral-600 text-sm text-right">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {handoutCodes.length === 0 ? (
                        <tr><td colSpan="4" className="p-8 text-center text-neutral-400">No codes generated yet.</td></tr>
                      ) : (
                        handoutCodes.map(code => (
                          <tr key={code.id} className="hover:bg-neutral-50 transition-colors">
                            <td className="p-4 font-mono font-bold tracking-wider text-neutral-800">{code.code}</td>
                            <td className="p-4 text-neutral-600 text-sm">{new Date(code.created_at).toLocaleString()}</td>
                            <td className="p-4">
                              {code.is_used ? (
                                <span className="text-red-600 flex items-center gap-1 text-sm font-semibold"><XCircle className="w-4 h-4" /> Used & Invalidated</span>
                              ) : (
                                <span className="text-green-600 flex items-center gap-1 text-sm font-semibold"><CheckCircle2 className="w-4 h-4" /> Valid (Waiting)</span>
                              )}
                            </td>
                            <td className="p-4 text-right font-semibold text-neutral-800">
                              200 GHS
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* GALLERY TAB */}
            {activeTab === 'gallery' && (
              <motion.div key="gallery" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-3xl text-neutral-800">Gallery Manager</h2>
                    <p className="text-neutral-500">Live-upload pictures or videos straight to the main website.</p>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-2 bg-dustyrose text-neutral-900 font-semibold px-6 py-3 rounded-lg hover:bg-champagne transition-colors shadow-sm disabled:opacity-50"
                    >
                      {uploading ? <span className="animate-pulse">Uploading...</span> : <><UploadCloud className="w-5 h-5" /> Upload Media</>}
                    </button>
                  </div>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryItems.length === 0 && !uploading && (
                    <div className="col-span-full p-12 text-center bg-white border-2 border-dashed border-neutral-300 rounded-xl text-neutral-500 flex flex-col items-center">
                      <FolderOpen className="w-12 h-12 mb-3 text-neutral-400" />
                      <p>Your gallery is currently empty.</p>
                      <p className="text-sm mt-1">Click "Upload Media" to add your first picture!</p>
                    </div>
                  )}

                  {galleryItems.map(item => (
                    <div key={item.id} className="relative group rounded-xl overflow-hidden bg-neutral-200 aspect-square shadow-sm">
                      {item.type === 'video' ? (
                        <video src={item.url} className="w-full h-full object-cover" controls />
                      ) : (
                        <img src={item.url} alt="Gallery item" className="w-full h-full object-cover" />
                      )}

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                        <span className="text-white text-xs font-semibold uppercase tracking-widest mb-3 bg-black/50 px-2 py-1 rounded">{item.category}</span>
                        <button
                          onClick={() => handleDeleteMedia(item.id, item.url)}
                          className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-transform transform hover:scale-110 shadow-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {uploading && (
                    <div className="flex items-center justify-center rounded-xl bg-neutral-100 border-2 border-dashed border-neutral-300 aspect-square">
                      <div className="text-center">
                        <UploadCloud className="w-8 h-8 text-dustyrose mx-auto mb-2 animate-bounce" />
                        <p className="text-sm text-neutral-500 font-medium tracking-wide">UPLOADING</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <motion.div key="about" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <header className="mb-8">
                  <h2 className="font-display text-3xl text-neutral-800">Edit About Page</h2>
                  <p className="text-neutral-500">Update the text and image shown in the About section on the main website.</p>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8 max-w-4xl">
                  <form onSubmit={handleSaveAbout} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Display Name</label>
                        <input
                          type="text"
                          name="name"
                          value={aboutData.name}
                          onChange={handleAboutChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-300 focus:border-dustyrose focus:ring-1 focus:ring-dustyrose focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Professional Title</label>
                        <input
                          type="text"
                          name="title"
                          value={aboutData.title}
                          onChange={handleAboutChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-300 focus:border-dustyrose focus:ring-1 focus:ring-dustyrose focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Profile Image URL</label>
                      <input
                        type="text"
                        name="image_url"
                        value={aboutData.image_url}
                        onChange={handleAboutChange}
                        placeholder="/uploads/your-image.jpeg OR https://example.com/image.jpg"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-300 focus:border-dustyrose focus:ring-1 focus:ring-dustyrose focus:outline-none transition-colors"
                      />
                      <p className="mt-2 text-xs text-neutral-500">
                        You can upload an image using the Gallery Manager first, then paste the URL here.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Bio - Paragraph 1</label>
                      <textarea
                        name="bio_p1"
                        value={aboutData.bio_p1}
                        onChange={handleAboutChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-300 focus:border-dustyrose focus:ring-1 focus:ring-dustyrose focus:outline-none transition-colors resize-y"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Bio - Paragraph 2</label>
                      <textarea
                        name="bio_p2"
                        value={aboutData.bio_p2}
                        onChange={handleAboutChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-300 focus:border-dustyrose focus:ring-1 focus:ring-dustyrose focus:outline-none transition-colors resize-y"
                      ></textarea>
                    </div>

                    <div className="pt-4 border-t border-neutral-200">
                      <button
                        type="submit"
                        disabled={savingAbout}
                        className="flex items-center gap-2 bg-dustyrose text-neutral-900 font-semibold px-8 py-3 rounded-lg hover:bg-champagne transition-colors shadow-sm disabled:opacity-50"
                      >
                        {savingAbout ? <span className="animate-pulse">Saving Changes...</span> : <><CheckCircle2 className="w-5 h-5" /> Save Changes</>}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        )}
      </main>
    </div>
  )
}

export default Admin
