import elasticsearch from 'elasticsearch'

export const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
  apiVersion: '7.2'
})
