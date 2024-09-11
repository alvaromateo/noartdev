'use client'

//import { unstable_setRequestLocale } from 'next-intl/server'

export default function Blog({
  params
} : {
  params: { locale: string }
}) {
  //unstable_setRequestLocale(params.locale)
  return (
    <main>
      <p>Hello world!</p>
      <p>Blog page</p>
      <button onClick={() => {throw Error('Error')}}>Error</button>
    </main>
  )
}
