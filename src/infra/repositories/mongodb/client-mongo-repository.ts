import { AddClientRepository } from '../../../data/contracts/add-client-repository'
import { LoadByCPFClientRepository } from '../../../data/contracts/load-by-cpf-client-repository'
import { Client } from '../../../domain/models/client'
import { CreateClientModel } from '../../../domain/usecases/create-client'
import { MongoHelper } from '../mongo-helper'

export class ClientMongoRepository implements LoadByCPFClientRepository, AddClientRepository {
  async loadByCpf (cpf: string): Promise<Client> {
    const clientCollection = await MongoHelper.getCollection('clients')
    const client = await clientCollection.findOne({
      cpf
    })
    return client && MongoHelper.map(client)
  }

  async add (client: CreateClientModel): Promise<void> {
    const clientCollection = await MongoHelper.getCollection('clients')
    const data = { ...client, dataCadastro: new Date() }
    await clientCollection.insertOne(data)
  }
}
