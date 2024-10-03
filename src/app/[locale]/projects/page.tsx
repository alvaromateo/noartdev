import { Props } from '@/src/global/types/custom'
import { Metadata, ResolvingMetadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'

export default async function Projects({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  return (
    <p>Hello world!</p>
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
    title: t('projects'),
    description: t('projectsDescription'),
    keywords: [...keywords, 'projects'],
    authors: parentMetadata.authors,
    generator: parentMetadata.generator,
    openGraph: {
      ...openGraph,
      title: t('projects'),
      description: t('projectsDescription'),
      url: 'https://noart.dev/projects',
    }
  };
}
