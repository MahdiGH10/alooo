'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Instagram, Twitter, Facebook, Heart, Sparkles, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  
  const footerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  const socialLinks = [
    { icon: Instagram, name: 'Instagram', href: '#', color: 'from-pink-400 to-purple-500' },
    { icon: Twitter, name: 'Twitter', href: '#', color: 'from-blue-400 to-cyan-500' },
    { icon: Facebook, name: 'Facebook', href: '#', color: 'from-blue-500 to-indigo-600' },
    { icon: Heart, name: 'Newsletter', href: '#', color: 'from-red-400 to-pink-500' }
  ]

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Collections', href: '#collections' },
    { name: 'Contact', href: '#contact' },
    { name: 'Privacy Policy', href: '#privacy' }
  ]

  // Advanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      rotateX: 45,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100
      }
    }
  }

  const socialVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: (i: number) => ({
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.2,
      rotate: 360,
      y: -10,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-b from-sage-50 via-white to-cream-50 overflow-hidden">
      {/* Dynamic Background with 3D Depth */}
      <div className="absolute inset-0">
        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 30% 70%, rgba(162, 177, 162, 0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 70% 30%, rgba(232, 107, 107, 0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 50% 50%, rgba(226, 212, 193, 0.1) 0%, transparent 60%)"
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating geometric elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border border-sage-200/10 rounded-full"
          style={{ y }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 border border-roselle-200/10 rounded-full"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 60]) }}
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Interactive Background Flowers */}
      <div className="absolute inset-0 opacity-15">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute text-${i % 3 === 0 ? 'sage' : i % 3 === 1 ? 'blush' : 'cream'}-300/40`}
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`,
              zIndex: i
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          >
            <svg width={40 + i * 5} height={40 + i * 5} viewBox="0 0 60 60" fill="none">
              <path d="M30 10C35 15 40 20 30 30C20 20 25 15 30 10Z" fill="currentColor"/>
              <path d="M30 50C25 45 20 40 30 30C40 40 35 45 30 50Z" fill="currentColor"/>
              <path d="M10 30C15 25 20 20 30 30C20 40 15 35 10 30Z" fill="currentColor"/>
              <path d="M50 30C45 35 40 40 30 30C40 20 45 25 50 30Z" fill="currentColor"/>
              <circle cx="30" cy="30" r="8" fill="currentColor"/>
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Main Footer Content */}
        <motion.div
          className="grid lg:grid-cols-4 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Logo Section */}
          <motion.div
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <motion.div
              className="mb-6"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <div className="inline-block p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-white/20">
                <div className="text-center">
                  <div className="text-cream-600 text-sm font-medium mb-2 tracking-widest">R & R</div>
                  <h3 className="text-4xl font-script text-sage-800 mb-2">
                    Roselle
                  </h3>
                  <div className="text-sm text-sage-700 font-medium">
                    BLOOMING YOUR WORLD WITH LOVE
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.p
              className="text-lg text-sage-600 leading-relaxed max-w-md"
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${useTransform(scrollYProgress, [0, 1], [0, 5])})`
              }}
            >
              Where love, beauty, and nature meet—crafted to bring elegance into your everyday world.
            </motion.p>
            
            {/* Contact Info */}
            <motion.div
              className="mt-8 space-y-4"
              variants={itemVariants}
            >
              <motion.div
                className="flex items-center space-x-3 text-sage-600"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Mail size={20} className="text-roselle-400" />
                <span>hello@roselle.com</span>
              </motion.div>
              
              <motion.div
                className="flex items-center space-x-3 text-sage-600"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Phone size={20} className="text-roselle-400" />
                <span>+1 (555) 123-4567</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateY(${useTransform(scrollYProgress, [0, 1], [0, -5])})`
            }}
          >
            <h4 className="text-xl font-script text-sage-800 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href={link.href}
                    className="text-sage-600 hover:text-roselle-500 transition-colors duration-300 relative group"
                    onHoverStart={() => setHoveredLink(link.name)}
                    onHoverEnd={() => setHoveredLink(null)}
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                    
                    {/* Animated underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-roselle-400 to-blush-400"
                      animate={{
                        width: hoveredLink === link.name ? "100%" : "0%"
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateY(${useTransform(scrollYProgress, [0, 1], [0, 5])})`
            }}
          >
            <h4 className="text-xl font-script text-sage-800 mb-6">Follow Us</h4>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  variants={socialVariants}
                  custom={index}
                  whileHover="hover"
                  onHoverStart={() => setHoveredSocial(social.name)}
                  onHoverEnd={() => setHoveredSocial(null)}
                >
                  <motion.a
                    href={social.href}
                    className={`block p-4 bg-gradient-to-br ${social.color} rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                    whileHover={{
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ scale: 0, rotate: 45 }}
                      animate={{
                        scale: hoveredSocial === social.name ? 1 : 0,
                        rotate: hoveredSocial === social.name ? 0 : 45
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    
                    {/* Icon */}
                    <motion.div
                      className="relative z-10 flex items-center justify-center"
                      animate={{
                        rotate: hoveredSocial === social.name ? 360 : 0
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <social.icon size={24} />
                    </motion.div>
                    
                    {/* Floating particles on hover */}
                    {hoveredSocial === social.name && (
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            initial={{
                              x: "50%",
                              y: "50%",
                              opacity: 0,
                              scale: 0
                            }}
                            animate={{
                              x: `${20 + (i * 20)}%`,
                              y: `${30 + (i * 15)}%`,
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
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Floral Divider */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
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
            <div className="w-32 h-px bg-gradient-to-r from-transparent to-sage-300" />
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-roselle-400 to-blush-500 rounded-full flex items-center justify-center"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-white"
                animate={{
                  rotate: [0, -360],
                  scale: [1, 0.8, 1]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path d="M16 4C18 8 20 12 16 16C12 12 14 8 16 4Z" fill="currentColor"/>
                <path d="M16 28C14 24 12 20 16 16C20 20 18 24 16 28Z" fill="currentColor"/>
                <path d="M4 16C8 14 12 12 16 16C12 20 8 18 4 16Z" fill="currentColor"/>
                <path d="M28 16C24 18 20 20 16 16C20 12 24 14 28 16Z" fill="currentColor"/>
                <circle cx="16" cy="16" r="4" fill="currentColor"/>
              </motion.svg>
            </motion.div>
            <div className="w-32 h-px bg-gradient-to-l from-transparent to-sage-300" />
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Copyright */}
          <motion.div
            className="mb-6"
            variants={itemVariants}
          >
            <motion.p
              className="text-sage-600"
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${useTransform(scrollYProgress, [0, 1], [0, 3])})`
              }}
            >
              © 2024 Roselle. All rights reserved.
            </motion.p>
          </motion.div>

          {/* Made with Love */}
          <motion.div
            className="flex items-center justify-center space-x-2 text-sage-500"
            variants={itemVariants}
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span>Made with</span>
            <motion.div
              className="text-roselle-400"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart size={16} fill="currentColor" />
            </motion.div>
            <span>and</span>
            <motion.div
              className="text-blush-400"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -15, 15, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Sparkles size={16} />
            </motion.div>
            <span>by Roselle</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
