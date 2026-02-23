import { motion } from 'framer-motion'

const services = [
  {
    name: 'Classic Manicure',
    description: 'Shape, buff, cuticle care and polish for natural nails',
    duration: '45 min',
    price: 'GHS 60',
    category: 'nails',
  },
  {
    name: 'Gel Extensions',
    description: 'Long-lasting gel extensions with optional nail art',
    duration: '90 min',
    price: 'GHS 150',
    category: 'nails',
  },
  {
    name: 'Nail Art Design',
    description: 'Custom nail art - marble, chrome, florals, and more',
    duration: '60 min',
    price: 'GHS 120',
    category: 'nails',
  },
  {
    name: 'Pedicure Deluxe',
    description: 'Luxury foot spa with exfoliation, massage and polish',
    duration: '75 min',
    price: 'GHS 100',
    category: 'pedicure',
  },
  {
    name: 'Ombre Brows',
    description: 'Semi-permanent ombre brow shading for a natural look',
    duration: '90 min',
    price: 'GHS 200',
    category: 'brows',
  },
  {
    name: 'Home Service',
    description: 'Any service at your location - travel fee applies',
    duration: 'Varies',
    price: 'From GHS 50',
    category: 'home',
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
            Premium nail services and brow artistry tailored to your style
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-2xl text-charcoal">{service.name}</h3>
                <span className="bg-dustyrose/20 text-dustyrose text-sm font-body px-3 py-1 rounded-full">
                  {service.category}
                </span>
              </div>

              <p className="font-body text-charcoal/70 mb-4">{service.description}</p>

              <div className="flex justify-between items-center mb-6">
                <span className="font-body text-charcoal/60">
                  <span className="inline-block mr-1">⏱</span> {service.duration}
                </span>
                <span className="font-display text-xl text-champagne">{service.price}</span>
              </div>

              <button
                onClick={scrollToBooking}
                className="w-full bg-charcoal text-porcelain font-body font-semibold py-3 rounded-full
                           hover:bg-dustyrose transition-colors duration-300"
              >
                Book This
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
