import type { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'

import Header from '@/src/components/header/header'
import Footer from '@/src/components/footer/footer'
import Html from '@/src/components/utils/html'
import Providers from '@/src/components/utils/providers'
import { routing } from '@/src/i18n/routing'

import './globals.css'

// We need this function to statically generate all the different routes
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  const locale = params.locale ?? 'en'
  unstable_setRequestLocale(locale)

  return (
    <Providers>
      <Html locale={locale}>
        <div className='text-text min-h-screen'>
          <div className='header-and-content'>
            <Header />
            {children}
          </div>
          <Footer />
        </div>
      </Html>
    </Providers>
  )
}
