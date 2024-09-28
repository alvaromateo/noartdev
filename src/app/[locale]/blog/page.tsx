import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import uniq from '@/src/global/functions/uniq'
import { Post } from '@/src/global/types/custom'
import { findPosts } from '@/src/components/blog/post-loader'
import Posts from '@/src/components/blog/posts'
import { Suspense } from 'react'

// TODO: styles for mobile

export default async function Blog({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const t = await getTranslations('Blog')
  const posts = await findPosts(params.locale)
  const tags = getTagsFromPosts(posts)

  return (
    <div className={`
      grid gap-y-12 grid-cols-1 grid-rows-[auto]
      md:gap-x-16 md:gap-y-16 md:grid-cols-[auto_auto]
      md:justify-items-stretch md:items-start
    `}>
      <Suspense fallback={
        <div className='flex w-full justify-center'>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-xl md:text-2xl'>{t('loading')}</p>
          </div>
        </div>
      }>
        <Posts posts={posts} tags={tags}/>
      </Suspense>
    </div>
  )
}

function getTagsFromPosts(posts: Post[]) : string[] {
  const tags = posts
    .flatMap((post) => post.tags)
  return uniq(tags)
}
