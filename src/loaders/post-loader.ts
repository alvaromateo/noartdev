import { Post } from '@/src/global/types/custom'
import path from 'path'
import { promises as fs } from 'fs'
import { AppSettings } from '@/src/global/app-config'
import { SimpleDate } from '@/src/global/types/custom'

export async function findPosts(locale: string) : Promise<Post[]> {
  const postsPath = getPostsPathForLocale(locale)
  return loadPosts(postsPath)
}

export async function findRelativePostPath(locale: string, name: string) : Promise<string | null> {
  const basePath: string | null = getPostsPathForLocale(locale)
  const postPath = await loadPostPath(basePath, name)
  if (postPath) {
    return postPath.slice(postPath.indexOf(locale))
  }
  return null
}

export async function findPost(locale: string, name: string) : Promise<Post | null> {
  let postPath = getPostsPathForLocale(locale)
  return loadPost(postPath, name)
}

export function transformPathToImport(modulePath: string) : string {
  const basePath = process.cwd()
  return modulePath.slice(0, modulePath.lastIndexOf('.'))
    .replace(basePath, '')
}

function getPostsPathForLocale(locale: string) : string {
  const basePath = process.cwd()
  return path.join(basePath, process.env.POSTS_PATH!, locale)
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

async function loadPostPath(dirPath: string, name: string) : Promise<string | null> {
  let result: string | null = null
  const dir = await fs.opendir(dirPath)
  for await (const dirEntry of dir) {
    const newPath = path.join(dirPath, dirEntry.name)
    if (dirEntry.isDirectory()) {
      const pathToPost = await loadPostPath(newPath, name)
      if (pathToPost) {
        result = pathToPost
      }
    } else if (dirEntry.isFile() && dirEntry.name === `${name}.mdx`) {
      return path.join(dirPath, dirEntry.name)
    }
  }
  return result
}

async function loadPost(dirPath: string, name: string) : Promise<Post | null> {
  let result: Post | null = null
  const dir = await fs.opendir(dirPath)
  for await (const dirEntry of dir) {
    const newPath = path.join(dirPath, dirEntry.name)
    if (dirEntry.isDirectory()) {
      result = await loadPost(newPath, name)
      if (result) {
        return result
      }
    } else if (dirEntry.isFile() && dirEntry.name === `${name}.mdx`) {
      const content = await fs.readFile(newPath, { encoding: 'utf8' })
      return createPost(dirEntry.name, content)
    }
  }
  return null
}

function createPost(postName: string, content: string) : Post {
  return {
    path: `${AppSettings.blogURL}/${postName}`.replace('.mdx', ''),
    content: content,
    title: findTitle(content, postName),
    tags: findTags(content),
    publishDate: findDate(content, postName),
    description: findDescription(content, postName),
  }
}

function findTags(postContent: string) : string[] {
  const tagElementMatch = postContent.match(/<Tags list=\{(.*)\}\s?\/>/)
  if (tagElementMatch) {
    const tagsMatch = tagElementMatch[1].match(/['"](\w)*['"]/g)
    if (tagsMatch) {
      return tagsMatch.map((tagMatch) => 
        tagMatch.replaceAll('"', '').replaceAll("'", ''))
    }
  }
  return []
}

function findTitle(postContent: string, postName: string) : string {
  const titleMatch = postContent.match(/[^#]#[^#](.*)/)
  if (titleMatch) {
    return titleMatch[1].trim()
  }
  throw Error(`Title not found in post [${postName}]`)
}

function findDate(postContent: string, postName: string) 
  : SimpleDate
{
  const dateMatch = postContent.match(/<PublishDate.*/)
  if (dateMatch) {
    const yearMatch = dateMatch[0].match(/year=\{([0-9]+)\}/)
    const monthMatch = dateMatch[0].match(/month=\{([0-9]+)\}/)
    const dayMatch = dateMatch[0].match(/day=\{([0-9]+)\}/)
    if (yearMatch && monthMatch && dayMatch) {
      return {
        year: Number(yearMatch[1]),
        month: Number(monthMatch[1]),
        day: Number(dayMatch[1]),
      }
    }
  }
  throw Error(`Date not found in post [${postName}]`)
}

function findDescription(postContent: string, postName: string) : string {
  const start = postContent.indexOf('<Summary>') + "<Summary>".length
  const end = postContent.indexOf('</Summary>')
  if (start < 0 || end < 0 || end < start) {
    throw Error(`Description/Summary not found in post [${postName}]`)
  }
  return postContent.substring(start,end).trim()
}