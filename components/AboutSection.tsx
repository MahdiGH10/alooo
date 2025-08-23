'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [hoveredFlower, setHoveredFlower] = useState<number | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

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

  const flowerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0, 
      rotate: -180,
      y: 100
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 1.2,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 80
      }
    }),
    hover: {
      scale: 1.3,
      rotate: 360,
      y: -20,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-b from-white via-cream-50 to-sage-50 overflow-hidden">
      {/* Dynamic Background with 3D Depth */}
      <div className="absolute inset-0">
        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(232, 107, 107, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(162, 177, 162, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(226, 212, 193, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 60%, rgba(232, 107, 107, 0.1) 0%, transparent 50%)"
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
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Interactive Background Flowers */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute text-${i % 3 === 0 ? 'sage' : i % 3 === 1 ? 'blush' : 'cream'}-300/40`}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i * 8)}%`,
              zIndex: i
            }}
            variants={flowerVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            custom={i}
            onHoverStart={() => setHoveredFlower(i)}
            onHoverEnd={() => setHoveredFlower(null)}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.svg
              width={50 + i * 8}
              height={50 + i * 8}
              viewBox="0 0 80 80"
              fill="none"
              style={{
                filter: `blur(${i * 0.3}px)`,
                transform: hoveredFlower === i ? "scale(1.5)" : "scale(1)"
              }}
            >
              <path d="M40 10C48 20 56 30 40 40C24 30 32 20 40 10Z" fill="currentColor"/>
              <path d="M40 70C32 60 24 50 40 40C56 50 48 60 40 70Z" fill="currentColor"/>
              <path d="M10 40C20 32 30 24 40 40C24 56 32 48 10 40Z" fill="currentColor"/>
              <path d="M70 40C60 48 50 56 40 40C56 24 48 32 70 40Z" fill="currentColor"/>
              <circle cx="40" cy="40" r="12" fill="currentColor"/>
            </motion.svg>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
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
              transform: `perspective(1000px) rotateX(${useTransform(scrollYProgress, [0, 1], [0, 15])})`
            }}
          >
            About Roselle
          </motion.h2>
          
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-roselle-400 via-blush-400 to-cream-400 mx-auto rounded-full"
            variants={itemVariants}
            style={{
              transform: `scaleX(${scale})`,
              opacity
            }}
          />
        </motion.div>

        {/* Content Grid with Advanced Animations */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Story Content with Staggered Reveal */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p
              className="text-2xl md:text-3xl text-sage-700 leading-relaxed font-medium"
              variants={itemVariants}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateY(${useTransform(scrollYProgress, [0, 1], [0, -10])})`
              }}
            >
              Roselle is where love, beauty, and nature meet—crafted to bring elegance into your everyday world.
            </motion.p>
            
            <motion.p
              className="text-lg md:text-xl text-sage-600 leading-relaxed"
              variants={itemVariants}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateY(${useTransform(scrollYProgress, [0, 1], [0, -5])})`
              }}
            >
              We believe that luxury isn't about extravagance, but about the thoughtful details that make life more beautiful. 
              Every piece we create is infused with the delicate balance of nature's grace and human artistry.
            </motion.p>
            
            <motion.p
              className="text-lg md:text-xl text-sage-600 leading-relaxed"
              variants={itemVariants}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateY(${useTransform(scrollYProgress, [0, 1], [0, -3])})`
              }}
            >
              From our carefully selected materials to our timeless designs, Roselle represents the perfect harmony 
              between modern sophistication and natural elegance.
            </motion.p>
          </motion.div>

          {/* Interactive 3D Flower Garden */}
          <motion.div
            className="relative h-[500px] flex items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Central 3D Flower with Parallax */}
            <motion.div
              className="absolute text-roselle-400 z-20"
              style={{ y }}
              variants={itemVariants}
              whileHover={{
                scale: 1.2,
                rotateY: 180,
                transition: { duration: 0.8, ease: "easeOut" }
              }}
            >
              <motion.svg
                width="140"
                height="140"
                viewBox="0 0 120 120"
                fill="none"
                style={{
                  filter: "drop-shadow(0 20px 40px rgba(232, 107, 107, 0.3))",
                  transformStyle: "preserve-3d"
                }}
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 10, 0]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <path d="M60 15C72 30 84 45 60 60C36 45 48 30 60 15Z" fill="currentColor" opacity="0.9"/>
                <path d="M60 105C48 90 36 75 60 60C84 75 72 90 60 105Z" fill="currentColor" opacity="0.9"/>
                <path d="M15 60C30 48 45 36 60 60C36 84 48 72 15 60Z" fill="currentColor" opacity="0.9"/>
                <path d="M105 60C90 72 75 84 60 60C84 36 72 48 105 60Z" fill="currentColor" opacity="0.9"/>
                <circle cx="60" cy="60" r="20" fill="currentColor" opacity="1"/>
              </motion.svg>
            </motion.div>

            {/* Orbiting Flowers with Physics */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-sage-300"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 60}deg) translateY(-120px)`,
                  zIndex: 10 + i
                }}
                variants={flowerVariants}
                custom={i}
                whileHover={{
                  scale: 1.5,
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
              >
                <motion.svg
                  width="50"
                  height="50"
                  viewBox="0 0 60 60"
                  fill="none"
                  style={{
                    filter: "drop-shadow(0 10px 20px rgba(162, 177, 162, 0.3))"
                  }}
                  animate={{
                    rotate: [0, 360],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                >
                  <path d="M30 8C38 16 46 24 30 30C14 24 22 16 30 8Z" fill="currentColor"/>
                  <path d="M30 52C22 44 14 36 30 30C46 36 38 44 30 52Z" fill="currentColor"/>
                  <path d="M8 30C16 22 24 14 30 30C14 46 22 38 8 30Z" fill="currentColor"/>
                  <path d="M52 30C44 38 36 46 30 30C46 14 38 22 52 30Z" fill="currentColor"/>
                  <circle cx="30" cy="30" r="8" fill="currentColor"/>
                </motion.svg>
              </motion.div>
            ))}

            {/* Floating Petals with 3D Rotation */}
            <motion.div
              className="absolute inset-0"
              style={{ rotate }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 text-cream-400"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 30}deg) translateY(-100px)`,
                    zIndex: 5 + i
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                >
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M8 2C9 4 10 6 8 8C6 6 7 4 8 2Z" fill="currentColor"/>
                  </svg>
                </motion.div>
              ))}
            </motion.div>

            {/* Interactive Light Rays */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: [
                  "conic-gradient(from 0deg, transparent 0deg, rgba(232, 107, 107, 0.1) 60deg, transparent 120deg)",
                  "conic-gradient(from 120deg, transparent 0deg, rgba(162, 177, 162, 0.1) 60deg, transparent 120deg)",
                  "conic-gradient(from 240deg, transparent 0deg, rgba(226, 212, 193, 0.1) 60deg, transparent 120deg)"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        {/* Bottom Decorative Element with Scroll Animation */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-6 text-sage-400"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-sage-300" />
            <motion.svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <path d="M24 6C28 12 32 18 24 24C16 18 20 12 24 6Z" fill="currentColor"/>
              <path d="M24 42C20 36 16 30 24 24C32 30 28 36 24 42Z" fill="currentColor"/>
              <path d="M6 24C12 20 18 16 24 24C16 32 20 28 6 24Z" fill="currentColor"/>
              <path d="M42 24C36 28 30 32 24 24C32 16 28 20 42 24Z" fill="currentColor"/>
              <circle cx="24" cy="24" r="6" fill="currentColor"/>
            </motion.svg>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-sage-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
