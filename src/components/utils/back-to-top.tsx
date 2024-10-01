'use client'

import { useCallback } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export default function BackToTop({
  placeholder,
  displayButton,
} : {
  placeholder: React.ReactNode,
  displayButton: boolean
}) {
  const scrollToTop = useCallback(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  return displayButton ?
    <button onClick={scrollToTop}
      className={`
        rounded-full p-2 md:p-3 text-sm-logo md:text-logo
        bg-surface-1 text-link hover:text-hover-link 
    `}>
      <KeyboardArrowUpIcon fontSize='inherit'/>
    </button>
    : placeholder
}
