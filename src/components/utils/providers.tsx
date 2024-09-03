'use client'

import { useState, useEffect, createContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import { LocalStorageProperties } from '../../global/property-names'
import settings from '../../global/app-settings'

export const ThemeContext = createContext(settings.defaultTheme)
export const MobileContext = createContext(true)

export default function Providers({
  children
} : {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState(settings.defaultTheme)
  const isMobile = useMediaQuery({
    query: `(max-width: ${settings.mobileBreakpoint}px)`
  })

  useEffect(() => {
    const data = localStorage.getItem(LocalStorageProperties.themeProperty);
    if (data) {
      setTheme(JSON.parse(data));
    }
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <MobileContext.Provider value={isMobile}>
        {children}
      </MobileContext.Provider>
    </ThemeContext.Provider>
  )
}