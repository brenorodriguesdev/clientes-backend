import { MissingParamError } from '../../presentation/errors/missing-param-error'
import { Validator } from '../contracts/validator'

export class RequiredFieldValidator implements Validator {
  constructor (private readonly paramName: string) { }
  validate (data: any): Error {
    if (!data[this.paramName]) { return new MissingParamError(this.paramName) }
  }
}
