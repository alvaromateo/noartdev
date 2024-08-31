'use client'

import { useMediaQuery } from 'react-responsive'
import MenuButton from './menu-button';
import DarkButton from './dark-button';
import Logo from './logo';
import settings from '../../global/app-settings'
import { ThemeState } from '../../global/types'

export default function Header() {
  const isMobile = useMediaQuery({
    query: `(max-width: ${settings.mobileBreakpoint}px)`
  })

  return (
    <header className='bg-mantle flex'>
      <nav>
        <Logo></Logo>
        { !isMobile ? 
          <ul>
            <li>About</li>
            <li>Projects</li>
            <li>Articles</li>
            <li>Hobbies</li>
          </ul>
          : null
        }
        { isMobile
          ? <MenuButton />
          : <DarkButton />
        }
      </nav>
    </header>
  )
}