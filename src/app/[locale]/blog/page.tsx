import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Suspense } from 'react'

import { spaceMono } from '@/src/global/fonts'
import uniq from '@/src/global/functions/uniq'
import { Post } from '@/src/global/types/custom'
import { AppSettings } from '@/src/global/app-config'

import { findDate, findTags, findTitle } from '@/src/components/blog/post-utils'
import PostCard from '@/src/components/blog/post-card'
import Tags, { TagsType } from '@/src/components/blog/post/tags'
import Search from '@/src/components/search/search'
import Filters from '@/src/components/blog/filters'
import SearchSectionTitle from '@/src/components/blog/search-section-title'

// TODO: create a 'Filters' section under tags
// TODO: add links to all tags in the post-card, in the tags section
// and in the post pages that create a filter search
// TODO: sort the posts by date
// TODO: add links to each post page
// TODO: styles for mobile

export default async function Blog({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const tBlog = await getTranslations('Blog')
  const tCommon = await getTranslations('Common')

  const posts = await findPosts(params.locale)
  const tags = getTagsFromPosts(posts)

  return (
    <div className={`
      grid gap-y-12 grid-cols-1 grid-rows-[auto]
      md:gap-x-16 md:gap-y-16 md:grid-cols-[auto_auto]
      md:justify-items-stretch md:items-start
    `}>
      <section id='posts' className='w-[544px]'>
        <h1 className={`
          text-3xl/[2rem] font-bold text-title mt-8 mb-12 ml-10
          ${spaceMono.className}
        `}>
          {tBlog('posts')}
        </h1>
        <ul>
          { posts.map((post) =>
              <PostCard key={post.path} post={post}/>)}
        </ul>
      </section>
      <section id='search' className='w-80 sticky top-0 left-0'>
        <SearchSectionTitle title={tCommon('search')}/>
        <Search/>
        <SearchSectionTitle title={tBlog('tags')}/>
        <Tags list={tags} type={TagsType.Wrapped}/>
        <Suspense fallback={<></>}>
          <Filters/>
        </Suspense>
      </section>
    </div>
  )
}

async function findPosts(locale: string) : Promise<Post[]> {
  const basePath = process.cwd()
  const postsPath = path.join(basePath, 'assets', 'posts', locale)
  return loadPosts(postsPath)
}

async function loadPosts(dirPath: string) : Promise<Post[]> {
  const result: Post[] = []
  const dir = await fs.opendir(dirPath)
  for await (const dirEntry of dir) {
    const newPath = path.join(dirPath, dirEntry.name)
    if (dirEntry.isDirectory()) {
      result.push(... await loadPosts(newPath))
    } else if (dirEntry.isFile()) {
      const content = await fs.readFile(newPath, { encoding: 'utf8' })
      result.push(createPost(dirEntry.name, content))
    }
  }
  return result
}

function createPost(postName: string, content: string) : Post {
  return {
    path: `${AppSettings.blogURL}/${postName}`.replace('.mdx', ''),
    content: content,
    title: findTitle(content, postName),
    tags: findTags(content),
    publishDate: findDate(content, postName),
  }
}

function getTagsFromPosts(posts: Post[]) : string[] {
  const tags = posts
    .flatMap((post) => post.tags)
  return uniq(tags)
}
