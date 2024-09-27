'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { TagsType } from './post/tags'
import Tag from './post/tag'
import SearchSectionTitle from './search-section-title'

export default function Filters() {
  const tBlog = useTranslations('Blog')
  const [appliedFilters, setAppliedFilters] = useState<string[]>([])
  return (
    <>
      { appliedFilters.length > 0 &&
        <div>
          <SearchSectionTitle title={tBlog('filters')}/>
          <ul className='flex flex-col'>
            {
              appliedFilters.map((tag) => {
                return <Tag type={TagsType.Wrapped} key={tag}>
                  {tag}
                </Tag>
              })
            }
          </ul>
        </div>
      }
    </>
  )
}