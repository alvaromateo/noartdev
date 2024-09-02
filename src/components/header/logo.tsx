import Image from 'next/image'

import logo from '../../../assets/noArtDev-logo.svg'
import settings from '../../global/app-settings'

export default function Logo() {
  return (
    <div className='w-8 md:w-12'>
      <Image
        src={logo}
        width={settings.logoSize}
        height={settings.logoSize}
        alt="No Art Dev logo"
        priority
      />
    </div>
  );
}