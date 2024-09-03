'use client'

import { useContext } from 'react'
import { Ubuntu_Mono } from 'next/font/google'
import { ThemeContext } from '../utils/providers'
import { StaticParams } from '../../global/types'

// TODO: change font
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
  return (
    <html lang={params.lang} className={`${themeState.theme}`}>
      <body className={`${ubuntuMono.className} bg-base`}>
        {children}
      </body>
    </html>
  )
}