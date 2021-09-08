export interface CreateClientModel {
  nome: string
  cpf: string
  dataNascimento: Date
  rendaFamiliar?: number
}

export interface CreateClientUseCase {
  create: (createCliente: CreateClientModel) => Promise<void>
}
