'use client'

import { useContext } from 'react'
import { ubuntuMono } from '@/src/global/fonts'
import { FullScreenModalContext } from '@/src/providers/fullscreen-modal'
import { ThemeContext } from '@/src/providers/theme'
import CookieBanner from '../legal/cookie-banner'

export default function Html({
  children,
  locale
} : {
  children: React.ReactNode,
  locale: string
}) {
  const themeState = useContext(ThemeContext)
  const fullScreenModalState = useContext(FullScreenModalContext)

  return (
    <html lang={locale} className={`${themeState.themeName} bg-mantle scroll-smooth`}>
      <body className={`
        ${ubuntuMono.className} bg-basic
        ${fullScreenModalState.showModal ? 'overflow-hidden' : ''}
      `}>
        <>
          {children}
          <CookieBanner/>
        </>
      </body>
    </html>
  )
}