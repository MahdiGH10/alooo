'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, Crown, Sparkles, Palette } from 'lucide-react'
import { useRef } from 'react'

const features = [
  {
    icon: Heart,
    title: "Crafted with Love",
    description: "Every piece is infused with passion and care, ensuring the highest quality and attention to detail.",
    gradient: "from-roselle-500 to-blush-500",
    bgGradient: "from-roselle-50 to-blush-50"
  },
  {
    icon: Crown,
    title: "Luxury Design",
    description: "Premium materials and timeless aesthetics that elevate your everyday experiences to extraordinary moments.",
    gradient: "from-sage-500 to-cream-500",
    bgGradient: "from-sage-50 to-cream-50"
  },
  {
    icon: Sparkles,
    title: "Timeless Beauty",
    description: "Classic elegance that never goes out of style, designed to be cherished for generations to come.",
    gradient: "from-blush-500 to-roselle-500",
    bgGradient: "from-blush-50 to-roselle-50"
  },
  {
    icon: Palette,
    title: "Elegant Simplicity",
    description: "Minimalist sophistication that speaks volumes through thoughtful design and refined craftsmanship.",
    gradient: "from-cream-500 to-sage-500",
    bgGradient: "from-cream-50 to-sage-50"
  }
]

export default function FeaturesSection() {
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
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
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

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-br from-white via-cream-50 to-sage-50 overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(232, 107, 107, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(162, 177, 162, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '60px 60px'
             }}
        />
        
        {/* Roselle theme overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-roselle-50/20 via-transparent to-sage-50/20" />
        
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 border border-roselle-200/10"
          style={{ y }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 border border-sage-200/10"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 60]) }}
          animate={{
            rotate: [360, 0],
            scale: [1, 0.95, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-script text-sage-800 mb-6"
            variants={itemVariants}
          >
            What Makes Us Special
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-sage-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Discover the unique qualities that set Roselle apart and make every experience extraordinary.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Feature Card */}
              <div className="relative h-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-xl rounded-none overflow-hidden">
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-20`} />
                
                {/* Content */}
                <div className="relative p-8 h-full flex flex-col items-center text-center">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                    variants={iconVariants}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-sage-800 mb-4 tracking-wide">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sage-600 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover Border Effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent"
                  style={{
                    background: `linear-gradient(45deg, transparent 30%, rgba(232, 107, 107, 0.3) 50%, transparent 70%)`,
                    backgroundSize: '200% 200%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="inline-block p-6 bg-white/60 backdrop-blur-sm border border-white/40">
            <motion.div
              className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-roselle-500 to-sage-500 rounded-full flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-6 h-6 text-white" />
            </motion.div>
            <p className="text-sage-600 font-light tracking-wide">
              Crafted with passion, delivered with love
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
