'use client'

import { useContext } from 'react'
import { MobileContext } from '../utils/body'
import MenuButton from './menu-button'
import DarkButton from './dark-button'

export default function ButtonsContainer() {
  const isMobile = useContext(MobileContext)
  return (
    // same font-size as the logo
    <>
      { isMobile
        ? <MenuButton />
        : <DarkButton />
      }
    </>
  )
}