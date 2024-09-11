'use client'

import { useState, useEffect, createContext } from 'react'
import { LocalStorageProperties } from '@/src/global/property-names'
import { AppSettings as settings } from '@/src/global/app-config'
import { ThemeState } from '../global/types'


export const ThemeContext = createContext<ThemeState>({
  themeName: settings.defaultTheme,
  setTheme: (_: string) => {}
})

export default function ThemeProvider({
  children
} : {
  children: React.ReactNode
}) {
  const [theme, setThemeState] = useState(settings.defaultTheme)
  const themeState: ThemeState = {
    themeName: theme,
    setTheme: (newTheme: string) => {
      localStorage.setItem(LocalStorageProperties.themeProperty, newTheme)
      setThemeState(newTheme)
    }
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem(LocalStorageProperties.themeProperty)
    if (storedTheme) {
      setThemeState(storedTheme)
    }
  }, []);

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  )
}