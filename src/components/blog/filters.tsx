'use client'

import { useTranslations } from 'next-intl'
import { wrappedTagLiClasses } from './post/tags'
import Tag from './post/tag'
import SearchSectionTitle from './search-section-title'

export default function Filters({
  appliedFilters,
} : {
  appliedFilters: string[],
}) {
  const tBlog = useTranslations('Blog')

  return (
    <>
      { appliedFilters.length > 0 &&
        <div>
          <SearchSectionTitle title={tBlog('filters')}/>
          <ul className='flex flex-col items-start'>
            {
              appliedFilters.map((tag) => {
                return (
                  <li key={tag} className={wrappedTagLiClasses}>
                    <Tag hasCloseButton>
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