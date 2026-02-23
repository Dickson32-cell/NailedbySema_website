import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

const testimonials = [
  {
    id: 1,
    name: 'Adjoa',
    rating: 5,
    service: 'Gel Extensions',
    text: 'Sema is amazing! My nails have never looked better. She\'s so patient and talented.',
  },
  {
    id: 2,
    name: 'Serwaa',
    rating: 5,
    service: 'Nail Art Design',
    text: 'The nail art was exactly what I wanted. Highly recommend!',
  },
  {
    id: 3,
    name: 'Akua',
    rating: 5,
    service: 'Pedicure Deluxe',
    text: 'Best pedicure in Koforidua! So relaxing and professional.',
  },
  {
    id: 4,
    name: 'Yaa',
    rating: 5,
    service: 'Ombre Brows',
    text: 'Love my ombre brows! Sema really knows her stuff.',
  },
  {
    id: 5,
    name: 'Abena',
    rating: 5,
    service: 'Home Service',
    text: 'So convenient to have her come to my home. Great service!',
  },
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
          <p className="font-body text-charcoal/70">
            What our clients say about us
          </p>
        </motion.div>

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
              {/* Stars */}
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FaStar key={i} className="text-champagne" size={24} />
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-xl text-charcoal/80 italic mb-6">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Client Info */}
              <div>
                <p className="font-display text-xl text-charcoal">
                  {testimonials[currentIndex].name}
                </p>
                <p className="font-body text-dustyrose">
                  {testimonials[currentIndex].service}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-dustyrose w-8'
                    : 'bg-charcoal/30 hover:bg-charcoal/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
