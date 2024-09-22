import { unstable_setRequestLocale } from 'next-intl/server'

import LoremIpsum from '@/assets/posts/2024/lorem-ipsum.mdx'

export default function Blog({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  // test
  return (
    <LoremIpsum />
  )
}
