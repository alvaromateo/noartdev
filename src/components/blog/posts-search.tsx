'use client'

import { Suspense } from 'react'
import { useTranslations } from 'next-intl'

import Filters from '@/src/components/blog/filters'
import SearchSectionTitle from '@/src/components/blog/search-section-title'
import Search from '@/src/components/search/search'
import Tags, { TagsType } from '@/src/components/blog/post/tags'

export default function PostsSearch({
  tags,
  appliedFilters,
} : {
  tags: string[],
  appliedFilters: string[],
}) {
  const tBlog = useTranslations('Blog')
  const tCommon = useTranslations('Common')

  return (
    <section id='search' className='w-80 sticky top-0 left-0'>
      <SearchSectionTitle title={tCommon('search')}/>
      <Search/>
      <SearchSectionTitle title={tBlog('tags')}/>
      <Tags list={tags} type={TagsType.Wrapped}/>
      <Suspense fallback={<></>}>
        <Filters appliedFilters={appliedFilters}/>
      </Suspense>
    </section>
  )
}