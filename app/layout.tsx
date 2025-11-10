import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/src/contexts/AuthContext'
import { AdminAuthProvider } from '@/src/contexts/AdminAuthContext'
import { LanguageProvider } from '@/components/language-context'
import { Toaster } from "@/components/ui/toaster"
import { AnalyticsInitializer } from '@/components/AnalyticsInitializer'

export const metadata: Metadata = {
  title: "InvestInHuman Academy - Professional Development & Cultural Training",
  description: "Professional training academy offering language courses, intercultural communication seminars, and business etiquette programs for global professionals",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AnalyticsInitializer />
        <LanguageProvider>
          <AuthProvider>
            <AdminAuthProvider>
              {children}
              <Toaster />
            </AdminAuthProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
