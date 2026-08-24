import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchGalleryMedia } from '../lib/supabase'
import { X } from 'lucide-react'

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
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-dustyrose text-xs font-body tracking-[0.2em] uppercase mb-4">
            Portfolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
            Artistry in <span className="italic text-dustyrose">Motion</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="font-body text-base text-charcoal/70 max-w-2xl mx-auto">
            Explore our collection of nail designs and transformations.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-body text-sm px-6 py-2 rounded-full transition-colors duration-300 ${
                activeCategory === category
                  ? 'bg-dustyrose text-charcoal font-medium'
                  : 'bg-porcelain text-charcoal/60 hover:text-charcoal hover:bg-dustyrose/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="col-span-full py-20 text-center text-charcoal/50">
                Loading gallery...
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="col-span-full py-20 text-center text-charcoal/50">
                No items in this category yet.
              </div>
            ) : (
              filteredMedia.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="card-hover relative overflow-hidden rounded-2xl cursor-pointer shadow-sm border border-charcoal/5"
                  onClick={() => setSelectedMedia(item)}
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      className="w-full h-72 object-cover"
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
                      className="w-full h-72 object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/60 to-transparent p-4">
                    <span className="text-porcelain text-sm font-body">{item.category || 'Gallery'}</span>
                  </div>
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
              className="fixed inset-0 z-50 bg-charcoal/80 flex items-center justify-center p-4"
              onClick={() => setSelectedMedia(null)}
            >
              <button
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                onClick={() => setSelectedMedia(null)}
              >
                <X size={20} />
              </button>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedMedia.type === 'video' ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-xl"
                  />
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt="Selected"
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-xl"
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Gallery