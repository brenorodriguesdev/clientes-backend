import { CreateClientService } from '../../../data/services/create-client/create-client'
import { ClientMongoRepository } from '../../../infra/repositories/mongodb/client-mongo-repository'
import { CreateClientController } from '../../../presentation/controllers/create-client'
import { makeCreateClientValidation } from '../validations/create-client-validation-factory'

export const makeCreateClientControler = (): CreateClientController => {
  const clientMongoRepository = new ClientMongoRepository()
  const createClientService = new CreateClientService(clientMongoRepository, clientMongoRepository)
  return new CreateClientController(makeCreateClientValidation(), createClientService)
}
