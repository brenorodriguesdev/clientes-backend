import { Client } from '../../domain/models/client'

export interface LoadByCPFClientRepository {
  loadByCpf: (cpf: string) => Promise<Client>
}
