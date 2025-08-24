'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Check, Star, Crown, Heart } from 'lucide-react'

const pricingPlans = [
  {
    id: 'essential',
    name: 'Essential Bloom',
    price: 299,
    period: 'per arrangement',
    description: 'Perfect for intimate gatherings and personal spaces',
    icon: Heart,
    color: 'from-blush-400 to-roselle-500',
    features: [
      'Custom floral arrangement',
      'Premium fresh flowers',
      'Basic styling consultation',
      'Same-day delivery',
      '7-day freshness guarantee',
      'Care instructions included'
    ],
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Garden',
    price: 599,
    period: 'per event',
    description: 'Ideal for special events and celebrations',
    icon: Star,
    color: 'from-roselle-500 to-sage-500',
    features: [
      'Multiple floral arrangements',
      'Luxury flower selection',
      'Full styling consultation',
      'Setup and breakdown service',
      'Photography coordination',
      '14-day planning support',
      'Backup arrangement included',
      'Custom color matching'
    ],
    popular: true
  },
  {
    id: 'luxury',
    name: 'Luxury Bespoke',
    price: 1299,
    period: 'per wedding',
    description: 'Complete floral design for your dream wedding',
    icon: Crown,
    color: 'from-sage-500 to-cream-600',
    features: [
      'Full wedding floral package',
      'Rare and exotic flowers',
      'Dedicated design team',
      'Multiple venue coordination',
      'Bridal party arrangements',
      '30-day planning process',
      'Emergency backup service',
      'Post-wedding preservation',
      'Complimentary anniversary arrangement'
    ],
    popular: false
  }
]

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-b from-white via-cream-50 to-sage-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(232, 107, 107, 0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 80% 20%, rgba(162, 177, 162, 0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 40% 40%, rgba(226, 212, 193, 0.1) 0%, transparent 60%)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-script text-sage-800 mb-6"
            variants={itemVariants}
          >
            Choose Your Perfect Package
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-sage-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            From intimate arrangements to grand celebrations, we have the perfect floral solution for every occasion
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative group ${plan.popular ? 'lg:-mt-8' : ''}`}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setSelectedPlan(plan.id)}
              onHoverEnd={() => setSelectedPlan(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="bg-gradient-to-r from-roselle-500 to-blush-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </motion.div>
              )}

              {/* Card */}
              <div className={`relative h-full bg-white/90 backdrop-blur-sm border-2 ${
                plan.popular ? 'border-roselle-300' : 'border-white/60'
              } shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 ${
                selectedPlan === plan.id ? 'shadow-3xl' : ''
              }`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-5`} />
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 shadow-lg`}
                    animate={{
                      rotate: selectedPlan === plan.id ? [0, 5, -5, 0] : 0,
                      scale: selectedPlan === plan.id ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <plan.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Plan Name */}
                  <h3 className="text-2xl font-script text-sage-800 mb-2">
                    {plan.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sage-600 mb-6 leading-relaxed">
                    {plan.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-sage-800">
                        ${plan.price}
                      </span>
                      <span className="text-sage-600 ml-2">
                        {plan.period}
                      </span>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-roselle-400 to-blush-400 rounded-full flex items-center justify-center mt-0.5">
                          <Check size={12} className="text-white" />
                        </div>
                        <span className="text-sage-700 leading-relaxed">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <motion.button
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-roselle-500 to-blush-500 text-white shadow-lg hover:shadow-xl'
                        : 'bg-sage-100 text-sage-700 hover:bg-sage-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </div>
                
                {/* Hover Border Effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-3xl"
                  style={{
                    background: `linear-gradient(45deg, transparent 30%, rgba(232, 107, 107, 0.3) 50%, transparent 70%)`,
                    backgroundSize: '200% 200%'
                  }}
                  animate={{
                    backgroundPosition: selectedPlan === plan.id 
                      ? ['0% 0%', '100% 100%', '0% 0%']
                      : ['0% 0%']
                  }}
                  transition={{
                    duration: selectedPlan === plan.id ? 2 : 0,
                    repeat: selectedPlan === plan.id ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto shadow-lg border border-white/40">
            <h3 className="text-2xl font-script text-sage-800 mb-4">
              Need Something Custom?
            </h3>
            <p className="text-sage-600 mb-6 leading-relaxed">
              Every event is unique, and we're here to create something perfectly tailored to your vision. 
              Contact us for a personalized consultation and custom quote.
            </p>
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-sage-500 to-cream-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}