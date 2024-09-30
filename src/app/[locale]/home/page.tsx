import Image from 'next/image'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { spaceMono } from '@/src/global/fonts'

import portrait from '/assets/images/watercolor_portrait.png'
import RecentLinks from '@/src/components/home/recent-links'
import Search from '@/src/components/utils/search'

const imageDiameter = 400

export default async function Home({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const t = await getTranslations('Home')

  return (
    <>
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
              priority
              className='rounded-full ring-2 ring-crust mx-auto shadow-md shadow-crust'/>
            <figcaption className='text-xs mt-4 md:mt-8 text-center'>
              <h3 className='text-sm text-title'>{t('imageDisclaimer.title')}</h3>
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
          <h1 className={`${spaceMono.className} mb-12`}>
            <span className='block text-subtitle text-4xl'>No art.</span>
            <span className='text-title text-6xl'>Dev</span>
          </h1>
          <Search/>
        </div>
        <div className={`
          pl-[10%] md:pl-0
          col-start-1 row-start-2
          md:col-start-2 md:row-start-2
          md:self-start
        `}>
          <h2 className='text-subtext'>{t('recent')}</h2>
          <RecentLinks/>
        </div>
      </div>
    </>
  )
}
