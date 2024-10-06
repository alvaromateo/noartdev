import { spaceMono } from '@/src/global/fonts'
import { Props } from '@/src/global/types/custom'
import { Metadata, ResolvingMetadata } from 'next'
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import Paragraph from '@/src/components/legal/paragraph'
import Subtitle from '@/src/components/legal/subtitle'
import MessageParagraph from '@/src/components/utils/message-paragraph'

export default async function Privacy({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const t = await getTranslations('Privacy')
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
        <Paragraph messages={messages} messageKey='Privacy.intro'/>
        <Subtitle>{t('collection.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Privacy.collection.p1'/>
        <Subtitle>{t('cookies.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Privacy.cookies.p1'/>
        <Subtitle>{t('advertisement.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Privacy.advertisement.p1'/>
        <Paragraph messages={messages} messageKey='Privacy.advertisement.p2'/>
        <ul className='mb-4 md:mb-8'>
          <li className='text-sm md:text-base text-text'>
            <MessageParagraph messages={messages} messageKey='Privacy.advertisement.google'/>
          </li>
          <li className='text-sm md:text-base text-text'>
            <MessageParagraph messages={messages} messageKey='Privacy.advertisement.github'/>
          </li>
        </ul>
        <Subtitle>{t('security.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Privacy.security.p1'/>
        <Subtitle>{t('modifications.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Privacy.modifications.p1'/>
        <Subtitle>{t('contact.title')}</Subtitle>
        <Paragraph messages={messages} messageKey='Privacy.contact.p1'/>
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
    title: t('privacy'),
    description: t('privacyDescription'),
    keywords: [...keywords, 'privacy'],
    authors: parentMetadata.authors,
    generator: parentMetadata.generator,
    openGraph: {
      ...openGraph,
      title: t('privacy'),
      description: t('privacyDescription'),
      url: 'https://noart.dev/legal/privacy',
    }
  };
}