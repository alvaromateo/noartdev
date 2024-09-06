'use client'

import { useState, useEffect, createContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import { LocalStorageProperties } from '../../global/property-names'
import settings from '../../global/app-settings'

export const ThemeContext = createContext({
  theme: settings.defaultTheme,
  setTheme: (_: string) => {}
})
export const MobileContext = createContext(true)
export const FullScreenModalContext = createContext({
  showModal: false,
  setShowModal: (_: boolean) => {}
})

export default function Providers({
  children
} : {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState(settings.defaultTheme)
  const themeState = {
    theme: theme,
    setTheme: setTheme
  }
  const isMobile = useMediaQuery({
    query: `(max-width: ${settings.mobileBreakpoint}px)`
  })
  const [showModal, setShowModal] = useState(false)
  const fullscreenModalState = {
    showModal: showModal,
    setShowModal: setShowModal
  }

  useEffect(() => {
    const data = localStorage.getItem(LocalStorageProperties.themeProperty);
    if (data) {
      setTheme(JSON.parse(data));
    }
  }, []);

  return (
    <ThemeContext.Provider value={themeState}>
      <MobileContext.Provider value={isMobile}>
        <FullScreenModalContext.Provider value={fullscreenModalState}>
          {children}
        </FullScreenModalContext.Provider>
      </MobileContext.Provider>
    </ThemeContext.Provider>
  )
}