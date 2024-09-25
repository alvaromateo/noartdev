import { Link } from '@/src/i18n/routing'
import { NavigationItem } from '@/src/global/types/custom'

let navigation: NavigationItem[] | undefined
type translateFunction = (key: string) => string

export default function getNavigation(
  t: translateFunction
) {
  if (!navigation) {
    navigation  = [
      {
        link: '/about',
        messageKey: 'about',
        component: <Link className='text-2xl md:text-sm'
          href={{ pathname: '/about' }}>
            {t('about')}
          </Link>,
      },
      {
        link: '/projects',
        messageKey: 'projects',
        component: <Link className='text-2xl md:text-sm'
          href={{ pathname: '/projects' }}>
            {t('projects')}
          </Link>,
      },
      {
        link: '/blog',
        messageKey: 'blog',
        component: <Link className='text-2xl md:text-sm'
          href={{ pathname: '/blog' }}>
            {t('blog')}
          </Link>,
      },
      {
        link: '/hobbies',
        messageKey: 'hobbies',
        component: <Link className='text-2xl md:text-sm'
          href={{ pathname: '/hobbies' }}>
            {t('hobbies')}
          </Link>,
      },
    ]
  }

  return navigation
}