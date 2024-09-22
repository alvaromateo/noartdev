import { routing } from '@/src/i18n/routing'
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
      px-[8%] lg:max-w-[1024px] lg:px-12 lg:mx-auto
      pt-8 pb-16 content flex
    `}>
      {children}
    </main>
  )
}