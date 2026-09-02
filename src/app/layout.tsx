import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { BRAND } from '@/lib/constants'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: `${BRAND.name} — 3D Space Viewer`,
  description: `${BRAND.tagline} Explore the ${BRAND.name} restaurant, kitchen and organic display in interactive 3D.`,
  openGraph: {
    title: `${BRAND.name} — 3D Space Viewer`,
    description: BRAND.tagline,
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: BRAND.primaryGreen,
  // The canvas owns pinch-zoom; browser page zoom would fight it.
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
