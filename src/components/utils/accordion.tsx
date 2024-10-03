'use client'

import { ariaHidden } from '@mui/material/Modal/ModalManager'
import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

function Accordion({
  children,
  accordionDisplayed,
  timeout,
} : {
  children: React.ReactNode,
  accordionDisplayed: boolean,
  timeout?: number,
}) {
  timeout = timeout || 1500
  const nodeRef = useRef<HTMLDivElement>(null)
  const accordionDisplayedRef = useRef<boolean>(accordionDisplayed)
  const [windowWidth, setWindowWidth] = useState<number>()
  const [contentHeight, setContentHeight] = useState<number | null>(null)
  const [animationPlaying, setAnimationPlaying] = useState<boolean>(false)

  if (accordionDisplayedRef.current !== accordionDisplayed) {
    setAnimationPlaying(true)
    accordionDisplayedRef.current = accordionDisplayed
  }

  const windowResizeListener = useCallback(() => {
    setWindowWidth(window.screen.availHeight)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', windowResizeListener)
    return () => window.removeEventListener('resize', windowResizeListener)
  }, [windowResizeListener])

  useEffect(() => {
    if (!animationPlaying) return

    const timeoutId = setTimeout(() => {
      setAnimationPlaying(false)
    }, timeout)

    return () => clearTimeout(timeoutId)
  }, [animationPlaying, timeout])

  useLayoutEffect(() => {
    const node = nodeRef.current
    if (node) {
      const elements = node.getElementsByTagName('div')
      if (elements.length > 0) {
        const contentWrapper = elements[0]
        const rect = contentWrapper.getBoundingClientRect()
        if (rect.height !== 0 && rect.height !== contentHeight) {
          setContentHeight(rect.height)
          node.style.height = `${rect.height}px`
        }
      }
    }
  }, [children, contentHeight, windowWidth])

  let displayClasses = ''
  if (!accordionDisplayed && !animationPlaying) {
    // if contentHeight is still not set we don't want to hide the contents
    // otherwise when useLayoutEffect runs, we will have a height of 0
    if (contentHeight) {
      displayClasses = 'hidden'
    }
  }

  // we have to render the first div to force the component to render and
  // recalculate the height in useLayoutEffect, but we set it as 'hidden'
  return (
    <>
      <div className='hidden' aria-hidden={true}>
        {windowWidth}
      </div>
      <CSSTransition
        nodeRef={nodeRef}
        in={accordionDisplayed}
        timeout={timeout}
        classNames='accordion'
        onEnter={() => {
          if (nodeRef.current) {
            nodeRef.current.style.height = '0px'
          }
        }}
        onEntering={() => {
          if (nodeRef.current) {
            nodeRef.current.style.height = `${contentHeight}px`
            nodeRef.current.style.transition = `height ${timeout}ms ease-out`
          }
        }}
        onEntered={() => {
          if (nodeRef.current) {
            nodeRef.current.style.height = `${contentHeight}px`
          }
        }}
        onExit={() => {
          if (nodeRef.current) {
            nodeRef.current.style.height = `${contentHeight}px`
          }
        }}
        onExiting={() => {
          if (nodeRef.current) {
            nodeRef.current.style.height = '0px'
            nodeRef.current.style.transition = `height ${timeout}ms ease-out`
          }
        }}
        onExited={() => {
          if (nodeRef.current) {
            nodeRef.current.style.height = '0px'
          }
        }}
      >
        <>
          <div className={`${displayClasses} overflow-hidden`}
            aria-hidden={!accordionDisplayed} ref={nodeRef}>
              <div>
                {children}
              </div>
          </div>
        </>
      </CSSTransition>
    </>
  )
}

const memoizedAccordion = memo(Accordion)
export default memoizedAccordion