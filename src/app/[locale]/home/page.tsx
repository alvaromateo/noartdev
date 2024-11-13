import Image from 'next/image'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { spaceMono } from '@/src/global/fonts'

import portrait from '/public/images/watercolor_portrait.png'
import RecentLinks from '@/src/components/home/recent-links'
import Search from '@/src/components/search/search'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import { Props } from '@/src/global/types/custom'
import { Metadata, ResolvingMetadata } from 'next'

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
          <h2 className='mb-1 md:mb-2 text-base md:text-lg text-subtext'>{t('recent')}</h2>
          <RecentLinks/>
        </div>
      </div>
    </>
  )
}

export async function generateMetadata(
  { params } : Props,
  parent: ResolvingMetadata
) : Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'Navigation'
  });
  const parentMetadata = await parent
  const keywords = parentMetadata.keywords || []
  const openGraph = parentMetadata.openGraph as OpenGraph

  return {
    metadataBase: parentMetadata.metadataBase,
    title: t('home'),
    description: t('homeDescription'),
    keywords: [...keywords, 'landing', 'home'],
    authors: parentMetadata.authors,
    generator: parentMetadata.generator,
    openGraph: {
      ...openGraph,
      title: t('home'),
      description: t('homeDescription'),
      url: 'https://noart.dev/home',
    }
  };
}