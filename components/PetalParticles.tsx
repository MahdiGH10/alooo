'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Petal {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
  delay: number
}

export default function PetalParticles() {
  const [petals, setPetals] = useState<Petal[]>([])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 300 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    // Generate petals with realistic physics
    const newPetals = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      color: ['#e86b6b', '#f19a9a', '#b83a3a', '#d94a4a'][Math.floor(Math.random() * 4)],
      delay: i * 0.05
    }))
    
    setPetals(newPetals)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-roselle-200/20 via-transparent to-transparent"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Interactive petal particles */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute w-4 h-4"
          style={{
            left: petal.x,
            top: petal.y,
            zIndex: petal.id
          }}
          initial={{
            opacity: 0,
            scale: 0,
            rotate: petal.rotation,
            x: 0,
            y: 0
          }}
          animate={{
            opacity: [0, 1, 0.8, 0],
            scale: [0, petal.scale * 1.2, petal.scale, 0],
            rotate: [petal.rotation, petal.rotation + 180, petal.rotation + 360],
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200]
          }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            delay: petal.delay,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: Math.random() * 1.5
          }}
          whileHover={{
            scale: petal.scale * 2,
            rotate: petal.rotation + 720,
            transition: { duration: 0.5 }
          }}
        >
          {/* Petal shape with gradient */}
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id={`gradient-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={petal.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={petal.color} stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M12 2C13.5 4 15 6 12 12C9 6 10.5 4 12 2Z"
              fill={`url(#gradient-${petal.id})`}
              className="drop-shadow-lg"
            />
          </svg>
        </motion.div>
      ))}

      {/* Magnetic attraction effect */}
      <motion.div
        className="absolute w-32 h-32 pointer-events-none"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%"
        }}
      >
        <motion.div
          className="w-full h-full border-2 border-roselle-300/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-0 border border-roselle-200/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </motion.div>

      {/* Floating sparkles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: i * 0.1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Ripple waves */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute w-64 h-64 border border-roselle-300/20 rounded-full pointer-events-none"
          style={{
            left: springX,
            top: springY,
            x: "-50%",
            y: "-50%"
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{
            scale: [0, 2, 4],
            opacity: [0.8, 0.4, 0]
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}
