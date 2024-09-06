'use client'

import { useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { FullScreenModalContext, MobileContext } from '../utils/providers'
import NavLink from './nav-link';

export default function LinksContainer({
  links,
  desktopNavigation = false
} : {
  links: Array<{link: string, component: React.ReactNode}>
  desktopNavigation?: boolean
}) {
  const isMobile = useContext(MobileContext)
  const { setShowModal } = useContext(FullScreenModalContext)
  const hideForMobile = isMobile && desktopNavigation ? 'hidden' : ''

  const pathname = usePathname()
  const [current, setCurrent] = useState(pathname);
  useEffect ( () => {
    setCurrent(pathname)
  }, [pathname])

  return (
    <ul className={
        `
        bg-mantle px-6 h-full ${hideForMobile}
        md:rounded-full md:ring-1 md:ring-crust
        flex flex-col md:flex-row justify-center 
        content-center align-middle items-center
        `
    }>
      {
        links.map(linkObj => {
          const selected = current === linkObj.link
          return (
            <NavLink selected={selected} key={linkObj.link}
              setShowModal={setShowModal}
            >
              {linkObj.component}
            </NavLink>
          )
        })
      }
    </ul>
  )
}