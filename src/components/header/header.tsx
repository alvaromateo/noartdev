import { getTranslations } from 'next-intl/server'
import { Link } from '@/src/i18n/routing'
import { Suspense } from 'react'
import { spaceMono } from '@/src/global/fonts'

import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import Logo from './logo'
import getNavigation from './navigation'
import LinksContainer from './links-container'
import ButtonsContainer from './buttons-container'

export default async function Header() {
  const t = await getTranslations('Navigation')
  const links = getNavigation(t)
  return (
    <header className={`
      ${spaceMono.className}
      header flex items-center px-6 md:px-16
    `}>
      <nav className='w-full flex flex-row justify-between items-center'>
        <Link href={{ pathname: `/home` }}>
          <Logo></Logo>
        </Link>
        <LinksContainer links={links} />
        <Suspense fallback={
          <HourglassBottomIcon />
        }>
          <ButtonsContainer />
        </Suspense>
      </nav>
    </header>
  )
}
