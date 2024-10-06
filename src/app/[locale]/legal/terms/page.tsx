import Subtitle from '@/src/components/legal/subtitle'
import Paragraph from '@/src/components/legal/paragraph'
import { spaceMono } from '@/src/global/fonts'
import { Props } from '@/src/global/types/custom'
import { Metadata, ResolvingMetadata } from 'next'
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'

export default async function Terms({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const t = await getTranslations('Terms')
  const messages = (await getMessages() as unknown) as IntlMessages

  return (
    <div id='legal' className='flex w-full'>
      <div className='flex flex-col justify-center items-start'>
        <h1 className={`
          text-xl font-bold text-title mb-4
          md:text-3xl/[2rem] md:mb-8
          ${spaceMono.className}
        `}>
          {t('title')}
        </h1>
        <Paragraph messages={messages} messageKey='Terms.intro'/>
        <Subtitle>{t('license.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Terms.license.p1'/>
        <Subtitle>{t('disclaimer.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Terms.disclaimer.p1'/>
        <Paragraph messages={messages} messageKey='Terms.disclaimer.p2'/>
        <Subtitle>{t('links.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Terms.links.p1'/>
        <Subtitle>{t('affiliateLinks.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Terms.affiliateLinks.p1'/>
        <Subtitle>{t('limitations.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Terms.limitations.p1'/>
        <Subtitle>{t('revisions.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Terms.revisions.p1'/>
        <Subtitle>{t('modifications.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Terms.modifications.p1'/>
        <Subtitle>{t('contact.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Terms.contact.p1'/>
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
    title: t('terms'),
    description: t('termsDescription'),
    keywords: [...keywords, 'terms'],
    authors: parentMetadata.authors,
    generator: parentMetadata.generator,
    openGraph: {
      ...openGraph,
      title: t('terms'),
      description: t('termsDescription'),
      url: 'https://noart.dev/legal/terms',
    }
  };
}