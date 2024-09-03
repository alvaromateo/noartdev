'use client'

import { useContext } from 'react'
import { MobileContext } from '../utils/providers'

export default function LinksContainer({ children } : { children?: React.ReactNode }) {
  const isMobile = useContext(MobileContext)
  const hideForMobile = isMobile ? 'hidden' : ''
  return (
    <ul className={
        `
        bg-mantle px-6 py-2 rounded-full ${hideForMobile} 
        inline-flex justify-center 
        content-center align-middle flex-row
        `
    }>
      {children}
    </ul>
  )
}