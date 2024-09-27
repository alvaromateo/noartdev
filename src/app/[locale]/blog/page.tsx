import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'

import { spaceMono } from '@/src/global/fonts'
import uniq from '@/src/global/functions/uniq'
import { Post } from '@/src/global/types/custom'

import PostCard from '@/src/components/blog/post-card'
import Tags, { TagsType } from '@/src/components/blog/post/tags'
import Search from '@/src/components/search/search'
import Filters from '@/src/components/blog/filters'
import SearchSectionTitle from '@/src/components/blog/search-section-title'
import findPosts from '@/src/components/blog/post-loader'

// TODO: sort the posts by date
// TODO: add links to each post page
// TODO: styles for mobile

export default async function Blog({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const tBlog = await getTranslations('Blog')
  const tCommon = await getTranslations('Common')

  const posts = await findPosts(params.locale)
  const tags = getTagsFromPosts(posts)

  return (
    <div className={`
      grid gap-y-12 grid-cols-1 grid-rows-[auto]
      md:gap-x-16 md:gap-y-16 md:grid-cols-[auto_auto]
      md:justify-items-stretch md:items-start
    `}>
      <section id='posts' className='w-[544px]'>
        <h1 className={`
          text-3xl/[2rem] font-bold text-title mt-8 mb-12 ml-10
          ${spaceMono.className}
        `}>
          {tBlog('posts')}
        </h1>
        <ul>
          { posts.map((post) =>
              <PostCard key={post.path} post={post}/>)}
        </ul>
      </section>
      <section id='search' className='w-80 sticky top-0 left-0'>
        <SearchSectionTitle title={tCommon('search')}/>
        <Search/>
        <SearchSectionTitle title={tBlog('tags')}/>
        <Tags list={tags} type={TagsType.Wrapped}/>
        <Suspense fallback={<></>}>
          <Filters/>
        </Suspense>
      </section>
    </div>
  )
}

function getTagsFromPosts(posts: Post[]) : string[] {
  const tags = posts
    .flatMap((post) => post.tags)
  return uniq(tags)
}
