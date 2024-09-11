import { unstable_setRequestLocale } from 'next-intl/server'

export default function About({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  return (
    <main>
      <p>Hello world!</p>
      <p>About page</p>
    </main>
  )
}
