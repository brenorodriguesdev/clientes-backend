import { Validator } from '../contracts/validator'
import { cpf } from 'cpf-cnpj-validator'
import { InvalidParamError } from '../../presentation/errors/invalid-param-error'

export class CPFValidator implements Validator {
  constructor (private readonly field: string) { }
  validate (data: any): Error {
    const cpfValue = data[this.field]
    if (!cpf.isValid(cpfValue)) {
      return new InvalidParamError(this.field)
    }
  }
}
