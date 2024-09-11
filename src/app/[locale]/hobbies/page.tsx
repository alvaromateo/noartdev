import { unstable_setRequestLocale } from 'next-intl/server'

export default function Hobbies({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  return (
    <main>
      <p>Hello world!</p>
      <p>Hobbies page</p>
    </main>
  )
}
