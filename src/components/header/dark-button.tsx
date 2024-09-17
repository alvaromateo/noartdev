'use client'

import { useContext } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { ThemeContext } from '@/src/providers/theme'
import { AppSettings as settings } from '@/src/global/app-config'

export default function DarkButton() {
  const themeState = useContext(ThemeContext)
  return (
    <button className='text-logo' onClick={() => {
      if (themeState.themeName === settings.darkTheme) {
        themeState.setTheme(settings.lightTheme)
      } else {
        themeState.setTheme(settings.darkTheme)
      }
    }}>
      {
        themeState.themeName === settings.darkTheme
          ? <LightModeIcon fontSize='inherit' />
          : <DarkModeIcon fontSize='inherit' />
      }
    </button>
  )
}