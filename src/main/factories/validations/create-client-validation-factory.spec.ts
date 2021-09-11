import { CompositeValidator } from '../../../validation/implementations/composite-validator'
import { CPFValidator } from '../../../validation/implementations/cpf-validator'
import { MaxLengthValidator } from '../../../validation/implementations/max-length-validator'
import { RequiredFieldValidator } from '../../../validation/implementations/required-field-validator'
import { makeCreateClientValidation } from './create-client-validation-factory'

jest.mock('../../../validation/implementations/composite-validator')

describe('CreateClient Validation', () => {
  test('Garantir que o CreateClient Validation seja injetado os validators corretos', () => {
    makeCreateClientValidation()
    const validators = []
    const requiredFields = ['nome', 'cpf', 'dataNascimento']
    for (const field of requiredFields) {
      validators.push(new RequiredFieldValidator(field))
    }
    validators.push(new CPFValidator('cpf'))
    validators.push(new MaxLengthValidator('nome', 150))
    validators.push(new MaxLengthValidator('cpf', 11))
    expect(CompositeValidator).toHaveBeenCalledWith(validators)
  })
})
