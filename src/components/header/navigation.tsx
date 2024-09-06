import Link from "next/link";

export default function generateNavigation(lang: string) {
  return [
    {
      link: `/${lang}/about`,
      component: <Link className='text-xl md:text-base'
        href={{ pathname: `/${lang}/about` }}>
          About
        </Link>,
    },
    {
      link: `/${lang}/projects`,
      component: <Link className='text-xl md:text-base'
        href={{ pathname: `/${lang}/projects` }}>
          Projects
        </Link>,
    },
    {
      link: `/${lang}/blog`,
      component: <Link className='text-xl md:text-base'
        href={{ pathname: `/${lang}/blog` }}>
          Blog
        </Link>,
    },
    {
      link: `/${lang}/hobbies`,
      component: <Link className='text-xl md:text-base'
        href={{ pathname: `/${lang}/hobbies` }}>
          Hobbies
        </Link>,
    },
  ]
}