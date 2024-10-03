'use client'

import { useContext } from 'react'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import { RecentLinksContext } from '@/src/providers/recent-links'
import { Link } from '@/src/i18n/routing'
import { useTranslations } from 'next-intl'
import { linkToMessageKey } from '@/src/global/app-config'

export default function RecentLinks() {
  const recentLinks = useContext(RecentLinksContext)
  const t = useTranslations('Navigation')

  return (
    <ul>
      {
        recentLinks.map(link => {
          return (
            <li key={link}>
              <Link className='text-link text-sm md:text-base' href={{ pathname: link }}>
                  <span><KeyboardArrowRightOutlinedIcon fontSize='inherit'/></span>
                  {t(linkToMessageKey(link) || 'home')}
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}
