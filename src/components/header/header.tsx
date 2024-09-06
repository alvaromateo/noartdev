import Link from 'next/link'
import dynamic from 'next/dynamic';
import Logo from './logo';
import generateNavigation from './navigation';

const LinksComponent = dynamic(() => import('./links-container'),
  { ssr: false })
const ButtonsComponent = dynamic(() => import('./buttons-container'),
  { ssr: false })

export default function Header(props: { lang: string }) {
  return (
    <header className='py-2 md:py-4 px-3 md:px-8'>
      <nav className='flex flex-row justify-between items-center'>
        <Link href={{ pathname: `/${props.lang}/home` }}>
          <Logo></Logo>
        </Link>
        <LinksComponent links={generateNavigation(props.lang)} desktopNavigation={true}/>
        <ButtonsComponent lang={props.lang}/>
      </nav>
    </header>
  )
}
