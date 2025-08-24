'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Type, Contrast, Volume2, VolumeX } from 'lucide-react'

export default function AccessibilityEnhancer() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false
  })

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem('roselle-accessibility')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    // Apply settings to document
    const root = document.documentElement
    
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    if (settings.largeText) {
      root.classList.add('large-text')
    } else {
      root.classList.remove('large-text')
    }
    
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // Save settings
    localStorage.setItem('roselle-accessibility', JSON.stringify(settings))
  }, [settings])

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <>
      {/* Accessibility Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-roselle-500 text-white rounded-full shadow-lg hover:bg-roselle-600 transition-colors duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open accessibility settings"
      >
        <Eye size={24} />
      </motion.button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-script text-sage-800">Accessibility</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close accessibility settings"
                >
                  <EyeOff size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Contrast size={20} className="text-sage-600" />
                    <span className="text-sage-700">High Contrast</span>
                  </div>
                  <button
                    onClick={() => toggleSetting('highContrast')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.highContrast ? 'bg-roselle-500' : 'bg-gray-300'
                    }`}
                    aria-label={`${settings.highContrast ? 'Disable' : 'Enable'} high contrast`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.highContrast ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Type size={20} className="text-sage-600" />
                    <span className="text-sage-700">Large Text</span>
                  </div>
                  <button
                    onClick={() => toggleSetting('largeText')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.largeText ? 'bg-roselle-500' : 'bg-gray-300'
                    }`}
                    aria-label={`${settings.largeText ? 'Disable' : 'Enable'} large text`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.largeText ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Volume2 size={20} className="text-sage-600" />
                    <span className="text-sage-700">Reduced Motion</span>
                  </div>
                  <button
                    onClick={() => toggleSetting('reducedMotion')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.reducedMotion ? 'bg-roselle-500' : 'bg-gray-300'
                    }`}
                    aria-label={`${settings.reducedMotion ? 'Disable' : 'Enable'} reduced motion`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-sage-600 text-center">
                  Need more help? Contact us at{' '}
                  <a href="mailto:accessibility@roselle.com" className="text-roselle-500 hover:underline">
                    accessibility@roselle.com
                  </a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}