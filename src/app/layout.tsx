import { unstable_setRequestLocale } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/react'

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
          <Analytics />
        </div>
      </Html>
    </Providers>
  )
}

// TODO: add sitemap and robots files
// TODO: add admin page
// TODO: add login with OAuth for admin page
// https://nextjs.org/docs/pages/building-your-application/authentication
/*
Possibility to do it manually too via an admin page:
- get indexed posts
- delete indexed post(s)
- index post(s)
*/
// TODO: configure admin security of Solr 
// https://solr.apache.org/guide/solr/latest/deployment-guide/authentication-and-authorization-plugins.html#using-security-json-with-solr