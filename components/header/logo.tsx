import Image from 'next/image'
import logo from '../../assets/noArtDev-logo.svg'
import settings from '../../global/app-settings'

export default function Logo() {
  return (
    <Image
      src={logo}
      width={settings.logoSize}
      height={settings.logoSize}
      alt="No Art Dev logo"
      priority
    />
  );
}