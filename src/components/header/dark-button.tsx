'use client'

import { useContext } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { ThemeContext } from '../utils/providers'
import settings from '../../global/app-settings'

export default function DarkButton() {
  const theme = useContext(ThemeContext)
  return (
    <button className='text-xl md:text-3xl'>
      {
        theme === settings.darkTheme
          ? <LightModeIcon fontSize='inherit' />
          : <DarkModeIcon fontSize='inherit' />
      }
    </button>
  );
}