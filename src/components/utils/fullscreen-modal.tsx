'use client'

import { FullScreenModalState } from '@/src/global/types';
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import './fullscreen-modal.css';

export default function FullScreenModal({
  children,
  modalState,
  topLeftButton,
} : {
  children: React.ReactNode,
  modalState: FullScreenModalState,
  topLeftButton?: React.ReactNode,
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
      <div ref={node} className='h-screen w-full bg-mantle z-50'>
        <div className='relative h-full'>
          <div className='absolute w-full header px-6 md:px-16 flex flex-row justify-between'>
            <div className='flex items-center'>
              { topLeftButton }
            </div>
            <button className='text-logo' onClick={
              () => modalState.setShowModal(false)
            }>
              <CloseIcon fontSize='inherit'/>
            </button>
          </div>
          <div className='py-4 h-full flex items-center justify-center'>
            <div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}