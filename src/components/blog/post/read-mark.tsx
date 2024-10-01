'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useCallback, useEffect, useState } from 'react'

import { LocalStorageProperties } from '@/src/global/property-names'
import { usePathname } from '@/src/i18n/routing'

class PageState {
  scrollTop: number
  read: boolean

  constructor(scrollTop: number, read: boolean) {
    this.scrollTop = scrollTop
    this.read = read
  }
}

type ReadingState = {
  [path: string]: PageState
}

export default function ReadMark(props:
{ 
  pagePath: string,
} | {
  blogPageScroll: number,
  calculateScrollPercentage: (scroll: number) => number,
}) {
  let pagePath: string | undefined
  let blogPageScroll: number | undefined
  let calculateScrollPercentage: ((scroll: number) => number) | undefined
  if ('pagePath' in props) {
    ({pagePath} = props)
  } else {
    ({blogPageScroll, calculateScrollPercentage} = props)
  }

  const [domLoaded, setDomLoaded] = useState(false)
  const [pageState, setPageState] = useState<PageState>()
  const pathname = usePathname()
  const readMarkPagePath = pagePath ? pagePath : pathname
  // only the posts pages sets the pagePath for each of the blog posts
  // for the individual post page the path is taken from usePathname
  const isPostPage = pagePath === undefined

  const updatePageScroll = useCallback((readingState: PageState) => {
    if (readingState && window) {
      window.scroll({
        top: readingState.scrollTop,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [])

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
    if (isPostPage) {
      updatePageScroll(currentPage)
    }
  }, [readMarkPagePath, isPostPage, updatePageScroll])

  useEffect(() => {
    // if we are in a blog page restore the user's last reading point
    if (blogPageScroll && blogPageScroll > 0) {
      const pagesReadingState = getReadingState()
      const isBlogRead = calculateScrollPercentage
        ? calculateScrollPercentage(blogPageScroll) > 95
        : false
      let currentPage = new PageState(
        blogPageScroll,
        isBlogRead || pagesReadingState[readMarkPagePath]?.read)

      setPageState(currentPage)
      saveData(readMarkPagePath, currentPage, pagesReadingState)
    }
  }, [blogPageScroll, readMarkPagePath])

  return isPostPage
    ?
      <>
        {
          domLoaded && (pageState?.read
          ? <CheckCircleIcon fontSize='inherit'/>
          : <RadioButtonUncheckedIcon  fontSize='inherit'/>)
        }
      </>
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
