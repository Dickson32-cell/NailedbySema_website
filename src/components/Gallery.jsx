import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchGalleryMedia } from '../lib/supabase'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-dustyrose/30 bg-white/70 backdrop-blur-sm"
          >
            <span className="text-dustyrose text-xs font-body tracking-[0.2em] uppercase">Portfolio</span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4 leading-tight">
            Artistry in <span className="holo-text italic">Motion</span>
          </h2>
          <div className="flex justify-center mb-6">
            <div className="nail-drip w-20 h-1 bg-gradient-to-r from-transparent via-dustyrose to-transparent rounded-full" />
          </div>
          <p className="font-body text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            Explore our collection of stunning nail designs and transformations.<br className="hidden md:block" />
            <span className="text-champagne/80 text-sm">Each creation tells a unique story</span>
          </p>
        </motion.div>

        {/* Filter Tabs with Luxury Style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative font-body px-8 py-3 rounded-full transition-all duration-500 cursor-pointer overflow-hidden ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-dustyrose to-champagne text-charcoal shadow-lg shadow-dustyrose/40 border border-white/50'
                  : 'bg-white/80 backdrop-blur-md text-charcoal/70 hover:bg-white hover:shadow-md border border-dustyrose/20'
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-dustyrose to-champagne rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 font-medium tracking-wide">{category}</span>
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
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="gallery-item relative overflow-hidden rounded-3xl cursor-pointer shadow-md hover:shadow-2xl group border border-white/50"
                  onClick={() => setSelectedMedia(item)}
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
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
                      className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                  )}

                  {/* Gradient Overlay - Always Visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-300" />

                  {/* Hover Overlay with Enhanced Category Tag */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent
                               opacity-0 group-hover:opacity-100 transition-all duration-500
                               flex items-end justify-center pb-8"
                  >
                    <motion.span
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      className="bg-gradient-to-r from-dustyrose to-champagne text-charcoal text-sm font-semibold px-6 py-2.5 rounded-full backdrop-blur-md shadow-lg border border-white/30"
                    >
                      {item.category || 'Gallery'}
                    </motion.span>
                  </motion.div>

                  {/* Liquid Metal Shimmer Effect */}
                  <div className="shimmer-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Corner Accent */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-br-3xl" />
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
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full 
                           flex items-center justify-center text-white transition-colors duration-300 cursor-pointer border border-white/20"
                onClick={() => setSelectedMedia(null)}
              >
                <X size={24} />
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
