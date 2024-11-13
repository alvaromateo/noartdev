class SolrClient {
  constructor() {
    if (client) {
      throw Error('There can only be one Solr Client')
    }
    return this
  }
}

export const client : SolrClient = Object.freeze(new SolrClient())