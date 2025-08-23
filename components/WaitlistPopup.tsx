'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X, CheckCircle, Heart, Sparkles } from 'lucide-react'

interface WaitlistFormData {
  firstName: string
  lastName: string
  phoneNumber: string
  ageGroup: string
  gender: string
  city: string
  interests: string[]
  interestLevel: string
  purchaseLikelihood: string
  factors: string[]
  motivators: string
  notifications: boolean
}

interface WaitlistPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistPopup({ isOpen, onClose }: WaitlistPopupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<WaitlistFormData>()

  const watchedInterests = watch('interests', [])
  const watchedFactors = watch('factors', [])

  const handleInterestToggle = (interest: string) => {
    const current = watchedInterests || []
    if (current.includes(interest)) {
      setValue('interests', current.filter(i => i !== interest))
    } else {
      setValue('interests', [...current, interest])
    }
  }

  const handleFactorToggle = (factor: string) => {
    const current = watchedFactors || []
    if (current.includes(factor)) {
      setValue('factors', current.filter(f => f !== factor))
    } else {
      setValue('factors', [...current, factor])
    }
  }

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Auto-close after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
    }, 3000)
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: -15,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  }

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -180 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          className="relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-cream-50 via-white to-sage-50 border border-white/60 shadow-2xl rounded-3xl overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <div className="relative p-8 border-b border-roselle-200/20 bg-gradient-to-r from-roselle-50/50 to-sage-50/50 rounded-t-3xl">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/80 text-sage-600 hover:text-roselle-600 hover:bg-white transition-all duration-300 shadow-lg"
            >
              <X size={20} />
            </button>
            
            <div className="text-center">
              <motion.div
                className="inline-block p-6 bg-gradient-to-br from-roselle-500 to-blush-500 rounded-2xl mb-6 shadow-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-4xl font-script text-sage-800 mb-3">
                Join Our Waitlist
              </h2>
              <p className="text-lg text-sage-600 leading-relaxed">
                Be the first to know when Roselle blooms into your world
              </p>
            </div>
          </div>

          {/* Success State */}
          {isSubmitted ? (
            <motion.div
              className="p-16 text-center bg-gradient-to-br from-roselle-50/50 to-sage-50/50 rounded-3xl"
              variants={successVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-roselle-500 to-sage-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut"
                }}
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              
              <h3 className="text-3xl font-script text-sage-800 mb-4">
                Welcome to the Roselle Family! 
              </h3>
              <p className="text-lg text-sage-600 mb-8 leading-relaxed">
                Thank you for joining our waitlist. We'll notify you the moment Roselle blooms into the world.
              </p>
              
              <motion.div
                className="inline-flex items-center space-x-3 bg-white/80 px-6 py-3 rounded-full text-roselle-600 shadow-lg"
                animate={{
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles size={24} />
                <span className="font-bold text-lg">You're officially on the list!</span>
              </motion.div>
            </motion.div>
          ) : (
            /* Form */
            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
              <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-roselle-500 focus:border-transparent bg-white/90 backdrop-blur-sm transition-all duration-300 hover:border-roselle-300"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-roselle-500/80 font-medium">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register('lastName')}
                    className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-roselle-500 focus:border-transparent bg-white/90 backdrop-blur-sm transition-all duration-300 hover:border-roselle-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phoneNumber', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[\+]?[1-9][\d]{0,15}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                  className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-roselle-500 focus:border-transparent bg-white/90 backdrop-blur-sm transition-all duration-300 hover:border-roselle-300"
                  placeholder="Enter your phone number"
                />
                                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-roselle-500/80 font-medium">{errors.phoneNumber.message}</p>
                  )}
              </div>

              {/* Demographics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Age Group *
                  </label>
                  <select
                    {...register('ageGroup', { required: 'Age group is required' })}
                    className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-roselle-500 focus:border-transparent bg-white/90 backdrop-blur-sm transition-all duration-300 hover:border-roselle-300"
                  >
                    <option value="">Please Select</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55+">55+</option>
                  </select>
                  {errors.ageGroup && (
                    <p className="mt-1 text-sm text-roselle-500/80 font-medium">{errors.ageGroup.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Gender *
                  </label>
                  <select
                    {...register('gender', { required: 'Gender is required' })}
                    className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-roselle-500 focus:border-transparent bg-white/90 backdrop-blur-sm transition-all duration-300 hover:border-roselle-300"
                  >
                    <option value="">Please Select</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-roselle-500/80 font-medium">{errors.gender.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    City/Area *
                  </label>
                  <input
                    type="text"
                    {...register('city', { required: 'City/Area is required' })}
                    className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-roselle-500 focus:border-transparent bg-white/90 backdrop-blur-sm transition-all duration-300 hover:border-roselle-300"
                    placeholder="Enter your city or area"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-roselle-500/80 font-medium">{errors.city.message}</p>
                  )}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-3">
                  Which of these categories interest you the most? (Select all that apply) *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Flowers', 'Wedding Decor', 'Personalized Mirror Design', 'Flowers Decor'].map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`p-4 text-sm border-2 rounded-xl transition-all duration-300 font-medium ${
                        watchedInterests?.includes(interest)
                          ? 'border-roselle-500 bg-roselle-50 text-roselle-700 shadow-lg scale-105'
                          : 'border-sage-200 bg-white/90 text-sage-600 hover:border-roselle-300 hover:bg-roselle-50/50 hover:scale-102'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                {errors.interests && (
                  <p className="mt-1 text-sm text-roselle-500/80 font-medium">Please select at least one interest</p>
                )}
              </div>

              {/* Interest Level */}
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-3">
                  How interested are you in products like these? *
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely'].map((level, index) => (
                    <label key={level} className="flex flex-col items-center">
                      <input
                        type="radio"
                        value={level}
                        {...register('interestLevel', { required: 'Please select your interest level' })}
                        className="sr-only"
                      />
                      <div className={`w-14 h-14 border-2 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        watch('interestLevel') === level
                          ? 'border-roselle-500 bg-roselle-500 text-white shadow-lg scale-110'
                          : 'border-sage-200 bg-white/90 text-sage-600 hover:border-roselle-300 hover:bg-roselle-50 hover:scale-105'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="mt-2 text-xs text-sage-600 text-center">{level}</span>
                    </label>
                  ))}
                </div>
                                  {errors.interestLevel && (
                    <p className="mt-1 text-sm text-roselle-500/80 font-medium">{errors.interestLevel.message}</p>
                  )}
              </div>

              {/* Purchase Likelihood */}
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-3">
                  If these products were available today, how likely are you to buy? *
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {['Very Unlikely', 'Unlikely', 'Maybe', 'Likely', 'Very Likely'].map((likelihood, index) => (
                    <label key={likelihood} className="flex flex-col items-center">
                      <input
                        type="radio"
                        value={likelihood}
                        {...register('purchaseLikelihood', { required: 'Please select your purchase likelihood' })}
                        className="sr-only"
                      />
                      <div className={`w-14 h-14 border-2 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        watch('purchaseLikelihood') === likelihood
                          ? 'border-roselle-500 bg-roselle-500 text-white shadow-lg scale-110'
                          : 'border-sage-200 bg-white/90 text-sage-600 hover:border-roselle-300 hover:bg-roselle-50 hover:scale-105'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="mt-2 text-xs text-sage-600 text-center">{likelihood}</span>
                    </label>
                  ))}
                </div>
                                  {errors.purchaseLikelihood && (
                    <p className="mt-1 text-sm text-roselle-500/80 font-medium">{errors.purchaseLikelihood.message}</p>
                  )}
              </div>

              {/* Factors */}
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-3">
                  What factors matter most to you when purchasing? (Select all that apply) *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Quality', 'Price', 'Design', 'Brand', 'Sustainability', 'Customer Service'].map((factor) => (
                    <button
                      key={factor}
                      type="button"
                      onClick={() => handleFactorToggle(factor)}
                      className={`p-4 text-sm border-2 rounded-xl transition-all duration-300 font-medium ${
                        watchedFactors?.includes(factor)
                          ? 'border-roselle-500 bg-roselle-50 text-roselle-700 shadow-lg scale-105'
                          : 'border-sage-200 bg-white/90 text-sage-600 hover:border-roselle-300 hover:bg-roselle-50/50 hover:scale-102'
                      }`}
                    >
                      {factor}
                    </button>
                  ))}
                </div>
                {errors.factors && (
                  <p className="mt-1 text-sm text-roselle-500/80 font-medium">Please select at least one factor</p>
                )}
              </div>

              {/* Motivators */}
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  What would make you more likely to buy these products? *
                </label>
                <textarea
                  {...register('motivators', { required: 'Please tell us what would motivate you' })}
                  rows={4}
                  className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-roselle-500 focus:border-transparent bg-white/90 backdrop-blur-sm transition-all duration-300 hover:border-roselle-300 resize-none"
                  placeholder="Tell us what would motivate you to purchase..."
                />
                {errors.motivators && (
                  <p className="mt-1 text-sm text-roselle-500/80 font-medium">{errors.motivators.message}</p>
                )}
              </div>

              {/* Notifications */}
              <div className="flex items-center space-x-4 p-4 bg-sage-50/50 rounded-xl border border-sage-200/50">
                <input
                  type="checkbox"
                  id="notifications"
                  {...register('notifications')}
                  className="w-6 h-6 text-roselle-600 border-sage-300 rounded-lg focus:ring-roselle-500 focus:ring-2"
                />
                <label htmlFor="notifications" className="text-base text-sage-700 font-medium cursor-pointer">
                  Yes, notify me when Roselle launches! I want to be the first to know.
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-gradient-to-r from-roselle-600 via-roselle-500 to-blush-500 text-white font-bold text-lg tracking-wide rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(232, 107, 107, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <motion.div
                    className="flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
                  </motion.div>
                ) : (
                  'Join the Roselle Family '
                )}
              </motion.button>
            </form>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
