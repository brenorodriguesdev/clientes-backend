import { Validator } from '../../../validation/contracts/validator'
import { CompositeValidator } from '../../../validation/implementations/composite-validator'
import { CPFValidator } from '../../../validation/implementations/cpf-validator'
import { MaxLengthValidator } from '../../../validation/implementations/max-length-validator'
import { RequiredFieldValidator } from '../../../validation/implementations/required-field-validator'

export const makeCreateClientValidation = (): Validator => {
  const validators = []
  const requiredFields = ['nome', 'cpf', 'dataNascimento']
  for (const field of requiredFields) {
    validators.push(new RequiredFieldValidator(field))
  }
  validators.push(new CPFValidator('cpf'))
  validators.push(new MaxLengthValidator('nome', 150))
  validators.push(new MaxLengthValidator('cpf', 11))
  return new CompositeValidator(validators)
}
