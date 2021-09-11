import { LogErrorRepository } from '../../../data/contracts/log-error-repository'
import { client } from './client'

export class LogErrorElasticSearchRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    await client.index({
      index: 'errors',
      type: 'type_errors',
      body: { stack }
    })
  }
}
