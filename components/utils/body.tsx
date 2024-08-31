'use client'

import { useState, useEffect, createContext } from 'react'
import { Ubuntu_Mono } from 'next/font/google'
import { LocalStorageProperties } from '../../global/property-names'
import { ThemeState } from '../../global/types'
import settings from '../../global/app-settings'

// TODO: change font
const ubuntuMono = Ubuntu_Mono({
  weight: ['400', '700'],
  subsets: ['latin']
})

const defaultTheme: ThemeState = {
  theme: settings.defaultTheme,
  setTheme: (_) => {}
}
export const ThemeContext = createContext(defaultTheme)

export default function Body({
  children
} : {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState(settings.defaultTheme)
  const themeState: ThemeState = {
    theme: theme,
    setTheme: setTheme
  }

  useEffect(() => {
    const data = localStorage.getItem(LocalStorageProperties.themeProperty);
    if (data) {
      setTheme(JSON.parse(data));
    }
  }, []);

  return (
    <body className={`${ubuntuMono.className} ${theme}`}>
      <ThemeContext.Provider value={themeState}>
        {children}
      </ThemeContext.Provider>
    </body>
  )
}