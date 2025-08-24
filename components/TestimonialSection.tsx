'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Wedding Planner",
    location: "San Francisco, CA",
    rating: 5,
    text: "Roselle transformed our wedding venue into a magical garden. The attention to detail and artistic vision exceeded all expectations. Every guest was mesmerized by the floral arrangements.",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Interior Designer",
    location: "New York, NY",
    text: "Working with Roselle has elevated my design projects to a new level. Their personalized mirror designs are absolutely stunning and add such elegance to any space.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Bride",
    location: "Austin, TX",
    text: "My wedding flowers from Roselle were beyond my wildest dreams. They captured the romantic, ethereal vision I had perfectly. I still get compliments on the photos!",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5
  },
  {
    id: 4,
    name: "David Park",
    role: "Event Coordinator",
    location: "Los Angeles, CA",
    text: "Roselle's floral decor transformed our corporate event into an unforgettable experience. Professional, creative, and absolutely beautiful work.",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5
  }
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

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

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-b from-sage-50 via-white to-cream-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
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
            What Our Clients Say
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-sage-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Discover why couples and designers choose Roselle for their most special moments
          </motion.p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 overflow-hidden">
            {/* Quote Icon */}
            <motion.div
              className="absolute top-8 left-8 text-roselle-300/60"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Quote size={48} />
            </motion.div>

            {/* Testimonial Content */}
            <motion.div
              key={currentIndex}
              className="text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <Star size={24} className="text-yellow-400 fill-current mx-1" />
                  </motion.div>
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-sage-700 leading-relaxed mb-8 font-light italic">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4">
                <motion.img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-roselle-200"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-sage-800">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sage-600">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-sm text-sage-500">
                    {testimonials[currentIndex].location}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12">
              <motion.button
                onClick={prevTestimonial}
                className="p-4 bg-roselle-100 hover:bg-roselle-200 rounded-full text-roselle-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-roselle-500 scale-125'
                        : 'bg-sage-300 hover:bg-sage-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextTestimonial}
                className="p-4 bg-roselle-100 hover:bg-roselle-200 rounded-full text-roselle-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-roselle-600 mb-2">500+</div>
              <div className="text-sage-600">Happy Couples</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-roselle-600 mb-2">50+</div>
              <div className="text-sage-600">Design Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-roselle-600 mb-2">1000+</div>
              <div className="text-sage-600">Floral Arrangements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-roselle-600 mb-2">5★</div>
              <div className="text-sage-600">Average Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}