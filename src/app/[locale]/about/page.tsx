import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import Image from 'next/image'

import portrait from '/assets/photo-linkedin.jpg'
import Card from '@/src/components/about/card'

const imageDiameter = 200

export default async function About({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const t = await getTranslations('About')
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
          <figcaption className='text-sm mt-4 md:mt-8 text-center w-4/5 mx-auto'>
            <h3 className='text-xl text-title mb-4'>{t('fullName')}</h3>
            <p>{t('bioIntro')}</p>
            <p>{t('bioP1')} {t('bioP2')}</p>
          </figcaption>
        </figure>
      </div>
      <div className={`
        pl-[10%] md:pl-0
        col-start-1 row-start-1
        md:col-start-2 md:row-start-1
        md:self-end
      `}>
        <Card>Test</Card>
      </div>
      <div className={`
        pl-[10%] md:pl-0
        col-start-1 row-start-2
        md:col-start-2 md:row-start-2
        md:self-start
      `}>
      </div>
    </div>
  )
}
