import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { unstable_setRequestLocale } from 'next-intl/server'

import SearchIcon from '@mui/icons-material/Search';
import portrait from '/assets/watercolor_portrait.png'
import RecentLinks from '@/src/components/home/recent-links';

const imageDiameter = 400;

export default async function Home({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const t = await getTranslations('Home')

  return (
    <div className={`
      grid gap-y-12 grid-cols-1 grid-rows-[auto_auto_auto]
      md:gap-x-16 md:gap-y-16 md:grid-cols-2 md:grid-rows-2
      md:justify-items-stretch md:items-center
    `}>
      <div className={`
        flex flex-col w-full justify-center
        col-start-1 row-start-3
        md:col-start-1 md:row-span-2
      `}>
        <figure>
          <Image
            src={portrait}
            width={imageDiameter}
            height={imageDiameter}
            alt='Picture of the author'
            className='rounded-full ring-2 ring-crust mx-auto shadow-md shadow-crust'/>
          <figcaption className='text-xs mt-4 md:mt-8 text-center'>
            <h4 className='text-sm text-title'>{t('imageDisclaimer.title')}</h4>
            <p>{t('imageDisclaimer.contentP1')}</p>
            <p>{t('imageDisclaimer.contentP2')}</p>
          </figcaption>
        </figure>
      </div>
      <div className={`
        pl-[10%] md:pl-0
        col-start-1 row-start-1
        md:col-start-2 md:row-start-1
        md:self-end
      `}>
        <h1 className='mb-12'>
          <span className='block text-title text-4xl'>No art.</span>
          <span className='text-mauve text-6xl'>Dev</span>
        </h1>
        <div className='relative'>
          <input type='text' placeholder='Search'
            className={`
              pl-4 py-2 rounded-full ring-1 ring-surface-1 w-4/5 bg-surface-0 text-overlay-2
              focus:outline focus:outline-2 focus:outline-title
              active:outline active:outline-2 active:outline-title
            `}/>
          <SearchIcon className='text-2xl text-overlay-2 absolute right-[22.5%] top-2' fontSize='inherit'/>
        </div>
      </div>
      <div className={`
        pl-[10%] md:pl-0
        col-start-1 row-start-2
        md:col-start-2 md:row-start-2
        md:self-start
      `}>
        <h3 className='text-subtitle'>{t('recent')}</h3>
        <RecentLinks/>
      </div>
    </div>
  )
}
