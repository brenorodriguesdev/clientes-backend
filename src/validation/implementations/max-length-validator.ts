import { MaxLengthParamError } from '../../presentation/errors/max-length-error'
import { Validator } from '../contracts/validator'

export class MaxLengthValidator implements Validator {
  constructor (private readonly paramName: string, private readonly maxLength: number) { }
  validate (data: any): Error {
    if (data[this.paramName].length > this.maxLength) { return new MaxLengthParamError(this.paramName, this.maxLength) }
  }
}
