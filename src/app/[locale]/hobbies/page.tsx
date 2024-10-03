import { Props } from '@/src/global/types/custom'
import { Metadata, ResolvingMetadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'

export default async function Hobbies({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const t = await getTranslations('Hobbies')

  return (
    <div className='flex w-full justify-center'>
      <div className='flex flex-col justify-center items-center'>
        <p className='text-xl md:text-2xl'>
          {t('comingSoon')}
        </p>
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
    title: t('hobbies'),
    description: t('hobbiesDescription'),
    keywords: [...keywords, 'hobbies'],
    authors: parentMetadata.authors,
    generator: parentMetadata.generator,
    openGraph: {
      ...openGraph,
      title: t('hobbies'),
      description: t('hobbiesDescription'),
      url: 'https://noart.dev/hobbies',
    }
  };
}