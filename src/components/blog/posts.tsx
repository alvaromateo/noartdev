'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { SearchParamNames } from '@/src/global/property-names'
import { spaceMono } from '@/src/global/fonts'
import { Post } from '@/src/global/types/custom'
import PostsSearch from './posts-search'
import PostCard from './post-card'

export default function Posts({
  posts,
  tags,
} : {
  posts: Post[],
  tags: string[]
}) {
  const tBlog = useTranslations('Blog')
  const searchParams = useSearchParams()
  const appliedFilters = searchParams.getAll(SearchParamNames.filter)
  const displayedPosts = posts.filter((post) => {
    let allFiltersSatisfied = true
    let index = 0
    while (allFiltersSatisfied && index < appliedFilters.length) {
      const filter = appliedFilters[index]
      let filterSatisfied = false
      ++index
      for (const tag of post.tags) {
        if (tag === filter) {
          filterSatisfied = true
          break
        }
      }
      if (!filterSatisfied) {
        allFiltersSatisfied = false
      }
    }
    return allFiltersSatisfied
  })
  .sort(compareByMostRecentDate)
  .map((post) =>
    <PostCard key={post.path} post={post}/>
  )

  return (
    <>
      <section id='posts' className='w-[544px]'>
        <h1 className={`
          text-3xl/[2rem] font-bold text-title mt-8 mb-12 ml-16
          ${spaceMono.className}
        `}>
          {tBlog('posts')}
        </h1>
        <ul>
          { displayedPosts.length > 0
            ? displayedPosts
            : <div className='flex w-full'>
                <p className='ml-16 text-xl md:text-2xl'>{tBlog('notFound')}</p>
              </div>
          }
        </ul>
      </section>
      <PostsSearch tags={tags} appliedFilters={appliedFilters}/>
    </>
  )
}

function compareByMostRecentDate(postA: Post, postB: Post) : number {
  const dateA = postA.publishDate
  const dateB = postB.publishDate
  return (dateB.year - dateA.year) * 1000
    + (dateB.month - dateA.month) * 100
    + (dateB.day - dateA.day)
}
