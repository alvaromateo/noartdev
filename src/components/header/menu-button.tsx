'use client'

import { useContext } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/routing'
import { FullScreenModalContext } from '@/src/providers/fullscreen-modal'

import FullScreenModal from '../utils/fullscreen-modal'
import MenuIcon from '@mui/icons-material/Menu'
import LinksContainer from './links-container'
import getNavigation from './navigation'
import DarkButton from './dark-button'

export default function MenuButton() {
  const modalState = useContext(FullScreenModalContext)
  const t = useTranslations('Navigation')
  const links = [
    {
    link: '/home',
    messageKey: 'home',
    component: <Link className='text-2xl md:text-base'
      href={{ pathname: '/home' }}>
        {t('home')}
      </Link>,
    }, 
    ...getNavigation(t)
  ]
  return (
    <>
      {
        !modalState.showModal &&
        <button className='text-logo' onClick={
          () => modalState.setShowModal(true)
        }>
          <MenuIcon fontSize='inherit'/>
        </button>
      }
      <FullScreenModal modalState={modalState} topLeftButton={<DarkButton/>}>
        <LinksContainer links={links} forceDisplay={true}/>
      </FullScreenModal>
    </>
  )
}
