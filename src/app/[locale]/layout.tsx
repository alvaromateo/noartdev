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
    <>
      {children}
    </>
  )
}