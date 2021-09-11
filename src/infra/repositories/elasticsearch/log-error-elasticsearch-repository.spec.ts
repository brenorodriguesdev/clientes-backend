import { client } from './client'
import { LogErrorElasticSearchRepository } from './log-error-elasticsearch-repository'

describe('Log Error ElasticSearch Repository', () => {
  test('Garantir que o index seja chamado com os valores corretos"', async () => {
    const indexSpy = jest.spyOn(client, 'index')
    const sut = new LogErrorElasticSearchRepository()
    await sut.logError('error stack')
    expect(indexSpy).toHaveBeenCalledWith({
      index: 'errors',
      type: 'type_errors',
      body: { stack: 'error stack' }
    })
  })
})
