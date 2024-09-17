'use client'

//import { unstable_setRequestLocale } from 'next-intl/server'

export default function Blog({
  params
} : {
  params: { locale: string }
}) {
  //unstable_setRequestLocale(params.locale)
  //throw Error('Error')
  return (
    <main>
      <p>Hello world!</p>
      <p>Blog page</p>
      <button onClick={() => {}}>Error</button>
    </main>
  )
}
