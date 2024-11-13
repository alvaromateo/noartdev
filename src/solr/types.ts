export interface SolrDocument {
  url: string,
  title: string,
  date: Date,
  tags: string[],
  summary: string,
  sections: string[],
  text: string[],
  snippets: string[]
}