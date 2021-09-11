import { CreateClientService } from '../../../data/services/create-client/create-client'
import { LogErrorElasticSearchRepository } from '../../../infra/repositories/elasticsearch/log-error-elasticsearch-repository'
import { ClientMongoRepository } from '../../../infra/repositories/mongodb/client-mongo-repository'
import { CreateClientController } from '../../../presentation/controllers/create-client'
import { Controller } from '../../../presentation/protocols/controller'
import { LogDecoratorController } from '../../decorators/log-decorator-controller'
import { makeCreateClientValidation } from '../validations/create-client-validation-factory'

export const makeCreateClientControler = (): Controller => {
  const clientMongoRepository = new ClientMongoRepository()
  const createClientService = new CreateClientService(clientMongoRepository, clientMongoRepository)
  const createClientController = new CreateClientController(makeCreateClientValidation(), createClientService)
  const logErrorElasticSearchRepository = new LogErrorElasticSearchRepository()
  return new LogDecoratorController(createClientController, logErrorElasticSearchRepository)
}
