import Image from 'next/image'

import logo from '../../../assets/noArtDev-logo.svg'
import { AppSettings as settings } from '@/src/global/app-config'

export default function Logo() {
  return (
    <div className='w-10 md:w-16'>
      <Image
        src={logo}
        width={settings.logoSize}
        height={settings.logoSize}
        alt='No Art Dev logo'
        priority
      />
    </div>
  )
}