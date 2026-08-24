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
    <section id="services" className="py-20 bg-porcelain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-dustyrose text-xs font-body tracking-[0.2em] uppercase mb-4">
            Our Services
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
            Elevate Your <span className="italic text-dustyrose">Beauty</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="font-body text-base text-charcoal/70 max-w-2xl mx-auto">
            Professional nail artistry tailored to your unique style.
            <span className="block text-sm text-champagne mt-1">All services include complimentary consultation</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: groupIndex * 0.05 }}
              className="card-hover relative bg-white rounded-2xl p-6 shadow-sm border border-charcoal/5"
            >
              {group.popular && (
                <span className="absolute top-4 right-4 bg-champagne/20 text-champagne text-xs font-medium px-3 py-1 rounded-full">
                  Popular
                </span>
              )}

              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-charcoal/10">
                <div className="w-10 h-10 flex items-center justify-center text-dustyrose bg-dustyrose/10 rounded-xl">
                  <group.icon size={20} />
                </div>
                <h3 className="font-display text-xl text-charcoal">{group.category}</h3>
              </div>

              <ul className="space-y-3 mb-6">
                {group.items.map((item) => (
                  <li key={item.name} className="flex justify-between items-center">
                    <span className="font-body text-sm text-charcoal/80">{item.name}</span>
                    <span className="font-display text-base text-champagne font-semibold">{item.price}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onBook}
                className="w-full bg-charcoal text-porcelain font-body font-medium py-3 rounded-full hover:bg-dustyrose hover:text-charcoal transition-colors duration-300"
              >
                Book Now
              </button>

              {group.category === 'Nails Training' && (
                <button
                  onClick={onDownloadHandout}
                  className="w-full mt-3 bg-white border border-dustyrose text-dustyrose font-body font-medium py-3 rounded-full hover:bg-dustyrose hover:text-charcoal transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Training Handout · 200 GHS
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services