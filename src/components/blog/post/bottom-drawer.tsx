'use client'

import { createPortal } from 'react-dom'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import BackToTop from '@/src/components/utils/back-to-top'
import Progress from './progress'
import ReadMark from './read-mark'
import { MobileContext } from '@/src/providers/mobile'

const windowPercentScroll = 0.25
const mobileFooterHeight = 80
const desktopFooterHeight = 96

export default function BottomDrawer() {
  const [windowHeight, setWindowHeight] = useState<number>()
  const [documentHeight, setDocumentHeight] = useState<number>()
  const lastScroll = useRef<number>(0)
  const [currentScroll, setCurrentScroll] = useState(0)
  const [display, setDisplay] = useState(false)
  const isMobile = useContext(MobileContext)

  const windowResizeListener = useCallback(
    () => {
      setWindowHeight(window.screen.availHeight)
    }, [])

  const calculateScrollPercentage = useCallback(
    (scroll: number) => {
      let totalHeight = documentHeight
      if (documentHeight) {
        totalHeight = documentHeight - (isMobile ?
          mobileFooterHeight : desktopFooterHeight)
      } else {
        totalHeight = 1
      }
      let viewportHeight = windowHeight || 0
      return ((viewportHeight + scroll) / totalHeight) * 100
    }, [windowHeight, documentHeight, isMobile])

  const scrollListener = useCallback(() => {
    const scroll = document.documentElement.scrollTop
    setCurrentScroll(scroll)
    if (windowHeight) {
      // determine direction of scroll
      if (scroll > lastScroll.current) {
        // down
        if (scroll > windowPercentScroll * windowHeight) {
          setDisplay(true)
        }
      } else {
        // up
        if (scroll < windowPercentScroll * windowHeight) {
          setDisplay(false)
        }
      }
    }
    lastScroll.current = scroll
  }, [windowHeight])

  useEffect(() => {
    const viewportHeight = window.innerHeight || 0
    const scroll = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const heightObserver = new ResizeObserver(entries => 
      setDocumentHeight(entries[0].target.clientHeight)
    )

    if (scroll > windowPercentScroll * viewportHeight) {
      setDisplay(true)
    }
    setCurrentScroll(scroll)
    setWindowHeight(viewportHeight)
    setDocumentHeight(scrollHeight)
    lastScroll.current = scroll

    window.addEventListener('resize', windowResizeListener)
    window.addEventListener('scroll', scrollListener)
    heightObserver.observe(document.body)

    return () => {
      window.removeEventListener('resize', windowResizeListener)
      window.removeEventListener('scroll', scrollListener)

    }
  }, [windowResizeListener, scrollListener])

  const placeholder = <div className='w-16 h-16'/>

  return (
    <div>
      <ReadMark blogPageScroll={currentScroll}
        calculateScrollPercentage={calculateScrollPercentage}/>
      { windowHeight &&
        createPortal(
          <div className='flex flex-row justify-between items-center sticky bottom-[5%] px-10'>
            { placeholder }
            <Progress percentage={calculateScrollPercentage(currentScroll)}
              display={display}/>
            <BackToTop displayButton={display} placeholder={placeholder}/>
          </div>,
          getHeaderAndContent()
        )
      }
    </div>
  )
}

const getHeaderAndContent = () => {
  const elements = document.getElementsByClassName('header-and-content')
  if (elements.length > 0) {
    const element = elements[0]
    return element
  }
  return document.body
}
