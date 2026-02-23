import { motion } from 'framer-motion'

const serviceCategories = [
  {
    category: 'Manicure & Pedicure',
    emoji: '💅',
    items: [
      { name: 'Manicure', price: 'GHS 60' },
      { name: 'Classic Pedicure', price: 'GHS 130' },
      { name: 'Jelly Pedicure', price: 'GHS 170' },
      { name: 'Milky Pedicure', price: 'GHS 200' },
    ],
  },
  {
    category: 'Stick-On Nails',
    emoji: '🩷',
    items: [
      { name: 'Stick-On Short', price: 'GHS 100' },
      { name: 'Stick-On Medium', price: 'GHS 120' },
      { name: 'Stick-On Long', price: 'GHS 150' },
    ],
  },
  {
    category: 'Acrylic Nails',
    emoji: '✦',
    items: [
      { name: 'Acrylic Short', price: 'GHS 150' },
      { name: 'Acrylic Medium', price: 'GHS 180' },
      { name: 'Acrylic Long', price: 'GHS 220' },
    ],
  },
  {
    category: 'Builder Gel',
    emoji: '🤍',
    items: [
      { name: 'Builder Gel Short', price: 'GHS 80' },
      { name: 'Builder Gel Medium', price: 'GHS 120' },
      { name: 'Builder Gel Long', price: 'GHS 150' },
    ],
  },
  {
    category: 'Poly Gel',
    emoji: '✧',
    items: [
      { name: 'Poly Gel Short', price: 'GHS 130' },
      { name: 'Poly Gel Medium', price: 'GHS 160' },
      { name: 'Poly Gel Long', price: 'GHS 200' },
    ],
  },
  {
    category: 'Nail Art',
    emoji: '🎨',
    items: [
      { name: 'Nail Art Design', price: 'GHS 30 – 100' },
    ],
  },
  {
    category: 'Lashes',
    emoji: '✨',
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
  },
  {
    category: 'Brows',
    emoji: '🤍',
    items: [
      { name: 'Ombré Brows', price: 'GHS 500' },
    ],
  },
  {
    category: 'Nails Training',
    emoji: '🎓',
    items: [
      { name: '1 Month Course', price: 'GHS 1,500' },
      { name: '3 Months Course', price: 'GHS 3,500' },
      { name: '1 Year Apprenticeship', price: 'GHS 2,000' },
    ],
  },
  {
    category: 'Home Service',
    emoji: '🏠',
    items: [
      { name: 'Travel Fee (any service)', price: '+ GHS 40' },
    ],
  },
]

const Services = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

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
          <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
            Our <span className="text-dustyrose italic">Services</span>
          </h2>
          <p className="font-body text-charcoal/70 max-w-2xl mx-auto">
            Premium lash, brow and nail services tailored to your style
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
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-charcoal/10">
                <span className="text-2xl">{group.emoji}</span>
                <h3 className="font-display text-2xl text-charcoal">{group.category}</h3>
              </div>

              <ul className="space-y-3 mb-6">
                {group.items.map((item) => (
                  <li key={item.name} className="flex justify-between items-center">
                    <span className="font-body text-charcoal/80">{item.name}</span>
                    <span className="font-display text-lg text-champagne whitespace-nowrap ml-4">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToBooking}
                className="w-full bg-charcoal text-porcelain font-body font-semibold py-3 rounded-full
                           hover:bg-dustyrose transition-colors duration-300"
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
