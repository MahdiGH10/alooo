'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'text-roselle-500' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} ${color}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path
            d="M12 2C13.5 4 15 6 12 12C9 6 10.5 4 12 2Z"
            fill="currentColor"
            opacity="0.8"
          />
          <path
            d="M12 22C10.5 20 9 18 12 12C15 18 13.5 20 12 22Z"
            fill="currentColor"
            opacity="0.6"
          />
          <path
            d="M2 12C4 10.5 6 9 12 12C6 15 4 13.5 2 12Z"
            fill="currentColor"
            opacity="0.4"
          />
          <path
            d="M22 12C20 13.5 18 15 12 12C18 9 20 10.5 22 12Z"
            fill="currentColor"
            opacity="0.2"
          />
        </svg>
      </motion.div>
    </div>
  )
}