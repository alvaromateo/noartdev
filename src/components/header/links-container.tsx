'use client'

import { useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { MobileContext } from '../utils/providers'
import NavLink from './nav-link';

export default function LinksContainer({
  links
} : {
  links: Array<{link: string, component: React.ReactNode}>
}) {
  const isMobile = useContext(MobileContext)
  const hideForMobile = isMobile ? 'hidden' : ''

  const pathname = usePathname()
  const [current, setCurrent] = useState(pathname);
  useEffect ( () => {
    setCurrent(pathname)
  }, [pathname])

  return (
    <ul className={
        `
        bg-mantle px-6 rounded-full ${hideForMobile} 
        ring-1 ring-crust
        inline-flex justify-center 
        content-center align-middle flex-row
        `
    }>
      {
        links.map(linkObj => {
          const selected = current === linkObj.link
          return (
            <NavLink selected={selected}>
              {linkObj.component}
            </NavLink>
          )
        })
      }
    </ul>
  )
}