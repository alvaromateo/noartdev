'use client'

import { useContext } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { ThemeContext } from '../utils/providers'
import settings from '../../global/app-settings'

export default function DarkButton() {
  const themeState = useContext(ThemeContext)
  return (
    <button className='text-logo' onClick={() => {
      if (themeState.theme === settings.darkTheme) {
        themeState.setTheme(settings.lightTheme)
      } else {
        themeState.setTheme(settings.darkTheme)
      }
    }}>
      {
        themeState.theme === settings.darkTheme
          ? <LightModeIcon fontSize='inherit' />
          : <DarkModeIcon fontSize='inherit' />
      }
    </button>
  );
}