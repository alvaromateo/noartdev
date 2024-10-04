import ProjectCard from '@/src/components/projects/project-card'
import { spaceMono } from '@/src/global/fonts'
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
  const t = await getTranslations('Projects')

  return (
    <div className='flex flex-col w-full'>
      <h1 className={`
        text-2xl font-bold text-title mb-4
        md:text-3xl/[2rem] text-center md:mb-8
        ${spaceMono.className}
      `}>
        {t('title')}
      </h1>
      <div className='flex flex-row flex-wrap mx-auto'>
        <ProjectCard project={{
          link: '/home',
          title: t('noart.title'),
          summary: t('noart.summary'),
          githubLink: 'https://github.com/alvaromateo/noartdev'
        }}/>
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
