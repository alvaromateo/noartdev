'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export default function Accordion({
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
  const [contentHeight, setContentHeight] = useState<number | null>(null)
  const [animationPlaying, setAnimationPlaying] = useState<boolean>(false)

  if (accordionDisplayedRef.current !== accordionDisplayed) {
    setAnimationPlaying(true)
    accordionDisplayedRef.current = accordionDisplayed
  }

  useEffect(() => {
    if (!animationPlaying) return

    const timeoutId = setTimeout(() => {
      setAnimationPlaying(false)
    }, timeout)

    return () => clearTimeout(timeoutId)
  }, [animationPlaying, timeout])

  const onRefChange = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const childNodes = node.getElementsByTagName('div')
      if (childNodes.length > 0) {
        console.log(childNodes[0].clientHeight)
        setContentHeight(childNodes[0].clientHeight)
      }
    }
  }, [])

  let displayClasses = ''
  if (!accordionDisplayed) {
    if (!animationPlaying) {
      displayClasses = 'hidden'
    }
    if (!contentHeight) {
      displayClasses = 'absolute invisible'
    }
  }

  return (
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
      <div className='relative' aria-hidden={!accordionDisplayed} ref={onRefChange}>
        <div className={`${displayClasses} overflow-hidden`} ref={nodeRef}>
          {children}
        </div>
      </div>
    </CSSTransition>
  )
}
