'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'

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

export default function ReadMark({
  pagePath,
  isInBlogPage = false,
} : {
  isInBlogPage?: boolean,
  pagePath?: string,
}) {
  const [domLoaded, setDomLoaded] = useState(false)
  const [pageState, setPageState] = useState<PageState>()
  const pathname = usePathname()

  const readMarkPagePath = useMemo(
    () => pagePath ? pagePath : pathname,
    [pagePath, pathname]
  )

  const updatePageScroll = useCallback((readingState: PageState) => {
    if (readingState && document) {
      const body = document.querySelector('body')
      if (body) {
        body.scrollTop = readingState.scrollTop
      }
    }
  }, [])

  const getPageScroll = useCallback(() => {
    const body = document.querySelector('body')
    if (body) {
      return body.scrollTop
    }
    return 0
  }, [])

  const isBlogPageRead = useCallback(() => {
    if (isInBlogPage) {
      const footer = document.querySelector('footer')
      const rect = footer?.getBoundingClientRect()
      if (rect) {
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
      }
    }
    return false
  }, [isInBlogPage])

  const handleScroll = useCallback(
    () => setPageState(() => new PageState(getPageScroll(), isBlogPageRead())),
    [getPageScroll, isBlogPageRead]
  )

  useEffect(() => {
    // load when page loads for the first time
    const data = localStorage.getItem(LocalStorageProperties.readStatusProperty)
    let currentPage = new PageState(0, false)
    if (data) {
      const pagesReadingState = JSON.parse(data) as ReadingState
      currentPage = pagesReadingState[readMarkPagePath]
      setPageState(currentPage)
    }
    setDomLoaded(true)

    // if we are in a blog page (to prevent setting all this up in the general posts page)
    if (isInBlogPage) {
      updatePageScroll(currentPage)
      // set up listener to update the page scroll
      window.addEventListener('scroll', handleScroll);
      // clean-up
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [updatePageScroll, handleScroll, readMarkPagePath, isInBlogPage])

  useEffect(() => {
    // make sure pageState is initialized or we store wrong values
    if (pageState) {
      const data = localStorage.getItem(LocalStorageProperties.readStatusProperty)
      let pagesReadingState: ReadingState = {}
      if (data) {
        pagesReadingState = JSON.parse(data) as ReadingState
      }

      localStorage.setItem(
        LocalStorageProperties.readStatusProperty,
        JSON.stringify({
          ...pagesReadingState,
          [readMarkPagePath]: pageState,
        })
      )
    }
  }, [pageState, readMarkPagePath])

  const toggleRead = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setPageState(
      (previous) => new PageState(
        previous?.scrollTop || 0,
        !(previous?.read)
      )
    )
  }

  return (
    <button onClick={toggleRead}>
      {
        domLoaded && (pageState?.read
        ? <CheckCircleIcon fontSize='inherit'/>
        : <RadioButtonUncheckedIcon  fontSize='inherit'/>
      )}
    </button>
  )
}