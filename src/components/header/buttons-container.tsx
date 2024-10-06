'use client'

import { useContext, useEffect, useState } from 'react'
import { MobileContext } from '@/src/providers/mobile'
import MenuButton from './menu-button'
import DarkButton from './dark-button'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'

export default function ButtonsContainer() {
  const isMobile = useContext(MobileContext)
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  return (
    <>
    {
      !domLoaded && (
        <div className='text-logo'>
          <HourglassBottomIcon fontSize='inherit'/>
        </div>
      )
    }
    {
      domLoaded && (isMobile
      ? <MenuButton />
      : <DarkButton />
    )}
    </>
  )
}