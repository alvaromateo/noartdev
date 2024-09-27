import { unstable_setRequestLocale } from 'next-intl/server'

export default async function Projects({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  return (
    <p>Hello world!</p>
  )
}
