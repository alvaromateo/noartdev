'use client'

import { useContext } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import FullScreenModal from '../utils/fullscreen-modal'
import { FullScreenModalContext } from '../utils/providers'
import LinksContainer from './links-container'
import generateNavigation from './navigation'

export default function MenuButton({ lang } : { lang: string }) {
  const modalState = useContext(FullScreenModalContext)
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
      <FullScreenModal modalState={modalState}>
        <LinksContainer links={generateNavigation(lang)}/>
      </FullScreenModal>
    </>
  )
}
