'use client'

import { useContext } from 'react'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import { RecentLinksContext } from '@/src/providers/recent-links'
import { Link } from '@/src/i18n/routing'
import { useTranslations } from 'next-intl'

export default function RecentLinks() {
  const recentLinks = useContext(RecentLinksContext)
  const t = useTranslations('Home')

  return (
    <ul>
      { recentLinks.length === 0 &&
        <li className='text-link text-sm md:text-base'>
          {t('visit')}
        </li>
      }
      {
        recentLinks.map(link => {
          return (
            <li key={link.link}>
              <Link className='text-link text-sm md:text-base' href={{ pathname: link.link }}>
                  <span><KeyboardArrowRightOutlinedIcon fontSize='inherit'/></span>
                  {link.title}
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}
