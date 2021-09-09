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

  test('Garantir que se o loadByCpf retornar um cliente retornar um Error', async () => {
    const { sut } = makeSut()
    const error = await sut.create(createClient)
    expect(error).toEqual(new Error('Esse CPF já está cadastrado em nosso banco de dados!'))
  })

  test('Garantir que se o loadByCpf retornar uma exceção retornar essa exceção', async () => {
    const { sut, loadByCPFClientRepository } = makeSut()
    jest.spyOn(loadByCPFClientRepository, 'loadByCpf').mockRejectedValueOnce(new Error())
    const promise = sut.create(createClient)
    await expect(promise).rejects.toThrow()
  })

  test('Garantir que o add seja chamado com os valores corretos', async () => {
    const { sut, addClientRepository, loadByCPFClientRepository } = makeSut()
    jest.spyOn(loadByCPFClientRepository, 'loadByCpf').mockResolvedValueOnce(null)
    const addSpy = jest.spyOn(addClientRepository, 'add')
    await sut.create(createClient)
    expect(addSpy).toHaveBeenCalledWith(createClient)
  })

  test('Garantir que se o add retornar uma exceção retornar essa exceção', async () => {
    const { sut, loadByCPFClientRepository, addClientRepository } = makeSut()
    jest.spyOn(loadByCPFClientRepository, 'loadByCpf').mockResolvedValueOnce(null)
    jest.spyOn(addClientRepository, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.create(createClient)
    await expect(promise).rejects.toThrow()
  })

  test('Garantir que se o create for chamado com uma data de nascimento maior que a data de hoje retornar um Error', async () => {
    const { sut, loadByCPFClientRepository } = makeSut()
    jest.spyOn(loadByCPFClientRepository, 'loadByCpf').mockResolvedValueOnce(null)
    const dataNascimento = new Date()
    dataNascimento.setFullYear(dataNascimento.getFullYear() + 1)
    const error = await sut.create({
      nome: 'any_name',
      cpf: 'any_cpf',
      dataNascimento,
      rendaFamiliar: 1000
    })
    expect(error).toEqual(new Error('Essa Data de Nascimento é inválida!'))
  })
})
