'use client'

import { Suspense, useCallback, useContext, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import Filters from '@/src/components/blog/filters'
import SearchSectionTitle from '@/src/components/blog/search-section-title'
import Search from '@/src/components/utils/search'
import Tags, { TagsType } from '@/src/components/blog/post/tags'

import { MobileContext } from '@/src/providers/mobile'
import Accordion from '../utils/accordion'

export default function PostsSearch({
  tags,
  appliedFilters,
} : {
  tags: string[],
  appliedFilters: string[],
}) {
  const tBlog = useTranslations('Blog')
  const tCommon = useTranslations('Common')
  const [searchDisplayed, setSearchDisplayed] = useState(false)
  const isMobile = useContext(MobileContext)
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  const toggleSearch = useCallback(() => {
    setSearchDisplayed((previous) => !previous)
  }, [])

  const searchComponents = (
    <div className={`
      p-4 rounded-2xl w-full
      md:p-0 md:block md:w-auto
      ${isMobile ? 'bg-surface-0' : ''}
    `}>
      <Search/>
      <SearchSectionTitle title={tBlog('tags')}/>
      <Tags list={tags} type={TagsType.Wrapped}/>
      <Suspense fallback={<></>}>
        <Filters appliedFilters={appliedFilters}/>
      </Suspense>
    </div>
  )

  return (
    <section id='search' className='lg:w-80 md:sticky md:top-0 md:left-0'>
      <div className='flex flex-row justify-between items-center'>
        <SearchSectionTitle title={tCommon('search')}/>
        <button className='md:hidden' onClick={toggleSearch}>
          { searchDisplayed
            ? <KeyboardArrowUpIcon fontSize='inherit'/>
            : <KeyboardArrowDownIcon fontSize='inherit'/>
          }
        </button>
      </div>
      { domLoaded && isMobile &&
        <Accordion accordionDisplayed={searchDisplayed} timeout={150}>
          {searchComponents}
        </Accordion>
      }
      { domLoaded && !isMobile && searchComponents }
    </section>
  )
}

