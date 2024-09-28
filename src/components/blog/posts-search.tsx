'use client'

import { RefObject, Suspense, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { CSSTransition } from 'react-transition-group'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import Filters from '@/src/components/blog/filters'
import SearchSectionTitle from '@/src/components/blog/search-section-title'
import Search from '@/src/components/search/search'
import Tags, { TagsType } from '@/src/components/blog/post/tags'

import './posts-search.css'
import { MobileContext } from '@/src/providers/mobile'

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
  const node = useRef<HTMLDivElement>(null)
  const isMobile = useContext(MobileContext)
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  const toggleSearch = useCallback(() => {
    setSearchDisplayed((previous) => !previous)
  }, [])

  const hasTransitionClass = useCallback((node: RefObject<HTMLDivElement>) => {
    if (node.current) {
      const divClasses = Array.from(node.current.classList.values())
      return divClasses.filter((cssClass) => {
        const classMatch = cssClass.match(/search-.*/)
        if (classMatch) {
          return true
        }
        return false
      }).length > 0
    }
    return false
  }, [])

  let searchDisplayClasses = ''
  if (isMobile && !hasTransitionClass(node)) {
    searchDisplayClasses = 'h-0'
  }

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
      { domLoaded &&
        <CSSTransition
          nodeRef={node}
          in={searchDisplayed}
          timeout={150}
          classNames='search'
        >
          <div ref={node} className={`
            md:block overflow-hidden
            ${searchDisplayClasses}
          `}>
            <Search/>
            <SearchSectionTitle title={tBlog('tags')}/>
            <Tags list={tags} type={TagsType.Wrapped}/>
            <Suspense fallback={<></>}>
              <Filters appliedFilters={appliedFilters}/>
            </Suspense>
          </div>
        </CSSTransition>
      }
    </section>
  )
}