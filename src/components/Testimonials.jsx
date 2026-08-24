import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { submitReview, fetchReviews } from '../lib/supabase'
import { Check, Heart } from 'lucide-react'

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
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    fetchReviews().then((data) => {
      if (data.length > 0) {
        setReviews([...staticReviews, ...data])
      }
    })
  }, [])

  useEffect(() => {
    if (reviews.length === 0 || isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [reviews, isPaused])

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

  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % reviews.length)
  const prevReview = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-dustyrose text-xs font-body tracking-[0.2em] uppercase mb-4">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
            Client <span className="italic text-dustyrose">Reviews</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="font-body text-base text-charcoal/70">What our clients say about us</p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-8 z-10 w-10 h-10 bg-white shadow rounded-full flex items-center justify-center hover:bg-dustyrose hover:text-porcelain transition-colors"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-8 z-10 w-10 h-10 bg-white shadow rounded-full flex items-center justify-center hover:bg-dustyrose hover:text-porcelain transition-colors"
          >
            <FaChevronRight />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-porcelain rounded-2xl p-8 md:p-12 shadow-sm border border-charcoal/5"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(reviews[currentIndex]?.rating || 5)].map((_, i) => (
                  <FaStar key={i} className="text-champagne" size={20} />
                ))}
              </div>
              <p className="font-body text-lg md:text-xl text-charcoal/80 italic text-center mb-8 leading-relaxed">
                "{reviews[currentIndex]?.text}"
              </p>
              <div className="text-center">
                <p className="font-display text-xl text-charcoal mb-1">{reviews[currentIndex]?.name}</p>
                <p className="font-body text-dustyrose text-sm font-medium">{reviews[currentIndex]?.service}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-dustyrose w-8' : 'bg-charcoal/20 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Leave a review */}
        <div className="mt-12 text-center">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-dustyrose text-charcoal font-body font-medium px-8 py-3 rounded-full hover:bg-champagne transition-colors duration-300"
            >
              Leave a Review
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-porcelain rounded-2xl p-8 shadow-sm border border-charcoal/5 text-left mt-6 max-w-2xl mx-auto"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div className="flex items-center justify-center gap-2 font-display text-2xl text-dustyrose mb-4">
                    <Check size={28} />
                    <span>Thank you!</span>
                    <Heart size={24} className="text-champagne" />
                  </div>
                  <p className="font-body text-charcoal/70">Your review has been posted.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-2xl text-charcoal mb-4 text-center">Share Your Experience</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-sm text-charcoal/70 mb-2 block">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Akosua"
                        className="w-full border border-charcoal/10 rounded-lg px-4 py-3 font-body text-charcoal focus:outline-none focus:border-dustyrose transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-charcoal/70 mb-2 block">Service Received *</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full border border-charcoal/10 rounded-lg px-4 py-3 font-body text-charcoal focus:outline-none focus:border-dustyrose transition-colors bg-white"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-sm text-charcoal/70 mb-2 block">Rating *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={28}
                          className={`cursor-pointer transition-colors ${
                            star <= (hoverRating || form.rating) ? 'text-champagne' : 'text-charcoal/15'
                          }`}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setForm({ ...form, rating: star })}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-sm text-charcoal/70 mb-2 block">Your Review *</label>
                    <textarea
                      name="text"
                      value={form.text}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell others about your experience..."
                      className="w-full border border-charcoal/10 rounded-lg px-4 py-3 font-body text-charcoal focus:outline-none focus:border-dustyrose transition-colors resize-none bg-white"
                    />
                  </div>
                  <div className="flex gap-3 justify-center">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-dustyrose text-charcoal font-body font-medium px-8 py-3 rounded-full hover:bg-champagne transition-colors disabled:opacity-60"
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="border border-charcoal/20 text-charcoal font-body px-8 py-3 rounded-full hover:bg-charcoal/5 transition-colors"
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