'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface PerformanceOptimizerProps {
  children: React.ReactNode
}

export default function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // Check device capabilities
    const checkPerformance = () => {
      const connection = (navigator as any).connection
      const memory = (performance as any).memory
      
      let performanceScore = 0
      
      // Check network connection
      if (connection) {
        if (connection.effectiveType === '4g') performanceScore += 2
        else if (connection.effectiveType === '3g') performanceScore += 1
        
        if (connection.downlink > 10) performanceScore += 1
      }
      
      // Check device memory
      if (memory) {
        if (memory.jsHeapSizeLimit > 1000000000) performanceScore += 2 // > 1GB
        else if (memory.jsHeapSizeLimit > 500000000) performanceScore += 1 // > 500MB
      }
      
      // Check hardware concurrency
      if (navigator.hardwareConcurrency >= 4) performanceScore += 1
      
      setIsLowPerformance(performanceScore < 3)
    }

    checkPerformance()
  }, [])

  // Provide performance context to children
  const performanceContext = {
    isLowPerformance,
    shouldReduceMotion,
    animationDuration: isLowPerformance ? 0.3 : 0.8,
    particleCount: isLowPerformance ? 5 : 25,
    enableComplexAnimations: !isLowPerformance && !shouldReduceMotion
  }

  return (
    <div data-performance-mode={isLowPerformance ? 'low' : 'high'}>
      {children}
    </div>
  )
}