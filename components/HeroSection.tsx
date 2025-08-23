'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import PetalParticles from './PetalParticles'
import WaitlistPopup from './WaitlistPopup'

export default function HeroSection() {
  const [showParticles, setShowParticles] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])

  // Premium animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const handleCTAClick = () => {
    setShowParticles(true)
    setShowPopup(true)
    setTimeout(() => setShowParticles(false), 3000)
  }

  return (
    <>
      <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream-50 via-white to-sage-50">
        {/* Rich Background with Roselle Theme */}
        <div className="absolute inset-0">
          {/* Main gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-white to-sage-100" />
          
          {/* Sophisticated pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(232, 107, 107, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(162, 177, 162, 0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '80px 80px'
               }}
          />
          
          {/* Roselle theme gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-roselle-50/30 via-transparent to-sage-50/30" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/40 to-white/90" />
          
          {/* Elegant floating elements with Roselle colors */}
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 border border-roselle-200/20"
            style={{ y }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="absolute bottom-20 right-20 w-64 h-64 border border-sage-200/20"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
            animate={{
              rotate: [360, 0],
              scale: [1, 0.95, 1]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Additional decorative elements */}
          <motion.div
            className="absolute top-1/3 right-1/4 w-32 h-32 border border-blush-200/15"
            animate={{
              rotate: [0, -360],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-cream-300/20"
            animate={{
              rotate: [360, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Main Content with Premium Design */}
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Elegant Logo Section */}
            <motion.div
              className="mb-16"
              variants={itemVariants}
            >
              <motion.div
                className="inline-block p-16 bg-white/90 backdrop-blur-xl shadow-2xl border border-white/50"
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)"
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
              >
                <div className="text-center">
                  <div className="text-roselle-600 text-lg font-light tracking-[0.3em] mb-4 uppercase">
                    R & R
                  </div>
                  <h1 className="text-8xl md:text-9xl font-script text-sage-800 mb-6 leading-none tracking-tight">
                    Roselle
                  </h1>
                  <div className="text-xl md:text-2xl text-sage-600 font-light tracking-wide uppercase">
                    Blooming Your World With Love
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Sophisticated Subheadline */}
            <motion.div
              className="mb-20 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              <motion.p
                className="text-2xl md:text-3xl text-sage-600 leading-relaxed font-light"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `perspective(1000px) rotateX(${useTransform(scrollYProgress, [0, 1], [0, 5])})`
                }}
              >
                Roselle is where love, beauty, and nature meet—crafted to bring elegance into your everyday world.
              </motion.p>
            </motion.div>

            {/* Premium CTA Button */}
            <motion.div
              variants={itemVariants}
            >
              <motion.button
                onClick={handleCTAClick}
                className="group relative px-20 py-6 bg-gradient-to-r from-roselle-600 via-roselle-500 to-blush-500 text-white font-light text-xl tracking-wide uppercase overflow-hidden"
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)"
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    "0 10px 30px rgba(232, 107, 107, 0.2)",
                    "0 15px 40px rgba(232, 107, 107, 0.3)",
                    "0 10px 30px rgba(232, 107, 107, 0.2)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Sophisticated hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blush-600 via-roselle-600 to-sage-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-4">Join Waitlist</span>
                  <motion.div
                    className="w-4 h-4 border-r-2 border-t-2 border-white transform rotate-45"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </span>
              </motion.button>
            </motion.div>

            {/* Petal Particles */}
            {showParticles && <PetalParticles />}
          </motion.div>
        </div>

        {/* Sophisticated Corner Elements with Roselle colors */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-roselle-300/40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />
        
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 border-r-2 border-t-2 border-sage-300/40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        />
        
        <motion.div
          className="absolute bottom-10 left-10 w-32 h-32 border-l-2 border-b-2 border-blush-300/40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        />
        
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-cream-400/40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        />

        {/* Elegant Divider Line */}
        <motion.div
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-sage-300 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
        />
      </section>

      {/* Waitlist Popup */}
      <WaitlistPopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
      />
    </>
  )
}
