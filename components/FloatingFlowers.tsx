'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface Flower {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  color: string
  type: 'flower' | 'petal' | 'leaf'
  delay: number
  speed: number
}

export default function FloatingFlowers() {
  const [flowers, setFlowers] = useState<Flower[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 15, stiffness: 200 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        
        mouseX.set(x)
        mouseY.set(y)
        setMousePosition({ x, y })
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    // Generate diverse floating elements
    const newFlowers = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.8 + 0.4,
      rotation: Math.random() * 360,
      color: ['#e86b6b', '#f19a9a', '#a2b1a2', '#e2d4c1', '#b83a3a'][Math.floor(Math.random() * 5)],
      type: ['flower', 'petal', 'leaf'][Math.floor(Math.random() * 3)] as 'flower' | 'petal' | 'leaf',
      delay: i * 0.1,
      speed: Math.random() * 2 + 1
    }))
    
    setFlowers(newFlowers)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  // Advanced animation variants
  const flowerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0, 
      rotate: -180,
      y: 100
    },
    visible: (flower: Flower) => ({
      opacity: [0, 0.8, 0.6],
      scale: [0, flower.size * 1.2, flower.size],
      rotate: [flower.rotation, flower.rotation + 180, flower.rotation + 360],
      y: [100, 0, -20],
      transition: {
        delay: flower.delay,
        duration: 1.5 + flower.speed * 0.5,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 80
      }
    }),
    float: (flower: Flower) => ({
      y: [0, -30, 0],
      x: [0, (Math.random() - 0.5) * 20, 0],
      rotate: [flower.rotation, flower.rotation + 360],
      scale: [flower.size, flower.size * 1.1, flower.size],
      transition: {
        duration: 6 + flower.speed * 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: flower.delay
      }
    })
  }

  const renderFlower = (flower: Flower) => {
    switch (flower.type) {
      case 'flower':
        return (
          <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id={`flower-${flower.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={flower.color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={flower.color} stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path d="M30 10C35 15 40 20 30 30C20 20 25 15 30 10Z" fill={`url(#flower-${flower.id})`}/>
            <path d="M30 50C25 45 20 40 30 30C40 40 35 45 30 50Z" fill={`url(#flower-${flower.id})`}/>
            <path d="M10 30C15 25 20 20 30 30C20 40 15 35 10 30Z" fill={`url(#flower-${flower.id})`}/>
            <path d="M50 30C45 35 40 40 30 30C40 20 45 25 50 30Z" fill={`url(#flower-${flower.id})`}/>
            <circle cx="30" cy="30" r="8" fill={flower.color} opacity="0.8"/>
          </svg>
        )
      
      case 'petal':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id={`petal-${flower.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={flower.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={flower.color} stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path d="M12 2C13.5 4 15 6 12 12C9 6 10.5 4 12 2Z" fill={`url(#petal-${flower.id})`}/>
          </svg>
        )
      
      case 'leaf':
        return (
          <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id={`leaf-${flower.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={flower.color} stopOpacity="0.7" />
                <stop offset="100%" stopColor={flower.color} stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M16 4C20 8 24 12 16 16C8 12 12 8 16 4Z" fill={`url(#leaf-${flower.id})`}/>
            <path d="M16 28C12 24 8 20 16 16C24 20 20 24 16 28Z" fill={`url(#leaf-${flower.id})`}/>
          </svg>
        )
    }
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Interactive Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-roselle-200/10 via-transparent to-transparent"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isHovering ? 1 : 0.3, scale: isHovering ? 1.2 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Magnetic Attraction Effect */}
      <motion.div
        className="absolute w-40 h-40 pointer-events-none"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%"
        }}
      >
        <motion.div
          className="w-full h-full border-2 border-roselle-300/20 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-0 border border-roselle-200/10 rounded-full"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      {/* Interactive Floating Elements */}
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          className="absolute"
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            zIndex: flower.id,
            width: `${flower.size * 40}px`,
            height: `${flower.size * 40}px`
          }}
          variants={flowerVariants}
          initial="hidden"
          animate={["visible", "float"]}
          custom={flower}
          whileHover={{
            scale: flower.size * 1.5,
            rotate: flower.rotation + 720,
            transition: { duration: 0.8, ease: "easeOut" }
          }}
        >
          {renderFlower(flower)}
        </motion.div>
      ))}

      {/* Ambient Sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-yellow-300/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -60, 0],
            x: [0, (Math.random() - 0.5) * 40, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Interactive Ripple Waves */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute w-80 h-80 border border-roselle-300/15 rounded-full pointer-events-none"
          style={{
            left: springX,
            top: springY,
            x: "-50%",
            y: "-50%"
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{
            scale: [0, 1.5, 3],
            opacity: [0.6, 0.3, 0]
          }}
          transition={{
            duration: 4,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Floating Light Rays */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "conic-gradient(from 0deg, transparent 0deg, rgba(232, 107, 107, 0.05) 60deg, transparent 120deg)",
            "conic-gradient(from 120deg, transparent 0deg, rgba(162, 177, 162, 0.05) 60deg, transparent 120deg)",
            "conic-gradient(from 240deg, transparent 0deg, rgba(226, 212, 193, 0.05) 60deg, transparent 120deg)"
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Interactive Particle Trails */}
      {isHovering && Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`trail-${i}`}
          className="absolute w-1 h-1 bg-roselle-300/40 rounded-full"
          style={{
            left: mousePosition.x,
            top: mousePosition.y
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1
          }}
          animate={{
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            opacity: [1, 0.8, 0.6, 0.4, 0.2, 0],
            scale: [1, 0.8, 0.6, 0.4, 0.2, 0]
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}
