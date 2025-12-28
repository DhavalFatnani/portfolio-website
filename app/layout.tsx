import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/lib/theme/theme-provider'
import { getSiteSettings } from '@/lib/content/load-content'

const inter = Inter({ subsets: ['latin'] })

const settings = getSiteSettings()

export const metadata: Metadata = {
  title: settings.seo.title,
  description: settings.seo.description,
  keywords: settings.seo.keywords,
  authors: [{ name: settings.author }],
  openGraph: {
    title: settings.seo.title,
    description: settings.seo.description,
    type: 'website',
    ...(settings.seo.ogImage && { images: [settings.seo.ogImage] }),
  },
  twitter: {
    card: 'summary_large_image',
    title: settings.seo.title,
    description: settings.seo.description,
    ...(settings.seo.ogImage && { images: [settings.seo.ogImage] }),
  },
}

/**
 * Root Layout
 * Wraps the entire app with theme provider and global styles
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

