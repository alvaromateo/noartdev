import { unstable_setRequestLocale } from 'next-intl/server'

export default function Projects({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  return (
    <>
      <p>Hello world!</p>
      <p>Projects page</p>
    </>
  )
}
