import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { StoreProvider } from '@/hooks/use-store'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CartSlideOver } from '@/components/cart/cart-slide-over'
import { QuickViewModal } from '@/components/products/quick-view-modal'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { ScrollProgress } from '@/components/animations/scroll-progress'
import { siteConfig } from '@/lib/config'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Premium Luxury Jewellery`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['jewellery', 'gold', 'diamond', 'wedding', 'bridal', 'Ahmedabad', 'luxury', 'Indian jewellery'],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Premium Luxury Jewellery`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Premium Luxury Jewellery`,
    description: siteConfig.description,
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <StoreProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartSlideOver />
          <QuickViewModal />
          <WhatsAppButton />
        </StoreProvider>
      </body>
    </html>
  )
}
