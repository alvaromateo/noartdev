import { getTranslations } from 'next-intl/server'
import SearchIcon from '@mui/icons-material/Search'

export default async function Search() {
  const t = await getTranslations('Common')
  return (
    <div className='relative'>
      <input type='text' placeholder={t('search')}
        className={`
          pl-4 py-2 rounded-full ring-1 ring-surface-1 w-4/5 bg-surface-0 text-overlay-2
          focus:outline focus:outline-2 focus:outline-title
          active:outline active:outline-2 active:outline-title
        `}/>
      <SearchIcon className='text-2xl text-overlay-2 absolute right-[22.5%] top-2' fontSize='inherit'/>
    </div>
  )
}