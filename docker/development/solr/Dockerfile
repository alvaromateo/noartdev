FROM solr:slim

WORKDIR /var/solr/data
RUN mkdir -p configsets/blog-configset/conf
COPY docker/development/solr/config/ ./configsets/blog-configset/conf

# add the last parameter "configsets/blog-configset" when the custom configuration works
CMD ["solr-precreate", "posts"]