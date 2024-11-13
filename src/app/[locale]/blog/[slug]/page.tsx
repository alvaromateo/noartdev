import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { findPosts, findPost } from '@/src/loaders/post-loader'
import { Link, routing } from '@/src/i18n/routing'
import { useMDXComponents } from '@/src/mdx-components'

import { compile, Jsx, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

// components needed for the MDX post
import ContentTable from '@/src/components/blog/post/content-table'
import PublishDate from '@/src/components/blog/post/publish-date'
import CodeBlock from '@/src/components/blog/post/code-block'
import Summary from '@/src/components/blog/post/summary'
import Tags from '@/src/components/blog/post/tags'
import BottomDrawer from '@/src/components/blog/post/bottom-drawer'
import { Props } from '@/src/global/types/custom'
import { Metadata, ResolvingMetadata } from 'next'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'

export default async function Blog({
  params
} : {
  params: {
    locale: string,
    slug: string,
  }
}) {
  unstable_setRequestLocale(params.locale)
  const post = await findPost(params.locale, params.slug)
  if (!post) {
    throw Error(`Could not retrieve post [${params.slug}]`)
  }
  
  // Compile the MDX source code to a function body
  const code =
    await compile(post.content, { outputFormat: 'function-body' })
  // You can then either run the code on the server, generating a server
  // component, or you can pass the string to a client component for
  // final rendering.

  // Run the compiled code with the runtime and get the default export
  const { default: MDXContent } = await run(code, {
    Fragment: runtime.Fragment,
    jsx: runtime.jsx as Jsx,
    jsxs: runtime.jsxs as Jsx,
    baseUrl: import.meta.url,
  })

  return (
    <div className='flex flex-col'>
      <MDXContent source={post.content} components={
        useMDXComponents({
          ContentTable() {
            return <ContentTable post={post.content}/>
          },
          CodeBlock(props: {language: string, inline?: boolean, children: string}) {
            return <CodeBlock inline={props.inline} language={props.language}>
              {props.children}
            </CodeBlock>
          },
          PublishDate(props: {year: number, month: number, day: number}) {
            return <PublishDate year={props.year} month={props.month} day={props.day}/>
          },
          Summary(props: {children: string}) {
            return <Summary>
              {props.children}
            </Summary>
          },
          Tags(props: {list: string[]}) {
            return <Tags list={props.list}/>
          },
          Link(props: {
            children: string,
            href: string,
          }) {
            return <Link className='text-link hover:text-hover-link text-sm md:text-base' 
              href={{ pathname: props.href }}>
                {props.children}
            </Link>
          }
        }
      )}/>
      <BottomDrawer />
    </div>
  )
}

export async function generateStaticParams() {
  return routing.locales.flatMap(async (locale) => {
    const posts = await findPosts(locale)
    return posts.map((post) => {
      return {
        locale,
        slug: post.path.slice(post.path.lastIndexOf('/'))
      }
    })
  })
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

  if (!params.slug) {
    throw Error('Can not retrieve post if [slug] is missing')
  }

  const post = await findPost(params.locale, params.slug)
  if (!post) {
    throw Error(`Could not retrieve post [${params.slug}]`)
  }
  const description = removeLinks(post.description)

  return {
    metadataBase: parentMetadata.metadataBase,
    title: post.title,
    description: description,
    keywords: [...keywords, ...post.tags],
    authors: parentMetadata.authors,
    generator: parentMetadata.generator,
    openGraph: {
      ...openGraph,
      title: post.title,
      description: description,
      url: `https://noart.dev/blog/${params.slug}`,
    }
  };
}

function removeLinks(content: string) : string {
  // substitute all line breaks to have one single line string/paragraph
  let contentCopy = content.replaceAll(/[\r\n|\r|\n]/g, ' ')
  // substitute multiple spaces for one just space to remove the start of line tabs
  contentCopy = contentCopy.replaceAll(/[ \t]{2,}/g, ' ')

  const regex = /\<Link[^\>]*\>([\w\-\s]*)\<\/Link\>/g
  let matches = regex.exec(contentCopy)
  let result = contentCopy

  while (matches) {
    result = result.replace(matches[0], matches[1])
    matches = regex.exec(contentCopy)
  }
  return result.replaceAll(/[ \t]{2,}/g, ' ').trim()
}
