import '../globals.css'
import type { Metadata } from 'next'
import { Ubuntu_Mono } from 'next/font/google'

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

// TODO: redirects to redirect from '/' to '/[lang]/home'
// TODO: change font
const ubuntuMono = Ubuntu_Mono({
  weight: ['400', '700'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'noart.dev',
  description: 'Personal page and blog about development',
}

type StaticParams = {
  lang: string;
};

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
      <body className={`${ubuntuMono.className} catppuccin_macchiato`}>
        <div className='bg-base min-h-screen'>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
