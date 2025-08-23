import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import FeaturesSection from '@/components/FeaturesSection'
import WaitlistSection from '@/components/WaitlistSection'
import Footer from '@/components/Footer'
import FloatingFlowers from '@/components/FloatingFlowers'

export default function Home() {
  return (
    <main className="min-h-screen">
      <FloatingFlowers />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <WaitlistSection />
      <Footer />
    </main>
  )
}
