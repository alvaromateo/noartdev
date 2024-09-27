import { unstable_setRequestLocale } from 'next-intl/server'

import LoremIpsum from '@/assets/posts/en/2024/lorem-ipsum.mdx'
import ContentTable from '@/src/components/blog/post/content-table'

import { promises as fs } from 'fs'
import path from 'path'

export default async function Blog({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)

  const basePath = process.cwd()
  const postPath = path.join(basePath, 'assets', 'posts', 'en', '2024', 'lorem-ipsum.mdx')
  const source = await fs.readFile(
    postPath, 
    'utf-8')

  // TODO: fix the styles of the post for all screen sizes
  // TODO: add back to top button fixed on the bottom right corner

  // TODO: add reading progress indicator sticky at the bottom
  // TODO: add Read mark at the end of the article and check that it marks automatically
  // when the scroll reaches the end of the post
  // TODO: check recent links after visiting post

  return (
    <LoremIpsum components={{
      ContentTable() {
        return <ContentTable post={source}/>
      }
    }} />
  )
}