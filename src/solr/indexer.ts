import { SolrDocument } from '@/src/solr/types'
import { Post } from '@/src/global/types/custom'
import { findPosts } from '../loaders/post-loader'
import { routing } from '@/src/i18n/routing'

export const getDocumentsByPath = (paths: string[]) => {
  routing.locales.forEach(async (locale) => {
    const posts = await findPosts(locale)
    const documents = posts.map(
      (post: Post) => createSolrDocument(post)
    )
  })
}

function createSolrDocument(post: Post) : SolrDocument {
  return {
    url: '',
    title: '',
    date: new Date(),
    tags: [''],
    summary: '',
    sections: [''],
    text: [''],
    snippets: ['']
  }
}
