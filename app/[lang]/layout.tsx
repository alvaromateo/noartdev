import '../globals.css'
import type { Metadata } from 'next'

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { StaticParams } from '../../global/types'
import Body from '../../components/utils/body'

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
    <html lang={params.lang}>
      <Body>
        <div className='bg-base min-h-screen'>
          <Header />
          {children}
          <Footer />
        </div>
      </Body>
    </html>
  )
}
