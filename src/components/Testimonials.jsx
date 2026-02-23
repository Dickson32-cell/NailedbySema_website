import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import { submitReview, fetchReviews } from '../lib/supabase'

const staticReviews = [
  { id: 's1', name: 'Adjoa', rating: 5, service: 'Gel Extensions', text: "Sema is amazing! My nails have never looked better. She's so patient and talented." },
  { id: 's2', name: 'Serwaa', rating: 5, service: 'Nail Art Design', text: 'The nail art was exactly what I wanted. Highly recommend!' },
  { id: 's3', name: 'Akua', rating: 5, service: 'Pedicure Deluxe', text: 'Best pedicure in Koforidua! So relaxing and professional.' },
  { id: 's4', name: 'Yaa', rating: 5, service: 'Ombre Brows', text: 'Love my ombre brows! Sema really knows her stuff.' },
  { id: 's5', name: 'Abena', rating: 5, service: 'Home Service', text: 'So convenient to have her come to my home. Great service!' },
]

const serviceOptions = [
  'Gel Extensions', 'Acrylic Set', 'Nail Art Design', 'Pedicure Deluxe',
  'Ombre Brows', 'Eyebrow Tinting', 'Home Service', 'Other',
]

const Testimonials = () => {
  const [reviews, setReviews] = useState(staticReviews)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', service: '', rating: 5, text: '' })
  const [hoverRating, setHoverRating] = useState(0)

  useEffect(() => {
    fetchReviews().then((data) => {
      if (data.length > 0) {
        setReviews([...staticReviews, ...data])
      }
    })
  }, [])

  useEffect(() => {
    if (reviews.length === 0) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [reviews])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.service || !form.text) return
    setSubmitting(true)
    const { data, error } = await submitReview(form)
    setSubmitting(false)
    if (!error && data) {
      const newReview = data[0]
      setReviews((prev) => [...prev, newReview])
      setCurrentIndex(reviews.length)
    }
    setSubmitted(true)
    setForm({ name: '', service: '', rating: 5, text: '' })
    setTimeout(() => { setShowForm(false); setSubmitted(false) }, 3000)
  }

  return (
    <section className="py-20 bg-dustyrose/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
            Client <span className="text-dustyrose italic">Reviews</span>
          </h2>
          <p className="font-body text-charcoal/70">What our clients say about us</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-xl text-center"
            >
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(reviews[currentIndex]?.rating || 5)].map((_, i) => (
                  <FaStar key={i} className="text-champagne" size={24} />
                ))}
              </div>
              <p className="font-body text-xl text-charcoal/80 italic mb-6">
                "{reviews[currentIndex]?.text}"
              </p>
              <div>
                <p className="font-display text-xl text-charcoal">{reviews[currentIndex]?.name}</p>
                <p className="font-body text-dustyrose">{reviews[currentIndex]?.service}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-dustyrose w-8' : 'bg-charcoal/30 hover:bg-charcoal/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Leave a Review */}
        <div className="mt-12 text-center">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-dustyrose text-white font-body px-8 py-3 rounded-full hover:bg-dustyrose/80 transition-colors duration-300"
            >
              Leave a Review
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-xl text-left mt-6"
            >
              {submitted ? (
                <div className="text-center py-6">
                  <p className="font-display text-2xl text-dustyrose mb-2">Thank you! 💖</p>
                  <p className="font-body text-charcoal/70">Your review has been posted.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-2xl text-charcoal mb-4">Share Your Experience</h3>

                  <div>
                    <label className="font-body text-sm text-charcoal/70 mb-1 block">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Akosua"
                      className="w-full border border-charcoal/20 rounded-lg px-4 py-2 font-body text-charcoal focus:outline-none focus:border-dustyrose"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-charcoal/70 mb-1 block">Service Received *</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      required
                      className="w-full border border-charcoal/20 rounded-lg px-4 py-2 font-body text-charcoal focus:outline-none focus:border-dustyrose"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-body text-sm text-charcoal/70 mb-1 block">Rating *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={28}
                          className={`cursor-pointer transition-colors ${
                            star <= (hoverRating || form.rating) ? 'text-champagne' : 'text-charcoal/20'
                          }`}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setForm({ ...form, rating: star })}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-sm text-charcoal/70 mb-1 block">Your Review *</label>
                    <textarea
                      name="text"
                      value={form.text}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell others about your experience..."
                      className="w-full border border-charcoal/20 rounded-lg px-4 py-2 font-body text-charcoal focus:outline-none focus:border-dustyrose resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-dustyrose text-white font-body px-8 py-3 rounded-full hover:bg-dustyrose/80 transition-colors duration-300 disabled:opacity-60"
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="border border-charcoal/30 text-charcoal font-body px-8 py-3 rounded-full hover:bg-charcoal/5 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
