'use client'

import { useContext } from 'react'
import { Ubuntu_Mono } from 'next/font/google'
import { FullScreenModalContext, ThemeContext } from '../utils/providers'
import { StaticParams } from '../../global/types'

const ubuntuMono = Ubuntu_Mono({
  weight: ['400', '700'],
  subsets: ['latin']
})

export default function Html({
  children,
  params
} : {
  children: React.ReactNode
  params: StaticParams
}) {
  const themeState = useContext(ThemeContext)
  const fullScreenModalState = useContext(FullScreenModalContext)
  return (
    <html lang={params.lang} className={`${themeState.theme} bg-mantle`}>
      <body className={`
        ${ubuntuMono.className} bg-basic
        ${fullScreenModalState.showModal ? 'overflow-hidden' : ''}
      `}>
        {children}
      </body>
    </html>
  )
}