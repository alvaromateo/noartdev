'use client'

import { useTranslations } from 'next-intl'
import SearchIcon from '@mui/icons-material/Search'

export default function Search() {
  const t = useTranslations('Common')
  return (
    <div className='relative text-base md:text-2xl'>
      <input type='text' placeholder={t('search')}
        className={`
          text-xs md:text-base
          pl-4 py-2 rounded-full ring-1 ring-surface-1 w-full bg-surface-0 text-overlay-2
          focus:outline focus:outline-2 focus:outline-title
          active:outline active:outline-2 active:outline-title
        `}/>
      <SearchIcon className={`
          text-overlay-2 absolute right-[5%] top-2
        `} fontSize='inherit'/>
    </div>
  )
}