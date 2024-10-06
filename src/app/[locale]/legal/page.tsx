import { spaceMono } from '@/src/global/fonts'
import { Props } from '@/src/global/types/custom'
import { Link } from '@/src/i18n/routing'
import { Metadata, ResolvingMetadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'

export default async function Legal({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const t = await getTranslations('Navigation')

  return (
    <div className='flex w-full justify-center'>
      <div className='flex flex-col justify-center items-start'>
        <h1 className={`
          text-2xl font-bold text-title mb-4
          md:text-3xl/[2rem] text-center md:mb-8
          ${spaceMono.className}
        `}>
          {t('legal')}
        </h1>
        <Link href={{ pathname: '/legal/terms'}}
          className='text-lg md:text-2xl text-link hover:text-hover-link'>
          {t('terms')}
        </Link>
        <Link href={{ pathname: '/legal/privacy'}}
          className='text-lg md:text-2xl text-link hover:text-hover-link'>
          {t('privacy')}
        </Link>
      </div>
    </div>
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
    title: t('legal'),
    description: t('legalDescription'),
    keywords: [...keywords, 'legal'],
    authors: parentMetadata.authors,
    generator: parentMetadata.generator,
    openGraph: {
      ...openGraph,
      title: t('legal'),
      description: t('legalDescription'),
      url: 'https://noart.dev/legal',
    }
  };
}