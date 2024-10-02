'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { debounce } from '@mui/material'

import { LocalStorageProperties } from '@/src/global/property-names'
import { usePathname } from '@/src/i18n/routing'
import { ReadingState, PageState } from '@/src/global/types/custom'

export default function ReadMark(props:
{ 
  pagePath: string,
} | {
  blogPageScroll: number,
  calculateScrollPercentage: (scroll: number) => number,
  updatePageScroll: (readingState: PageState) => void,
}) {
  let pagePath: string | undefined
  let blogPageScroll: number | undefined
  let calculateScrollPercentage: ((scroll: number) => number) | undefined
  let updatePageScroll: ((readingState: PageState) => void) | undefined
  if ('pagePath' in props) {
    ({pagePath} = props)
  } else {
    ({blogPageScroll, calculateScrollPercentage, updatePageScroll} = props)
  }

  const [domLoaded, setDomLoaded] = useState(false)
  const [pageState, setPageState] = useState<PageState>()
  const pathname = usePathname()
  const readMarkPagePath = pagePath ? pagePath : pathname
  // only the posts pages sets the pagePath for each of the blog posts
  // for the individual post page the path is taken from usePathname
  const isPostPage = pagePath === undefined

  const toggleRead = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (pageState) {
      let currentPageState = new PageState(
        pageState.scrollTop,
        !pageState.read
      )
      setPageState(currentPageState)
      saveData(readMarkPagePath, currentPageState)
    }
  }, [readMarkPagePath, pageState])

  const debouncedSave = useMemo(() => debounce(saveData, 100), [])

  useEffect(() => {
    // load when page loads for the first time
    const data = localStorage.getItem(LocalStorageProperties.readStatusProperty)
    let currentPage = new PageState(0, false)
    if (data) {
      const pagesReadingState = JSON.parse(data) as ReadingState
      currentPage = pagesReadingState[readMarkPagePath]
    }

    setDomLoaded(true)
    setPageState(currentPage)
    if (isPostPage && updatePageScroll) {
      updatePageScroll(currentPage)
    }
  }, [readMarkPagePath, isPostPage, updatePageScroll])

  useEffect(() => {
    // if we are in a blog page restore the user's last reading point
    if (isPostPage) {
      let scroll = blogPageScroll || 0
      scroll = scroll < 0 ? 0 : scroll
      const pagesReadingState = getReadingState()
      const isBlogRead = calculateScrollPercentage
        ? calculateScrollPercentage(scroll) > 95
        : false
      let currentPage = new PageState(
        scroll,
        isBlogRead || pagesReadingState[readMarkPagePath]?.read)

      setPageState(currentPage)
      debouncedSave(readMarkPagePath, currentPage, pagesReadingState)
      return () => debouncedSave.clear()
    }
  }, [blogPageScroll, readMarkPagePath, debouncedSave])

  const currentPercentageRead = calculateScrollPercentage
    ? calculateScrollPercentage(pageState?.scrollTop || 0)
    : 0
  return isPostPage
    ?
      <div className='flex justify-center items-center'>
        <div className='text-xl-logo'>
          {
            domLoaded && (pageState?.read
            ? <CheckCircleIcon fontSize='inherit'/>
            : <RadioButtonUncheckedIcon  fontSize='inherit'/>)
          }
        </div>
        <p className='ml-4 text-xl'>
          { pageState?.read
            ? 'Article read'
            : `${currentPercentageRead}%` }
        </p>
      </div>
    :
      <button className='z-10' onClick={toggleRead}>
      {
        domLoaded && (pageState?.read
        ? <CheckCircleIcon fontSize='inherit'/>
        : <RadioButtonUncheckedIcon  fontSize='inherit'/>
      )}
    </button>
}

const getReadingState = () => {
  const data = localStorage.getItem(LocalStorageProperties.readStatusProperty)
  let pagesReadingState: ReadingState = {}
  if (data) {
    pagesReadingState = JSON.parse(data) as ReadingState
  }
  return pagesReadingState
}

const saveData = (
  pageStateName: string,
  pageState: PageState,
  readingState?: ReadingState
) => {
  if (!readingState) {
    readingState = getReadingState()
  }

  localStorage.setItem(
    LocalStorageProperties.readStatusProperty,
    JSON.stringify({
      ...readingState,
      [pageStateName]: pageState,
    })
  )
}
