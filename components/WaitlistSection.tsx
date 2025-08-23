'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Heart, Sparkles, CheckCircle, ArrowRight } from 'lucide-react'

interface FormData {
  name: string
  email: string
}

export default function WaitlistSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hoveredInput, setHoveredInput] = useState<string | null>(null)
  const [particleCount, setParticleCount] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  // Advanced animation variants
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
      y: 50, 
      rotateX: 45,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100
      }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 80
      }
    },
    success: {
      scale: [1, 1.05, 1],
      rotateY: [0, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  // Particle system for background
  useEffect(() => {
    const interval = setInterval(() => {
      setParticleCount(prev => (prev + 1) % 20)
    }, 200)
    return () => clearInterval(interval)
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSuccess(true)
    setIsSubmitting(false)
    reset()
    
    // Reset success state after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-b from-cream-50 via-white to-roselle-50 overflow-hidden">
      {/* Dynamic Background with 3D Depth */}
      <div className="absolute inset-0">
        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(232, 107, 107, 0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 80% 20%, rgba(162, 177, 162, 0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 40% 40%, rgba(226, 212, 193, 0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 60% 60%, rgba(232, 107, 107, 0.1) 0%, transparent 60%)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating geometric elements */}
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 border border-roselle-200/10 rounded-full"
          style={{ y }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 border border-sage-200/10 rounded-full"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Interactive Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-roselle-300/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 50, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header with 3D Effect */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-script text-sage-800 mb-8 leading-none"
            variants={itemVariants}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateX(${useTransform(scrollYProgress, [0, 1], [0, 10])})`
            }}
          >
            Be the First to Bloom with Us
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-sage-600 max-w-3xl mx-auto leading-relaxed mb-8"
            variants={itemVariants}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateX(${useTransform(scrollYProgress, [0, 1], [0, 5])})`
            }}
          >
            Join our exclusive waitlist and be among the first to experience the magic of Roselle. 
            Get early access to our latest collections and special offers.
          </motion.p>
          
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-roselle-400 via-blush-400 to-cream-400 mx-auto rounded-full"
            variants={itemVariants}
            style={{
              transform: `scaleX(${scale})`,
              opacity
            }}
          />
        </motion.div>

        {/* Interactive Form Container */}
        <motion.div
          className="max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className={`relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 overflow-hidden ${
              isSuccess ? 'ring-4 ring-green-400/50' : ''
            }`}
            variants={formVariants}
            animate={isSuccess ? "success" : "visible"}
            style={{
              transformStyle: "preserve-3d"
            }}
          >
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                background: [
                  "conic-gradient(from 0deg, #e86b6b 0deg, transparent 60deg)",
                  "conic-gradient(from 120deg, #a2b1a2 0deg, transparent 60deg)",
                  "conic-gradient(from 240deg, #f19a9a 0deg, transparent 60deg)"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Floating Decorative Elements */}
            <motion.div
              className="absolute top-8 right-8 text-roselle-300/60"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart size={32} />
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-8 text-blush-300/60"
              animate={{
                rotate: [360, 0],
                scale: [1, 0.8, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles size={28} />
            </motion.div>

            {/* Success State */}
            {isSuccess ? (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <CheckCircle size={40} className="text-white" />
                </motion.div>
                
                <h3 className="text-3xl font-script text-sage-800 mb-4">
                  Welcome to Roselle! 🌸
                </h3>
                
                <p className="text-lg text-sage-600 mb-6">
                  Thank you for joining our waitlist. We'll notify you as soon as we launch!
                </p>
                
                <motion.button
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 bg-gradient-to-r from-roselle-500 to-blush-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Another Email
                </motion.button>
              </motion.div>
            ) : (
              /* Form Content */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <motion.div
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <label className="block text-lg font-medium text-sage-700">
                    Your Name
                  </label>
                  
                  <motion.div
                    className="relative"
                    onHoverStart={() => setHoveredInput('name')}
                    onHoverEnd={() => setHoveredInput(null)}
                  >
                    <motion.input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className={`w-full px-6 py-4 text-lg border-2 rounded-2xl transition-all duration-300 ${
                        hoveredInput === 'name' 
                          ? 'border-roselle-400 shadow-lg shadow-roselle-200/50' 
                          : 'border-sage-200'
                      } focus:border-roselle-500 focus:shadow-xl focus:shadow-roselle-200/50 focus:outline-none`}
                      placeholder="Enter your beautiful name"
                      whileFocus={{ scale: 1.02 }}
                    />
                    
                    {/* Animated border glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-transparent"
                      style={{
                        background: "linear-gradient(45deg, transparent 0%, #e86b6b 50%, transparent 100%)",
                        backgroundSize: "200% 200%"
                      }}
                      animate={{
                        backgroundPosition: hoveredInput === 'name' 
                          ? ["0% 0%", "100% 100%", "0% 0%"]
                          : ["0% 0%"]
                      }}
                      transition={{
                        duration: hoveredInput === 'name' ? 2 : 0,
                        repeat: hoveredInput === 'name' ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Floating particles around input */}
                    {hoveredInput === 'name' && (
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-roselle-400 rounded-full"
                            initial={{
                              x: "50%",
                              y: "50%",
                              opacity: 0,
                              scale: 0
                            }}
                            animate={{
                              x: `${20 + (i * 15)}%`,
                              y: `${30 + (i * 10)}%`,
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.1,
                              ease: "easeOut"
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                  
                  {errors.name && (
                    <motion.p
                      className="text-red-500 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <label className="block text-lg font-medium text-sage-700">
                    Email Address
                  </label>
                  
                  <motion.div
                    className="relative"
                    onHoverStart={() => setHoveredInput('email')}
                    onHoverEnd={() => setHoveredInput(null)}
                  >
                    <motion.input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className={`w-full px-6 py-4 text-lg border-2 rounded-2xl transition-all duration-300 ${
                        hoveredInput === 'email' 
                          ? 'border-roselle-400 shadow-lg shadow-roselle-200/50' 
                          : 'border-sage-200'
                      } focus:border-roselle-500 focus:shadow-xl focus:shadow-roselle-200/50 focus:outline-none`}
                      placeholder="your.email@example.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                    
                    {/* Animated border glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-transparent"
                      style={{
                        background: "linear-gradient(45deg, transparent 0%, #e86b6b 50%, transparent 100%)",
                        backgroundSize: "200% 200%"
                      }}
                      animate={{
                        backgroundPosition: hoveredInput === 'email' 
                          ? ["0% 0%", "100% 100%", "0% 0%"]
                          : ["0% 0%"]
                      }}
                      transition={{
                        duration: hoveredInput === 'email' ? 2 : 0,
                        repeat: hoveredInput === 'email' ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                  
                  {errors.email && (
                    <motion.p
                      className="text-red-500 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  variants={itemVariants}
                  className="pt-4"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full px-8 py-5 bg-gradient-to-r from-roselle-500 via-roselle-600 to-blush-500 text-white font-semibold text-xl rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-2xl'
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-roselle-600 via-blush-600 to-roselle-700"
                      initial={{ x: "-100%" }}
                      animate={{ x: isSubmitting ? "0%" : "-100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    
                    {/* Button content */}
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Joining Waitlist...
                        </>
                      ) : (
                        <>
                          Join Waitlist
                          <motion.span
                            className="ml-3"
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <ArrowRight size={20} />
                          </motion.span>
                        </>
                      )}
                    </span>
                    
                    {/* Glowing border */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-roselle-400 via-blush-400 to-cream-400 p-0.5"
                      animate={{
                        boxShadow: isSubmitting 
                          ? "0 0 30px rgba(232, 107, 107, 0.8)"
                          : "0 0 20px rgba(232, 107, 107, 0.4)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  variants={itemVariants}
                  className="text-center pt-6"
                >
                  <p className="text-sm text-sage-500">
                    🔒 We respect your privacy • ✨ No spam, ever • 🌸 Join 10,000+ others
                  </p>
                </motion.div>
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* Bottom Interactive Element */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-8 text-sage-400"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-sage-300" />
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-roselle-400 to-blush-500 rounded-full flex items-center justify-center"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
                animate={{
                  rotate: [0, -360],
                  scale: [1, 0.8, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path d="M12 3C14 6 16 9 12 12C8 9 10 6 12 3Z" fill="currentColor"/>
                <path d="M12 21C10 18 8 15 12 12C16 15 14 18 12 21Z" fill="currentColor"/>
                <path d="M3 12C6 10 9 8 12 12C8 16 10 14 3 12Z" fill="currentColor"/>
                <path d="M21 12C18 14 15 16 12 12C16 8 14 10 21 12Z" fill="currentColor"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
              </motion.svg>
            </motion.div>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-sage-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
