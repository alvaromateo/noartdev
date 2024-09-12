'use client'

import { useContext, useState, useEffect } from 'react'
import { usePathname } from '@/src/i18n/routing';
import { FullScreenModalContext } from '@/src/providers/fullscreen-modal'
import NavLink from './nav-link';

export default function LinksContainer({
  links,
  forceDisplay = false
} : {
  links: Array<{link: string, component: React.ReactNode}>
  forceDisplay?: boolean
}) {
  const { setShowModal } = useContext(FullScreenModalContext)

  const pathname = usePathname()
  const [current, setCurrent] = useState(pathname);
  useEffect ( () => {
    setCurrent(pathname)
  }, [pathname])

  return (
    <div className={forceDisplay ? 'block' : 'hidden md:block'}>
      <ul className={
          `
          bg-mantle px-6 h-full
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
    </div>
  )
}