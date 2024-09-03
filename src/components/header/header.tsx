import Link from 'next/link'
import dynamic from 'next/dynamic';
import Logo from './logo';

const LinksComponent = dynamic(() => import('./links-container'),
  { ssr: false })
const ButtonsComponent = dynamic(() => import('./buttons-container'),
  { ssr: false })

export default function Header(props: { lang: string }) {
  const navigation = [
    {
      link: `/${props.lang}/about`,
      component: <Link href={{ pathname: `/${props.lang}/about` }}>About</Link>,
    },
    {
      link: `/${props.lang}/projects`,
      component: <Link href={{ pathname: `/${props.lang}/projects` }}>Projects</Link>,
    },
    {
      link: `/${props.lang}/blog`,
      component: <Link href={{ pathname: `/${props.lang}/blog` }}>Blog</Link>,
    },
    {
      link: `/${props.lang}/hobbies`,
      component: <Link href={{ pathname: `/${props.lang}/hobbies` }}>Hobbies</Link>,
    },
  ]

  return (
    <header className='py-4 px-8'>
      <nav className='flex flex-row justify-between items-center'>
        <Link href={{ pathname: `/${props.lang}/home` }}>
          <Logo></Logo>
        </Link>

        <LinksComponent links={navigation}/>

        <ButtonsComponent/>
      </nav>
    </header>
  )
}
