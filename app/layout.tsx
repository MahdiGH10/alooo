import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Roselle - Blooming Your World With Love',
  description: 'Discover Roselle, where love, beauty, and nature meet. Premium floral designs, wedding decor, and personalized mirror art crafted to bring elegance into your everyday world.',
  keywords: 'luxury floral design, wedding decor, personalized mirrors, premium lifestyle, elegant home decor, floral arrangements, romantic design, luxury brand, artisan crafted, bespoke floral art',
  authors: [{ name: 'Roselle Team' }],
  creator: 'Roselle',
  publisher: 'Roselle',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://roselle.com',
    siteName: 'Roselle',
    title: 'Roselle - Blooming Your World With Love',
    description: 'Discover Roselle, where love, beauty, and nature meet. Premium floral designs, wedding decor, and personalized mirror art.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Roselle - Luxury Floral Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roselle - Blooming Your World With Love',
    description: 'Discover Roselle, where love, beauty, and nature meet. Premium floral designs, wedding decor, and personalized mirror art.',
    images: ['/og-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#e86b6b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
