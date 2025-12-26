import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | Kamin Studio",
    default: "Kamin Studio - Payment Management Platform",
  },
  description:
    "Kamin's internal platform for managing payments, transactions, and operational flows. Streamline payment processing, monitor transactions, and manage financial operations with comprehensive tools and real-time insights.",
  keywords: [
    "payment management",
    "payment processing",
    "transaction management",
    "financial operations",
    "payment platform",
    "operational flows",
    "payment dashboard",
    "transaction monitoring",
    "payment analytics",
    "financial platform",
    "payment system",
    "transaction processing",
    "payment tools",
    "operational management",
  ],
  authors: [
    {
      name: "Nicolas Mayorga",
      url: "https://github.com/nicolasmayorga",
    },
  ],
  creator: "Kamin",
  publisher: "Kamin",
  applicationName: "Kamin Studio",
  category: "Finance",
  classification: "Payment Management",

  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://studio.kamin.com", // Internal Kamin domain
    siteName: "Kamin Studio",
    title: "Kamin Studio - Payment Management Platform",
    description:
      "Kamin's internal platform for managing payments, transactions, and operational flows with real-time processing and comprehensive monitoring.",
    images: [
      {
        url: "/og-image.png", // Kamin Studio OG image
        width: 1200,
        height: 630,
        alt: "Kamin Studio - Payment Management Dashboard",
        type: "image/png",
      },
      {
        url: "/og-image-square.png", // Square version for some platforms
        width: 1200,
        height: 1200,
        alt: "Kamin Studio Logo",
        type: "image/png",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    site: "@kamin_tech", // Kamin's Twitter handle
    creator: "@nicolasmayorga",
    title: "Kamin Studio - Payment Management Platform",
    description:
      "Internal platform for managing payments, transactions, and operational flows with real-time processing capabilities.",
    images: ["/og-image.png"],
  },

  // Additional metadata
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

  // App-specific metadata
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kamin Studio",
    startupImage: [
      {
        url: "/startup-image-768x1024.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
      {
        url: "/startup-image-1536x2048.png",
        media: "(device-width: 1536px) and (device-height: 2048px)",
      },
    ],
  },

  // Other metadata
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  // App metadata for mobile
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Kamin Studio",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#0ea5e9",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#0ea5e9",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "dark light",
}

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kamin Studio",
  applicationCategory: "FinanceApplication",
  description:
    "Internal platform for managing payments, transactions, and operational flows",
  url: "https://studio.kamin.com", // Internal Kamin domain
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    category: "Enterprise",
  },
  author: {
    "@type": "Person",
    name: "Nicolas Mayorga",
  },
  publisher: {
    "@type": "Organization",
    name: "Kamin",
  },
  featureList: [
    "Payment Management",
    "Transaction Processing",
    "Real-time Monitoring",
    "Operational Flows",
    "Payment Analytics",
    "Financial Operations",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-slate-100 text-foreground selection:bg-emerald-500/20 selection:text-emerald-300`}
        suppressHydrationWarning
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-background focus:rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
        >
          Skip to main content
        </a>

        {/* Main application */}
        <main id="main-content" className="min-h-screen container mx-auto py-4">
          {children}
          <Toaster position="bottom-right" />
        </main>
      </body>
    </html>
  )
}
