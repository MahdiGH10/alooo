'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize Google Analytics
    const initGA = () => {
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pathname,
      })
    }

    // Load GA script
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
    script.async = true
    script.onload = initGA
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    // Track page views
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pathname,
      })
    }
  }, [pathname])

  // Custom event tracking functions
  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, parameters)
    }
  }

  const trackWaitlistSignup = (email: string) => {
    trackEvent('waitlist_signup', {
      event_category: 'engagement',
      event_label: 'waitlist',
      value: 1
    })
  }

  const trackFormInteraction = (formField: string) => {
    trackEvent('form_interaction', {
      event_category: 'engagement',
      event_label: formField
    })
  }

  const trackScrollDepth = (depth: number) => {
    trackEvent('scroll_depth', {
      event_category: 'engagement',
      event_label: `${depth}%`,
      value: depth
    })
  }

  // Expose tracking functions globally
  useEffect(() => {
    (window as any).roselleAnalytics = {
      trackEvent,
      trackWaitlistSignup,
      trackFormInteraction,
      trackScrollDepth
    }
  }, [])

  return null
}