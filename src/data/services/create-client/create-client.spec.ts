import { Client } from '../../../domain/models/client'
import { CreateClientModel } from '../../../domain/usecases/create-client'
import { AddClientRepository } from '../../contracts/add-client-repository'
import { LoadByCPFClientRepository } from '../../contracts/load-by-cpf-client-repository'
import { CreateClientService } from './create-client'

const makeloadByCPFClientRepository = (): LoadByCPFClientRepository => {
  class LoadByCPFClientRepositoryStub implements LoadByCPFClientRepository {
    async loadByCpf (): Promise<Client> {
      return await new Promise(resolve => resolve({
        id: 'id_valid',
        nome: 'nome_valid',
        cpf: 'cpf_valid',
        dataNascimento: new Date('1999-03-23'),
        dataCadastro: new Date('2021-09-08'),
        rendaFamiliar: 1000
      }))
    }
  }
  return new LoadByCPFClientRepositoryStub()
}

const makeAddClientRepository = (): AddClientRepository => {
  class AddClientRepositoryStub implements AddClientRepository {
    async add (): Promise<void> {
    }
  }
  return new AddClientRepositoryStub()
}

interface SutTypes {
  sut: CreateClientService
  loadByCPFClientRepository: LoadByCPFClientRepository
  addClientRepository: AddClientRepository
}
const makeSut = (): SutTypes => {
  const loadByCPFClientRepository = makeloadByCPFClientRepository()
  const addClientRepository = makeAddClientRepository()
  const sut = new CreateClientService(loadByCPFClientRepository, addClientRepository)
  return {
    sut,
    loadByCPFClientRepository,
    addClientRepository
  }
}

const createClient: CreateClientModel = {
  nome: 'any_name',
  cpf: 'any_cpf',
  dataNascimento: new Date('1999-03-23'),
  rendaFamiliar: 1000
}

describe('Create Client Service', () => {
  test('Garantir que o loadByCpf seja chamado com o CPF correto', async () => {
    const { sut, loadByCPFClientRepository } = makeSut()
    const loadByCpfSpy = jest.spyOn(loadByCPFClientRepository, 'loadByCpf')
    await sut.create(createClient)
    expect(loadByCpfSpy).toHaveBeenCalledWith('any_cpf')
  })
})
