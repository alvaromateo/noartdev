import { routing } from '@/src/i18n/routing'
import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default async function LocaleLayout({
  children,
  params
} : {
  children: React.ReactNode,
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
 
  return (
    <main className={`
      px-[8%] lg:w-[1024px] lg:px-12 lg:mx-auto
      py-4 md:py-8 content flex
    `}>
      {children}
    </main>
  )
}

const webpageDescription = 'noArt.dev is my personal page and blog about development \
where I can post my projects and any useful writings I want to share'

export async function generateMetadata() : Promise<Metadata> {
  return {
    metadataBase: new URL('https://noart.dev'),
    title: 'noArt.dev',
    description: webpageDescription,
    authors: [{
      name: 'Alvaro Mateo',
    }],
    generator: 'Next.js',
    keywords: ['nextjs', 'blog', 'development', 'software'],
    openGraph: {
      type: 'website',
      title: 'noArt.dev',
      url: 'https://noart.dev',
      description: webpageDescription,
      siteName: 'noArt.dev',
      images: ['/images/photo-linkedin.jpg'],
    },
  }
}