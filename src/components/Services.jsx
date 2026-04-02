import { motion } from 'framer-motion'
import { Download, Sparkles, Star, Heart, Home, BookOpen, Palette, Eye, Wand2 } from 'lucide-react'

const serviceCategories = [
  {
    category: 'Manicure & Pedicure',
    icon: Sparkles,
    items: [
      { name: 'Manicure', price: 'GHS 60' },
      { name: 'Classic Pedicure', price: 'GHS 130' },
      { name: 'Jelly Pedicure', price: 'GHS 170' },
      { name: 'Milky Pedicure', price: 'GHS 200' },
    ],
    popular: false,
  },
  {
    category: 'Stick-On Nails',
    icon: Heart,
    items: [
      { name: 'Stick-On Short', price: 'GHS 100' },
      { name: 'Stick-On Medium', price: 'GHS 120' },
      { name: 'Stick-On Long', price: 'GHS 150' },
    ],
    popular: false,
  },
  {
    category: 'Acrylic Nails',
    icon: Star,
    items: [
      { name: 'Acrylic Short', price: 'GHS 150' },
      { name: 'Acrylic Medium', price: 'GHS 180' },
      { name: 'Acrylic Long', price: 'GHS 220' },
    ],
    popular: true,
  },
  {
    category: 'Builder Gel',
    icon: Wand2,
    items: [
      { name: 'Builder Gel Short', price: 'GHS 80' },
      { name: 'Builder Gel Medium', price: 'GHS 120' },
      { name: 'Builder Gel Long', price: 'GHS 150' },
    ],
    popular: true,
  },
  {
    category: 'Poly Gel',
    icon: Sparkles,
    items: [
      { name: 'Poly Gel Short', price: 'GHS 130' },
      { name: 'Poly Gel Medium', price: 'GHS 160' },
      { name: 'Poly Gel Long', price: 'GHS 200' },
    ],
    popular: false,
  },
  {
    category: 'Nail Art',
    icon: Palette,
    items: [
      { name: 'Nail Art Design', price: 'GHS 30 – 100' },
    ],
    popular: false,
  },
  {
    category: 'Lashes',
    icon: Sparkles,
    items: [
      { name: 'Classic Set', price: 'GHS 150' },
      { name: 'Classic Cateye', price: 'GHS 180' },
      { name: 'Hybrid Set', price: 'GHS 170' },
      { name: 'Hybrid Cateye', price: 'GHS 200' },
      { name: 'Volume Set', price: 'GHS 200' },
      { name: 'Volume Cateye', price: 'GHS 250' },
      { name: 'Cluster Lashes', price: 'GHS 60 – 120' },
      { name: 'Refill', price: 'Half Price' },
      { name: 'Removal', price: 'GHS 50' },
    ],
    popular: true,
  },
  {
    category: 'Brows',
    icon: Eye,
    items: [
      { name: 'Ombré Brows', price: 'GHS 500' },
    ],
    popular: false,
  },
  {
    category: 'Nails Training',
    icon: BookOpen,
    items: [
      { name: '1 Month Course', price: 'GHS 1,500' },
      { name: '3 Months Course', price: 'GHS 3,500' },
      { name: '1 Year Apprenticeship', price: 'GHS 2,000' },
    ],
    popular: false,
  },
  {
    category: 'Home Service',
    icon: Home,
    items: [
      { name: 'Travel Fee (any service)', price: '+ GHS 40' },
    ],
    popular: false,
  },
]

const Services = ({ onBook, onDownloadHandout }) => {
  return (
    <section id="services" className="py-20 bg-porcelain section-pattern">
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
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-dustyrose/30 bg-white/50 backdrop-blur-sm"
          >
            <span className="text-dustyrose text-xs font-body tracking-[0.2em] uppercase">Our Services</span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4 leading-tight">
            Elevate Your <span className="holo-text italic">Beauty</span>
          </h2>
          <div className="flex justify-center mb-6">
            <div className="nail-drip w-20 h-1 bg-gradient-to-r from-transparent via-dustyrose to-transparent rounded-full" />
          </div>
          <p className="font-body text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            Professional nail artistry tailored to your unique style.<br className="hidden md:block" />
            <span className="text-champagne/80 text-sm">All services include complimentary consultation</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              whileHover={{ y: -12 }}
              className="relative card-lift liquid-metal mirror-reflect bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl overflow-hidden cursor-pointer border border-white/50"
            >
              {/* Popular Badge with Glow */}
              {group.popular && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: groupIndex * 0.1 + 0.3 }}
                  className="absolute -top-2 -right-2 z-10"
                >
                  <span className="bg-gradient-to-br from-champagne to-dustyrose text-charcoal text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 border border-white/30">
                    <Sparkles size={14} className="animate-pulse" />
                    Most Popular
                  </span>
                </motion.div>
              )}

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-dustyrose/10 to-transparent rounded-br-full" />

              {/* Header with Icon */}
              <div className="flex items-start gap-4 mb-6 pb-5 border-b border-dustyrose/20">
                <motion.div
                  className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-dustyrose bg-dustyrose/10 rounded-2xl"
                  whileHover={{ scale: 1.15, rotate: [0, -12, 12, -8, 8, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <group.icon size={24} />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-display text-xl md:text-2xl text-charcoal leading-tight mb-1">{group.category}</h3>
                  <p className="text-xs text-charcoal/50 font-body">Premium quality · Professional service</p>
                </div>
              </div>

              {/* Service Items with Enhanced Styling */}
              <ul className="space-y-4 mb-8">
                {group.items.map((item, idx) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: groupIndex * 0.1 + idx * 0.05 }}
                    className="flex justify-between items-center group"
                  >
                    <span className="font-body text-charcoal/80 group-hover:text-charcoal transition-colors text-sm md:text-base">
                      {item.name}
                    </span>
                    <span className="font-display text-base md:text-lg text-champagne font-semibold whitespace-nowrap ml-4 group-hover:scale-105 transition-transform inline-block">
                      {item.price}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Book Button with Luxury Style */}
              <motion.button
                onClick={onBook}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-charcoal to-charcoal/90 text-porcelain font-body font-semibold py-4 rounded-full
                           hover:from-dustyrose hover:to-champagne hover:text-charcoal
                           transition-all duration-500 cursor-pointer shadow-md hover:shadow-lg
                           border border-charcoal/10 hover:border-champagne/30"
              >
                Book Now
              </motion.button>

              {/* Download Training Handout Button */}
              {group.category === 'Nails Training' && (
                <motion.button
                  onClick={onDownloadHandout}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-3 bg-white border-2 border-dustyrose text-dustyrose font-body font-semibold py-4 rounded-full
                             hover:bg-gradient-to-r hover:from-dustyrose hover:to-champagne hover:text-white hover:border-transparent
                             transition-all duration-500
                             flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <Download size={18} />
                  <span>Training Handout · 200 GHS</span>
                </motion.button>
              )}

              {/* Subtle Corner Decoration */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-champagne/5 to-transparent rounded-tl-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
