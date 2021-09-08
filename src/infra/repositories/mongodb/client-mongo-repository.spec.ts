import { MongoHelper } from '../mongo-helper'
import { Collection } from 'mongodb'
import { ClientMongoRepository } from './client-mongo-repository'

let clientCollection: Collection
const clientParams = {
  nome: 'any_nome',
  cpf: 'any_cpf',
  dataNascimento: new Date('1999-03-23'),
  dataCadastro: new Date('2021-09-08'),
  rendaFamiliar: 2000
}

describe('ClientMongoRepository', () => {
  beforeAll(async () => {
    console.log(process.env.MONGO_URL)
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    clientCollection = await MongoHelper.getCollection('clients')
    await clientCollection.deleteMany({})
  })

  test('Garantir que se o loadByCpf for chamado com CPF existente retornar cliente', async () => {
    clientCollection = await MongoHelper.getCollection('clients')
    await clientCollection.insertOne(clientParams)
    const sut = new ClientMongoRepository()
    const client = await sut.loadByCpf('any_cpf')
    expect(client).toBeTruthy()
    expect(client.nome).toBe(clientParams.nome)
    expect(client.cpf).toBe(clientParams.cpf)
    expect(client.dataNascimento).toEqual(clientParams.dataNascimento)
    expect(client.dataCadastro).toEqual(clientParams.dataCadastro)
    expect(client.rendaFamiliar).toBe(clientParams.rendaFamiliar)
  })

  test('Garantir que se o loadByCpf for chamado com CPF inexistente retornar cliente', async () => {
    clientCollection = await MongoHelper.getCollection('clients')
    const sut = new ClientMongoRepository()
    const client = await sut.loadByCpf('any_cpf')
    expect(client).toBeFalsy()
  })
})
