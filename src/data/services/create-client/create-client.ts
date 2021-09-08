import { CreateClientModel, CreateClientUseCase } from '../../../domain/usecases/create-client'
import { AddClientRepository } from '../../contracts/add-client-repository'
import { LoadByCPFClientRepository } from '../../contracts/load-by-cpf-client-repository'

export class CreateClientService implements CreateClientUseCase {
  constructor (private readonly loadByCPFClientRepository: LoadByCPFClientRepository, private readonly addClientRepository: AddClientRepository) { }
  async create (createClient: CreateClientModel): Promise<void | Error> {
    const client = await this.loadByCPFClientRepository.loadByCpf(createClient.cpf)
    if (client) {
      return new Error('Esse CPF já está cadastrado em nosso banco de dados!')
    }
    if (createClient.dataNascimento > new Date()) {
      return new Error('Essa Data de Nascimento é inválida!')
    }
    await this.addClientRepository.add(createClient)
  }
}
