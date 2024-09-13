import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getNow, getTimeZone, getMessages } from 'next-intl/server'

export default async function IntlProvider({
  children
} : {
  children: React.ReactNode
}) {
  const locale = await getLocale() ?? 'en'
  const now = await getNow()
  const timeZone = await getTimeZone()
  const messages = await getMessages()

  return (
    <NextIntlClientProvider
      locale={locale}
      now={now}
      timeZone={timeZone}
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  )
}