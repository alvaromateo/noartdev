import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'

import uniq from '@/src/global/functions/uniq'
import { Post, Props } from '@/src/global/types/custom'
import { spaceMono } from '@/src/global/fonts'
import { findPosts } from '@/src/loaders/post-loader'
import Posts from '@/src/components/blog/posts'
import { Metadata, ResolvingMetadata } from 'next'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'

export default async function Blog({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const tBlog = await getTranslations('Blog')
  const posts = await findPosts(params.locale)
  const tags = getTagsFromPosts(posts)

  return (
    <div className='flex flex-col w-full'>
      <h1 className={`
        text-2xl font-bold text-title mb-4
        md:text-3xl/[2rem] md:ml-16
        ${spaceMono.className}
      `}>
        {tBlog('posts')}
      </h1>
      <div className={`
        grid gap-y-4 grid-cols-1
        grid-rows-[auto_auto]
        md:gap-x-16 md:gap-y-16 md:grid-cols-[2fr_1fr] md:grid-rows-[auto]
        md:justify-items-stretch md:items-start
        lg:grid-cols-[auto_auto]
      `}>
        <Suspense fallback={
          <div className='flex w-full justify-center'>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-xl md:text-2xl'>{tBlog('loading')}</p>
            </div>
          </div>
        }>
          <Posts posts={posts} tags={tags}/>
        </Suspense>
      </div>
    </div>
  )
}

function getTagsFromPosts(posts: Post[]) : string[] {
  const tags = posts
    .flatMap((post) => post.tags)
  return uniq(tags)
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
    title: t('blog'),
    description: t('blogDescription'),
    keywords: [...keywords, 'blog', 'posts'],
    authors: parentMetadata.authors,
    generator: parentMetadata.generator,
    openGraph: {
      ...openGraph,
      title: t('blog'),
      description: t('blogDescription'),
      url: 'https://noart.dev/blog',
    }
  };
}