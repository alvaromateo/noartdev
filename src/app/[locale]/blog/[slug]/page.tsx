import { unstable_setRequestLocale } from 'next-intl/server'

import { findPosts, findPost } from '@/src/components/blog/post-loader'
import { routing } from '@/src/i18n/routing'
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

  // TODO: fix the styles of the post for all screen sizes
  // TODO: add back to top button fixed on the bottom right corner
  // TODO: add reading progress indicator sticky at the bottom
  // TODO: add Read mark at the end of the article and check that it marks automatically
  // when the scroll reaches the end of the post

  // TODO: check recent links after visiting post

  return (
    <div className='flex flex-col'>
      <MDXContent source={post.content} components={
        useMDXComponents({
          ContentTable() {
            return <ContentTable post={post.content}/>
          },
          CodeBlock(props: {language: string, children: string}) {
            return <CodeBlock language={props.language}>
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
