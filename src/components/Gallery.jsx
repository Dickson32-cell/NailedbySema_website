import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchGalleryMedia } from '../lib/supabase'

const categories = ['All', 'Gel', 'Acrylic', 'Nail Art', 'Pedicure']

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGallery()
  }, [])

  const loadGallery = async () => {
    setLoading(true)
    const items = await fetchGalleryMedia()
    // Extract unique categories from db items if needed, but currently hardcoded is okay
    setGalleryItems(items)
    setLoading(false)
  }

  const filteredMedia = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

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
            {loading ? (
              <div className="col-span-full py-20 text-center text-charcoal/50">Loading gallery...</div>
            ) : filteredMedia.length === 0 ? (
              <div className="col-span-full py-20 text-center text-charcoal/50">No items in this category yet.</div>
            ) : (
              filteredMedia.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="gallery-item relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid shadow-sm"
                  onClick={() => setSelectedMedia(item)}
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                      muted
                      loop
                      playsInline
                      onMouseOver={e => e.target.play()}
                      onMouseOut={e => e.target.pause()}
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={`Nail art ${index + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                    />
                  )}
                  {/* Shimmer Overlay */}
                  <div className="shimmer-overlay absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))
            )}
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
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[90vh] object-contain"
                />
              ) : (
                <img
                  src={selectedMedia.url}
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
