import { SimpleDate } from '@/src/global/types/custom'

export function findTags(postContent: string) : string[] {
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

export function findTitle(postContent: string, postName: string) : string {
  const titleMatch = postContent.match(/[^#]#[^#](.*)/)
  if (titleMatch) {
    return titleMatch[1].trim()
  }
  throw Error(`Title not found in post [${postName}]`)
}

export function findDate(postContent: string, postName: string) 
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