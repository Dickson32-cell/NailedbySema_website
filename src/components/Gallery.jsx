import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const imagePaths = Object.keys(import.meta.glob('/public/uploads/*.{jpg,jpeg,png,gif,webp}'))

const galleryImages = imagePaths.map(path => path.replace('/public', ''))

const categories = ['All', 'Gel', 'Acrylic', 'Nail Art', 'Pedicure']

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedMedia, setSelectedMedia] = useState(null)

  // Use only images for display
  const allMedia = galleryImages.map((src, i) => ({ type: 'image', src, id: `img-${i}` }))

  const filteredMedia = activeCategory === 'All'
    ? allMedia
    : allMedia.filter((_, i) => i % 3 === 0) // Simplified filter for demo

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
            Our <span className="text-dustyrose italic">Gallery</span>
          </h2>
          <p className="font-body text-charcoal/70 max-w-2xl mx-auto">
            Explore our collection of stunning nail designs and transformations
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-body px-6 py-2 rounded-full transition-all duration-300 ${activeCategory === category
                ? 'bg-dustyrose text-charcoal'
                : 'bg-porcelain text-charcoal/70 hover:bg-dustyrose/20'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="gallery-item relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid"
                onClick={() => setSelectedMedia(item)}
              >
                {item.type === 'image' && (
                  <img
                    src={item.src}
                    alt={`Nail art ${index + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                  />
                )}
                {/* Shimmer Overlay */}
                <div className="shimmer-overlay absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedMedia(null)}
            >
              <button
                className="absolute top-4 right-4 text-white text-4xl hover:text-dustyrose"
                onClick={() => setSelectedMedia(null)}
              >
                &times;
              </button>
              {selectedMedia.type === 'image' && (
                <img
                  src={selectedMedia.src}
                  alt="Selected"
                  className="max-w-full max-h-[90vh] object-contain"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Gallery
