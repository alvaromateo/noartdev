'use client'

import { useState, createContext } from 'react'

export const FullScreenModalContext = createContext({
  showModal: false,
  setShowModal: (_: boolean) => {}
})

export default function FullScreenModalProvider({
  children
} : {
  children: React.ReactNode
}) {
  const [showModal, setShowModal] = useState(false)
  const fullscreenModalState = {
    showModal: showModal,
    setShowModal: setShowModal
  }

  return (
    <FullScreenModalContext.Provider value={fullscreenModalState}>
      {children}
    </FullScreenModalContext.Provider>
  )
}