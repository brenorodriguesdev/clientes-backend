import { CreateClientModel } from '../../domain/usecases/create-client'

export interface AddClientRepository {
  add: (client: CreateClientModel) => Promise<void>
}
