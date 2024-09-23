import { unstable_setRequestLocale } from 'next-intl/server'

import LoremIpsum from '@/assets/posts/2024/lorem-ipsum.mdx'
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
  const postPath = path.join(basePath, 'assets', 'posts', '2024', 'lorem-ipsum.mdx')
  const source = await fs.readFile(
    postPath, 
    'utf-8')

  return (
    <LoremIpsum components={{
      ContentTable() {
        return <ContentTable post={source}/>
      }
    }} />
  )
}
