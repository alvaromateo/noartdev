'use client'

import { FullScreenModalState } from '@/src/global/types';
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import './fullscreen-modal.css';

export default function FullScreenModal({
  children,
  modalState
} : {
  children: React.ReactNode,
  modalState: FullScreenModalState
}) {
  const node = useRef(null)
  return (
    <CSSTransition
      nodeRef={node}
      in={modalState.showModal}
      timeout={150}
      classNames='fullscreen-modal'
      mountOnEnter
      unmountOnExit
    >
      <div ref={node} className='h-screen w-full bg-mantle z-10'>
        <div className='flex flex-col h-full'>
          <div className='py-2 px-3 flex flex-row justify-end'>
            <button className='text-logo' onClick={
              () => modalState.setShowModal(false)
            }>
              <CloseIcon fontSize='inherit'/>
            </button>
          </div>
          <div className='py-4 h-full'>
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}