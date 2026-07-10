import "./globals.css";

export const metadata = {
  // Primary Meta Tags
  title: {
    default: "Lumière Beauty | Luxury Skincare, Haircare & Makeup",
    template: "%s | Lumière Beauty",
  },
  description:
    "Discover Lumière Beauty — luxury skincare, haircare, makeup, and fragrances crafted with intention. Shop our curated collection of clean, effective beauty products. Complimentary shipping across Australia & the UK.",

  // Application
  applicationName: "Lumière Beauty",

  // Keywords
  keywords: [
    "luxury skincare",
    "beauty products",
    "skincare",
    "haircare",
    "makeup",
    "fragrance",
    "body care",
    "clean beauty",
    "Lumière Beauty",
    "Australian beauty",
    "UK beauty",
    "best skincare products",
    "luxury cosmetics",
  ],

  // Authors & Creator
  authors: [{ name: "Lumière Beauty" }],
  creator: "Lumière Beauty",
  publisher: "Lumière Beauty",

  // Canonical URL
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Lumière Beauty",
    title: "Lumière Beauty | Luxury Skincare, Haircare & Makeup",
    description:
      "Discover Lumière Beauty — luxury skincare, haircare, makeup, and fragrances crafted with intention.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lumière Beauty - Luxury Skincare & Beauty Products",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Lumière Beauty | Luxury Skincare, Haircare & Makeup",
    description:
      "Discover Lumière Beauty — luxury skincare, haircare, makeup, and fragrances crafted with intention.",
    images: ["/twitter-image.jpg"],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "https://i.pinimg.com/736x/4f/8d/23/4f8d23ebbac2565f157ce85bf57fc3a5.jpg", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Manifest
  // manifest: "/manifest.json",

  // Theme Color
  themeColor: "#F4EAE3",

  // Viewport
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  // Category
  category: "beauty",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lumière Beauty",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo.png`,
              description:
                "Luxury skincare, haircare, makeup, and fragrances crafted with intention.",
              email: "hello@lumiere-beauty.com",
              telephone: "+61-2-1234-5678",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Sydney",
                addressRegion: "NSW",
                addressCountry: "AU",
              },
              sameAs: [
                "https://instagram.com/lumierebeauty",
                "https://facebook.com/lumierebeauty",
                "https://twitter.com/lumierebeauty",
                "https://youtube.com/@lumierebeauty",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+61-2-1234-5678",
                contactType: "customer service",
                availableLanguage: ["English"],
              },
            }),
          }}
        />

        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Lumière Beauty",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              potentialAction: {
                "@type": "SearchAction",
                target: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/products?search={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}