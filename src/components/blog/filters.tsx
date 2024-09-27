'use client'

import { useTranslations } from 'next-intl'
import { TagsType } from './post/tags'
import Tag from './post/tag'
import SearchSectionTitle from './search-section-title'
import { useSearchParams } from 'next/navigation'
import { SearchParamNames } from '@/src/global/property-names'

export default function Filters() {
  const tBlog = useTranslations('Blog')
  const searchParams = useSearchParams()
  const appliedFilters = searchParams.getAll(SearchParamNames.filter)

  return (
    <>
      { appliedFilters.length > 0 &&
        <div>
          <SearchSectionTitle title={tBlog('filters')}/>
          <ul>
            {
              appliedFilters.map((tag) => {
                return (
                  <li key={tag}>
                    <Tag type={TagsType.Wrapped} hasCloseButton>
                      {tag}
                    </Tag>
                  </li>
                )
              })
            }
          </ul>
        </div>
      }
    </>
  )
}