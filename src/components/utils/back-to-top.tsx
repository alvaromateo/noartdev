'use client'

import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { createPortal } from 'react-dom'

const windowPercentScroll = 0.4

export default function BackToTop() {
  const [windowHeight, setWindowHeight] = useState<number>()
  const lastScroll = useRef<number>(0)
  const [displayButton, setDisplayButton] = useState(false)

  const windowResizeListener = useCallback(
    () => {
      setWindowHeight(window.screen.availHeight)
    }, [])

  const scrollListener = useCallback(() => {
    const currentScroll = document.documentElement.scrollTop
    if (windowHeight) {
      // determine direction of scroll
      if (currentScroll > lastScroll.current) {
        // down
        if (currentScroll > windowPercentScroll * windowHeight) {
          setDisplayButton(true)
        }
      } else {
        // up
        if (currentScroll < windowPercentScroll * windowHeight) {
          setDisplayButton(false)
        }
      }
    }
    lastScroll.current = currentScroll
  }, [windowHeight])

  const scrollToTop = useCallback(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
    const height = window.screen.availHeight
    const currentScroll = document.documentElement.scrollTop
    lastScroll.current = currentScroll

    if (currentScroll > windowPercentScroll * height) {
      setDisplayButton(true)
    }
    setWindowHeight(height)

    window.addEventListener('resize', windowResizeListener)
    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('resize', windowResizeListener)
      window.removeEventListener('scroll', scrollListener)
    }
  }, [windowResizeListener, scrollListener])

  return displayButton && createPortal(
    <div className='flex flex-row justify-end sticky bottom-[5%]'>
      <button onClick={scrollToTop}
        className={`
          rounded-full p-2 md:p-4 text-sm-logo md:text-logo
          mr-4 md:mr-8 lg:mr-12
          bg-surface-0 text-link hover:text-hover-link 
      `}>
        <KeyboardArrowUpIcon fontSize='inherit'/>
      </button>
    </div>,
    getHeaderAndContent()
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