import '../globals.css'
import type { Metadata } from 'next'

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { StaticParams } from '../../global/types'
import Providers from '../../components/utils/providers'
import Html from '../../components/utils/html'

// TODO: redirects to redirect from '/' to '/[lang]/home'

export const metadata: Metadata = {
  title: 'noart.dev',
  description: 'Personal page and blog about development',
}

export async function generateStaticParams(): Promise<Array<StaticParams>> {
  return [
    { lang: 'en' },
    { lang: 'es' }
  ]
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: StaticParams
}) {
  return (
    <Providers>
      <Html params={params}>
        <div className='text-text min-h-screen'>
          <div className='header-and-content'>
            <Header lang={params.lang} />
            {children}
          </div>
          <Footer />
        </div>
      </Html>
    </Providers>
  )
}
