import Link from 'next/link'
import dynamic from 'next/dynamic';
import NavLink from './nav-link'

const LogoComponent = dynamic(() => import('./logo'),
  { ssr: false })
const LinksComponent = dynamic(() => import('./links-container'),
  { ssr: false })
const ButtonsComponent = dynamic(() => import('./buttons-container'),
  { ssr: false })

export default function Header(props: { lang: string }) {
  return (
    <header className='p-4'>
      <nav className='flex flex-row justify-between items-center'>
        <Link href={{ pathname: `/${props.lang}/home` }}>
          <LogoComponent></LogoComponent>
        </Link>

        <LinksComponent>
          <NavLink pathName={`/${props.lang}/about` }>About</NavLink>
          <NavLink pathName={`/${props.lang}/projects` }>Projects</NavLink>
          <NavLink pathName={`/${props.lang}/blog` }>Blog</NavLink>
          <NavLink pathName={`/${props.lang}/hobbies` }>Hobbies</NavLink>
        </LinksComponent>

        <ButtonsComponent/>
      </nav>
    </header>
  )
}
