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
    setGalleryItems(items)
    setLoading(false)
  }

  const filteredMedia = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <section id="gallery" className="py-20 bg-white section-pattern">
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
          <div className="flex justify-center mb-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-dustyrose to-champagne rounded" />
          </div>
          <p className="font-body text-charcoal/70 max-w-2xl mx-auto">
            Explore our collection of stunning nail designs and transformations
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`font-body px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-dustyrose text-charcoal shadow-lg shadow-dustyrose/30'
                  : 'bg-porcelain text-charcoal/70 hover:bg-dustyrose/20'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* CSS Grid Gallery */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="col-span-full py-20 text-center text-charcoal/50">Loading gallery...</div>
            ) : filteredMedia.length === 0 ? (
              <div className="col-span-full py-20 text-center text-charcoal/50">No items in this category yet.</div>
            ) : (
              filteredMedia.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="gallery-item relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl group"
                  onClick={() => setSelectedMedia(item)}
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
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
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  
                  {/* Hover Overlay with Category Tag */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300
                               flex items-end justify-center pb-6"
                  >
                    <span className="bg-dustyrose/90 text-charcoal text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
                      {item.category || 'Gallery'}
                    </span>
                  </motion.div>

                  {/* Shimmer Effect */}
                  <div className="shimmer-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Elegant Lightbox with Blur Backdrop */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedMedia(null)}
            >
              {/* Close Button */}
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-6 right-6 w-12 h-12 bg-porcelain/10 hover:bg-porcelain/20 rounded-full 
                           flex items-center justify-center text-white text-2xl transition-colors duration-300"
                onClick={() => setSelectedMedia(null)}
              >
                &times;
              </motion.button>

              {/* Media */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedMedia.type === 'video' ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                  />
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt="Selected"
                    className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                  />
                )}
                
                {/* Category Tag */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <span className="bg-dustyrose text-charcoal text-sm font-medium px-6 py-2 rounded-full">
                    {selectedMedia.category || 'Gallery'}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Gallery
