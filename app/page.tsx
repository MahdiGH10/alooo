import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import FeaturesSection from '@/components/FeaturesSection'
import TestimonialSection from '@/components/TestimonialSection'
import PricingSection from '@/components/PricingSection'
import WaitlistSection from '@/components/WaitlistSection'
import Footer from '@/components/Footer'
import FloatingFlowers from '@/components/FloatingFlowers'
import SEO from '@/components/SEO'
import Analytics from '@/components/Analytics'
import AccessibilityEnhancer from '@/components/AccessibilityEnhancer'
import PerformanceOptimizer from '@/components/PerformanceOptimizer'

export default function Home() {
  return (
    <PerformanceOptimizer>
      <SEO />
      <Analytics />
      
      {/* Skip Links for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <main id="main-content" className="min-h-screen">
        <FloatingFlowers />
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TestimonialSection />
        <PricingSection />
        <WaitlistSection />
        <Footer />
      </main>
      
      <AccessibilityEnhancer />
    </PerformanceOptimizer>
  )
}
