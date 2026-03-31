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

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-20 bg-dustyrose/10 section-pattern">
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
          <div className="flex justify-center mb-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-dustyrose to-champagne rounded" />
          </div>
          <p className="font-body text-charcoal/70">What our clients say about us</p>
        </motion.div>

        {/* Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10
                       w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center
                       hover:bg-dustyrose hover:text-white transition-all duration-300 cursor-pointer"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10
                       w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center
                       hover:bg-dustyrose hover:text-white transition-all duration-300 cursor-pointer"
          >
            <FaChevronRight />
          </button>

          {/* Review Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
            >
              {/* Stars */}
              <div className="flex justify-center gap-2 mb-8">
                {[...Array(reviews[currentIndex]?.rating || 5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <FaStar className="text-champagne" size={24} />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <motion.p 
                className="font-body text-xl md:text-2xl text-charcoal/80 italic text-center mb-10 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                "{reviews[currentIndex]?.text}"
              </motion.p>

              {/* Author */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="font-display text-2xl text-charcoal mb-1">{reviews[currentIndex]?.name}</p>
                <p className="font-body text-dustyrose font-medium">{reviews[currentIndex]?.service}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Auto-play Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-dustyrose w-10 shadow-lg shadow-dustyrose/30' 
                    : 'bg-charcoal/20 w-3 hover:bg-charcoal/40'
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <span className={`text-xs font-body ${isPaused ? 'text-charcoal/50' : 'text-dustyrose'}`}>
              {isPaused ? 'Paused' : 'Auto-playing'}
            </span>
          </div>
        </div>

        {/* Leave a Review */}
        <div className="mt-16 text-center">
          {!showForm ? (
            <motion.button
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-dustyrose text-white font-body px-10 py-4 rounded-full 
                         hover:bg-dustyrose/80 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Leave a Review
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-8 shadow-xl text-left mt-6"
            >
              {submitted ? (
                <div className="text-center py-10">
                  <motion.div 
                    className="flex items-center justify-center gap-2 font-display text-3xl text-dustyrose mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <Check size={32} />
                    <span>Thank you!</span>
                    <Heart size={28} className="text-champagne" />
                  </motion.div>
                  <p className="font-body text-charcoal/70">Your review has been posted.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-display text-2xl text-charcoal mb-6 text-center">Share Your Experience</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-body text-sm text-charcoal/70 mb-2 block">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Akosua"
                        className="w-full border-2 border-charcoal/10 rounded-xl px-4 py-3 font-body text-charcoal 
                                   focus:outline-none focus:border-dustyrose transition-colors bg-porcelain/50"
                      />
                    </div>

                    <div>
                      <label className="font-body text-sm text-charcoal/70 mb-2 block">Service Received *</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-charcoal/10 rounded-xl px-4 py-3 font-body text-charcoal 
                                   focus:outline-none focus:border-dustyrose transition-colors bg-porcelain/50"
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
                    <div className="flex gap-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaStar
                            size={32}
                            className={`cursor-pointer transition-colors duration-200 ${
                              star <= (hoverRating || form.rating) ? 'text-champagne' : 'text-charcoal/20'
                            }`}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setForm({ ...form, rating: star })}
                          />
                        </motion.div>
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
                      className="w-full border-2 border-charcoal/10 rounded-xl px-4 py-3 font-body text-charcoal 
                                 focus:outline-none focus:border-dustyrose transition-colors resize-none bg-porcelain/50"
                    />
                  </div>

                  <div className="flex gap-4 justify-center pt-4">
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-dustyrose text-white font-body px-10 py-3 rounded-full 
                                 hover:bg-dustyrose/80 transition-colors duration-300 disabled:opacity-60"
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setShowForm(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-charcoal/20 text-charcoal font-body px-10 py-3 rounded-full 
                                 hover:bg-charcoal/5 transition-colors duration-300"
                    >
                      Cancel
                    </motion.button>
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
