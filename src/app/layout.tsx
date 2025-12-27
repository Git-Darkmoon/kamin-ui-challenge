import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const abyssinicaSil = localFont({
  src: [
    {
      path: "../fonts/AbyssinicaSIL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-abyssinica",
  display: "swap",
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
      url: "https://github.com/Git-Darkmoon",
    },
  ],
  creator: "Kamin",
  publisher: "Kamin",
  applicationName: "Kamin Studio",
  category: "Finance",
  classification: "Payment Management",

  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://kamin-ui-challenge.vercel.app",
    siteName: "Kamin Studio",
    title: "Kamin Studio - Payment Management Platform",
    description:
      "Kamin's internal platform for managing payments, transactions, and operational flows with real-time processing and comprehensive monitoring.",
    images: [
      {
        url: "/og-kamin.png",
        width: 1200,
        height: 630,
        alt: "Kamin Studio - Payment Management Dashboard",
        type: "image/png",
      },
      {
        url: "/og-kamin.png",
        width: 1200,
        height: 1200,
        alt: "Kamin Studio Logo",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@kamin_tech",
    creator: "@nicolasmayorga",
    title: "Kamin Studio - Payment Management Platform",
    description:
      "Internal platform for managing payments, transactions, and operational flows with real-time processing capabilities.",
    images: ["/og-kamin.png"],
  },

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

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Kamin Studio",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#15393f",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#15393f",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kamin Studio",
  applicationCategory: "FinanceApplication",
  description:
    "Internal platform for managing payments, transactions, and operational flows",
  url: "https://kamin-ui-challenge.vercel.app",
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
    <html
      lang="es"
      className={`${inter.variable} ${abyssinicaSil.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link rel="icon" href="/logomark.svg" type="image/svg+xml" />

        <link rel="manifest" href="/manifest.json" />

        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />
      </head>
      <body
        className="font-sans antialiased bg-slate-100 text-foreground selection:bg-emerald-700/20 selection:text-slate-800"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-background focus:rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
        >
          Skip to main content
        </a>

        <main id="main-content" className="min-h-screen">
          {children}
          <Toaster position="bottom-right" />
        </main>
      </body>
    </html>
  )
}
