'use client'

import { createContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import { AppSettings as settings } from '@/src/global/app-config'

export const MobileContext = createContext(true)

export default function MobileProvider({
  children
} : {
  children: React.ReactNode
}) {
  const isMobile = useMediaQuery({
    query: `(max-width: ${settings.mobileBreakpoint}px)`
  })

  return (
    <MobileContext.Provider value={isMobile}>
      {children}
    </MobileContext.Provider>
  )
}