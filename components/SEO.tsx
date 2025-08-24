'use client'

import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

export default function SEO({
  title = "Roselle - Blooming Your World With Love | Luxury Floral Lifestyle Brand",
  description = "Discover Roselle, where love, beauty, and nature meet. Premium floral designs, wedding decor, and personalized mirror art crafted to bring elegance into your everyday world.",
  keywords = "luxury floral design, wedding decor, personalized mirrors, premium lifestyle, elegant home decor, floral arrangements, romantic design, luxury brand, artisan crafted, bespoke floral art",
  image = "/og-image.jpg",
  url = "https://roselle.com",
  type = "website"
}: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Roselle",
    "description": description,
    "url": url,
    "logo": `${url}/logo.png`,
    "sameAs": [
      "https://instagram.com/roselle",
      "https://facebook.com/roselle",
      "https://twitter.com/roselle"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "hello@roselle.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  }

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Roselle" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Roselle" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#e86b6b" />
      <meta name="msapplication-TileColor" content="#e86b6b" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  )
}