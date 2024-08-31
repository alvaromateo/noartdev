'use client'

import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import logo from '../../assets/noArtDev-logo.svg'
import settings from '../../app/app-settings'

export default function Logo() {
  const isMobile = useMediaQuery({
    query: `(max-width: ${settings.mobileBreakpoint}px)`
  })
  const logoSize = isMobile ? 16 : 64

  return (
    <Image
      src={logo}
      width={logoSize}
      height={logoSize}
      alt="No Art Dev logo"
      priority
    />
  );
}