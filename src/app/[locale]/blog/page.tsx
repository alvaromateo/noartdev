import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import Search from '@/src/components/search/search'
import { spaceMono } from '@/src/global/fonts'

import { promises as fs } from 'fs'
import path from 'path'
import uniq from '@/src/global/functions/uniq'
import Tags, { TagsType } from '@/src/components/blog/post/tags'

export default async function Blog({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const tBlog = await getTranslations('Blog')
  const tCommon = await getTranslations('Common')
  const tags = await getTags(params.locale)

  return (
    <div className={`
      grid gap-y-12 grid-cols-1 grid-rows-[auto]
      md:gap-x-16 md:gap-y-16 md:grid-cols-[auto_auto]
      md:justify-items-stretch md:items-center
    `}>
      <section id='posts' className='w-[544px]'>
        test
      </section>
      <section id='search' className='w-80 self-start sticky top-0 left-0'>
        <SearchSectionTitle title={tCommon('search')}/>
        <Search/>
        <SearchSectionTitle title={tBlog('tags')}/>
        <Tags list={tags} type={TagsType.Wrapped}/>
      </section>
    </div>
  )
}

function SearchSectionTitle({title} : {title: string}) {
  return (
    <h2 className={`
      text-2xl text-title my-8
      ${spaceMono.className}
    `}>
      {title}
    </h2>
  )
}

async function getTags(locale: string) : Promise<string[]>  {
  const basePath = process.cwd()
  const postsPath = path.join(basePath, 'assets', 'posts', locale)
  const tags = await readFiles(postsPath)
  return uniq(tags)
}

async function readFiles(dirPath: string) : Promise<string[]>  {
  const result: string[] = []
  const dir = await fs.opendir(dirPath)
  for await (const dirent of dir) {
    const newPath = path.join(dirPath, dirent.name)
    if (dirent.isDirectory()) {
      console.log('Found dir: ', newPath)
      result.push(... await readFiles(newPath))
    } else if (dirent.isFile()) {
      result.push(... await readTagsFromFile(newPath))
    }
  }
  return result
}

async function readTagsFromFile(filePath: string) : Promise<string[]> {
  const contents = await fs.readFile(filePath, { encoding: 'utf8' })
  const tagElementMatch = contents.match(/<Tags list=\{(.*)\}\s?\/>/)
  if (tagElementMatch) {
    const tagsMatch = tagElementMatch[1].match(/['"](\w)*['"]/g)
    if (tagsMatch) {
      return tagsMatch.map((tagMatch) => 
        tagMatch.replaceAll('"', '').replaceAll("'", ''))
    }
  }
  return []
}
